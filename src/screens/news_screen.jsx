import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newspaper_image, eg_news_image } from "../assets/images";
import AuthApi from "../network/AuthApi";
import { IoArrowBackOutline, IoArrowDownCircleOutline } from "react-icons/io5";

export default function NewspaperScreen() {
  // const [comments, setComments] = useState([
  //   {
  //     id: 1,
  //     name: "Nguyễn Văn A",
  //     avatar: "https://i.pravatar.cc/50?img=3",
  //     text: "Bài viết rất hữu ích!",
  //   },
  //   {
  //     id: 2,
  //     name: "Trần Thị B",
  //     avatar: "https://i.pravatar.cc/50?img=5",
  //     text: "Mình rất quan tâm đến chủ đề này!",
  //   },
  // ]);

  // const teacherReviews = [
  //   {
  //     id: 1,
  //     name: "PGS. TS. Nguyễn Văn C",
  //     stars: 5,
  //     comment: "Bài viết rất hay, thông tin hữu ích!",
  //     avatar: "https://i.pravatar.cc/80?img=10",
  //   },
  //   {
  //     id: 2,
  //     name: "TS. Trần Thị D",
  //     stars: 4,
  //     comment: "Nội dung tốt nhưng cần bổ sung thêm dẫn chứng thực tế.",
  //     avatar: "https://i.pravatar.cc/80?img=12",
  //   },
  //   {
  //     id: 3,
  //     name: "GS. TS. Lê Hoàng E",
  //     stars: 5,
  //     comment: "Rất ấn tượng với cách trình bày bài viết!",
  //     avatar: "https://i.pravatar.cc/80?img=15",
  //   },
  //   {
  //     id: 4,
  //     name: "TS. Nguyễn Hữu F",
  //     stars: 3,
  //     comment: "Bài viết ổn nhưng có thể cải thiện về số liệu.",
  //     avatar: "https://i.pravatar.cc/80?img=18",
  //   },
  // ];
  // const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentReviewIndex(
  //       (prevIndex) => (prevIndex + 1) % teacherReviews.length
  //     );
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // const [newComment, setNewComment] = useState("");

  // const addComment = () => {
  //   if (newComment.trim() === "") return;
  //   const newEntry = {
  //     id: Date.now(),
  //     name: "Bạn",
  //     avatar: "https://i.pravatar.cc/50?img=8",
  //     text: newComment,
  //   };
  //   setComments([newEntry, ...comments]);
  //   setNewComment("");
  // };

  // const deleteComment = (id) => {
  //   setComments(comments.filter((comment) => comment.id !== id));
  // };
  const navigate = useNavigate();
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy chi tiết topic
        const topicResponse = await AuthApi.getTopicDetail(id);
        setTopic(topicResponse.data || {});

        // Lấy danh sách trường và khoa
        const universitiesResponse = await AuthApi.pickUniversity();
        setUniversities(universitiesResponse.data || []);

        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError("Không thể tải dữ liệu.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Tạo bản đồ tra cứu cho trường và khoa
  const universityMap = useMemo(() => {
    const map = {};
    universities.forEach((uni) => {
      map[uni.id] = uni.name;
    });
    return map;
  }, [universities]);

  const facultyMap = useMemo(() => {
    const map = {};
    universities.forEach((uni) => {
      uni.faculties.forEach((faculty) => {
        map[faculty.id] = faculty.name;
      });
    });
    return map;
  }, [universities]);

  // Hiển thị tên giải thưởng
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

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!topic) {
    return <div className="text-center py-10">Không tìm thấy topic.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto pt-20 bg-white mt-10 mb-10 p-6 text-justify">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-6 text-xl cursor-pointer"
      >
        <IoArrowBackOutline size={20} className="mr-2" />
        Quay lại
      </button>
      <h1 className="text-3xl font-bold text-gray-900 leading-tight">
        {topic?.topic_name?.toUpperCase()}
      </h1>
      <p className="text-gray-500 text-lg mt-2">Năm: {topic.submission_year}</p>
      <p className="text-gray-500 text-lg mt-2">
        Giáo viên hướng dẫn: {topic.guidance_teacher}
      </p>
      <p className="text-gray-500 text-lg mt-2">
        Email trưởng nhóm: {topic.leader_email}
      </p>
      <p className="text-gray-500 text-lg mt-2">Mô tả: {topic.description}</p>
      <p className="text-gray-500 text-lg mt-2">
        Thành viên: {topic.members?.length || 0}
      </p>

      <div className="overflow-x-auto mt-6 rounded-md shadow-md border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-800 uppercase text-xs font-semibold">
              <th className="p-3 w-2/12 text-center text-lg">Tên</th>
              <th className="p-3 w-2/12 text-center text-lg">MSSV</th>
              <th className="p-3 w-2/12 text-center text-lg">Trường</th>
              <th className="p-3 w-2/12 text-center text-lg">Khoa</th>
              <th className="p-3 w-2/12 text-center text-lg">SĐT</th>
            </tr>
          </thead>
          <tbody>
            {topic?.members?.map((member, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-t border-gray-200"
              >
                <td className="p-3 text-center text-lg">
                  {member.name || "Không rõ"}
                </td>
                <td className="p-3 text-center text-lg">
                  {member.student_id || "Không rõ"}
                </td>
                <td className="p-3 text-center text-lg">
                  {universityMap[member.university_id] || "Không rõ"}
                </td>
                <td className="p-3 text-center text-lg">
                  {facultyMap[member.faculty_id] || "Không rõ"}
                </td>
                <td className="p-3 text-center text-lg">
                  {member.phone || "Không rõ"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-gray-800 mt-8 leading-relaxed">
        Trong những năm gần đây, nhằm định hướng phát triển trở thành đại học
        nghiên cứu đa ngành, đa lĩnh vực, Đại học Bách khoa Hà Nội đã không
        ngừng triển khai nhiều chủ trương và giải pháp đổi mới trong lĩnh vực
        khoa học và công nghệ.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Đặc biệt, nhà trường tập trung đẩy mạnh nghiên cứu, chuyển giao tri thức
        và công nghệ trong lĩnh vực ứng dụng nông nghiệp thông minh. Các hướng
        nghiên cứu mới được xây dựng nhằm ứng dụng công nghệ tiên tiến như AI,
        IoT, và dữ liệu lớn vào sản xuất nông nghiệp.
      </p>

      <div className="mt-6">
        <img
          src={newspaper_image || topic.topic_image}
          onError={(e) => {
            e.target.onerror = null; // Ngăn lặp vô hạn nếu ảnh fallback cũng lỗi
            e.target.src = newspaper_image;
          }}
          alt="Giới thiệu sản phẩm nghiên cứu khoa học"
          className="w-full rounded-lg shadow-md"
        />
        <p className="text-gray-600 text-sm mt-2 italic text-center">
          Giới thiệu sản phẩm nghiên cứu khoa học của sinh viên Đại học Bách
          khoa Hà Nội.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mt-6">
        Thúc đẩy nghiên cứu, đổi mới sáng tạo, khởi nghiệp trong ứng dụng nông
        nghiệp thông minh
      </h2>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Với định hướng trở thành đại học hàng đầu khu vực về khoa học và công
        nghệ, Đại học Bách khoa Hà Nội không ngừng nâng cao năng lực và uy tín
        khoa học thông qua các hoạt động nghiên cứu, đặc biệt trong lĩnh vực ứng
        dụng nông nghiệp thông minh.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Phó Giáo sư Huỳnh Quyết Thắng, Giám đốc Đại học Bách khoa Hà Nội cho
        biết, nhà trường đã quy hoạch phát triển bốn lĩnh vực khoa học công nghệ
        ưu tiên, trong đó Công nghệ dữ liệu và hệ thông minh được ứng dụng mạnh
        mẽ vào nông nghiệp. Nhà trường đã đầu tư xây dựng các phòng thí nghiệm
        đào tạo và nghiên cứu, phục vụ thiết kế cảm biến môi trường, hệ thống
        giám sát cây trồng, chăn nuôi tự động và giải pháp nông nghiệp chính
        xác.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Đến nay, nhà trường đã hình thành các nhóm nghiên cứu mạnh, tiêu biểu là
        nhóm phát triển thiết bị bay không người lái (UAV) phục vụ giám sát đồng
        ruộng, hệ thống cảm biến IoT đo độ ẩm, nhiệt độ đất và thiết kế hệ thống
        tưới tiêu tự động. Đặc biệt, công nghệ trí tuệ nhân tạo (AI) đã được ứng
        dụng vào phân tích dữ liệu cây trồng, dự báo sâu bệnh và tối ưu hoá quy
        trình sản xuất nông nghiệp.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Nhà trường xây dựng hệ sinh thái nghiên cứu, đổi mới sáng tạo và khởi
        nghiệp xoay quanh sinh viên, học viên cao học và nghiên cứu sinh từ 6
        trường, 6 viện nghiên cứu, 44 phòng thí nghiệm và hơn 100 nhóm nghiên
        cứu. Trong lĩnh vực nông nghiệp thông minh, sinh viên đã tham gia các dự
        án khởi nghiệp như phát triển hệ thống nhà kính thông minh, ứng dụng
        nhận diện bệnh cây qua hình ảnh, và giải pháp truy xuất nguồn gốc sản
        phẩm nông sản.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Năm 2023, nhà trường triển khai 173 đề tài nghiên cứu với tổng kinh phí
        trên 44 tỷ đồng, trong đó các đề tài liên quan đến nông nghiệp chiếm tỷ
        lệ đáng kể. Số công bố khoa học quốc tế tăng trung bình 10% mỗi năm, với
        hơn 1.100 công bố thuộc hệ thống ISI/Scopus. Đặc biệt, nhà trường sở hữu
        29 văn bằng độc quyền sở hữu trí tuệ trong năm 2023, trong đó nhiều sáng
        chế được ứng dụng vào sản xuất nông nghiệp.
      </p>
      <div className="mt-6">
        <img
          src={eg_news_image || topic.topic_image}
          onError={(e) => {
            e.target.onerror = null; // Ngăn lặp vô hạn nếu ảnh fallback cũng lỗi
            e.target.src = newspaper_image;
          }}
          alt="Giới thiệu sản phẩm áp dụng nông nghiệp"
          className="w-full rounded-lg shadow-md"
        />
        <p className="text-gray-600 text-sm mt-2 italic text-center">
          Giới thiệu sản phẩm áp dụng vào nông nghiệp
        </p>
      </div>

      <p className="text-gray-800 mt-4 leading-relaxed">
        Một dấu ấn quan trọng là sự ra đời của Quỹ Đầu tư khởi nghiệp sáng tạo
        Bách khoa Hà Nội (BK-Fund), hỗ trợ mạnh mẽ cho các dự án nông nghiệp
        thông minh từ ý tưởng đến thương mại hóa. Quỹ không chỉ cung cấp vốn mà
        còn kết nối các startup với mạng lưới cố vấn, doanh nghiệp và nhà đầu
        tư.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Cùng với hệ sinh thái đổi mới sáng tạo, nhà trường đã thiết lập không
        gian làm việc sáng tạo chung, tổ chức gần 50 khóa học khởi nghiệp, thu
        hút hơn 700 sinh viên và 100 doanh nghiệp tham gia. Các cuộc thi khởi
        nghiệp, chương trình cố vấn và mạng lưới nhà đầu tư thiên thần đã giúp
        hình thành 9 công ty Spin-off, 80 công ty Start-up, trong đó có nhiều
        doanh nghiệp tập trung vào giải pháp nông nghiệp bền vững.
      </p>

      <p className="text-gray-800 mt-4 leading-relaxed">
        Cùng với hệ sinh thái đổi mới sáng tạo, nhà trường đã thiết lập không
        gian làm việc sáng tạo chung, tổ chức gần 50 khóa học khởi nghiệp, thu
        hút hơn 700 sinh viên và 100 doanh nghiệp tham gia. Các cuộc thi khởi
        nghiệp, chương trình cố vấn và mạng lưới nhà đầu tư thiên thần đã giúp
        hình thành 9 công ty Spin-off, 80 công ty Start-up, trong đó có nhiều
        doanh nghiệp tập trung vào giải pháp nông nghiệp bền vững.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-6">
        Đẩy mạnh kết nối nguồn lực trong nông nghiệp thông minh
      </h2>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Đại học Bách khoa Hà Nội là đơn vị thường trực của mạng lưới 29 trường
        đại học kỹ thuật và công nghệ Việt Nam, tạo điều kiện hợp tác trong
        nghiên cứu và chuyển giao công nghệ nông nghiệp thông minh. Nhà trường
        đã ký kết nhiều thỏa thuận hợp tác với doanh nghiệp nông nghiệp, triển
        khai các phòng thí nghiệm dùng chung và nghiên cứu theo đặt hàng của
        doanh nghiệp.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        Phó Hiệu trưởng Huỳnh Đăng Chính chia sẻ, dù đạt nhiều thành tựu nhưng
        nhà trường vẫn đối mặt với thách thức như quy định pháp lý về doanh
        nghiệp khoa học công nghệ còn hạn chế, nguồn vốn hỗ trợ khởi nghiệp cho
        sinh viên chưa đủ mạnh và khó khăn trong kêu gọi đầu tư cho dự án nông
        nghiệp do rủi ro cao.
      </p>
      <p className="text-gray-800 mt-4 leading-relaxed">
        "Thời gian tới, chúng tôi mong thành phố Hà Nội sẽ hỗ trợ thêm ngân sách
        cho hoạt động đổi mới sáng tạo, đặc biệt trong lĩnh vực nông nghiệp
        thông minh, và tạo cơ hội cho nhà trường kết nối sâu rộng với doanh
        nghiệp nhằm gắn kết nghiên cứu khoa học với nhu cầu thực tiễn," Phó Hiệu
        trưởng Huỳnh Đăng Chính nhấn mạnh.
      </p>

      {topic.award ? (
        <p className="text-gray-500 text-lg mt-6">
          Đạt giải: {displayAward(topic.award)}
        </p>
      ) : (
        <span></span>
      )}

      <div>
        <h3 className="flex items-center text-2xl font-semibold text-gray-900 my-6">
          Để xem chi tiết hơn về ý tưởng hãy xem qua file của nhóm{" "}
          <span className="ml-4">
            <IoArrowDownCircleOutline />{" "}
          </span>
        </h3>
        <a
          href={`http://127.0.0.1:8000/${topic?.report_file}`}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 text-blue-700 hover:text-orange-500 w-fit cursor-pointer text-lg"
        >
          File báo cáo của nhóm
        </a>
        <br></br>
        {topic?.topic_image ? (
          <a
            href={`http://127.0.0.1:8000/${topic?.topic_image}`}
            download
            target="_blank"
            className="mb-2 text-blue-700 hover:text-orange-500 w-fit cursor-pointer text-lg"
          >
            Ảnh báo cáo của nhóm
          </a>
        ) : (
          <span></span>
        )}
      </div>

      {/* Phần Đánh Giá của Giáo Viên
      <div className="mt-6 pt-4">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2">
          Đánh giá của giáo viên
        </h2>
        <div className="relative overflow-hidden w-full h-40 border rounded-lg shadow-md bg-gray-100 flex items-center">
          <div
            className="flex transition-transform duration-1000"
            style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
          >
            {teacherReviews.map((review) => (
              <div
                key={review.id}
                className="w-full flex-shrink-0 flex items-center p-4 space-x-4"
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full shadow-md"
                />
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-yellow-500">
                    {"★".repeat(review.stars)}
                    {"☆".repeat(5 - review.stars)}
                  </p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phần Bình Luận 
        <div className="mt-6 pt-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Bình luận</h2>
        <div className="flex items-center space-x-3">
          <img
            src="https://i.pravatar.cc/50?img=8"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            className="flex-1 border rounded-lg p-2"
            placeholder="Viết bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            onClick={addComment}
          >
            Gửi
          </button>
        </div>

        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start mt-8 ml-8">
            <img
              src={comment.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 ml-4">
              <p className="font-semibold text-gray-800">{comment.name}</p>
              <p c  lassName="text-gray-700">{comment.text}</p>
            </div>
            {comment.name === "Bạn" && (
              <button
                className="text-red-500 cursor-pointer"
                onClick={() => deleteComment(comment.id)}
              >
                Gỡ bình luận
              </button>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
}
