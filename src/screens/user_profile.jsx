import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  IoMail,
  IoPhonePortrait,
  IoLocationSharp,
  IoCalendar,
  IoPerson,
  IoReader,
} from "react-icons/io5";
import { clearUserToken } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import AuthApi from "../network/AuthApi";
import { updateUser } from "../redux/authSlice";
import { none_user } from "../assets/images";

// Xác định base URL
const BASE_URL = "http://127.0.0.1:8000";

function UserProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userToken = useSelector((state) => state.auth.accessToken);
  console.log("userToken: ", userToken);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    date_of_birth: user?.date_of_birth || "",
    description: user?.description || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? `${BASE_URL}/${user.avatar}` : none_user
  );
  console.log("avatarPreview: ", avatarPreview);

  const userFields = [
    { label: "Họ và tên", key: "name", icon: <IoPerson /> },
    { label: "Email", key: "email", icon: <IoMail /> },
    { label: "Số điện thoại", key: "phone", icon: <IoPhonePortrait /> },
    { label: "Địa chỉ", key: "address", icon: <IoLocationSharp /> },
    { label: "Ngày sinh", key: "date_of_birth", icon: <IoCalendar /> },
  ];

  console.log("Dữ liệu user từ Redux:", user);

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("_method", "PUT");
    if (avatarFile) {
      data.append("avatar", avatarFile);
    }

    try {
      const response = await AuthApi.changeProfile(data);
      if (response.status === 200 || response.status === 201) {
        const updatedUser = {
          ...user,
          name: formData.name,
          phone: formData.phone,
          avatar: avatarFile ? avatarPreview : user.avatar,
        };
        dispatch(updateUser(updatedUser));
        alert("Cập nhật hồ sơ thành công!");
        setIsEditing(false);

        dispatch(clearUserToken());
        localStorage.removeItem("accessToken Xue");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        alert("Cập nhật hồ sơ thất bại!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Đã xảy ra lỗi khi cập nhật hồ sơ. Vui lòng thử lại.");
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center">Không tìm thấy thông tin người dùng</div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg pt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 pb-3">
        Thông tin tài khoản
      </h2>
      <div className="flex justify-center">
        <div className="space-y-4">
          <img
            src={avatarPreview}
            alt="Avatar"
            className="w-60 h-60 rounded-full border shadow-md object-cover"
          />
        </div>

        <div className="space-y-4 pl-20">
          {userFields.map((field) => (
            <div
              key={field.key}
              className="flex items-center space-x-3 pb-3 pt-4"
            >
              <span className="text-gray-700 text-2xl flex items-center">
                {field.icon}:{" "}
              </span>
              <span className="text-gray-700 text-2xl">
                {field.key === "date_of_birth"
                  ? formatDate(user?.[field.key])
                  : user?.[field.key] || "Chưa cập nhật"}
              </span>
            </div>
          ))}

          <div className="flex flex-col space-x-3 pb-3 pt-4">
            <span className="text-gray-700 mb-4 flex items-center text-2xl">
              <IoReader className="text-gray-600 mr-3" /> Mô tả
            </span>
            <p className="max-w-2xl p-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-xl">
              {user?.description ||
                "Người dùng là cá nhân đã đăng ký và sử dụng hệ thống để gửi và quản lý ý tưởng sáng tạo..."}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {userFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-gray-700">{field.label}</label>
                  <input
                    type={field.key === "date_of_birth" ? "date" : "text"}
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleInputChange}
                    placeholder={
                      field.key === "date_of_birth"
                        ? user?.[field.key]
                          ? new Date(user[field.key])
                              .toISOString()
                              .split("T")[0]
                          : "Chưa cập nhật"
                        : user?.[field.key] || "Chưa cập nhật"
                    }
                    disabled={field.key !== "name" && field.key !== "phone"}
                    className={`w-full p-2 border rounded-lg ${
                      field.key !== "name" && field.key !== "phone"
                        ? "bg-gray-100 cursor-not-allowed"
                        : "placeholder-gray-400"
                    }`}
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={user?.description || "Chưa cập nhật"}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Ảnh đại diện</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfileScreen;
