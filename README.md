# Đại tiệc Khai Hoa · Khối Consumer

Thiệp mời một trang, tông xanh navy, bao thư kính có thể mở bằng chuột, chạm hoặc bàn phím. Pháo hoa tự chạy khi vào trang và khi mở thiệp, không có nút bật/tắt hiệu ứng.

## Chạy trên Windows

Dùng Node.js 20+ và Yarn Classic. Mở terminal ở thư mục có `package.json`:

```powershell
yarn.cmd install --frozen-lockfile
yarn.cmd dev
```

Các script đã có cờ tương thích OpenSSL cho Next.js 9 trên Node.js 20. Nếu đã cài thư viện thì chỉ cần `yarn.cmd dev`.

Nút đếm ngược dưới tiêu đề cập nhật theo thời gian thực đến 18:00 ngày 20/11/2026 (UTC+7). Bấm để xem ngày, giờ, phút, giây; đến giờ sẽ chuyển sang trạng thái khai tiệc.

## Ba bản thiệp

| Người nhận | Link chạy thử |
| --- | --- |
| Sếp Phương | http://localhost:3000/?u=sep-phuong |
| Sếp Bích | http://localhost:3000/?u=sep-bich |
| Team Consumer | http://localhost:3000/?u=team-consumer |

Trang `/` và mã không hợp lệ hiển thị bản Team Consumer. Đây là các bản thiệp cá nhân hóa, không phải các đường link có xác thực. Khi triển khai, thay `http://localhost:3000` bằng tên miền thật để gửi cho khách.

## Nội dung

- 18:00, Thứ Sáu, 20/11/2026, múi giờ Việt Nam.
- Quán Vạn Lộc Phát, link Google Maps do người tổ chức cung cấp.
- 25 người tham dự khối Consumer.
- Dress code: xanh navy, đen, trắng.

Sửa thông tin chung trong `src/config/event.js`; sửa người nhận và lời mời trong `src/config/invitees.json`; sửa thiết kế trong `src/styles/invitation.css`. Không cần `.env`, database hoặc API. Font Manrope cho tiêu đề bên ngoài và Be Vietnam Pro cho nội dung thư được lưu trong public/fonts kèm giấy phép OFL. Họa tiết khảm vàng hình học nằm trong src/components/Geometry.jsx.

## Build

```powershell
yarn.cmd build
yarn.cmd start
```

Dự án giữ Next.js 9 / React 16 của mã nguồn ban đầu; phần nội dung thiệp cưới, quét QR và triển khai Now cũ đã được gỡ khỏi trải nghiệm hiện tại.
