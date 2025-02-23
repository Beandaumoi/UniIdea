import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

import { backgroundMain } from "../assets/images";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
    if (username === "admin" && password === "12345") {
      // Lưu trạng thái đăng nhập vào localStorage
      const userData = { username, avatar: "https://i.pravatar.cc/40" };
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
      window.location.reload(); // Cập nhật Navbar ngay lập tức
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
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
            navigate("/");
          }}
          className="mb-4 cursor-pointer"
        >
          <IoArrowBackSharp size={30} />
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
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
          <p
            onClick={() => navigate("/forgot-password")}
            className="mb-4 text-sm text-blue-600 hover:underline cursor-pointer"
          >
            Quên mật khẩu?
          </p>

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="mt-2 text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Đăng ký ngay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
