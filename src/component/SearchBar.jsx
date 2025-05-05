import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import AuthApi from "../network/AuthApi";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestions = async (value) => {
    if (value.trim() === "") {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true); // Bật trạng thái loading
    try {
      const params = { q: value };
      const response = await AuthApi.searchTopic(params);
      console.log("Dữ liệu từ API:", response);

      const filteredResults = Array.isArray(response?.data)
        ? response.data.filter((item) =>
            item?.topic_name?.toLowerCase().includes(value.toLowerCase())
          )
        : [];

      // Trì hoãn hiển thị gợi ý trong 1 giây
      setTimeout(() => {
        if (query === value) {
          // Kiểm tra query còn khớp
          setSuggestions(filteredResults || []);
          setLoading(false); // Tắt loading sau 1s
        }
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm đề tài:", error);
      setSuggestions([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/list-idea?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-1/2 max-w-lg mt-10">
      <div className="flex items-center bg-white rounded-lg overflow-hidden border border-gray-300">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Tìm kiếm các ý tưởng nổi bật..."
          className="w-full p-3 text-black outline-none"
        />
        <button
          onClick={handleSearch}
          className="p-4 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        >
          <IoSearch />
        </button>
      </div>

      {/* Hiển thị dropdown khi có query */}
      {query.trim() && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {/* Hiển thị loading trong dropdown */}
          {loading && (
            <li className="p-3 text-black flex items-center">
              <ClipLoader size={24} color="#3b82f6" />
              <span className="ml-2">Đang tải...</span>
            </li>
          )}

          {/* Hiển thị gợi ý sau khi loading hoàn tất */}
          {!loading &&
            suggestions.length > 0 &&
            suggestions.map((search) => (
              <li
                key={search.id}
                className="p-3 hover:bg-blue-100 cursor-pointer text-black"
                onClick={() => {
                  setQuery(search.topic_name);
                  setSuggestions([]); // Ẩn gợi ý sau khi chọn
                }}
              >
                {search.topic_name}
              </li>
            ))}

          {/* Hiển thị thông báo khi không có kết quả */}
          {!loading && suggestions.length === 0 && (
            <li className="p-3 text-black">Không tìm thấy kết quả</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
