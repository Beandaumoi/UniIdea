import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { backgroundMain } from "../../assets/images";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra email hợp lệ
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ!");
      return;
    }

    // Giả lập gửi email đặt lại mật khẩu
    console.log("Email gửi yêu cầu:", email);
    setSuccess(true);
    setError("");
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Quên Mật Khẩu
        </h2>

        {success ? (
          <div className="text-center">
            <p className="text-green-600">
              📩 Liên kết đặt lại mật khẩu đã được gửi!
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Quay lại đăng nhập
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nhập Email của bạn
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Gửi yêu cầu
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Nhớ mật khẩu?{" "}
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

export default ForgotPasswordScreen;
