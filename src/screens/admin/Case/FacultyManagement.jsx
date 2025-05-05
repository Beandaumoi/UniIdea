import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFaculty, fetchFaculties } from "../../../redux/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FacultyManagement() {
  const dispatch = useDispatch();
  const faculties = useSelector((state) => state.admin.faculty);
  const universities = useSelector((state) => state.admin.universities);
  const [search, setSearch] = useState("");
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    university_id: "",
    description: "",
  });

  const filteredFaculties = faculties?.length
    ? faculties.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  useEffect(() => {
    dispatch(fetchFaculties());
  }, [dispatch]);

  // const handleAdd = () => {
  //   if (
  //     !newFaculty.name ||
  //     !newFaculty.university_id ||
  //     !newFaculty.description
  //   ) {
  //     alert("Vui lòng nhập đầy đủ thông tin!");
  //     return;
  //   }
  //   dispatch(
  //     addFaculty({
  //       ...newFaculty,
  //       university_id: Number(newFaculty.university_id),
  //     })
  //   );
  //   setNewFaculty({ name: "", university_id: "", description: "" });
  // };
  const handleAdd = async () => {
    if (
      !newFaculty.name ||
      !newFaculty.university_id ||
      !newFaculty.description
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", newFaculty.name);
      formData.append("university_id", Number(newFaculty.university_id));
      formData.append("description", newFaculty.description);

      // Log formData để debug
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await dispatch(addFaculty(formData)).unwrap();
      setNewFaculty({ name: "", university_id: "", description: "" });
      toast.success("Thêm khoa thành công!");
    } catch (error) {
      toast.error(`Lỗi khi thêm khoa: ${error}`);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Quản lý Khoa</h2>
      <ToastContainer />
      <input
        type="text"
        placeholder="Tìm kiếm khoa..."
        className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Tên khoa"
          className="p-3 border rounded-lg flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={newFaculty.name}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Mô tả"
          className="p-3 border rounded-lg flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={newFaculty.description}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, description: e.target.value })
          }
        />
        <select
          className="p-3 border rounded-lg flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={newFaculty.university_id}
          onChange={(e) =>
            setNewFaculty({ ...newFaculty, university_id: e.target.value })
          }
        >
          <option value="">Chọn trường</option>
          {universities.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.name}
            </option>
          ))}
        </select>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 transition duration-200 cursor-pointer"
          onClick={handleAdd}
        >
          Thêm
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 w-3/12 text-center">Tên</th>
            <th className="p-2 w-4/12 text-center">Mô tả</th>
            <th className="p-2 w-4/12 text-center">Trường</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculties.map((faculty) => (
            <tr key={faculty.id} className="border-b">
              <td className="p-2 text-center">{faculty.name}</td>
              <td className="p-2 text-center">
                {faculty.description || "N/A"}
              </td>
              <td className="p-2 text-center">
                {universities.find((u) => u.id === faculty.university_id)
                  ?.name || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
