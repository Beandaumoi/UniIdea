import { useState, useRef, useEffect } from "react";
import { backgroundMain } from "../assets/images";
import AuthApi from "../network/AuthApi";

export default function IdeaRegisterScreen() {
  const [success, setSuccess] = useState("");
  const [idea, setIdea] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setDescription] = useState("");
  const [teamSize, setTeamSize] = useState(1);
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "",
      studentId: "",
      university: "",
      faculty: "",
      phone: "",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [universities, setUniversities] = useState([]);
  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await AuthApi.pickUniversity();
        setUniversities(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách trường:", error);
        setApiError("Không thể lấy danh sách trường đại học.");
      }
    };

    fetchUniversities();
  }, []);

  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setTeamSize(size);
    setTeamMembers(
      new Array(size).fill().map(() => ({
        name: "",
        studentId: "",
        university: "",
        faculty: "",
        phone: "",
      }))
    );
    setFaculties(new Array(size).fill([]));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    if (field === "university") {
      const selectedUni = universities.find(
        (uni) => uni.id === parseInt(value)
      );
      const uniFaculties = selectedUni?.faculties || [];

      updatedMembers[index].faculty = uniFaculties[0]?.id || "";

      setFaculties((prevFaculties) => {
        const newFaculties = [...prevFaculties];
        newFaculties[index] = uniFaculties;
        return newFaculties;
      });
    }
    setTeamMembers(updatedMembers);
  };

  const handlePdfFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size > 2 * 1024 * 1024) {
        // Giới hạn 2MB chẳng hạn
        setMessage("File PDF quá lớn! Vui lòng chọn file dưới 5MB.");
        setSuccess("text-red-600");
        setPdfFile(null);
        return;
      }
      setPdfFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Vui lòng chọn tệp PDF!");
      setSuccess("text-red-600");
      setPdfFile(null);
    }
  };

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      ["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)
    ) {
      setImageFile(selectedFile);
    } else {
      setMessage("Vui lòng chọn tệp hình ảnh (JPEG, PNG, GIF)!");
      setSuccess("text-red-600");
      setImageFile(null);
    }
  };

  const triggerPdfInput = () => {
    pdfInputRef.current.click();
  };

  const triggerImageInput = () => {
    imageInputRef.current.click();
  };

  const resetForm = () => {
    setIdea("");
    setDescription("");
    setTeamSize(1);
    setTeamMembers([
      {
        name: "",
        studentId: "",
        university: "",
        faculty: "",
        phone: "",
      },
    ]);
    setMessage("");
    setTeacher("");
    setPdfFile(null);
    setImageFile(null);
    setIsValid(false);
    if (pdfInputRef.current) pdfInputRef.current.value = ""; // Reset file input
    if (imageInputRef.current) imageInputRef.current.value = ""; // Reset file input
  };

  const validateForm = () => {
    const isTeamValid = teamMembers.every(
      (m) => m.name && m.studentId && m.university && m.faculty && m.phone
    );

    if (!idea || !description || teamSize <= 0 || !isTeamValid || !pdfFile) {
      setMessage("Vui lòng nhập đầy đủ thông tin và tải lên tệp PDF!");
      setSuccess("text-red-600");
      setIsValid(false);
    } else {
      setMessage("Dữ liệu hợp lệ. Bạn có thể gửi đăng ký!");
      setSuccess("text-green-600");
      setIsValid(true);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setApiError("");

    const formData = new FormData();
    formData.append("topic_name", idea);
    formData.append("description", description);
    formData.append("guidance_teacher", teacher);
    if (pdfFile) formData.append("report_file", pdfFile);
    if (imageFile) formData.append("topic_image", imageFile);

    teamMembers.forEach((member, index) => {
      formData.append(`members[${index}][name]`, member.name);
      formData.append(`members[${index}][student_id]`, member.studentId);
      formData.append(`members[${index}][university_id]`, member.university);
      formData.append(`members[${index}][faculty_id]`, member.faculty);
      formData.append(`members[${index}][phone]`, member.phone);
    });

    console.log("File PDF:", pdfFile);
    console.log("Kiểu dữ liệu:", typeof pdfFile);
    console.log("Có phải instance của File:", pdfFile instanceof File);

    // 👉 Thêm log dữ liệu FormData để debug lỗi 422
    console.log("🔍 Dữ liệu gửi lên FormData:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await AuthApi.topicRegister(formData);
      if (response.status === 201 || response.status === 200) {
        console.log("Đăng ký đề tài thành công:", response.data);
        setApiSuccess(true);
        resetForm();
        setIsValid(false);
      } else {
        setApiError(
          "Đăng ký thất bại: " +
            (response.data?.message || "Lỗi không xác định")
        );
        setApiSuccess(false);
        console.log("Đăng ký thất bại:", response);
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response?.data);
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(", ")
        : error.response?.data?.message ||
          "Có lỗi khi tải lên file, vui lòng thử lại";
      setApiError(errorMessage);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover pt-20"
      style={{ backgroundImage: `url(${backgroundMain})` }}
    >
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-6xl w-full p-8 bg-transparent shadow-xl rounded-2xl">
          <div className="text-center text-5xl font-bold text-white">
            Uni<span className="text-blue-300">I</span>
            <span className="text-blue-300 text-2xl">dea</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-1xl text-white mb-2 font-medium">
                Tên ý tưởng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Tên ý tưởng của bạn..."
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-1xl text-white mb-2 font-medium">
                Giáo viên hướng dẫn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Giáo viên của bạn..."
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-1xl text-white mb-2 font-medium">
                Mô tả ý tưởng <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Hãy mô tả ý tưởng của bạn (có thể kéo dài độ cao góc dưới bên phải)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-1xl text-white mb-2 font-medium">
                Tải tệp đính kèm PDF (Phải nén các file cần thiết và đẩy lên gg
                drive share công khai và cho vào PDF){" "}
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md transition duration-200 cursor-pointer"
                onClick={triggerPdfInput}
              >
                Chọn tệp PDF
              </button>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={pdfInputRef}
                onChange={handlePdfFileChange}
              />
              {pdfFile && (
                <p className="mt-2 text-white">
                  Tệp PDF đã chọn: {pdfFile.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-1xl text-white mb-2 font-medium">
                Tải ảnh đính kèm (JPEG, PNG, GIF, nếu có)
              </label>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md transition duration-200 cursor-pointer"
                onClick={triggerImageInput}
              >
                Chọn ảnh
              </button>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                ref={imageInputRef}
                onChange={handleImageFileChange}
              />
              {imageFile && (
                <p className="mt-2 text-white">Ảnh đã chọn: {imageFile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-1xl text-white mb-2 font-medium">
                Số thành viên trong team (chọn 1-5){" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                className="max-w-xl px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                value={teamSize}
                onChange={handleTeamSizeChange}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {teamMembers.map((member, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-1xl text-white mb-2 font-medium">
                  Thông tin thành viên {index + 1}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                  value={member.name}
                  onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Mã số sinh viên"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                  value={member.studentId}
                  onChange={(e) =>
                    handleMemberChange(index, "studentId", e.target.value)
                  }
                />
                <select
                  className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                  value={member.university}
                  onChange={(e) =>
                    handleMemberChange(index, "university", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Chọn trường đại học
                  </option>
                  {universities?.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                  value={member.faculty}
                  onChange={(e) =>
                    handleMemberChange(index, "faculty", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Chọn khoa
                  </option>
                  {(faculties[index] || []).map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                  value={member.phone}
                  onChange={(e) =>
                    handleMemberChange(index, "phone", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {message && <p className={`${success} mt-4`}>{message}</p>}

          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-400 text-white px-8 py-2 rounded-lg hover:bg-gray-500 shadow-md cursor-pointer"
              onClick={resetForm}
            >
              Xóa dữ liệu
            </button>
            <button
              className={`px-8 py-2 rounded-lg shadow-md cursor-pointer text-white ${
                isValid
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={isValid ? submitForm : validateForm}
            >
              {isValid ? "Gửi đi" : "Kiểm tra"}
            </button>
          </div>
          {apiError && (
            <p className="text-red-500 text-sm text-center mb-4">{apiError}</p>
          )}

          {apiSuccess && (
            <p className="text-green-500 text-sm text-center mb-4">
              Đăng ký thành công!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
