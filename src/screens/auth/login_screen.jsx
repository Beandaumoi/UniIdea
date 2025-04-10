import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";

import { backgroundMain } from "../../assets/images/index";
import { setToken } from "../../redux/authSlice"; // Đảm bảo đường dẫn đúng
import AuthApi from "../../network/AuthApi";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm kiểm tra định dạng email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang khi submit form
    setError(""); // Reset lỗi trước khi gọi API

    // Kiểm tra định dạng email
    if (!isValidEmail(username)) {
      setError("Vui lòng nhập email hợp lệ (ví dụ: example@domain.com)");
      return;
    }

    try {
      const response = await AuthApi.login({ username, password });

      if (response.status === 200) {
        const accessToken = response.data.access_token || response.data.token;
        const user = response.data.user || {};

        if (!accessToken) {
          throw new Error("Token không tồn tại trong response");
        }

        dispatch(setToken({ token: accessToken, user }));

        // Lưu token vào localStorage để duy trì đăng nhập
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Token:", accessToken);
        console.log("User:", user);

        navigate("/");
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
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
        <button onClick={() => navigate("/")} className="mb-4 cursor-pointer">
          <IoArrowBackSharp size={30} />
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>
        <form onSubmit={handleLogin}>
          {/* Hiển thị thông báo lỗi nếu có */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Tên đăng nhập */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
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
