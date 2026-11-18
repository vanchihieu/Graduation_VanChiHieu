import React, { useMemo } from 'react';
import {
  CalendarPlus,
  Clock,
  Download,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { GuestGreeting } from '../utils/guestPersonalization';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

interface CountdownAndScheduleProps {
  guest: GuestGreeting;
}

export const CountdownAndSchedule: React.FC<CountdownAndScheduleProps> = ({ guest }) => {
  const calendarDays = useMemo(() => {
    const year = INVITATION_CONFIG.event.year;
    const monthIndex = INVITATION_CONFIG.event.month - 1;
    const firstDayJs = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const leadingBlanks = (firstDayJs + 6) % 7;

    const cells: Array<number | null> = [];
    for (let i = 0; i < leadingBlanks; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, []);

  return (
    <div className="rounded-3xl glass-3d-shell overflow-hidden text-slate-900">
      {/* Banner Lễ Phục IUH 2026 (Charcoal -> Cobalt Blue + Yellow Border) */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-800 to-blue-700 px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-yellow-400">
        <span className="font-mono text-xs tracking-wider uppercase text-yellow-300 font-bold">
          ★ LỊCH TRÌNH ĐÓN TIẾP: {guest.displayName.toUpperCase()} ★
        </span>
        <span className="font-mono text-xs font-bold text-white">
          09:30 SÁNG • THỨ TƯ 25/11/2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-6">
        {/* Left: November 2026 Calendar */}
        <div className="lg:col-span-5 rounded-2xl glass-3d-panel p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-blue-700 font-bold">
                  THÁNG 11 • NĂM 2026
                </p>
                <h3 className="font-display text-2xl font-extrabold text-slate-900 mt-0.5">
                  Thứ Tư, 25/11/2026
                </h3>
              </div>
              <div className="rounded-xl bg-slate-900 px-3.5 py-2 text-right shadow">
                <p className="text-[10px] uppercase text-blue-200 font-semibold">Giờ đón</p>
                <p className="font-mono text-sm font-bold text-yellow-300">09:30 AM</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono font-bold text-slate-700 mb-2">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
              {calendarDays.map((day, idx) => {
                const isTarget = day === INVITATION_CONFIG.event.day;
                return (
                  <div
                    key={idx}
                    className={`aspect-square flex items-center justify-center rounded-xl font-mono text-xs sm:text-sm ${
                      !day
                        ? ''
                        : isTarget
                        ? 'bg-blue-700 text-yellow-300 font-extrabold shadow-md scale-110 ring-2 ring-yellow-400'
                        : 'text-slate-800 font-semibold bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {day ?? ''}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <p className="text-xs text-slate-700 font-semibold">
              Lưu lịch hẹn tự động nhắc trước 1 giờ trên điện thoại:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-yellow-300 shadow hover:bg-blue-800 transition-colors"
              >
                <CalendarPlus className="h-4 w-4" />
                <span>Google Calendar</span>
              </a>
              <button
                type="button"
                onClick={downloadIcsFile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <Download className="h-4 w-4 text-blue-700" />
                <span>Lưu lịch iPhone (.ics)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Schedule */}
        <div className="lg:col-span-7 rounded-2xl glass-3d-panel p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>Chương Trình Buổi Sáng 25/11/2026</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
              Khung Giờ Đón Bạn Bè &amp; Chụp Ảnh
            </h3>

            <div className="space-y-3.5">
              {INVITATION_CONFIG.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-4 border-2 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-yellow-50 via-amber-50 to-blue-50 text-slate-900 border-yellow-400 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-xs font-bold ${
                        item.highlight
                          ? 'bg-blue-700 text-yellow-300 shadow-sm'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      {item.time}
                    </span>

                    {item.highlight && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-800">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        Khung giờ đẹp nhất đón bạn bè
                      </span>
                    )}
                  </div>

                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm mt-1 leading-relaxed text-slate-700 font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-blue-50 border border-blue-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-900 font-semibold">
              🎓 Tới cổng trường lúc <span className="text-blue-700 font-mono font-bold">09:30</span>, gọi Chí Hiếu ra đón tận nơi:
            </p>
            <a
              href={`tel:${INVITATION_CONFIG.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-mono font-bold text-yellow-300 shadow hover:bg-blue-800"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>{INVITATION_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
