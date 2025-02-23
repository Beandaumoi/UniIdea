import { useState } from "react";

import { backgroundMain } from "../assets/images";
import { TagInput } from "../component/index";

export default function IdeaRegisterScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState("");
  const [idea, setIdea] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [teamSize, setTeamSize] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [leaderIndex, setLeaderIndex] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleTeamSizeChange = (e) => {
    let size =
      e.target.value === ""
        ? ""
        : Math.max(1, parseInt(e.target.value, 10) || 0);
    setTeamSize(size);
    setTeamMembers(new Array(size || 0).fill(""));
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = value;
    setTeamMembers(updatedMembers);
  };

  const resetForm = () => {
    setIdea("");
    setDescription("");
    setUniversity("");
    setTeamSize(0);
    setTeamMembers([]);
    setMessage("");
    setEmail("");
  };

  const validateForm = () => {
    if (
      !idea ||
      !description ||
      !university ||
      teamSize <= 0 ||
      teamMembers.some((m) => !m)
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      setSuccess("text-red-600");
      setIsValid(false);
    } else if (!validateEmail(email)) {
      setEmailError("Nhập đúng email để được chứng nhận!");
      setSuccess("text-red-600");
      setIsValid(false);
    } else {
      setMessage("Dữ liệu hợp lệ. Bạn có thể gửi đăng ký!");
      setEmailError("");
      setSuccess("text-green-600");
      setIsValid(true);
    }
  };

  const submitForm = () => {
    alert("Dữ liệu đã được gửi!");
    resetForm();
    setIsValid(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundMain})` }}
    >
      {/* Nội dung chính */}
      <div className=" flex-grow flex items-center justify-center">
        <div className=" max-w-6xl w-full p-8 bg-transparent shadow-xl rounded-2xl">
          <div className=" text-center text-5xl font-bold text-white">
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
                Trường đại học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Tên trường đại học của bạn..."
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-1xl text-white mb-2 font-medium">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Tên trường đại học của bạn..."
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError ? (
                <label className="block text-red-500 mt-2 text-sm">
                  <span className="text-red-500">*</span> {emailError}
                </label>
              ) : (
                <label></label>
              )}
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
                Số thành viên trong team <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                min={1}
                value={teamSize}
                onChange={handleTeamSizeChange}
                onFocus={(e) => e.target.value === "0" && setTeamSize("")}
                onBlur={() => teamSize === "" && setTeamSize(0)}
              />
            </div>

            {teamMembers.map((member, index) => (
              <div key={index}>
                <label className="block text-1xl text-white mb-2 font-medium">
                  Thành viên {index + 1} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-0 focus:border-transparent"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                />
                <label className="block text-1xl text-white mb-2 font-medium">
                  Hãy nhập một số thông tin của thành viên (MSSV, Khoa, Lớp,
                  SĐT)
                  <span className="text-red-500">*</span>
                </label>
                <TagInput />

                {/* Radio Button chọn Leader */}
                <label className="flex items-center mt-4 space-x-1">
                  <input
                    type="radio"
                    name="leader"
                    checked={leaderIndex === index}
                    onChange={() => setLeaderIndex(index)}
                  />
                  <span className="ml-2 text-1xl text-white">Leader</span>
                </label>
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
        </div>
      </div>
    </div>
  );
}
