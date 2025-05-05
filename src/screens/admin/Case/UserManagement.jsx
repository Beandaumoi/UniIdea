import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, deleteUser } from "../../../redux/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackManagement() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.admin.user);
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  useEffect(() => {
    dispatch(fetchUser());
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
        await dispatch(deleteUser(id)).unwrap();
        toast.success("Xóa thành công!");
      } catch (error) {
        toast.error("Xóa thất bại: " + error);
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
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Quản lý người dùng{" "}
      </h2>
      <ToastContainer />
      {!user || !Array.isArray(user) || user.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 w-2/12 text-center">Tên</th>
              <th className="p-2 w-2/12 text-center">Email</th>
              <th className="p-2 w-2/12 text-center">Địa chỉ</th>
              <th className="p-2 w-2/12 text-center">Giới tính</th>
              <th className="p-2 w-2/12 text-center">Ngày sinh</th>

              <th className="p-2 w-3/12 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {user.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2 text-center">{u.name}</td>
                <td className="p-2 text-center">{u.email}</td>
                <td className="p-2 text-center">{u.address}</td>
                <td className="p-2 text-center">{u.gender}</td>
                <td className="p-2 text-center">{u.date_of_birth}</td>

                <td className="p-2 text-center">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                    onClick={() => handleDelete(u.id)}
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
