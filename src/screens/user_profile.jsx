import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  IoMail,
  IoPhonePortrait,
  IoLocationSharp,
  IoCalendar,
  IoPerson,
  IoReader,
} from "react-icons/io5";
import AuthApi from "../network/AuthApi";

function UserProfileScreen() {
  const { user } = useSelector((state) => state.auth); // Lấy thông tin user từ Redux store
  const [userData, setUserData] = useState({});

  // Dữ liệu tĩnh để ánh xạ thông tin người dùng với giao diện
  const userFields = [
    { label: "Họ và tên", key: "name", icon: <IoPerson /> },
    { label: "Email", key: "email", icon: <IoMail /> },
    { label: "Số điện thoại", key: "phone", icon: <IoPhonePortrait /> },
    { label: "Địa chỉ", key: "address", icon: <IoLocationSharp /> },
    { label: "Ngày sinh", key: "age", icon: <IoCalendar /> },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.id) {
        try {
          console.log("Thông tin user từ Redux store:", user);
          const response = await AuthApi.userInformation();
          const detailedUsers = response.data.result;
          console.log(
            "Danh sách thông tin từ AuthApi.userInformation:",
            detailedUsers
          );

          const matchedUser = detailedUsers.find(
            (detailedUser) => detailedUser.id === user.id
          );
          console.log("Thông tin người dùng khớp với user.id:", matchedUser);

          if (matchedUser) {
            setUserData(matchedUser);
          } else {
            console.log("Không tìm thấy người dùng khớp với user.id");
            setUserData(user);
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin chi tiết người dùng:", error);
          setUserData(user);
        }
      } else {
        console.log("Không có user hoặc user.id trong Redux store");
        setUserData(user || {});
      }
    };

    fetchUserDetails();
  }, [user]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg pt-10">
      <h2 className="text-2xl font-semibold text-center mb-6  pb-3">
        Thông tin tài khoản
      </h2>
      <div className="flex justify-center">
        <div className="space-y-4">
          <img
            src={userData.avatar || "https://i.pravatar.cc/100"}
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
                {userData[field.key] || "Chưa cập nhật"}
              </span>
            </div>
          ))}
          <div className="flex flex-col space-x-3 pb-3 pt-4">
            <span className="text-gray-700 mb-4 flex items-center text-2xl">
              <IoReader className=" text-gray-600 mr-3" /> Mô tả
            </span>
            <p className=" max-w-2xl p-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-700 text-xl">
              {userData.description ||
                "Người dùng là cá nhân đã đăng ký và sử dụng hệ thống để gửi và quản lý ý tưởng sáng tạo. Mỗi người dùng đều có thông tin liên hệ (email), có thể tham gia vào các đề tài cùng với các thành viên khác, được gán vai trò cụ thể (sinh viên, giảng viên, quản trị viên), và có khả năng tạo mới, chỉnh sửa hoặc theo dõi tiến độ của các đề tài đã tham gia. Ngoài ra, người dùng còn được gắn với một trường đại học và chuyên ngành cụ thể để dễ dàng phân loại và quản lý trong hệ thống."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileScreen;
