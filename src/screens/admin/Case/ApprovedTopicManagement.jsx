import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from "react-icons/io5";
import { toast } from "react-toastify"; // Thêm toast
import "react-toastify/dist/ReactToastify.css";
import { fetchTopic, fetchATopic, awardTopic } from "../../../redux/adminSlice"; // Thêm updateTopicAward

export default function ApprovedTopicManagement() {
  const dispatch = useDispatch();
  const { topics, selectedTopic, loading, error } = useSelector(
    (state) => state.admin
  );
  const universities = useSelector((state) => state.admin.universities);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMembersDetail, setShowMembersDetail] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [selectedAward, setSelectedAward] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Gọi fetchTopic khi component mount
  useEffect(() => {
    dispatch(fetchTopic());
  }, [dispatch]);

  const availableYears = useMemo(() => {
    const years = new Set();
    topics?.forEach((t) => {
      if (t.submission_year) {
        years.add(t.submission_year);
      }
    });
    return Array.from(years).sort((a, b) => b - a); // Sắp xếp giảm dần
  }, [topics]);

  // Lọc chỉ các chủ đề có status là "approved"
  // Lọc và sắp xếp các chủ đề
  const filteredTopics = useMemo(() => {
    if (!topics?.length) return [];

    // Lọc các chủ đề theo tên và trạng thái "approved"
    const filtered = topics.filter(
      (t) =>
        t?.topic_name &&
        t.topic_name.toLowerCase().includes(search.toLowerCase()) &&
        t.status === "approved" &&
        (selectedYear === "" || t.submission_year.toString() === selectedYear)
    );

    // Sắp xếp theo giải thưởng
    return filtered.sort((a, b) => {
      const awardPriority = {
        first: 1,
        second: 2,
        third: 3,
        null: 4, // hoặc không có giải
      };

      // Lấy giá trị ưu tiên của giải thưởng, mặc định là 4 nếu không có giải
      const aPriority = awardPriority[a.award] || awardPriority.null;
      const bPriority = awardPriority[b.award] || awardPriority.null;

      return aPriority - bPriority;
    });
  }, [topics, search, selectedYear]);

  const handleViewDetails = (id) => {
    dispatch(fetchATopic(id));
    setIsModalOpen(true);
  };

  // Tạo bản đồ để tra cứu nhanh tên khoa và trường
  const universityMap = useMemo(() => {
    const map = {};
    universities?.forEach((u) => {
      map[u.id] = u.name;
    });
    return map;
  }, [universities]);

  const facultyMap = useMemo(() => {
    const map = {};
    universities?.forEach((u) => {
      u.faculties?.forEach((f) => {
        map[f.id] = f.name;
      });
    });
    return map;
  }, [universities]);

  const topicMap = useMemo(() => {
    const map = {};
    topics?.forEach((t) => {
      map[t.id] = t.topic_name;
    });
    return map;
  }, [topics]);

  // Xử lý xác nhận trao giải
  const handleConfirm = async () => {
    if (!selectedAward) {
      toast.error("Vui lòng chọn một giải thưởng!");
      return;
    }

    const payload = { award: selectedAward };
    try {
      await dispatch(
        awardTopic({ id: selectedTopic.id, data: payload })
      ).unwrap();
      setIsSelectVisible(false);
      setSelectedAward("");
      setIsModalOpen(false);
      toast.success("Đã trao giải thành công!");
      dispatch(fetchTopic()); // Làm mới danh sách chủ đề
    } catch (error) {
      const errorMessage =
        error?.message || "Không thể cập nhật giải thưởng. Vui lòng thử lại.";
      toast.error(`Lỗi: ${errorMessage}`);
    }
  };

  // Hiển thị trạng thái
  const displayStatus = () => (
    <span className="text-green-700 font-semibold">Đã phê duyệt</span>
  );

  // Hiển thị giải thưởng
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

  const API_URL = "http://127.0.0.1:8000";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Quản lý Topic Đã Phê Duyệt
      </h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}
      {filteredTopics.length === 0 && !loading && !error && (
        <p>Không có chủ đề nào đã được phê duyệt.</p>
      )}
      {/* <input
        type="text"
        placeholder="Tìm kiếm topic..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm topic..."
          className="w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Tất cả năm</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 w-2/12 text-center">Tiêu đề</th>
            <th className="p-2 w-2/12 text-center">Giáo viên hướng dẫn</th>
            <th className="p-2 w-2/12 text-center">Email đội trưởng</th>
            <th className="p-2 w-1/12 text-center">Năm</th>
            <th className="p-2 w-2/12 text-center">Thư mục</th>
            <th className="p-2 w-1/12 text-center">Trạng thái</th>
            <th className="p-2 w-1/12 text-center">Đạt giải</th>
            <th className="p-2 w-4/12 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredTopics.map((topic) => (
            <tr key={topic.id} className="border-b">
              <td className="p-2 text-center">{topic.topic_name}</td>
              <td className="p-2 text-center">{topic.guidance_teacher}</td>
              <td className="p-2 text-center">{topic.leader_email}</td>
              <td className="p-2 text-center">{topic.submission_year}</td>
              <td className="p-2 text-center">
                {topic.report_file ? (
                  <a
                    href={`${API_URL}/${topic.report_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 line-clamp-2"
                  >
                    {topic.report_file}
                  </a>
                ) : (
                  "Không có file"
                )}
              </td>
              <td className="p-2 text-center">{displayStatus()}</td>
              <td className="p-2 text-center">{displayAward(topic.award)}</td>
              <td className="p-2 text-center">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                  onClick={() => handleViewDetails(topic.id)}
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full overflow-y-auto max-h-[80vh]">
            <h3 className="text-xl font-bold mb-4">Chi tiết Topic</h3>
            <p>
              <strong>Tiêu đề:</strong> {selectedTopic.topic_name}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedTopic.description}
            </p>
            <p>
              <strong>Năm:</strong> {selectedTopic.submission_year}
            </p>
            <p>
              <strong>Giáo viên hướng dẫn:</strong>{" "}
              {selectedTopic.guidance_teacher}
            </p>
            <p>
              <strong>Email đội trưởng:</strong> {selectedTopic.leader_email}
            </p>
            <p>
              <strong>Tệp:</strong>{" "}
              {selectedTopic.report_file || "Không có file"}
            </p>
            <p>
              <strong>Trạng thái:</strong> {displayStatus()}
            </p>
            <p>
              <strong>Đạt giải:</strong> {displayAward(selectedTopic.award)}
            </p>
            <p>
              <strong>Thành viên:</strong> {selectedTopic?.members?.length}
            </p>
            <a onClick={() => setShowMembersDetail(!showMembersDetail)}>
              {showMembersDetail ? (
                <p className="flex text-blue-600 hover:text-blue-800 cursor-pointer">
                  Ẩn chi tiết các thành viên
                  <span className="ml-4 flex items-center">
                    <IoCaretUpCircleOutline />
                  </span>
                </p>
              ) : (
                <p className="flex text-blue-600 hover:text-blue-800 cursor-pointer mb-4">
                  Xem chi tiết các thành viên
                  <span className="ml-4 flex items-center">
                    <IoCaretDownCircleOutline />
                  </span>
                </p>
              )}
            </a>
            {showMembersDetail &&
              selectedTopic.members &&
              selectedTopic.members.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">
                    Thành viên: {selectedTopic.members.length}
                  </h4>
                  <table className="w-full border-collapse my-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 w-2/12 text-center">Tên</th>
                        <th className="p-2 w-2/12 text-center">MSSV</th>
                        <th className="p-2 w-2/12 text-center">Tên dự án</th>
                        <th className="p-2 w-2/12 text-center">Trường</th>
                        <th className="p-2 w-2/12 text-center">Khoa</th>
                        <th className="p-2 w-2/12 text-center">SĐT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTopic.members.map((member, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 text-center">
                            {member.name || "Không rõ"}
                          </td>
                          <td className="p-2 text-center">
                            {member.student_id || "Không rõ"}
                          </td>
                          <td className="p-2 text-center">
                            {topicMap[member.topic_id] || "Không rõ"}
                          </td>
                          <td className="p-2 text-center">
                            {universityMap[member.university_id] || "Không rõ"}
                          </td>
                          <td className="p-2 text-center">
                            {facultyMap[member.faculty_id] || "Không rõ"}
                          </td>
                          <td className="p-2 text-center">
                            {member.phone || "Không rõ"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            <div className="flex items-center gap-4">
              {!isSelectVisible && selectedTopic.award == null ? (
                <button
                  onClick={() => setIsSelectVisible(true)}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 cursor-pointer disabled:opacity-50"
                  disabled={loading}
                >
                  Trao giải
                </button>
              ) : selectedTopic.award == null ? (
                <>
                  <select
                    className="bg-white border border-gray-300 text-gray-800 px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={selectedAward}
                    onChange={(e) => setSelectedAward(e.target.value)}
                    disabled={loading}
                  >
                    <option value="" disabled>
                      Chọn giải thưởng
                    </option>
                    <option value="first">Giải Nhất</option>
                    <option value="second">Giải Nhì</option>
                    <option value="third">Giải Ba</option>
                  </select>
                  <button
                    onClick={handleConfirm}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200 disabled:opacity-50 cursor-pointer"
                    disabled={!selectedAward || loading}
                  >
                    Xác nhận
                  </button>
                </>
              ) : (
                <span className="text-sm text-gray-600 italic">
                  Đã trao giải:{" "}
                  <strong className="capitalize text-blue-600">
                    {displayAward(selectedTopic.award)}
                  </strong>
                </span>
              )}
              <button
                className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 disabled:opacity-50 transition duration-200 cursor-pointer ml-4"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsSelectVisible(false);
                  setSelectedAward("");
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
