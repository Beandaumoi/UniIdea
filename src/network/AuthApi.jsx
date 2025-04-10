import Api, { RequestMethod } from "./ApiManager";

export const AuthApis = {
  login: "api/v1/auth/login",
  signUp: "api/v1/users",
  topics: "api/v1/topics",
  departments: "api/v1/departments",
  userInformation: "api/v1/users",
};

class AuthenticationApi {
  login(params) {
    const url = AuthApis.login;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  signUp(params) {
    const url = AuthApis.signUp;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  topics(params) {
    const url = AuthApis.topics;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  departments(params) {
    const url = AuthApis.departments;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  userInformation(params) {
    const url = AuthApis.userInformation;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
}

export default new AuthenticationApi();
