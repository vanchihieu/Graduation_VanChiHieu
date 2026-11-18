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
  productionUrl: 'https://graduation-van-chi-hieu.vercel.app/',
  graduate: {
    fullName: 'Văn Chí Hiếu',
    shortName: 'Chí Hiếu',
    degreeVi: 'Kỹ sư Kỹ thuật Phần mềm',
    degreeEn: 'Bachelor of Software Engineering',
    faculty: 'Khoa Công nghệ Thông tin (FIT)',
    universityVi: 'Trường Đại học Công nghiệp TP. Hồ Chí Minh',
    universityShort: 'IUH',
    classYear: '2026',
    heroPhoto: '/images/VanChiHieu_TrangPhuc.png',
    heroFallback: '/images/iuh-2026-gown.jpg',
    quote:
      'Bốn năm rưỡi thanh xuân khép lại bằng hàng vạn dòng code, những đêm chạy deadline không ngủ và biết bao kỷ niệm đáng nhớ dưới mái trường IUH. Ngày khoác lên mình chiếc áo Tân Kỹ sư sẽ trọn vẹn và ý nghĩa hơn rất nhiều khi có sự hiện diện chung vui của bạn!',
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
    trackTitle: 'Sống Như Những Đóa Hoa — Tạ Quang Thắng',
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
      src: '/images/HocBong1.png',
      fallback: '/images/gallery-1.svg',
      title: 'Thành Tích Học Bổng Tại IUH #1',
      caption: 'Minh chứng cho những nỗ lực học tập không ngừng nghỉ trong suốt chặng đường đại học.',
      tag: 'Scholarship',
    },
    {
      id: 2,
      src: '/images/HocBong2.png',
      fallback: '/images/gallery-2.svg',
      title: 'Thành Tích Học Bổng Tại IUH #2',
      caption: 'Giữ vững phong độ học tập chuyên ngành Kỹ thuật Phần mềm qua từng học kỳ.',
      tag: 'Scholarship',
    },
    {
      id: 3,
      src: '/images/HocBong3.png',
      fallback: '/images/gallery-3.svg',
      title: 'Thành Tích Học Bổng Tại IUH #3',
      caption: 'Kết quả xứng đáng từ những ngày miệt mài nghiên cứu và làm đồ án.',
      tag: 'Scholarship',
    },
    {
      id: 4,
      src: '/images/HocBong4.png',
      fallback: '/images/gallery-4.svg',
      title: 'Thành Tích Học Bổng Tại IUH #4',
      caption: 'Tự hào mang về liên tiếp các suất học bổng khuyến khích học tập của IUH.',
      tag: 'Scholarship',
    },
    {
      id: 5,
      src: '/images/Banbe.png',
      fallback: '/images/gallery-5.svg',
      title: 'Đồng Đội & Hội Bạn Thân IUH',
      caption: 'Cảm ơn những người anh em, bạn bè đã luôn sát cánh qua từng mùa thi và đồ án.',
      tag: 'Friends & Team',
    },
    {
      id: 6,
      src: '/images/VanChiHieu_TrangPhuc.png',
      fallback: '/images/gallery-6.svg',
      title: 'Khoác Lễ Phục Tân Kỹ Sư KTPM',
      caption: 'Hẹn gặp bạn lúc 09:30 sáng ngày 25/11/2026 tại IUH để cùng lưu lại những bức ảnh đẹp nhất!',
      tag: 'Graduation 2026',
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

  fatherTribute: {
    title: 'Ký Ức Hoài Niệm & Tri Ân Ba',
    fatherPhoto: '/images/BaVaHieu.jpg',
    fatherFallback: '/images/father-memorial.svg',
    fatherLabel: 'Kính nhớ Ba',
    passedNote: 'Linh hồn Phêrô Văn Nhân • Đã về Nhà Cha',
    bibleVerse:
      '“Con đã đấu trong cuộc thi đấu cao đẹp, đã chạy hết chặng đường, đã giữ vững niềm tin.”',
    bibleRef: '2 Timôthê 4,7',
    memories: [
      {
        heading: 'Gửi Ba trong ngày con nhận bằng tốt nghiệp',
        body: 'Suốt 4.5 năm đại học tại IUH, Ba vẫn luôn trọn vẹn hiện diện, sống và đồng hành bên con qua từng học kỳ. Ba chỉ vừa an nghỉ về bên Chúa gần đây khi con vừa kịp hoàn thành xong hết toàn bộ chương trình học. Dù ngày làm lễ trao bằng hôm nay không còn bóng dáng Ba đứng đợi ngoài sân trường, nhưng con tin chắc từ trên Thiên Đàng, Ba đang mỉm cười hiền hậu và tự hào nhìn xuống con.',
      },
      {
        heading: 'Những dòng ký ức ấm áp bên Ba',
        body: 'Từ lúc con biết nhớ cho đến tận bây giờ, Ba luôn là người lo lắng, che chở và không để con phải thiếu thốn bất kỳ thứ gì. Suốt những năm tháng đi học đến tận khi hoàn thành 4.5 năm đại học, Ba luôn âm thầm gánh vác mọi vất vả để con có điều kiện tốt nhất theo đuổi con đường Kỹ sư Phần mềm, đồng thời dạy con biết sống ngay thẳng và giữ vững đức tin Công giáo. Tình thương bao la và sự hy sinh của Ba là điều con khắc cốt ghi tâm suốt đời.',
      },
    ],
    prayerText:
      'Lạy Chúa, xin thương đón nhận linh hồn Phêrô của con vào hưởng ánh sáng tôn nhan Chúa muôn đời. Xin ban sức khỏe và bình an cho Mẹ và gia đình chúng con trong ngày vui hôm nay. Amen.',
  },
};

