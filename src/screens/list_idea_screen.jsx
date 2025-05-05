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
  const initialYear = params.get("year") || "Tất cả";
  const initialAward = params.get("award") || "all";
  const searchQuery = params.get("search") || "";

  const awards = [
    { id: "all", name: "Tất cả" },
    { id: "first", name: "Giải Nhất" },
    { id: "second", name: "Giải Nhì" },
    { id: "third", name: "Giải Ba" },
  ];

  const [ideas, setIdeas] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedAward, setSelectedAward] = useState(initialAward);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const itemsPerPage = 6;

  // Lọc ý tưởng theo năm, giải thưởng và tìm kiếm
  const filteredIdeas = ideas.filter((idea) => {
    const matchesAward =
      selectedAward === "all" ||
      (selectedAward === null
        ? idea.award === null || idea.award === undefined || idea.award === ""
        : idea.award === selectedAward);
    const matchesSearch =
      searchQuery === "" ||
      (idea.topic_name &&
        idea.topic_name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesAward && matchesSearch;
  });

  const totalPages = Math.ceil(filteredIdeas.length / itemsPerPage);
  const paginatedIdeas = filteredIdeas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gọi API để lấy danh sách ý tưởng theo năm
  useEffect(() => {
    const fetchIdeasList = async () => {
      try {
        let response;
        if (selectedYear === "Tất cả") {
          response = await AuthApi.allTopicDone();
        } else {
          response = await AuthApi.filterYearTopic({ year: selectedYear });
        }
        console.log("Danh sách ý tưởng từ API:", response?.data);
        const ideasData = response.data.result || response.data || [];
        setIdeas(ideasData);

        // Lấy danh sách năm duy nhất
        const uniqueYears = [
          "Tất cả",
          ...new Set(
            (await AuthApi.allTopicDone()).data.map(
              (idea) => idea.submission_year
            )
          ),
        ].sort((a, b) => {
          if (a === "Tất cả") return -1;
          if (b === "Tất cả") return 1;
          if (a === 2025) return -1;
          if (b === 2025) return 1;
          return b - a;
        });
        setYears(uniqueYears);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ý tưởng:", error);
      }
    };

    fetchIdeasList();
  }, [selectedYear]);

  // Cập nhật năm và giải thưởng từ URL
  useEffect(() => {
    setSelectedYear(initialYear);
    setSelectedAward(initialAward);
  }, [initialYear, initialAward]);

  // Hiển thị tên giải thưởng
  const displayAward = (award) => {
    let color = "text-gray-700 font-semibold";
    let label = "Không có giải thưởng";
    if (award === "first") {
      label = "Giải Nhất";
      color = "text-yellow-700 font-semibold";
    } else if (award === "second") {
      label = "Giải Nhì";
      color = "text-green-700 font-semibold";
    } else if (award === "third") {
      label = "Giải Ba";
      color = "text-blue-700 font-semibold";
    }
    return <span className={color}>{label}</span>;
  };

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
          <h3 className="text-lg font-semibold mb-2">
            Lọc theo năm và giải thưởng
          </h3>
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">Năm</h4>
            <div className="flex space-x-4 overflow-x-auto">
              {years.length > 0 ? (
                years.map((year) => (
                  <button
                    key={year}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer ${
                      selectedYear === year
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedYear(year);
                      setCurrentPage(1);
                      navigate(
                        `/list-idea?year=${encodeURIComponent(
                          year
                        )}&award=${encodeURIComponent(selectedAward)}`
                      );
                    }}
                  >
                    {year}
                  </button>
                ))
              ) : (
                <p>Đang tải danh sách năm...</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium mb-2">Giải thưởng</h4>
            <div className="flex space-x-4 overflow-x-auto">
              {awards.map((award) => (
                <button
                  key={award.id ?? "none"}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer ${
                    selectedAward === award.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedAward(award.id);
                    setCurrentPage(1);
                    navigate(
                      `/list-idea?year=${encodeURIComponent(
                        selectedYear
                      )}&award=${encodeURIComponent(award.id)}`
                    );
                  }}
                >
                  {award.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Danh sách ý tưởng */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedIdeas.length > 0 ? (
          paginatedIdeas.map((idea) => (
            <button
              onClick={() => {
                navigate(`/newspaper/${idea.id}`);
                window.scrollTo(0, 0);
              }}
              key={idea.id}
              className="bg-white p-4 shadow-lg rounded-lg hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={idea.topic_image || newspaper_image}
                alt={idea.topic_name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = newspaper_image;
                }}
                className="w-full max-h-80 object-cover rounded"
              />
              <a
                onClick={() => {
                  navigate(`/newspaper/${idea.id}`);
                  window.scrollTo(0, 0);
                }}
                className="text-xl font-semibold text-left hover:text-blue-600 cursor-pointer flex items-start mt-4 truncate max-w-full line-clamp-1"
                title={idea.topic_name} // Hiển thị toàn bộ nội dung khi hover
              >
                {idea.topic_name}
              </a>
              <p className="text-gray-600 mt-1 text-left line-clamp-3">
                {idea.description}
              </p>
              <p className="text-sm text-gray-500 mt-2 text-left">
                GVHD: {idea.guidance_teacher}
              </p>
              <p className="text-sm text-gray-500 mt-2 text-left">
                Năm: {idea.submission_year}
              </p>
              {idea.award ? (
                <p className="text-sm text-gray-500 mt-2 text-left">
                  Đạt giải: {displayAward(idea.award)}
                </p>
              ) : (
                <span></span>
              )}
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
