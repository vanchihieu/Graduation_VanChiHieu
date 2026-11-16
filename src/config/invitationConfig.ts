export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface JourneyCommit {
  hash: string;
  tag: string;
  year: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  fallback: string;
  title: string;
  caption: string;
  tag: string;
}

export const INVITATION_CONFIG = {
  graduate: {
    fullName: 'Văn Chí Hiếu',
    shortName: 'Chí Hiếu',
    degreeVi: 'Kỹ sư Kỹ thuật Phần mềm',
    degreeEn: 'Bachelor of Software Engineering',
    faculty: 'Khoa Công nghệ Thông tin (FIT)',
    universityVi: 'Trường Đại học Công nghiệp TP. Hồ Chí Minh',
    universityShort: 'IUH',
    classYear: '2026',
    heroPhoto: '/images/hero.jpg',
    heroFallback: '/images/hero-portrait.svg',
    quote:
      'Bốn năm thanh xuân khép lại bằng hàng vạn dòng code, những đêm chạy deadline không ngủ và biết bao kỷ niệm đáng nhớ dưới mái trường IUH. Ngày khoác lên mình chiếc áo Tân Kỹ sư sẽ trọn vẹn và ý nghĩa hơn rất nhiều khi có sự hiện diện chung vui của bạn!',
  },

  event: {
    // ISO 8601 Vietnam Time (UTC+7): 09:30 Sáng ngày 25/11/2026
    isoDateTime: '2026-11-25T09:30:00+07:00',
    endIsoDateTime: '2026-11-25T12:00:00+07:00',
    dayOfWeek: 'Thứ Tư',
    dateDisplay: '25 . 11 . 2026',
    day: 25,
    month: 11,
    year: 2026,
    timeDisplay: '09:30 Sáng',
    venueName: 'Trường Đại học Công nghiệp TP. Hồ Chí Minh (IUH)',
    meetupSpot: 'Khu vực Sân trường & Sảnh Hội trường trung tâm IUH',
    address: '12 Nguyễn Văn Bảo, Phường Hạnh Thông, Quận Gò Vấp, TP. Hồ Chí Minh',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Đại+học+Công+nghiệp+TP.HCM+12+Nguyễn+Văn+Bảo+Gò+Vấp',
    googleMapsEmbed:
      'https://maps.google.com/maps?q=12%20Nguy%E1%BB%85n%20V%C4%83n%20B%E1%BA%A3o,%20G%C3%B2%20V%E1%BA%A5p,%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },

  contact: {
    phoneRaw: '0384153690',
    phoneDisplay: '0384 153 690',
    zaloUrl: 'https://zalo.me/0384153690',
  },

  music: {
    mp3Url: '/music/bgm.mp3',
    trackTitle: 'Graduation Memories — Piano Theme',
  },

  // Tùy chọn: Dán URL Google Apps Script Web App vào đây nếu muốn lưu RSVP về Google Sheets
  googleSheetWebhookUrl: '',

  schedule: [
    {
      time: '07:30 - 09:15',
      title: 'Lễ Trao Bằng Tốt Nghiệp Trong Hội Trường',
      description: 'Chí Hiếu thực hiện nghi thức nhận bằng Kỹ sư Kỹ thuật Phần mềm bên trong hội trường.',
    },
    {
      time: '09:30 - 11:30',
      title: 'Đón Bạn Bè, Giao Lưu & Chụp Hình Kỷ Niệm',
      description:
        'Khung giờ đẹp nhất! Hiếu ra khu vực sân trường để đón bạn bè, chụp ảnh lưu niệm cùng lễ phục tốt nghiệp.',
      highlight: true,
    },
    {
      time: '11:30 - 12:30',
      title: 'Chụp Ảnh Tập Thể & Khép Lại Buổi Lễ',
      description: 'Lưu giữ những khung hình tập thể cùng hội bạn thân, gia đình và anh em Khoa CNTT.',
    },
  ] as ScheduleItem[],

  journey: [
    {
      hash: 'a10f9c2',
      tag: 'init',
      year: 'Cột mốc 01',
      title: 'Hello World @ IUH',
      description:
        'Ngày đầu đặt chân đến 12 Nguyễn Văn Bảo với bao bỡ ngỡ, viết những dòng code đầu tiên và bắt đầu hành trình Kỹ thuật Phần mềm.',
    },
    {
      hash: 'c48e2b7',
      tag: 'feat/core',
      year: 'Cột mốc 02',
      title: 'Thuật Toán, Đồ Án & Những Đêm Thức Trắng',
      description:
        'Từ OOP, Cấu trúc dữ liệu đến Kiến trúc phần mềm — hàng trăm giờ debug cùng đồng đội và những kỷ niệm tuổi trẻ rực rỡ.',
    },
    {
      hash: 'e92d41a',
      tag: ' staging',
      year: 'Cột mốc 03',
      title: 'Thực Tập Doanh Nghiệp & Khóa Luận',
      description:
        'Va chạm dự án thực tế, rèn giũa tư duy của một Software Engineer thực thụ và hoàn thành bảo vệ tốt nghiệp.',
    },
    {
      hash: 'f251126',
      tag: 'v1.0.0-grad',
      year: '25/11/2026',
      title: 'Chính Thức Tốt Nghiệp — Tân Kỹ Sư KTPM',
      description:
        'Deploy thành công cột mốc đại học! Sẵn sàng bước sang chương mới của sự nghiệp với sự chứng kiến của những người thân yêu.',
    },
  ] as JourneyCommit[],

  gallery: [
    {
      id: 1,
      src: '/images/1.jpg',
      fallback: '/images/gallery-1.svg',
      title: 'Khoác Lễ Phục Tân Kỹ Sư',
      caption: 'Khoảnh khắc tự hào khép lại hành trình sinh viên dưới mái trường IUH.',
      tag: 'Graduation',
    },
    {
      id: 2,
      src: '/images/2.jpg',
      fallback: '/images/gallery-2.svg',
      title: 'Chuyên Ngành Kỹ Thuật Phần Mềm',
      caption: 'Nơi rèn luyện tư duy logic, đam mê công nghệ và sáng tạo sản phẩm.',
      tag: 'Software Eng',
    },
    {
      id: 3,
      src: '/images/3.jpg',
      fallback: '/images/gallery-3.svg',
      title: 'Góc Sân Trường 12 Nguyễn Văn Bảo',
      caption: 'Mỗi góc hành lang, giảng đường đều lưu giữ một phần thanh xuân.',
      tag: 'IUH Campus',
    },
    {
      id: 4,
      src: '/images/4.jpg',
      fallback: '/images/gallery-4.svg',
      title: 'Hoàn Thành Đồ Án Tốt Nghiệp',
      caption: 'Build succeeded — 0 errors, 0 warnings, trọn vẹn tâm huyết!',
      tag: 'Milestone',
    },
    {
      id: 5,
      src: '/images/5.jpg',
      fallback: '/images/gallery-5.svg',
      title: 'Đồng Đội & Hội Bạn Đại Học',
      caption: 'Cảm ơn những người bạn đã luôn sát cánh qua từng mùa thi và đồ án.',
      tag: 'Teamwork',
    },
    {
      id: 6,
      src: '/images/6.jpg',
      fallback: '/images/gallery-6.svg',
      title: 'Sẵn Sàng Cho Hành Trình Mới',
      caption: 'Hẹn gặp bạn lúc 09:30 sáng ngày 25/11/2026 để cùng lưu lại bức ảnh đẹp nhất!',
      tag: 'Next Chapter',
    },
  ] as GalleryItem[],

  initialWishes: [
    {
      id: 'seed-1',
      name: 'Hội anh em Khoa CNTT - IUH',
      attendance: 'attending' as const,
      guestsCount: 'Đi cùng nhóm bạn',
      message:
        'Chúc mừng Tân Kỹ sư Văn Chí Hiếu tốt nghiệp rực rỡ! Ra trường code đâu thắng đó, server luôn xanh, sự nghiệp thăng tiến vù vù nhé! 🚀',
      createdAt: 'Vừa xong',
    },
  ],
};

