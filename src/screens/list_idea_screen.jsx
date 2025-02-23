import { useState, useEffect } from "react";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoFilter,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

import { newspaper_image } from "../assets/images";

const ideas = [
  {
    id: 1,
    image: newspaper_image,
    name: "Ứng dụng AI nhận diện hình ảnh",
    description: "Dự án áp dụng AI để nhận diện hình ảnh chính xác.",
    rating: 4.5,
    school: "Đại học Bách Khoa",
    category: "Công nghệ thông tin",
  },
  {
    id: 2,
    image: newspaper_image,
    name: "Robot tự động vận chuyển",
    description: "Dự án thiết kế robot giúp tự động hóa vận chuyển.",
    rating: 4.7,
    school: "Đại học Công nghiệp",
    category: "Kỹ thuật ô tô",
  },
  {
    id: 3,
    image: newspaper_image,
    name: "Ứng dụng AI nhận diện hình ảnh",
    description: "Dự án áp dụng AI để nhận diện hình ảnh chính xác.",
    rating: 4.5,
    school: "Đại học Bách Khoa",
    category: "Khoa học máy tính",
  },
  {
    id: 4,
    image: newspaper_image,
    name: "Robot tự động vận chuyển",
    description: "Dự án thiết kế robot giúp tự động hóa vận chuyển.",
    rating: 4.7,
    school: "Đại học Công nghiệp",
    category: "Dệt may",
  },
  {
    id: 5,
    image: newspaper_image,
    name: "Ứng dụng AI nhận diện hình ảnh",
    description: "Dự án áp dụng AI để nhận diện hình ảnh chính xác.",
    rating: 4.5,
    school: "Đại học Bách Khoa",
    category: "Cơ khí chế tạo",
  },
  {
    id: 6,
    image: newspaper_image,
    name: "Robot tự động vận chuyển",
    description: "Dự án thiết kế robot giúp tự động hóa vận chuyển.",
    rating: 4.7,
    school: "Đại học Công nghiệp",
    category: "Công nghệ sinh học",
  },
  {
    id: 7,
    image: newspaper_image,
    name: "Ứng dụng AI nhận diện hình ảnh",
    description: "Dự án áp dụng AI để nhận diện hình ảnh chính xác.",
    rating: 4.5,
    school: "Đại học Bách Khoa",
    category: "Công nghệ sinh học",
  },
  {
    id: 8,
    image: newspaper_image,
    name: "Robot tự động vận chuyển",
    description: "Dự án thiết kế robot giúp tự động hóa vận chuyển.",
    rating: 4.7,
    school: "Đại học Công nghiệp",
    category: "Công nghệ sinh học",
  },
];

const categories = [
  "Tất cả",
  "Công nghệ thông tin",
  "Kỹ thuật ô tô",
  "Khoa học máy tính",
  "Dệt may",
  "Cơ khí chế tạo",
  "Công nghệ sinh học",
];

const ListIdeaScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "Tất cả";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(true);
  const itemsPerPage = 6;

  const filteredIdeas = ideas.filter(
    (idea) =>
      selectedCategory === "Tất cả" || idea.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredIdeas.length / itemsPerPage);
  const paginatedIdeas = filteredIdeas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  return (
    <div className="px-20 pt-30 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Danh sách ý tưởng</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 flex items-center"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Lọc
          <IoFilter className="ml-4" />
        </button>
      </div>
      {filterOpen && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Chọn chuyên ngành</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                  setFilterOpen(true);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Danh sách ý tưởng */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedIdeas.map((idea) => (
          <button
            onClick={() => {
              navigate("/newspaper");
              window.scrollTo(0, 0);
            }}
            key={idea.id}
            className="bg-white p-4 shadow-lg rounded-lg hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <img
              src={idea.image}
              alt={idea.name}
              className="w-full max-h-80 object-cover rounded"
            />
            <a
              onClick={() => {
                navigate("/newspaper");
                window.scrollTo(0, 0);
              }}
              className="text-xl font-semibold text-left hover:text-blue-600 cursor-pointer flex items-start mt-4"
            >
              {idea.name}
            </a>
            <p className="text-gray-600 mt-1 text-left">{idea.description}</p>
            <p className="text-sm text-gray-500 mt-2 text-left">
              Trường: {idea.school}
            </p>
            <p className="text-yellow-500 mt-2 text-left">⭐ {idea.rating}</p>
          </button>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          className="px-3 py-2 rounded-lg flex items-center bg-gray-300 cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoArrowBackOutline size={20} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-3 py-2 rounded-lg flex items-center bg-gray-300 cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoArrowForwardOutline size={20} />
        </button>
      </div>
    </div>
  );
};

export default ListIdeaScreen;
