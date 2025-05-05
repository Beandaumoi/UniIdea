import Api, { RequestMethod } from "./ApiManager";

export const AuthApis = {
  //User
  loginUser: "api/user/login",
  registerUser: "api/user/register",
  changeUserPassword: "api/user/change-password",
  sendFeedback: "api/user/feedback",
  topicRegister: "api/user/topics",
  pickUniversity: "api/admin/universities",
  allTopicDone: "api/user/topics",
  allDepartments: "api/admin/faculties",
  filterYearTopic: "api/user/topics?year=2025",
  getTopicDetail: "api/user/topics/:id",
  searchTopic: "api/user/topics/search",
  changeProfile: "api/user/profile",

  //Admin
  //University
  loginAdmin: "api/admin/login",
  getUniversities: "api/admin/universities",
  addUniversity: "api/admin/universities",
  updateUniversity: "api/admin/universities/:id",
  deleteUniversity: "api/admin/universities/:id",
  //Feedback
  getFeedback: "api/admin/feedback",
  deleteFeedback: "api/admin/feedback/:id",
  //Users
  getUsers: "api/admin/users",
  deleteUser: "api/admin/users/:id",
  //Faculty
  getFaculties: "api/admin/faculties",
  addFaculty: "api/admin/faculties",
  //Topic
  getTopics: "api/admin/topics",
  getATopic: "api/admin/topics/:id",
  changeStatusTopic: "api/admin/topics/:id/status",
  topicAward: "api/admin/topics/:id/award",
};

class AuthenticationApi {
  //User
  loginUser(params) {
    const url = AuthApis.loginUser;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  registerUser(params) {
    const url = AuthApis.registerUser;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  changeUserPassword(params) {
    const url = AuthApis.changeUserPassword;
    return Api.request({ method: RequestMethod.PUT, url, params });
  }
  sendFeedback(params) {
    const url = AuthApis.sendFeedback;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  topicRegister(params) {
    const url = AuthApis.topicRegister;
    return Api.request({ method: RequestMethod.POST, url, params });
  }

  pickUniversity(params) {
    const url = AuthApis.pickUniversity;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  allTopicDone(params) {
    const url = AuthApis.allTopicDone;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  allDepartments(params) {
    const url = AuthApis.allDepartments;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  filterYearTopic(params) {
    const url = AuthApis.filterYearTopic;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  getTopicDetail(id, params) {
    const url = AuthApis.getTopicDetail.replace(":id", id);
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  searchTopic(params) {
    const url = AuthApis.searchTopic;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  changeProfile(params) {
    const url = AuthApis.changeProfile;
    return Api.request({ method: RequestMethod.POST, url, params });
  }

  //Admin
  loginAdmin(params) {
    const url = AuthApis.loginAdmin;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  //University
  getUniversities(params) {
    const url = AuthApis.getUniversities;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  addUniversity(params) {
    const url = AuthApis.addUniversity;
    return Api.request({ method: RequestMethod.POST, url, params });
  }

  updateUniversity(id, params) {
    const url = AuthApis.updateUniversity.replace(":id", id);
    return Api.request({ method: RequestMethod.POST, url, params });
  }

  deleteUniversity(id) {
    const url = AuthApis.deleteUniversity.replace(":id", id);
    return Api.request({ method: RequestMethod.DELETE, url });
  }
  //Feedback
  getFeedback(params) {
    const url = AuthApis.getFeedback;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  deleteFeedback(id) {
    const url = AuthApis.deleteFeedback.replace(":id", id);
    return Api.request({ method: RequestMethod.DELETE, url });
  }
  //Users
  getUsers(params) {
    const url = AuthApis.getUsers;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  deleteUser(id) {
    const url = AuthApis.deleteUser.replace(":id", id);
    return Api.request({ method: RequestMethod.DELETE, url });
  }
  //Faculty
  getFaculties(params) {
    const url = AuthApis.getFaculties;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  addFaculty(params) {
    const url = AuthApis.addFaculty;
    return Api.request({ method: RequestMethod.POST, url, params });
  }
  //Topic
  getTopics(params) {
    const url = AuthApis.getTopics;
    return Api.request({ method: RequestMethod.GET, url, params });
  }
  getATopic(id) {
    const url = AuthApis.getATopic.replace(":id", id);
    return Api.request({ method: RequestMethod.GET, url });
  }
  changeStatusTopic(id, params) {
    const url = AuthApis.changeStatusTopic.replace(":id", id);
    return Api.request({ method: RequestMethod.PUT, url, params });
  }

  topicAward(id, params) {
    const url = AuthApis.topicAward.replace(":id", id);
    return Api.request({ method: RequestMethod.PUT, url, params });
  }
}

export default new AuthenticationApi();
