import { INVITATION_CONFIG } from '../config/invitationConfig';

// 2026-11-24 16:00 UTC+7 = 2026-11-24 09:00 UTC
const START_UTC = '20261124T090000Z';
const END_UTC = '20261124T113000Z';

export function getGoogleCalendarUrl(): string {
  const title = `Lễ Tốt Nghiệp Đại Học — ${INVITATION_CONFIG.graduate.fullName} (IUH)`;
  const details = [
    `Chung vui Lễ Tốt Nghiệp Kỹ sư Kỹ thuật Phần mềm của ${INVITATION_CONFIG.graduate.fullName}!`,
    `Địa điểm: ${INVITATION_CONFIG.event.venueName} — ${INVITATION_CONFIG.event.address}`,
    `Liên hệ Chí Hiếu khi tới cổng trường: ${INVITATION_CONFIG.contact.phoneDisplay}`,
  ].join('\n');
  const location = `${INVITATION_CONFIG.event.venueName}, ${INVITATION_CONFIG.event.address}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${START_UTC}/${END_UTC}`,
    details,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(): void {
  const title = `Lễ Tốt Nghiệp — ${INVITATION_CONFIG.graduate.fullName} (KTPM - IUH)`;
  const description = `Lễ Tốt Nghiệp Kỹ sư Kỹ thuật Phần mềm của ${INVITATION_CONFIG.graduate.fullName}. Liên hệ: ${INVITATION_CONFIG.contact.phoneDisplay}`;
  const location = `${INVITATION_CONFIG.event.venueName}, ${INVITATION_CONFIG.event.address}`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VanChiHieu//GraduationIUH2026//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:grad-vanchihieu-20261124@iuh.edu.vn`,
    `DTSTAMP:${START_UTC}`,
    `DTSTART:${START_UTC}`,
    `DTEND:${END_UTC}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Nhắc lịch dự Lễ Tốt Nghiệp Văn Chí Hiếu tại IUH!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'le-tot-nghiep-van-chi-hieu-25-11-2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

