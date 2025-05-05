import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchTopic,
  fetchATopic,
  changeTopicStatus,
} from "../../../redux/adminSlice";

export default function TopicManagement() {
  const dispatch = useDispatch();
  const { topics, selectedTopic, loading, error } = useSelector(
    (state) => state.admin
  );
  const universities = useSelector((state) => state.admin.universities);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMembersDetail, setShowMembersDetail] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");

  // Gọi fetchTopic khi component mount
  useEffect(() => {
    dispatch(fetchTopic());
  }, [dispatch]);

  const submissionYears = useMemo(() => {
    const years = topics?.map((t) => t.submission_year) || [];
    const uniqueYears = [...new Set(years)];
    return uniqueYears.sort((a, b) => b - a); // Sắp xếp giảm dần (mới nhất trước)
  }, [topics]);

  // Lọc chủ đề dựa trên tìm kiếm
  // const filteredTopics = topics?.length
  //   ? topics.filter(
  //       (t) =>
  //         t?.topic_name &&
  //         t.topic_name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   : [];

  const filteredTopics = useMemo(() => {
    if (!topics?.length) return [];

    return topics.filter((t) => {
      const matchSearch = t?.topic_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchYear =
        selectedYear === "" || t.submission_year === +selectedYear;

      return matchSearch && matchYear;
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

  // Xử lý thay đổi trạng thái chủ đề
  const handleChangeStatus = async (id, status) => {
    console.log("handleChangeStatus - ID:", id, "Status:", status);
    if (!["approved", "rejected"].includes(status)) {
      console.log("Invalid status detected:", status);
      toast.error("Trạng thái không hợp lệ");
      return;
    }
    const statusText = status === "approved" ? "phê duyệt" : "từ chối";
    if (window.confirm(`Xác nhận ${statusText} chủ đề này?`)) {
      const payload = { status }; // Thử { topic_status: status } nếu lỗi vẫn xảy ra
      console.log("🚀 Payload gửi đi:", payload);
      try {
        await dispatch(changeTopicStatus({ id, data: payload })).unwrap();
        setIsModalOpen(false);
        toast.success(`Đã ${statusText} chủ đề thành công!`);
      } catch (error) {
        console.error("❌ Error in changeTopicStatus:", error);
        const errorMessage =
          error?.data?.errors?.status?.[0] ||
          error?.data?.message ||
          error?.message ||
          "Không thể cập nhật trạng thái";
        console.log("Detailed error message:", errorMessage);
        toast.error(`Lỗi: ${errorMessage}`);
      }
    }
  };

  // Hiển thị trạng thái thân thiện
  const displayStatus = (status) => {
    let color = "text-blue-700 font-semibold";
    let label = "Chưa xử lý";

    if (status === "approved") {
      color = "text-green-700 font-semibold";
      label = "Đã phê duyệt";
    } else if (status === "rejected") {
      color = "text-red-700 font-semibold";
      label = "Đã từ chối";
    }
    return <span className={color}>{label}</span>;
  };

  const API_URL = "http://127.0.0.1:8000";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý Topic</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}
      {filteredTopics.length === 0 && !loading && !error && (
        <p>Không có chủ đề nào để hiển thị.</p>
      )}
      {/* <input
        type="text"
        placeholder="Tìm kiếm topic..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm topic..."
          className="w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Tất cả năm</option>
          {submissionYears.map((year) => (
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
              <td className="p-2 text-center">{displayStatus(topic.status)}</td>
              <td className="p-2 text-center space-x-2">
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
              <strong>Trạng thái:</strong> {displayStatus(selectedTopic.status)}
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
            <div className="mt-4 space-x-2">
              <button
                className={`bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 transition duration-200 ${
                  selectedTopic.status === "approved"
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  handleChangeStatus(selectedTopic.id, "approved");
                }}
                disabled={loading || selectedTopic.status === "approved"}
              >
                Phê Duyệt
              </button>
              <button
                className={`bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 disabled:opacity-50 transition duration-200 ${
                  selectedTopic.status === "approved"
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  handleChangeStatus(selectedTopic.id, "rejected");
                }}
                disabled={loading || selectedTopic.status === "rejected"}
              >
                Từ Chối
              </button>
              <button
                className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 disabled:opacity-50 transition duration-200 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
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
