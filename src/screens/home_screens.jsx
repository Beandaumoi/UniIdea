import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  backgroundMain,
  discuss,
  bg_contact,
  newspaper_image,
} from "../assets/images";
import {
  IoFlameSharp,
  IoLockClosed,
  IoGitBranchOutline,
  IoPaperPlaneSharp,
  IoCheckmarkDoneSharp,
  IoNotifications,
  IoChevronBack,
  IoChevronForward,
  IoArrowRedoCircleOutline,
} from "react-icons/io5";
import { ChatWidget, ScrollToTop, SearchBar } from "../component";
import AuthApi from "../network/AuthApi";

function HomeScreens() {
  const agencies = [
    {
      name: "UNETI",
      logo: "/src/assets/images/logo_uneti.png",
      bg: "bg-blue-100",
    },
    {
      name: "HUST",
      logo: "/src/assets/images/logo_hust.png",
      bg: "bg-blue-200",
    },
    {
      name: "HaUi",
      logo: "/src/assets/images/logo_HaUi.png",
      bg: "bg-red-100",
    },
    {
      name: "TLU",
      logo: "/src/assets/images/logo_tlu.png",
      bg: "bg-yellow-100",
    },
    { name: "TMU", logo: "/src/assets/images/logo_tmu.png", bg: "bg-blue-200" },
    {
      name: "NEU",
      logo: "/src/assets/images/logo_neu.png",
      bg: "bg-green-100",
    },
    { name: "BA", logo: "/src/assets/images/logo_ba.png", bg: "bg-blue-100" },
    { name: "FPT", logo: "/src/assets/images/logo_fpt.png", bg: "bg-teal-100" },
  ];

  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  // Chuyển sang phần tử tiếp theo
  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 < ideas.length - itemsPerPage + 1 ? prevIndex + 1 : 0
    );
  };

  // Quay lại phần tử trước đó
  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 1 >= 0
        ? prevIndex - 1
        : Math.max(0, ideas.length - itemsPerPage)
    );
  };

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await AuthApi.topics();
        console.log("Dữ liệu từ AuthApi.topics:", response.data.result);
        const fetchedIdeas = response.data.result || response.data || [];

        const mappedIdeas = fetchedIdeas.map((idea, index) => ({
          name: idea.name || "Ý tưởng không tên",
          description: idea.description || "Chưa có mô tả",
          image: idea.image || newspaper_image,
          rating: idea.rating || 4.5,
          university:
            idea.university?.name || idea.university || "Chưa xác định",
          border: `border-${
            ["green", "blue", "yellow", "red", "purple", "pink"][index % 6]
          }-400`,
          bg: `bg-${
            ["green", "blue", "yellow", "red", "purple", "pink"][index % 6]
          }-100`,
          text: "text-black",
        }));

        setIdeas(mappedIdeas);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
        setIdeas([]);
      }
    };

    fetchTopics();
  }, []); // Chỉ gọi API một lần khi component mount

  // Tự động chuyển slide
  useEffect(() => {
    if (ideas.length > itemsPerPage) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [ideas, startIndex]);

  return (
    <div className="bg-gray-200">
      <div
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundMain})` }}
      >
        <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white h-full">
          <h1 className="text-4xl font-bold">
            Danh sách{" "}
            <span className="text-blue-600">các ý tưởng khởi nghiệp</span>
          </h1>
          <p className="mt-2 text-lg">
            Tra cứu ngay để xem các ý tưởng nổi bật
          </p>
          <SearchBar />
        </div>
      </div>

      <div className="flex marquee-text justify-center mb-5 bg-blue-50">
        <div className="mx-0 flex py-10 pr-3.5 pl-6 justify-center items-center">
          <IoNotifications
            className="mr-5 animate-ping"
            size={50}
            color="#ff7b00"
          />
          <h1 className="text-blue-800 text-4xl font-bold rainbow-text uppercase">
            Dám nghĩ, dám làm, dám sáng tạo – Đừng để mơ ước chỉ là ảo
          </h1>
        </div>
      </div>

      <div className="px-40 pb-8">
        <h2 className="py-7 text-5xl font-bold flex justify-center text-blue-600">
          Tại sao các tổ chức nên chọn chúng tôi
        </h2>
        <div className="my-10 flex justify-center"></div>
        <div className="flex justify-around items-center">
          <div className="w-1/2">
            <ul className="mt-4 space-y-4">
              <div className="flex">
                <IoFlameSharp className="mr-5" size={50} color="#ff5722" />
                <li className="flex-col max-w-md leading-relaxed text-justify">
                  <strong>Thúc đẩy đổi mới mạnh mẽ:</strong> Chúng tôi cung cấp
                  một nền tảng quản lý ý tưởng sáng tạo và khởi nghiệp giúp các
                  tổ chức dễ dàng thu thập, sàng lọc, phát triển và triển khai ý
                  tưởng từ nhân viên, đối tác và cộng đồng.
                </li>
              </div>
              <div className="flex">
                <IoLockClosed className="mr-5" size={50} color="#FFD700" />
                <li className="flex-col max-w-md leading-relaxed text-justify">
                  <strong>Bảo mật và tin cậy:</strong> Hệ thống của chúng tôi
                  được thiết kế với bảo mật cao, đảm bảo dữ liệu và ý tưởng của
                  tổ chức luôn được bảo vệ, phù hợp với các tiêu chuẩn bảo mật
                  hàng đầu.
                </li>
              </div>
              <div className="flex">
                <IoGitBranchOutline
                  className="mr-5"
                  size={50}
                  color="#9C27B0"
                />
                <li className="flex-col max-w-md leading-relaxed text-justify">
                  <strong>Kết nối và hợp tác:</strong> Chúng tôi giúp các tổ
                  chức xây dựng một hệ sinh thái sáng tạo, nơi nhân viên và đối
                  tác có thể chia sẻ, phản hồi và cùng nhau phát triển các ý
                  tưởng mới.
                </li>
              </div>
              <div className="flex">
                <IoPaperPlaneSharp className="mr-5" size={50} color="#FF9800" />
                <li className="flex-col max-w-md leading-relaxed text-justify">
                  <strong>Hiện thực hóa ý tưởng nhanh chóng:</strong> Không chỉ
                  dừng lại ở việc thu thập ý tưởng, hệ thống của chúng tôi còn
                  giúp theo dõi, đánh giá và triển khai ý tưởng để mang lại giá
                  trị thực tế cho doanh nghiệp.
                </li>
              </div>
              <div className="flex">
                <IoCheckmarkDoneSharp
                  className="mr-5"
                  size={50}
                  color="#155dfc"
                />
                <li className="flex-col max-w-md leading-relaxed text-justify">
                  <strong>Linh hoạt và dễ dàng tích hợp:</strong> Chúng tôi cung
                  cấp giải pháp tùy chỉnh theo nhu cầu của từng tổ chức, dễ dàng
                  tích hợp với các hệ thống hiện có để tối ưu hóa quá trình quản
                  lý sáng tạo.
                </li>
              </div>
            </ul>
          </div>
          <div className="w-1/2 flex justify-end ml-10">
            <img src={discuss} className="h-[45vh] rounded-lg shadow-md" />
          </div>
        </div>
      </div>

      <div className="bg-white text-center py-12 px-40">
        <h2 className="text-5xl font-bold text-blue-600 pb-7">
          Được tin cậy bởi các trường uy tín hàng đầu
        </h2>
        <p className="text-gray-600 mt-5 font-bold text-xl">
          Khám phá sức mạnh của sự tích hợp để nâng cao quản lý ý tưởng và cộng
          tác nhóm
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {agencies.map((agency, index) => (
            <div key={index}>
              <img
                src={agency.logo}
                alt={agency.name}
                className="h-20 mx-auto mt-10"
              />
            </div>
          ))}
        </div>
      </div>

      <div id="about" className="px-40 py-30">
        <h2 className="text-5xl font-bold text-blue-600 pb-20 text-center">
          Tôi muốn biết thêm về{" "}
          <label className="text-5xl font-bold text-black mb-4">
            Uni<span className="text-blue-600">I</span>
            <span className="text-blue-600 text-2xl">dea</span>
          </label>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="mr-10">
            <h3 className="text-xl font-bold mb-4">UniIdea là gì?</h3>
            <p className="text-gray-700 mb-4 text-justify">
              Là một nền tảng sáng tạo và kết nối tri thức dành cho sinh viên,
              giảng viên và các nhà nghiên cứu trong các trường đại học. Với sứ
              mệnh thúc đẩy đổi mới sáng tạo, khởi nghiệp và hợp tác nghiên cứu,
              UniIdea tạo ra môi trường thuận lợi để các ý tưởng tiềm năng được
              phát triển, thử nghiệm và chuyển hóa thành các giải pháp thực
              tiễn.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold">Mục tiêu</h4>
                <p className="text-gray-600 text-sm text-justify">
                  UniIdea đặt mục tiêu kết nối sinh viên, giảng viên, nhà nghiên
                  cứu và doanh nghiệp, hỗ trợ đổi mới sáng tạo, thúc đẩy khởi
                  nghiệp và tăng cường hợp tác nghiên cứu quốc tế.
                </p>
              </div>
              <div>
                <h4 className="font-bold">Nổi bật</h4>
                <p className="text-gray-600 text-sm text-justify">
                  UniversityIdea nổi bật với không gian sáng tạo mở, mạng lưới
                  cố vấn giàu kinh nghiệm, hỗ trợ khởi nghiệp toàn diện từ ý
                  tưởng đến thương mại hóa. Nền tảng thường xuyên tổ chức các
                  cuộc thi, sự kiện và hợp tác với doanh nghiệp, giúp sinh viên
                  giải quyết vấn đề thực tiễn.
                </p>
              </div>
              <div>
                <h4 className="font-bold">Ai có thể tham gia?</h4>
                <div className="text-gray-600 text-sm">
                  <ul className="text-justify">
                    <li className="mt-0.2">
                      <strong>Sinh viên:</strong> Mong muốn phát triển ý tưởng,
                      kỹ năng và trải nghiệm thực tiễn.
                    </li>
                    <li className="mt-0.2">
                      <strong>Giảng viên, nhà nghiên cứu:</strong> Tìm kiếm cơ
                      hội hợp tác và chuyển giao công nghệ.
                    </li>
                    <li className="mt-0.2">
                      <strong>Doanh nghiệp, nhà đầu tư:</strong> Khám phá giải
                      pháp mới và kết nối với tài năng trẻ.
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-bold">Tại sao nên chọn UniIdea?</h4>
                <p className="text-gray-600 text-sm text-justify">
                  UniIdea không chỉ là nơi ươm mầm ý tưởng mà còn là bệ phóng
                  cho những giấc mơ trở thành hiện thực. Cùng chúng tôi xây dựng
                  cộng đồng sáng tạo, nơi mọi ý tưởng đều có cơ hội tỏa sáng!
                </p>
              </div>
            </div>
          </div>
          <div className="ml-10">
            <iframe
              className="w-full h-60 md:h-80 rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Thinking School Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-6xl mx-auto pt-12 pb-40 px-4 relative">
          <h2 className="text-5xl font-bold text-blue-600 pb-7 text-center">
            Ý tưởng khởi nghiệp phổ biến năm 2025
          </h2>

          <div className="relative flex items-center">
            <button
              onClick={prevSlide}
              className="absolute -left-16 z-10 bg-transparent hover:bg-amber-200 hover:text-amber-700 text-gray-800 p-2 rounded-full shadow-md cursor-pointer"
            >
              <IoChevronBack size={24} />
            </button>

            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${
                    startIndex * (100 / itemsPerPage)
                  }%)`,
                }}
              >
                {ideas.length > 0 ? (
                  ideas.map((idea, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0 px-2">
                      <div
                        className={`border ${idea.border} rounded-lg overflow-hidden shadow-md`}
                      >
                        <div
                          className={`${idea.bg} ${idea.text} p-6 text-lg font-bold text-blue-700 text-center`}
                        >
                          {idea.name}
                        </div>
                        <div className="bg-white p-6 text-gray-700">
                          <img
                            src={idea.image}
                            alt="Avatar"
                            className="rounded-md mb-4"
                          />
                          <p className="mb-4 line-clamp-4 text-justify">
                            {idea.description}
                          </p>

                          <p className="mt-2 text-sm text-gray-500">
                            🏫 {idea.university}
                          </p>
                        </div>
                        <div
                          className={`${idea.bg} ${idea.text} p-2 text-lg font-bold text-blue-700 flex items-center justify-end`}
                        >
                          <span
                            className="hover:text-orange-500 hover:-translate-y-1 transition-transform duration-300 ease-in-out flex items-center cursor-pointer"
                            onClick={() => {
                              navigate("/newspaper");
                              window.scrollTo(0, 0);
                            }}
                          >
                            Tiếp tục đọc
                            <IoArrowRedoCircleOutline className="ml-2" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center text-gray-500 py-10">
                    Đang tải dữ liệu hoặc không có ý tưởng nào...
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute -right-16 z-10 bg-transparent hover:bg-amber-200 hover:text-amber-700 text-gray-800 p-2 rounded-full shadow-md cursor-pointer"
            >
              <IoChevronForward size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative min-h-150">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex w-full max-w-7xl absolute -bottom-30 z-10">
            <div className="w-1/2 hidden md:block">
              <img
                src={bg_contact}
                alt="Speech Bubble"
                className="w-full h-full object-cover"
              />
            </div>
            <div id="contact" className="w-full md:w-1/2 p-12">
              <h2 className="text-3xl font-semibold mb-3">
                Hãy để lại lời nhắn
              </h2>
              <p className="text-gray-500 mb-6">
                Hãy điền thông tin và chúng tôi sẽ liên hệ bạn ngay
              </p>
              <form>
                <div className="mb-5">
                  <label className="block text-gray-700 text-lg">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="mb-5 flex space-x-6">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-lg">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-lg">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-gray-700 text-lg">
                    Nội dung
                  </label>
                  <textarea
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="Nhập nội dung"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-4 rounded-lg text-lg hover:bg-blue-600 cursor-pointer"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <ChatWidget />
    </div>
  );
}

export default HomeScreens;
