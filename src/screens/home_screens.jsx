import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  backgroundMain,
  discuss,
  bg_contact,
  newspaper_image,
} from "../assets/images";
import {
  IoSearch,
  IoFlameSharp,
  IoLockClosed,
  IoGitBranchOutline,
  IoPaperPlaneSharp,
  IoCheckmarkDoneSharp,
  IoNotifications,
  IoStarSharp,
  IoChevronBack,
  IoChevronForward,
  IoArrowRedoCircleOutline,
} from "react-icons/io5";
import { ChatWidget, ScrollToTop } from "../component";

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

  const ideas = [
    {
      name: "Ứng dụng nông nghiệp thông minh",
      description:
        "Giải pháp IoT giúp giám sát và tối ưu hóa quy trình trồng trọt, giúp nông dân tiết kiệm nước, phân bón và tăng năng suất cây trồng. Ứng dụng cung cấp dữ liệu thời gian thực về độ ẩm, nhiệt độ và dinh dưỡng đất, giúp đưa ra quyết định chính xác.",
      rating: 4.8,
      university: "Đại học Bách Khoa",
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-black",
      image: newspaper_image,
    },
    {
      name: "Nền tảng học trực tuyến AI",
      description:
        "Ứng dụng trí tuệ nhân tạo giúp cá nhân hóa trải nghiệm học tập, phân tích điểm mạnh, điểm yếu của người học và đề xuất lộ trình phù hợp. Hỗ trợ giảng viên trong việc đánh giá năng lực học sinh thông qua AI, giúp tiết kiệm thời gian và nâng cao hiệu quả giảng dạy.",
      rating: 4.7,
      university: "Đại học Khoa học Tự nhiên",
      bg: "bg-blue-100",
      border: "border-blue-400",
      text: "text-black",
      image: newspaper_image,
    },
    {
      name: "Hệ thống tái chế thông minh",
      description:
        "Máy phân loại rác tự động sử dụng công nghệ AI để nhận diện và phân loại các loại rác thải khác nhau. Hệ thống giúp nâng cao ý thức bảo vệ môi trường, giảm thiểu rác thải không thể tái chế và tối ưu hóa quy trình thu gom rác.",
      rating: 4.9,
      university: "Đại học Công nghệ",
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-black",
      image: newspaper_image,
    },
    {
      name: "Ứng dụng chăm sóc sức khỏe từ xa",
      description:
        "Kết nối bệnh nhân với bác sĩ từ xa qua video call, cung cấp dịch vụ tư vấn y tế, theo dõi sức khỏe và đặt lịch khám trực tuyến. Giúp người dân ở vùng sâu, vùng xa tiếp cận dịch vụ y tế chất lượng mà không cần di chuyển xa.",
      rating: 4.6,
      university: "Đại học Y Dược",
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-black",
      image: newspaper_image,
    },
    {
      name: "Hệ thống giao thông thông minh",
      description:
        "Ứng dụng AI và IoT giúp tối ưu hóa giao thông đô thị bằng cách phân tích dữ liệu thời gian thực từ camera, cảm biến và GPS. Giải pháp giúp giảm ùn tắc, điều phối đèn giao thông thông minh và dự đoán tình trạng kẹt xe.",
      rating: 4.7,
      university: "Đại học Giao Thông Vận Tải",
      bg: "bg-purple-100",
      border: "border-purple-400",
      text: "text-black",
      image: newspaper_image,
    },
    {
      name: "Nền tảng kết nối freelancer",
      description:
        "Một nền tảng giúp kết nối freelancer với doanh nghiệp, cung cấp giải pháp làm việc từ xa hiệu quả. Hỗ trợ các công cụ quản lý dự án, thanh toán an toàn và xây dựng hồ sơ chuyên nghiệp cho người lao động tự do.",
      rating: 4.5,
      university: "Đại học Kinh tế",
      bg: "bg-pink-100",
      border: "border-pink-400",
      text: "text-black",
      image: newspaper_image,
    },
  ];
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  // Chuyển sang phần tử tiếp theo, nếu hết thì quay lại đầu
  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 < ideas.length - itemsPerPage + 1 ? prevIndex + 1 : 0
    );
  };

  // Quay lại phần tử trước đó, nếu ở đầu thì quay về cuối danh sách
  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : ideas.length - itemsPerPage
    );
  };

  // Tự động chuyển slide sau 1 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

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
          <div className="mt-6 flex items-center w-1/2 max-w-lg bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Tìm kiếm các ý tưởng nổi bật"
              className="w-full p-3 text-black outline-none"
            />
            <button className="p-4 bg-blue-500 text-white cursor-pointer hover:bg-blue-600">
              <IoSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="flex marquee-text justify-center mb-5 bg-blue-50">
        <div className=" mx-0 flex py-10 pr-3.5 pl-6 justify-center items-center ">
          <IoNotifications
            className=" mr-5 animate-ping "
            size={50}
            color="#ff7b00"
          />
          <h1 className="text-blue-800 text-4xl  font-bold rainbow-text uppercase ">
            Dám nghĩ, dám làm, dám sáng tạo – Đừng để mơ ước chỉ là ảo
          </h1>
        </div>
      </div>

      <div className="px-40 pb-8">
        <h2 className=" py-7 text-5xl font-bold flex justify-center  text-blue-600">
          Tại sao các tổ chức nên chọn chúng tôi
        </h2>
        <div className="my-10 border-b-2 border-gray-300 flex justify-center "></div>
        <div className="flex justify-around items-center">
          <div className="w-1/2">
            <ul className="mt-4 space-y-4">
              <div className="flex">
                <IoFlameSharp className=" mr-5 " size={50} color="#ff5722" />
                <li className=" flex-col max-w-md leading-relaxed">
                  <strong>Thúc đẩy đổi mới mạnh mẽ:</strong> Chúng tôi cung cấp
                  một nền tảng quản lý ý tưởng sáng tạo và khởi nghiệp giúp các
                  tổ chức dễ dàng thu thập, sàng lọc, phát triển và triển khai ý
                  tưởng từ nhân viên, đối tác và cộng đồng.
                </li>
              </div>
              <div className="flex">
                <IoLockClosed className=" mr-5 " size={50} color="#FFD700" />
                <li className="flex-col max-w-md leading-relaxed">
                  <strong>Bảo mật và tin cậy:</strong> Hệ thống của chúng tôi
                  được thiết kế với bảo mật cao, đảm bảo dữ liệu và ý tưởng của
                  tổ chức luôn được bảo vệ, phù hợp với các tiêu chuẩn bảo mật
                  hàng đầu.
                </li>
              </div>
              <div className="flex">
                <IoGitBranchOutline
                  className=" mr-5 "
                  size={50}
                  color="#9C27B0"
                />
                <li className="flex-col max-w-md leading-relaxed">
                  <strong>Kết nối và hợp tác:</strong> Chúng tôi giúp các tổ
                  chức xây dựng một hệ sinh thái sáng tạo, nơi nhân viên và đối
                  tác có thể chia sẻ, phản hồi và cùng nhau phát triển các ý
                  tưởng mới.
                </li>
              </div>
              <div className="flex">
                <IoPaperPlaneSharp
                  className=" mr-5 "
                  size={50}
                  color="#FF9800"
                />
                <li className="flex-col max-w-md leading-relaxed">
                  <strong>Hiện thực hóa ý tưởng nhanh chóng:</strong> Không chỉ
                  dừng lại ở việc thu thập ý tưởng, hệ thống của chúng tôi còn
                  giúp theo dõi, đánh giá và triển khai ý tưởng để mang lại giá
                  trị thực tế cho doanh nghiệp.
                </li>
              </div>
              <div className="flex">
                <IoCheckmarkDoneSharp
                  className=" mr-5 "
                  size={50}
                  color="#155dfc"
                />
                <li className="flex-col max-w-md leading-relaxed">
                  <strong>Linh hoạt và dễ dàng tích hợp:</strong> Chúng tôi cung
                  cấp giải pháp tùy chỉnh theo nhu cầu của từng tổ chức, dễ dàng
                  tích hợp với các hệ thống hiện có để tối ưu hóa quá trình quản
                  lý sáng tạo.
                </li>
              </div>
            </ul>
          </div>
          <div className="w-1/2 flex justify-end ">
            <img src={`${discuss}`} className="h-[45vh] rounded-lg shadow-md" />
          </div>
        </div>
      </div>

      <div className="bg-white text-center py-12 px-40">
        <h2 className="text-5xl font-bold text-blue-600 pb-7">
          Được tin cậy bởi các trường đại học uy tín hàng đầu
        </h2>
        <p className="text-gray-600 mt-5 font-bold text-xl">
          Khám phá sức mạnh của sự tích hợp để nâng cao quản lý ý tưởng và cộng
          tác nhóm
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {agencies.map((agency, index) => (
            <div
              key={index}
              // className={`rounded-lg shadow-md ${agency.bg} p-4 text-center hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer`}
            >
              <img
                src={agency.logo}
                alt={agency.name}
                className="h-20 mx-auto mt-10"
              />
              {/* <p className="mt-10  text-blue-700 text-2xl px-4 font-bold  ">
                {agency.name}
              </p> */}
            </div>
          ))}
        </div>
      </div>

      <div id="about" className=" px-40 py-30">
        <h2 className="text-5xl font-bold text-blue-600 pb-7 text-center">
          Tôi muốn biết thêm về{" "}
          <label className="text-5xl font-bold text-black mb-4">
            Uni<span className="text-blue-600">I</span>
            <span className="text-blue-600 text-2xl">dea</span>
          </label>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Phần giới thiệu */}
          <div className="mr-10">
            <h3 className="text-xl font-bold mb-4">UniIdea là gì?</h3>
            <p className="text-gray-700 mb-4">
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
                <p className="text-gray-600 text-sm">
                  UniIdea đặt mục tiêu kết nối sinh viên, giảng viên, nhà nghiên
                  cứu và doanh nghiệp, hỗ trợ đổi mới sáng tạo, thúc đẩy khởi
                  nghiệp và tăng cường hợp tác nghiên cứu quốc tế.
                </p>
              </div>
              <div>
                <h4 className="font-bold">Nổi bật</h4>
                <p className="text-gray-600 text-sm">
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
                  <ul>
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
                <p className="text-gray-600 text-sm">
                  UniIdea không chỉ là nơi ươm mầm ý tưởng mà còn là bệ phóng
                  cho những giấc mơ trở thành hiện thực. Cùng chúng tôi xây dựng
                  cộng đồng sáng tạo, nơi mọi ý tưởng đều có cơ hội tỏa sáng!
                </p>
              </div>
            </div>
          </div>

          {/* Phần video */}
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
        <div className=" max-w-6xl mx-auto pt-12 pb-40 px-4 relative">
          <h2 className="text-5xl font-bold text-blue-600 pb-7 text-center">
            Ý tưởng khởi nghiệp phổ biến
          </h2>

          <div className="relative flex items-center">
            {/* Nút Previous */}
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
                {ideas.map((idea, index) => (
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
                        <p className="mb-4 line-clamp-4">{idea.description}</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 flex">
                            {Array.from({
                              length: Math.floor(idea.rating),
                            }).map((_, i) => (
                              <IoStarSharp key={i} />
                            ))}
                            {idea.rating % 1 !== 0 && (
                              <IoStarSharp className="opacity-50" />
                            )}
                          </span>
                          <span className="ml-2 text-gray-600">
                            ({idea.rating} sao)
                          </span>
                        </div>
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
                ))}
              </div>
            </div>

            {/* Nút Next */}
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
            {/* Left side (image) */}
            <div className="w-1/2 hidden md:block">
              <img
                src={bg_contact}
                alt="Speech Bubble"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side (form) */}
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
