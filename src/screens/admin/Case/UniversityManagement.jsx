import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUniversities,
  addUniversity,
  updateUniversity,
  deleteUniversity,
} from "../../../redux/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

export default function UniversityManagement() {
  const dispatch = useDispatch();
  const { universities, loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [newUni, setNewUni] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editUni, setEditUni] = useState(null);

  const filteredUnis = universities?.length
    ? universities.filter(
        (u) => u?.name && u.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    dispatch(fetchUniversities());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!newUni.name || !newUni.description) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", newUni.name);
      formData.append("description", newUni.description);
      // formData.append("image", newUni.image);
      // Log formData để debug
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await dispatch(addUniversity(formData)).unwrap();
      setNewUni({ name: "", description: "", image: null });
      toast.success("Thêm trường thành công!");
    } catch (error) {
      toast.error(`Lỗi khi thêm trường: ${error}`);
    }
  };

  const handleEdit = (uni) => {
    setEditUni({
      id: uni.id,
      name: uni.name,
      description: uni.description,
      // image: null,
      // imagePreview: uni.image,
    });
  };

  const handleUpdate = async () => {
    if (!editUni.name || !editUni.description) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", editUni.name);
      formData.append("description", editUni.description);
      if (editUni.image) {
        formData.append("image", editUni.image);
      }
      formData.append("_method", "PUT");

      await dispatch(
        updateUniversity({
          id: editUni.id,
          formData,
        })
      ).unwrap();
      setEditUni(null);
      dispatch(fetchUniversities());
      toast.success("Cập nhật trường thành công!");
    } catch (error) {
      toast.error(`Lỗi khi cập nhật trường: ${error}`);
    }
  };

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
        await dispatch(deleteUniversity(id)).unwrap();
        toast.success("Xóa trường thành công!");
      } catch (error) {
        toast.error(`Lỗi khi xóa trường: ${error}`);
      }
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Quản lý Trường</h2>
      <ToastContainer />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <input
        type="text"
        placeholder="Tìm kiếm trường..."
        className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mb-6 flex space-x-3">
        <input
          type="text"
          placeholder="Tên trường"
          className="p-3 border rounded-lg flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={newUni.name}
          onChange={(e) => setNewUni({ ...newUni, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mô tả"
          className="p-3 border rounded-lg flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={newUni.description}
          onChange={(e) =>
            setNewUni({ ...newUni, description: e.target.value })
          }
        />
        {/* <input
          type="file"
          accept="image/*"
          className="p-3 border rounded-lg flex-1 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          onChange={(e) => setNewUni({ ...newUni, image: e.target.files[0] })}
        /> */}
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 transition duration-200 cursor-pointer"
          onClick={handleAdd}
          disabled={loading}
        >
          Thêm
        </button>
      </div>
      {editUni && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Chỉnh sửa Trường
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Tên trường
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editUni.name}
                onChange={(e) =>
                  setEditUni({ ...editUni, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mô tả
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editUni.description}
                onChange={(e) =>
                  setEditUni({ ...editUni, description: e.target.value })
                }
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Ảnh hiện tại
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full p-3 border rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) =>
                  setEditUni({ ...editUni, image: e.target.files[0] })
                }
              />
              {editUni.imagePreview ? (
                <p className="text-sm text-gray-500 mb-2">
                  {editUni.imagePreview}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mb-2">Không có ảnh</p>
              )}
            </div> */}
          </div>
          <div className="mt-6 flex space-x-3">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition duration-200 cursor-pointer"
              onClick={handleUpdate}
              disabled={loading}
            >
              Cập nhật
            </button>
            <button
              className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-500 transition duration-200 cursor-pointer"
              onClick={() => setEditUni(null)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-center text-gray-600">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {/* <th className="p-3 text-center">ID</th> */}
                {/* <th className="p-3 text-center">Tên ảnh</th> */}
                <th className="p-3 text-center">Tên trường</th>
                <th className="p-3 text-center">Mô tả</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnis.map((uni) => (
                <tr key={uni.id} className="border-b hover:bg-gray-50">
                  {/* <td className="p-3 text-center">{uni.id}</td> */}
                  {/* <td className="p-3 text-center">
                    {uni.image ? (
                      <span className="text-gray-600">{uni.image}</span>
                    ) : (
                      <span className="text-gray-400">Không có ảnh</span>
                    )}
                  </td> */}
                  <td className="p-3 text-center">{uni.name}</td>
                  <td className="p-3 text-center">{uni.description}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                      onClick={() => handleEdit(uni)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                      onClick={() => handleDelete(uni.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
