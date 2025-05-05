import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-scroll";
import {
  IoHome,
  IoPersonCircleSharp,
  IoLockClosed,
  IoLogOut,
  IoSettingsSharp,
} from "react-icons/io5";
import { clearUserToken } from "../redux/authSlice";
import { none_user } from "../assets/images";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state) => state.auth);
  const [showLibraryDropdown, setShowLibraryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [years] = useState([2025]); // Dữ liệu cứng chỉ chứa 2025
  let libraryTimeoutId = null;
  let userTimeoutId = null;
  const BASE_URL = "http://127.0.0.1:8000";
  const isLoggedIn = !!accessToken;
  const avatar = user?.avatar ? `${BASE_URL}/${user.avatar}` : none_user;

  const awards = [
    { id: "first", name: "Giải Nhất" },
    { id: "second", name: "Giải Nhì" },
    { id: "third", name: "Giải Ba" },
  ];

  const handleFilterClick = (filterType, value) => {
    const params = new URLSearchParams();
    if (filterType === "all") {
      params.set("year", "Tất cả");
      params.set("award", "all");
    } else if (filterType === "year") {
      params.set("year", value);
    } else if (filterType === "award") {
      params.set("award", value);
      // params.set("award", value === "none" ? "none" : value);
    }
    navigate(`/list-idea?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    dispatch(clearUserToken());
    localStorage.removeItem("accessToken Xue");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 shadow-md bg-white z-20">
        {/* Logo */}
        <button
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
          className="cursor-pointer ml-48 text-5xl font-bold text-black"
        >
          Uni<span className="text-blue-600">I</span>
          <span className="text-blue-600 text-2xl">dea</span>
        </button>

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/")}
          >
            <Link to="about" smooth={true} duration={100}>
              Giới thiệu
            </Link>
          </li>
          <li className="hover:text-blue-600">
            {isLoggedIn ? (
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/regulation");
                  window.scrollTo(0, 0);
                }}
              >
                Đăng ký ý tưởng
              </button>
            ) : (
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  window.scrollTo(0, 0);
                }}
              >
                Đăng ký ý tưởng
              </button>
            )}
          </li>

          {/* Dropdown Thư viện */}
          <li
            className="relative cursor-pointer hover:text-blue-600"
            onMouseEnter={() => {
              clearTimeout(libraryTimeoutId);
              setShowLibraryDropdown(true);
            }}
            onMouseLeave={() => {
              libraryTimeoutId = setTimeout(() => {
                setShowLibraryDropdown(false);
              }, 300);
            }}
          >
            Thư viện
            {showLibraryDropdown && (
              <div className="absolute -left-10 top-full mt-6 w-150 bg-white shadow-lg border rounded-lg p-2">
                <div className="grid grid-cols-3 gap-4 z-30">
                  <div>
                    <span className="block px-4 py-2 text-gray-700 font-semibold">
                      Danh mục
                    </span>
                    <a
                      onClick={() => handleFilterClick("all", "Tất cả")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Tất cả
                    </a>
                  </div>
                  <div>
                    <span className="block px-4 py-2 text-gray-700 font-semibold">
                      Năm
                    </span>
                    {years.length > 0 ? (
                      years.map((year) => (
                        <a
                          key={year}
                          onClick={() => handleFilterClick("year", year)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {year}
                        </a>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-400">
                        Không có dữ liệu
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="block px-4 py-2 text-gray-700 font-semibold mt-2">
                      Giải thưởng
                    </span>
                    {awards.map((award) => (
                      <a
                        key={award.id ?? "none"}
                        onClick={() => handleFilterClick("award", award.id)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {award.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>

          <li className="cursor-pointer hover:text-blue-600">
            <Link to="contact" smooth={true} duration={100}>
              Liên hệ
            </Link>
          </li>
        </ul>

        {/* User Section */}
        <div className="mr-48 flex items-center space-x-4">
          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(userTimeoutId);
                setShowUserDropdown(true);
              }}
              onMouseLeave={() => {
                userTimeoutId = setTimeout(() => {
                  setShowUserDropdown(false);
                }, 300);
              }}
            >
              <img
                src={avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />

              {/* Dropdown User */}
              {showUserDropdown && (
                <div className="absolute -left-10 mt-2 w-58 bg-white shadow-lg border rounded-lg py-2 z-10">
                  <a
                    href="#"
                    onClick={() => navigate("/")}
                    className="flex items-center justify-start w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <IoHome className="mr-4" />
                    Trang chủ
                  </a>
                  <a
                    href="#"
                    onClick={() => navigate("/user-profile")}
                    className="flex items-center justify-start w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <IoPersonCircleSharp className="mr-4" />
                    Thông tin tài khoản
                  </a>
                  <a
                    href="#"
                    onClick={() => navigate("/change-password")}
                    className="flex items-center justify-start w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <IoLockClosed className="mr-4" />
                    Đổi mật khẩu
                  </a>
                  {user?.role === "admin" && (
                    <a
                      href="#"
                      onClick={() => navigate("/admin")}
                      className="flex items-center justify-start w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <IoSettingsSharp className="mr-4" />
                      Quản trị
                    </a>
                  )}
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="flex items-center justify-start w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    <IoLogOut className="mr-4" />
                    Đăng xuất
                  </a>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer hover:bg-blue-700"
            >
              <FaUserCircle className="text-lg" />
              <span>Đăng nhập</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
