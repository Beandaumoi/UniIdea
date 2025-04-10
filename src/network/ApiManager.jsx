/**
 * helper.js - Reusable logic for API requests
 */
import axios from "axios";
import ResponseCode from "./ResponseCode";
import { Constants } from "../constants/Constants";
import store from "../redux/store";

// Định nghĩa các phương thức HTTP
export const RequestMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

// Cấu hình mặc định cho axios
const axiosInstance = axios.create({
  baseURL: Constants.DOMAIN,
  timeout: Constants.TIME_OUT || 30000, // 30 giây nếu TIME_OUT không được định nghĩa
});

// API Client class
class ApiClient {
  constructor(instance) {
    this.axios = instance;
    this.mapRequestCancel = new Map(); // Lưu trữ các cancel token
  }

  // Hủy request cũ nếu cần
  cancelRequest(url) {
    if (this.mapRequestCancel.has(url)) {
      const canceler = this.mapRequestCancel.get(url);
      canceler?.();
      this.mapRequestCancel.delete(url);
    }
  }

  // Hàm chính để gửi request
  async request({
    method = RequestMethod.GET,
    url,
    params = {},
    ignoreURLBase = false,
    ignoreHandleCommonError = true,
  }) {
    const urlRequest = ignoreURLBase ? url : `${Constants.DOMAIN}${url}`;

    // Hủy request cũ nếu tồn tại
    this.cancelRequest(urlRequest);

    try {
      // Lấy token từ Redux store
      const token = store.getState().auth.accessToken;
      console.log("Token from Redux store:", token);

      // Cấu hình request
      const config = {
        method,
        url: urlRequest,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        cancelToken: new axios.CancelToken((cancel) => {
          this.mapRequestCancel.set(urlRequest, cancel);
        }),
      };

      // Gán dữ liệu params theo phương thức
      if (method === RequestMethod.GET || method === RequestMethod.DELETE) {
        config.params = params;
      } else {
        config.data = params;
      }

      console.log(`=======> REQUEST || ${urlRequest} : \n`, params);

      // Gửi request
      const response = await this.axios.request(config);

      console.log(`=======> RESPONSE || ${urlRequest} : \n`, response.data);

      // Trả về dữ liệu thành công
      return {
        status: response.status,
        data: response.data.data ?? response.data,
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

      // Xử lý lỗi chung nếu không bỏ qua
      if (!ignoreHandleCommonError) {
        switch (response.status) {
          case ResponseCode.UNAUTHORIZED:
            response.message = ""; // Có thể dispatch action để logout ở đây
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
      // Xóa cancel token sau khi hoàn tất
      this.mapRequestCancel.delete(urlRequest);
    }
  }
}

// Khởi tạo instance duy nhất
const Api = new ApiClient(axiosInstance);
export default Api;
