import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import AuthApi from "../network/AuthApi";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchSuggestions = async (value) => {
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const params = { name: value };
      const response = await AuthApi.topics(params);
      console.log("Dữ liệu từ API:", response);

      const filteredResults = response.data.result.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredResults || []);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm đề tài:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
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
      // Chuyển hướng sang trang ListIdeaScreen với query trong URL
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
          placeholder="Tìm kiếm các ý tưởng nổi bật..."
          className="w-full p-3 text-black outline-none"
        />
        <button
          onClick={handleSearch} // Thêm sự kiện onClick để xử lý tìm kiếm
          className="p-4 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        >
          <IoSearch />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((search) => (
            <li
              key={search.id}
              className="p-3 hover:bg-blue-100 cursor-pointer text-black"
              onClick={() => {
                setQuery(search.name);
              }}
            >
              {search.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
