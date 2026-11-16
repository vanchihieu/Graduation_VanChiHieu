# 🎓 Web Thiệp Mời Tốt Nghiệp Đại Học — Văn Chí Hiếu (KTPM - IUH)

Trang web thiệp mời Lễ Tốt Nghiệp Kỹ sư Kỹ thuật Phần mềm (Software Engineering) tại **Trường Đại học Công nghiệp TP.HCM (IUH)** vào lúc **09:30 Sáng, Thứ Tư 25/11/2026**.

---

## 🚀 1. Cách chạy dự án trên máy

```bash
npm install
npm run dev
```

---

## 📸 2. Cách thay ảnh thật cực nhanh (Không cần sửa code)

Bạn chỉ cần chuẩn bị ảnh kỷ yếu / lễ phục của mình và chép vào thư mục `public/images/` với tên file tương ứng:

- `public/images/hero.jpg` — Ảnh chân dung chính ở đầu trang (tỉ lệ dọc 3:4 là đẹp nhất).
- `public/images/1.jpg` đến `public/images/6.jpg` — 6 bức ảnh trong Album Kỷ Yếu.

Trang web sẽ **tự động hiển thị ảnh thật** ngay khi thấy file! (Nếu muốn đổi tiêu đề/chú thích ảnh, bạn chỉnh trong `src/config/invitationConfig.ts`).

---

## 🎵 3. Cách đổi nhạc nền MP3 yêu thích

- Mặc định web đã có sẵn giai điệu Piano nhẹ nhàng.
- Nếu muốn phát bài hát MP3 riêng, bạn chỉ cần chép file nhạc vào `public/music/bgm.mp3` — web sẽ tự động ưu tiên phát file này.

---

## 🔗 4. Tạo link mời riêng từng tên bạn bè

- Kéo xuống cuối trang bấm nút **"Tạo link mời tên riêng"** (hoặc truy cập `/?host=1`).
- Nhập tên người nhận (VD: `Minh Tuấn`, `Anh Hoàng`, `Thầy Hùng`), chọn cách xưng hô và bấm **Copy Lời Mời + Link** để gửi qua Zalo/Messenger.
- Ví dụ đường link: `https://ten-mien-cua-ban.vercel.app/?to=Minh+Tuấn`

---

## 📊 5. (Tùy chọn) Lưu xác nhận tham dự & lời chúc về Google Sheets

Nếu muốn lưu toàn bộ lời chúc của bạn bè về Google Sheets để xem trên điện thoại khi deploy online:

1. Tạo một file Google Sheet mới, vào **Tiện ích mở rộng (Extensions) -> Apps Script**.
2. Dán đoạn mã sau vào rồi bấm **Triển khai (Deploy) -> Tiện ích mới (New deployment) -> Ứng dụng web (Web App)**, chọn quyền truy cập **Bất kỳ ai (Anyone)**:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.phone || '',
    data.attendance,
    data.guestsCount,
    data.message
  ]);
  return ContentService.createTextOutput('OK');
}
```

3. Copy đường link Web App vừa nhận được dán vào biến `googleSheetWebhookUrl` trong file `src/config/invitationConfig.ts`.

