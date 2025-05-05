import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";

import { backgroundMain } from "../../assets/images/index";
import { setUserToken } from "../../redux/authSlice";
import { setAdminToken } from "../../redux/adminSlice";
import AuthApi from "../../network/AuthApi";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm kiểm tra định dạng email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra email có phải admin hay không
  const isAdminEmail = (email) => {
    return email.toLowerCase() === "admin1@gmail.com"; // Khớp với yêu cầu
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!isValidEmail(username)) {
      setError("Vui lòng nhập email hợp lệ (ví dụ: example@domain.com)");
      setIsLoading(false);
      return;
    }

    try {
      let response;
      const isAdmin = isAdminEmail(username);
      console.log("Is Admin:", isAdmin);

      if (isAdmin) {
        response = await AuthApi.loginAdmin({ email: username, password });
      } else {
        response = await AuthApi.loginUser({ email: username, password });
      }

      console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        const accessToken = response.data.token; // API trả về 'token'
        // const user = { name: response.data.name || "Unknown" };
        // const user = response.data.user || response.data.admin; // Lấy thông tin người dùng từ response

        if (!accessToken) {
          throw new Error("Token không tồn tại trong response");
        }

        if (isAdmin) {
          const user = { name: response.data.name || "Unknown" };
          dispatch(setAdminToken({ adminToken: accessToken, admin: user }));
          localStorage.setItem("adminToken", accessToken);
          localStorage.setItem("adminUser", JSON.stringify(user));
          navigate("/admin");
        } else {
          const user = response.data.user;
          dispatch(setUserToken({ token: accessToken, user }));
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        }

        console.log("Token:", accessToken);
        // console.log("User:", user);
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(
        error.response?.data?.message ||
          "Tên đăng nhập hoặc mật khẩu không đúng."
      );
    } finally {
      setIsLoading(false);
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
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
