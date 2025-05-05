import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatboxEllipsesOutline, IoClose } from "react-icons/io5";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const quickReplies = [
    {
      question: "Bạn tên là gì?",
      answer:
        "Tôi là UniIdea Chatbot. Hệ thống quản lý ý tưởng sáng tạo và khởi nghiệp dành cho sinh viên trong môi trường đại học. Hệ thống được xây dựng với mục tiêu tạo ra một nền tảng hiện đại, thuận tiện và hiệu quả, giúp sinh viên có thể dễ dàng đăng ký và trình bày ý tưởng sáng tạo",
    },
    {
      question: "Hướng dẫn sử dụng",
      answer:
        "Sinh viên có thể dễ dàng lướt qua trang chủ (Home) để xem tổng quan về hệ thống cũng như các thông tin cơ bản liên quan đến hoạt động sáng tạo và khởi nghiệp. Nếu muốn đăng ký đề tài hoặc ý tưởng, sinh viên cần phải có tài khoản đăng nhập trên hệ thống. Trong trường hợp chưa có tài khoản, sinh viên cần thực hiện đăng ký trước. Sau khi hoàn tất việc đăng nhập và điền thông tin ý tưởng, hệ thống sẽ tiến hành gửi ý tưởng lên để chờ xét duyệt từ phía nhà trường hoặc ban tổ chức chương trình.",
    },
    {
      question: "Liên hệ hỗ trợ",
      answer:
        "Bạn có thể liên hệ bằng cách ấn Liên hệ trên thanh công cụ. Nhập đầy đủ thông tin cần thiết, thông tin sẽ tự động được gửi về cho quản trị viên",
    },
  ];

  const toggleChat = () => {
    if (isOpen) {
      setMessages([{ sender: "bot", text: "Xin chào! Bạn muốn hỏi gì?" }]);
    }
    setIsOpen(!isOpen);
  };

  const sendQuickMessage = (question, answer) => {
    setMessages([...messages, { sender: "user", text: question }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 left-5 flex items-end z-20">
      {/* Nút mở chat */}
      <motion.button
        onClick={toggleChat}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full shadow-lg bg-blue-500 text-white flex items-center justify-center relative cursor-pointer mb-5 animate-bounce"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <IoClose className="cursor-pointer" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <IoChatboxEllipsesOutline className="cursor-pointer" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hộp chat xuất hiện bên phải button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            className="min-w-100 bg-white shadow-lg rounded-2xl p-3 border border-gray-200 flex flex-col absolute left-16 bottom-0 mb-7"
          >
            <div className="min-w-7">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-sm font-semibold text-blue-700">UniIdea</h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="p-1"
                >
                  <IoClose size={18} className="cursor-pointer" />
                </motion.button>
              </div>
              <div className="flex-1 overflow-y-auto max-h-100 p-2 space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg text-sm ${
                      msg.sender === "bot"
                        ? "bg-gray-100 self-start"
                        : "bg-blue-500 text-white self-end"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex border-t pt-2">
                {/* Các nút chọn nhanh */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((item, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        sendQuickMessage(item.question, item.answer)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
