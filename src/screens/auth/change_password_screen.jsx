import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoEye,
  IoEyeOff,
  IoKey,
  IoLockClosed,
  IoArrowBackSharp,
} from "react-icons/io5";
import { toast } from "react-toastify";
import { backgroundMain } from "../../assets/images";
import AuthApi from "../../network/AuthApi";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Xóa lỗi khi nhập
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Kiểm tra phía client
    if (formData.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!", {
        position: "top-center",
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      toast.error("Mật khẩu xác nhận không khớp!", {
        position: "top-center",
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    // Chuẩn bị payload theo định dạng API
    const payload = {
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
      new_password_confirmation: formData.confirmPassword,
    };

    try {
      const response = await AuthApi.changeUserPassword(payload);

      if (response?.status === "success" || response?.data?.success) {
        toast.success("Đổi mật khẩu thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/"); // Chuyển hướng về trang chủ
        }, 2000);
      } else {
        // Phản hồi không thành công từ API
        const errorMessage =
          response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại!";
        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
        setLoading(false);
      }
    } catch (err) {
      // Xử lý lỗi API
      const errorMessage =
        err.response?.data?.message === "INVALID_CURRENT_PASSWORD"
          ? "Mật khẩu hiện tại không đúng!"
          : err.response?.data?.message ||
            "Đổi mật khẩu thất bại. Vui lòng thử lại!";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
      setLoading(false);
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
      <div className="w-full max-w-2xl mx-4 p-8 bg-white shadow-xl rounded-xl border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
        <button onClick={() => navigate("/")} className="mb-4 cursor-pointer">
          <IoArrowBackSharp size={30} />
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đổi Mật Khẩu
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-6 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 min-w-[400px]">
          {/* Mật khẩu hiện tại */}
          <div className="relative group">
            <IoKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-500 transition-colors" />
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="Mật khẩu hiện tại"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => togglePassword("current")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
              disabled={loading}
            >
              {showPassword.current ? (
                <IoEyeOff size={20} />
              ) : (
                <IoEye size={20} />
              )}
            </button>
          </div>

          {/* Mật khẩu mới */}
          <div className="relative group">
            <IoLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-500 transition-colors" />
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="Mật khẩu mới"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => togglePassword("new")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
              disabled={loading}
            >
              {showPassword.new ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="relative group">
            <IoLockClosed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-500 transition-colors" />
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              placeholder="Xác nhận mật khẩu mới"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
              disabled={loading}
            >
              {showPassword.confirm ? (
                <IoEyeOff size={20} />
              ) : (
                <IoEye size={20} />
              )}
            </button>
          </div>

          {/* Nút Đổi Mật Khẩu */}
          <button
            type="submit"
            className={`cursor-pointer w-full p-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              "Đổi Mật Khẩu"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordScreen;
