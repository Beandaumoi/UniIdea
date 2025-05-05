/**
 * helper.js - Reusable logic for API requests
 */
import axios from "axios";
import ResponseCode from "./ResponseCode";
import { Constants } from "../constants/Constants";
import store from "../redux/store";

export const RequestMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const axiosInstance = axios.create({
  baseURL: Constants.DOMAIN,
  timeout: Constants.TIME_OUT || 30000,
});

class ApiClient {
  constructor(instance) {
    this.axios = instance;
    this.mapRequestCancel = new Map();
  }

  cancelRequest(url) {
    if (this.mapRequestCancel.has(url)) {
      const canceler = this.mapRequestCancel.get(url);
      canceler?.();
      this.mapRequestCancel.delete(url);
    }
  }

  async request({
    method = RequestMethod.GET,
    url,
    params = {},
    ignoreURLBase = false,
    ignoreHandleCommonError = true,
  }) {
    const urlRequest = ignoreURLBase ? url : `${Constants.DOMAIN}${url}`;

    this.cancelRequest(urlRequest);

    try {
      // Lấy token từ Redux store
      const { auth, admin } = store.getState();
      const token = admin.adminToken || auth.accessToken;
      console.log("Token from Redux store:", token);

      // Fallback: Lấy token từ localStorage nếu Redux store không có
      const localToken =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("accessToken");
      console.log("Token from localStorage:", localToken);

      // Danh sách các endpoint công khai không cần token
      const publicEndpoints = ["api/user/login", "/api/admin/login"];
      const isPublicEndpoint = publicEndpoints.some((endpoint) =>
        urlRequest.includes(endpoint)
      );
      const isFormData = params instanceof FormData;

      const config = {
        method,
        url: urlRequest,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
        cancelToken: new axios.CancelToken((cancel) => {
          this.mapRequestCancel.set(urlRequest, cancel);
        }),
      };

      // Chỉ thêm Authorization header nếu không phải public endpoint và có token
      if (!isPublicEndpoint && (token || localToken)) {
        config.headers.Authorization = `Bearer ${token || localToken}`;
      }

      if (method === RequestMethod.GET || method === RequestMethod.DELETE) {
        config.params = params;
      } else {
        config.data = params;
      }

      console.log(`=======> REQUEST CONFIG || ${urlRequest} :`, {
        method,
        headers: config.headers,
        data: params,
      });

      const response = await this.axios.request(config);

      console.log(`=======> RESPONSE || ${urlRequest} : \n`, response.data);

      return {
        status: response.status,
        data: response.data.data ?? response.data, // Giữ nguyên response.data nếu không có data
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`=======> REQUEST CANCELED || ${urlRequest}`);
        return { status: ResponseCode.CANCELED, message: "Request canceled" };
      }

      const response = {
        status: error.response?.status ?? ResponseCode.INTERNAL_SERVER_ERROR,
        data: {},
        message: error.response?.data?.message || "Unknown error",
        error: error.response?.data?.error,
      };

      console.log(`=======> ERROR || ${urlRequest} : \n`, response);

      if (!ignoreHandleCommonError) {
        switch (response.status) {
          case ResponseCode.UNAUTHORIZED:
            response.message = "Unauthorized access";
            break;
          case ResponseCode.GATEWAY_TIME_OUT:
            response.message = "Gateway timeout";
            break;
          default:
            break;
        }
      }

      return response;
    } finally {
      this.mapRequestCancel.delete(urlRequest);
    }
  }
}

const Api = new ApiClient(axiosInstance);
export default Api;
