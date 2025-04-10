import { useState, useEffect } from "react";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoFilter,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { newspaper_image } from "../assets/images";
import AuthApi from "../network/AuthApi";

const ListIdeaScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "Tất cả";
  const searchQuery = params.get("search") || ""; // Lấy tham số search từ URL

  const [ideas, setIdeas] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const itemsPerPage = 6;

  const filteredIdeas = ideas.filter((idea) => {
    const matchesDepartment =
      selectedDepartmentId === null ||
      idea.department?.id === selectedDepartmentId;
    const matchesSearch =
      searchQuery === "" ||
      idea.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const totalPages = Math.ceil(filteredIdeas.length / itemsPerPage);
  const paginatedIdeas = filteredIdeas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchIdeasList = async () => {
      try {
        const response = await AuthApi.topics();
        console.log("Danh sách ý tưởng từ API:", response?.data?.result);
        setIdeas(response.data.result || response.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ý tưởng:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await AuthApi.departments();
        console.log("Danh sách departments từ API:", response?.data?.result);
        const departmentsData = response.data.result || response.data || [];
        setDepartments([{ id: null, name: "Tất cả" }, ...departmentsData]);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách departments:", error);
      }
    };

    fetchIdeasList();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (initialCategory === "Tất cả") {
      setSelectedDepartmentId(null);
    } else {
      const selectedDept = departments.find(
        (dept) => dept.name === initialCategory
      );
      setSelectedDepartmentId(selectedDept ? selectedDept.id : null);
    }
  }, [initialCategory, departments]);

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
            {departments.length > 0 ? (
              departments.map((department) => (
                <button
                  key={department.id ?? "all"}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer ${
                    selectedDepartmentId === department.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedDepartmentId(department.id);
                    setCurrentPage(1);
                    setFilterOpen(true);
                  }}
                >
                  {department.name}
                </button>
              ))
            ) : (
              <p>Đang tải danh sách chuyên ngành...</p>
            )}
          </div>
        </div>
      )}

      {/* Danh sách ý tưởng */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedIdeas.length > 0 ? (
          paginatedIdeas.map((idea) => (
            <button
              onClick={() => {
                navigate("/newspaper");
                window.scrollTo(0, 0);
              }}
              key={idea.id}
              className="bg-white p-4 shadow-lg rounded-lg hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={newspaper_image}
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
                Trường: {idea.university?.name}
              </p>
            </button>
          ))
        ) : (
          <p>Không có ý tưởng nào để hiển thị.</p>
        )}
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
