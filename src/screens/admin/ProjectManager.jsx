import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAdminToken } from "../../redux/adminSlice";
import {
  UniversityManagement,
  FacultyManagement,
  UserManagement,
  TopicManagement,
  FeedbackManagement,
  ApprovedTopicManagement,
} from "./Case";

export default function ProjectManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("universities");

  const admin = useSelector((state) => state.admin.admin);
  const token = useSelector((state) => state.admin.adminToken);

  console.log("admin:", admin);
  console.log("token:", token);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="ml-48 text-5xl font-bold text-black">
          Uni<span className="text-blue-600">I</span>
          <span className="text-blue-600 text-2xl">dea</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg">{admin?.name || "Admin"}</span>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => {
              dispatch(clearAdminToken());
              navigate("/login");
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
      <div className="flex justify-center mb-4 space-x-2">
        <button
          className={`cursor-pointer px-4 py-2 rounded ${
            tab === "universities" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("universities")}
        >
          Quản lý Trường
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded ${
            tab === "faculties" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("faculties")}
        >
          Quản lý Khoa
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded ${
            tab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("users")}
        >
          Quản lý User
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded ${
            tab === "topics" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("topics")}
        >
          Quản lý Topic
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded ${
            tab === "approved" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("approved")}
        >
          Quản lý Approved
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded ${
            tab === "feedback" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("feedback")}
        >
          Quản lý Góp ý
        </button>
      </div>
      {tab === "universities" && <UniversityManagement />}
      {tab === "faculties" && <FacultyManagement />}
      {tab === "users" && <UserManagement />}
      {tab === "topics" && <TopicManagement />}
      {tab === "approved" && <ApprovedTopicManagement />}
      {tab === "feedback" && <FeedbackManagement />}
    </div>
  );
}
