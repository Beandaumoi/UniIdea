import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoMail,
  IoPhonePortrait,
  IoPencil,
  IoLocationSharp,
  IoCalendar,
  IoPerson,
  IoReader,
  IoCheckmark,
} from "react-icons/io5";

function UserProfileScreen() {
  const users = [
    { label: "Họ và tên", name: "Trần Thị A", icon: <IoPerson /> },
    { label: "Email", name: "tranthia@gmail.com", icon: <IoMail /> },
    { label: "Số điện thoại", name: "0123456789", icon: <IoPhonePortrait /> },
    { label: "Địa chỉ", name: "Minh Khai, Hà Nội", icon: <IoLocationSharp /> },
    { label: "Ngày sinh", name: "01/01/1999", icon: <IoCalendar /> },
  ];

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    if (Object.keys(storedUser).length === 0) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto my-30 p-6 bg-white shadow-lg rounded-lg border pt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 border-b pb-3">
        Thông tin tài khoản
      </h2>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.avatar || "https://i.pravatar.cc/100"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border shadow-md object-cover"
        />
      </div>

      <div className="space-y-4 px-6 mt-10">
        {users.map((user, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 border-b pb-3 pt-4 ${
              isEditing ? "cursor-text" : "cursor-not-allowed"
            }`}
          >
            {user.icon} {/* Hiển thị icon tương ứng */}
            {isEditing ? (
              <input
                type="text"
                name={user.name}
                value={formData[user.name] || ""}
                onChange={handleChange}
                className=" rounded p-1 w-full focus:outline-none"
              />
            ) : (
              <span className="text-gray-700">
                {formData[user.name] || "Chưa cập nhật"}
              </span>
            )}
          </div>
        ))}
        <div className="flex flex-col  space-x-3 pb-3 pt-4">
          <span className="text-gray-700 mb-4 flex items-center">
            <IoReader className="text-xl text-gray-600 mr-3" /> Mô tả
          </span>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className={`w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${
                  isEditing ? "cursor-text" : "cursor-not-allowed bg-gray-100"
                }`}
            rows="5"
            placeholder="Nhập nội dung"
            disabled={!isEditing}
          ></textarea>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            <IoCheckmark />
            <span>Lưu thay đổi</span>
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <IoPencil />
            <span>Chỉnh sửa thông tin</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfileScreen;
