import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedback, deleteFeedback } from "../../../redux/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackManagement() {
  const dispatch = useDispatch();
  const feedback = useSelector((state) => state.admin.feedback);
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn có muốn xóa trường này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (result.isConfirmed) {
      try {
        await dispatch(deleteFeedback(id)).unwrap();
        toast.success("Xóa góp ý thành công!");
      } catch (error) {
        toast.error("Xóa góp ý thất bại: " + error);
      }
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Quản lý Góp ý</h2>
      <ToastContainer />
      {!feedback || !Array.isArray(feedback) || feedback.length === 0 ? (
        <p>Không có góp ý nào.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 w-3/12 text-center">Người gửi</th>
              <th className="p-2 w-3/12 text-center">Tài khoản</th>
              <th className="p-2 w-5/12 text-center">Nội dung</th>
              <th className="p-2 w-3/12 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((fb) => (
              <tr key={fb.id} className="border-b">
                <td className="p-2 text-center">{fb.user?.name || "N/A"}</td>
                <td className="p-2 text-center">{fb.user?.email || "N/A"}</td>
                <td className="p-2 text-center">{fb.content}</td>
                <td className="p-2 text-center">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                    onClick={() => handleDelete(fb.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
