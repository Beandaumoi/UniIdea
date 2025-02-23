import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

import { backgroundMain } from "../assets/images";

function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Kiểm tra định dạng email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Kiểm tra email hợp lệ
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      return;
    } else {
      setEmailError("");
    }

    // Kiểm tra mật khẩu và nhập lại mật khẩu
    if (password !== confirmPassword) {
      setPasswordError("Mật khẩu không trùng khớp");
      return;
    } else {
      setPasswordError("");
    }

    console.log("Họ tên:", fullName, "Email:", email, "Mật khẩu:", password);
    navigate("/login"); // Chuyển về trang đăng nhập sau khi đăng ký
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="mb-4 cursor-pointer"
        >
          <IoArrowBackSharp size={30} />
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng ký tài khoản
        </h2>
        <form onSubmit={handleRegister}>
          {/* Họ và tên */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nhập lại mật khẩu
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Nút Đăng ký */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>
        </form>

        {/* Chuyển sang trang đăng nhập */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
