import { useState } from "react";
import { IoArrowDownOutline, IoArrowRedo } from "react-icons/io5";

import { TL1, TL2, M1, M2, M3 } from "../../assets/files/index";

export default function RuleScreen() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="pt-25 bg-white flex justify-center items-center">
      <div className="bg-white w-1/2 ">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Điều lệ cuộc thi "Ý tưởng sáng tạo khởi nghiệp sinh viên UNETI"
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            1. Mục đích
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cuộc thi "Ý tưởng sáng tạo khởi nghiệp sinh viên UNETI" được tổ chức
            hàng năm bởi Trường Đại học Kinh tế - Kỹ thuật Công nghiệp nhằm:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>
              Khuyến khích tinh thần sáng tạo và khởi nghiệp trong sinh viên.
            </li>
            <li>
              Tạo cơ hội để sinh viên phát huy khả năng sáng tạo, kỹ năng kết
              nối tư duy đa lĩnh vực.
            </li>
            <li>
              Hướng tới tạo ra các ý tưởng có tiềm năng khởi nghiệp và phát
              triển bền vững.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            2. Đối tượng tham gia
          </h2>
          <ul className="list-disc ml-6 text-gray-600">
            <li>
              Sinh viên đang theo học tại Trường Đại học Kinh tế - Kỹ thuật Công
              nghiệp.
            </li>
            <li>
              Sinh viên từ các trường đại học khác quan tâm đến khởi nghiệp và
              đổi mới sáng tạo.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            3. Hình thức tham gia
          </h2>
          <ul className="list-disc ml-6 text-gray-600">
            <li>
              Thí sinh có thể tham gia theo cá nhân hoặc theo nhóm (tối đa 5
              người).
            </li>
            <li>
              Mỗi cá nhân hoặc nhóm có thể đăng ký nhiều ý tưởng hoặc dự án.
            </li>
            <li>
              Nhóm có thể bao gồm sinh viên từ nhiều chuyên ngành khác nhau
            </li>
            <li>
              Nhóm cần hoàn thiện đầy đủ 3 mẫu báo cáo trong mục 10, gộp tất cả
              vào một tệp duy nhất, sau đó nén lại và tải lên hệ thống tại phần
              Đăng ký tài khoản..
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            4. Lĩnh vực dự thi
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cuộc thi không giới hạn lĩnh vực, khuyến khích các ý tưởng sáng tạo
            trong mọi lĩnh vực như:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>Công nghiệp</li>
            <li>Nông nghiệp</li>
            <li>Giáo dục</li>
            <li>Y tế</li>
            <li>Văn hóa</li>
            <li>Du lịch</li>
            <li>Dịch vụ tài chính</li>
            <li>Kinh doanh</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            5. Tiêu chí đánh giá
          </h2>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Tính khả thi của ý tưởng hoặc dự án.</li>
            <li>Tính sáng tạo và đổi mới.</li>
            <li>Khả năng thương mại hóa và phát triển trên thị trường.</li>
            <li>Tác động xã hội và môi trường.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            6. Quy trình cuộc thi
          </h2>
          <ul className="list-decimal ml-6 text-gray-600">
            <li>
              <span className="font-semibold">Nhận hồ sơ:</span> Thời gian nhận
              hồ sơ được thông báo cụ thể trong kế hoạch từng năm.
            </li>
            <li>
              <span className="font-semibold">Vòng sơ khảo:</span> Ban giám khảo
              đánh giá hồ sơ và chọn các ý tưởng xuất sắc vào vòng bán kết.
            </li>
            <li>
              <span className="font-semibold">Vòng bán kết:</span> Các đội thi
              trình bày ý tưởng trước ban giám khảo để chọn ra những đội xuất
              sắc vào vòng chung kết.
            </li>
            <li>
              <span className="font-semibold">Vòng chung kết:</span> Các đội thi
              xuất sắc nhất tranh tài để giành các giải thưởng của cuộc thi.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            7. Giải thưởng
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cuộc thi có cơ cấu giải thưởng hấp dẫn nhằm khuyến khích và hỗ trợ
            các ý tưởng khởi nghiệp tiềm năng. Thông tin chi tiết về giải thưởng
            được công bố trong thông báo cụ thể của từng năm.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            8. Thông tin liên hệ
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Để biết thêm thông tin chi tiết và cập nhật về cuộc thi, vui lòng:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>
              Truy cập trang web chính thức của Trường Đại học Kinh tế - Kỹ
              thuật Công nghiệp.
            </li>
            <li>
              Liên hệ trực tiếp với ban tổ chức qua email hoặc số điện thoại
              được cung cấp trong thông báo chính thức.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            9. Chi tết thể lệ cuộc thi
            <span className="ml-4">
              <IoArrowDownOutline />
            </span>
          </h2>
          <div className="flex flex-col">
            <a
              href={TL1}
              download
              className="mb-2 text-blue-700 hover:text-orange-500 w-fit cursor-pointer"
            >
              1. Kế hoạch 646 - Tổ chức cuộc thi YTSYKN SV UNETI 2021-2022
            </a>
            <a
              href={TL2}
              download
              className="mb-2 text-blue-700 hover:text-orange-500 w-fit cursor-pointer"
            >
              2. Thể lệ cuộc thi YTSTKN SV UNETI 2021-2022
            </a>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            10. Mẫu đăng ký
            <span className="ml-4">
              <IoArrowDownOutline />
            </span>
          </h2>
          <div className="flex flex-col">
            <a
              href={M1}
              download
              className="mb-2 text-blue-700 hover:text-orange-500 w-fit cursor-pointer"
            >
              1. Mẫu 1 - YTSTKNSV
            </a>
            <a
              href={M2}
              download
              className="mb-2 text-blue-700 hover:text-orange-500 w-fit cursor-pointer"
            >
              2. Mẫu 2 - YTSTKNSV
            </a>
            <a
              href={M3}
              download
              className="mb-2 text-blue-700 hover:text-orange-500 w-fit cursor-pointer"
            >
              3. Mẫu 3 - YTSTKNSV
            </a>
          </div>
        </section>

        <div className="pt-6 pb-6 w-full">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agreement"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agreement" className="ml-2 text-gray-700">
              Tôi đã đọc và đồng ý với điều lệ trên
            </label>
          </div>
          <a
            href={isChecked ? "/idea-register" : null}
            className={`flex items-center py-2 font-semibold transition duration-200 ${
              isChecked
                ? " text-blue-700 hover:text-orange-500"
                : " text-gray-500 cursor-not-allowed"
            }`}
          >
            Tiếp Tục{" "}
            <span className="ml-2">
              <IoArrowRedo />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
