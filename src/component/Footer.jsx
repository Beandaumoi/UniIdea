import { IoLogoFacebook, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import { useLocation } from "react-router-dom";

import { logo_uneti } from "../assets/images/index";

function Footer() {
  const location = useLocation();
  const isHomeScreen = location.pathname === "/";
  return (
    <footer
      className={`relative bottom-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-blue-900 text-white ${
        isHomeScreen ? "pt-50" : "pt-12"
      }  `}
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1 - Thông tin IdeaScale */}
        <div>
          <h2 className="text-2xl font-bold">UniIdea</h2>
          <p className="mt-4 text-gray-300 text-justify">
            UniIdea là một giải pháp quản lý đổi mới nhằm truyền cảm hứng cho
            mọi người thực hiện hành động theo ý tưởng của họ. Ý tưởng của cộng
            đồng có thể thay đổi cuộc sống, doanh nghiệp của bạn và thế giới.
            Kết nối với những ý tưởng quan trọng và bắt đầu cùng tạo ra tương
            lai.
          </p>
        </div>

        {/* Cột 2 - Về */}
        <div>
          <h3 className="text-lg font-semibold">Về</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>Về chúng tôi</li>
            <li>Giá trị IdeaScale</li>
            <li>Đối tác</li>
          </ul>
        </div>

        {/* Cột 3 - Công dụng & Hợp pháp */}
        <div>
          <h3 className="text-lg font-semibold">Hợp pháp</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>Bảo mật & Tuân thủ</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách cookie</li>
          </ul>
        </div>

        {/* Cột 4 - Liên hệ & Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold">Liên hệ</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li className="hover:text-blue-300">
              <a href="https://www.facebook.com/daoducmanh.1410">
                Đào Đức Mạnh - DHTI15A11HN
              </a>
            </li>
            <li className="hover:text-blue-300">
              <a href="https://www.facebook.com/hoangsylinh12/">
                Hoàng Sỹ Linh - DHTI15A11HN
              </a>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">Theo chúng tôi</h3>
          <div className="flex space-x-4 mt-4 items-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/Daihoc.uneti"
              className="cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out bg-blue-500 p-2 rounded-lg"
            >
              <IoLogoFacebook size={20} />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://uneti.edu.vn/"
              className="cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out bg-blue-500 p-2 rounded-lg"
            >
              <img
                src={logo_uneti}
                alt="uneti"
                className="h-5 mx-auto bg-white rounded-lg"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tiktok.com/@uneti1956"
              className="cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out bg-blue-500 p-2 rounded-lg"
            >
              <IoLogoTiktok size={20} />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/@UNETI_DKK"
              className="cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out bg-blue-500 p-2 rounded-lg"
            >
              <IoLogoYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-blue-800 bg-white py-2 font-semibold">
        Bản quyền © 2025 UniIdea
      </div>
    </footer>
  );
}

export default Footer;
