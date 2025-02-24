import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-scroll";
import {
  IoHome,
  IoPersonCircleSharp,
  IoLockClosed,
  IoLogOut,
} from "react-icons/io5";

function Navbar() {
  const categories = [
    "Công nghệ thông tin",
    "Kỹ thuật ô tô",
    "Khoa học máy tính",
    "Dệt may",
    "Cơ khí chế tạo",
    "Công nghệ sinh học",
  ];

  const navigate = useNavigate();
  const [showLibraryDropdown, setShowLibraryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("");
  let libraryTimeoutId = null;
  let userTimeoutId = null;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setAvatar(user.avatar);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleCategoryClick = (category) => {
    navigate(`/list-idea?category=${encodeURIComponent(category)}`);
    window.scrollTo(0, 0);
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
          className=" cursor-pointer ml-48 text-5xl font-bold text-black"
        >
          Uni<span className="text-blue-600">I</span>
          <span className="text-blue-600 text-2xl">dea</span>
        </button>

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li className="cursor-pointer hover:text-blue-600">
            <Link to="about" smooth={true} duration={100}>
              Giới thiệu
            </Link>
          </li>
          <li className=" hover:text-blue-600">
            {isLoggedIn ? (
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate("/idea-register");
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
                <div className="grid grid-cols-2 gap-4 z-30">
                  {/* Cột 1 */}
                  <div>
                    <span className="block px-4 py-2 text-gray-700 font-semibold">
                      Danh mục
                    </span>
                    <a
                      onClick={() => handleCategoryClick("Tất cả")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Tất cả
                    </a>
                  </div>

                  {/* Cột 2 - Thêm nhiều mục hơn */}
                  <div>
                    <span className="block px-4 py-2 text-gray-700 font-semibold">
                      Chuyên ngành
                    </span>
                    {categories.map((category) => (
                      <a
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {category}
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

        {/* Kiểm tra trạng thái đăng nhập */}
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
                src={avatar || "https://i.pravatar.cc/40"}
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
            // Nút đăng nhập nếu chưa đăng nhập
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
