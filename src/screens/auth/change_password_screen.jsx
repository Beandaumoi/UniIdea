import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoEye,
  IoEyeOff,
  IoKey,
  IoLockClosed,
  IoArrowBackSharp,
} from "react-icons/io5";

import { backgroundMain } from "../../assets/images";

function ChangePasswordScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const storedPassword = localStorage.getItem("password") || "123456"; // Giả lập mật khẩu cũ

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Reset lỗi khi nhập
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.currentPassword !== storedPassword) {
      setError("Mật khẩu hiện tại không đúng!");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundMain})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="mb-4 cursor-pointer"
        >
          <IoArrowBackSharp size={30} />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Đổi Mật Khẩu
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 min-w-2xl">
          {/* Mật khẩu hiện tại */}
          <div className=" relative items-center">
            <IoKey className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mật khẩu hiện tại"
            />
            <button
              type="button"
              onClick={() => togglePassword("current")}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword.current ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {/* Mật khẩu mới */}
          <div className="relative">
            <IoLockClosed className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => togglePassword("new")}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword.new ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="relative">
            <IoLockClosed className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Xác nhận mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword.confirm ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {/* Nút Đổi Mật Khẩu */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Đổi Mật Khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordScreen;
