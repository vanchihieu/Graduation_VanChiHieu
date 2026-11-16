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
    <div className="rounded-3xl bg-white border-2 border-amber-400 shadow-xl overflow-hidden text-slate-900">
      {/* Bright Royal Blue Top Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-400">
        <span className="font-mono text-xs tracking-wider uppercase text-amber-300 font-extrabold">
          ★ LỊCH TRÌNH ĐÓN TIẾP: {guest.displayName.toUpperCase()} ★
        </span>
        <span className="font-mono text-xs font-extrabold text-white">
          09:30 SÁNG • THỨ TƯ 25/11/2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: November 2026 Calendar */}
        <div className="lg:col-span-5 p-5 sm:p-7 lg:border-r-2 lg:border-dashed lg:border-blue-200 flex flex-col justify-between bg-gradient-to-b from-blue-50/70 to-amber-50/50">
          <div>
            <div className="flex items-center justify-between border-b-2 border-blue-200 pb-3.5 mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-blue-800 font-extrabold">
                  THÁNG 11 • NĂM 2026
                </p>
                <h3 className="font-serif text-2xl font-extrabold text-slate-900 mt-0.5">
                  Thứ Tư, 25/11/2026
                </h3>
              </div>
              <div className="rounded-xl bg-blue-700 px-3.5 py-2 text-right shadow">
                <p className="text-[10px] uppercase text-blue-100 font-bold">Giờ đón</p>
                <p className="font-mono text-sm font-extrabold text-amber-300">09:30 AM</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono font-extrabold text-blue-900 mb-2">
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
                        ? 'bg-red-600 text-white font-extrabold shadow-md scale-110 ring-2 ring-amber-400'
                        : 'text-slate-900 font-bold bg-white border border-blue-200'
                    }`}
                  >
                    {day ?? ''}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-blue-200 space-y-2">
            <p className="text-xs text-slate-800 font-bold">
              Lưu lịch hẹn tự động nhắc trước 1 giờ trên điện thoại:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-extrabold text-white shadow hover:bg-blue-800 transition-colors"
              >
                <CalendarPlus className="h-4 w-4 text-amber-300" />
                <span>Google Calendar</span>
              </a>
              <button
                type="button"
                onClick={downloadIcsFile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-blue-300 px-4 py-2.5 text-xs font-extrabold text-blue-900 hover:bg-blue-50 transition-colors"
              >
                <Download className="h-4 w-4 text-blue-700" />
                <span>Lưu lịch iPhone (.ics)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Bright Detailed Schedule */}
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-xs font-mono font-extrabold uppercase tracking-widest mb-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>Chương Trình Buổi Sáng 25/11/2026</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
              Khung Giờ Đón Bạn Bè &amp; Chụp Ảnh
            </h3>

            <div className="space-y-3.5">
              {INVITATION_CONFIG.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-4 border-2 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 text-slate-900 border-amber-400 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-xs font-extrabold ${
                        item.highlight
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-blue-700 text-white'
                      }`}
                    >
                      {item.time}
                    </span>

                    {item.highlight && (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-red-700">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                        Khung giờ đẹp nhất đón bạn bè
                      </span>
                    )}
                  </div>

                  <h4
                    className={`text-base font-extrabold mt-1.5 ${
                      item.highlight ? 'text-blue-950' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm mt-1 leading-relaxed font-medium text-slate-700">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-blue-50 border-2 border-blue-300 p-3.5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-900 font-bold">
              🎓 Tới cổng trường lúc <span className="text-red-700 font-mono font-extrabold">09:30</span>, gọi Chí Hiếu ra đón tận nơi:
            </p>
            <a
              href={`tel:${INVITATION_CONFIG.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-mono font-extrabold text-white shadow hover:bg-blue-800"
            >
              <PhoneCall className="h-3.5 w-3.5 text-amber-300" />
              <span>{INVITATION_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
