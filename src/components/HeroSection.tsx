import React, { useEffect, useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Code2,
  MapPin,
  Navigation,
  PhoneCall,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { GuestGreeting } from '../utils/guestPersonalization';
import { SmartPhoto } from './SmartPhoto';

interface HeroSectionProps {
  guest: GuestGreeting;
  onSelectTab: (tab: 'schedule' | 'gallery' | 'map') => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getCountdown(): TimeLeft {
  const diff = Math.max(0, new Date(INVITATION_CONFIG.event.isoDateTime).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guest, onSelectTab }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getCountdown());

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="rounded-3xl bg-white border border-amber-300 shadow-xl p-5 sm:p-8 text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
        {/* Left: Refined Modern Title Lockup + Countdown */}
        <div className="lg:col-span-7 space-y-5 text-left">
          {/* Guest Greeting Pill */}
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-amber-50 border border-amber-300 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              {guest.formalLine}
            </span>
          </div>

          {/* SLEEK MODERN TITLE PLAQUE FOR "LỄ TỐT NGHIỆP — VĂN CHÍ HIẾU" */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/60 border border-blue-200 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full grad-title-badge px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                <Award className="h-3.5 w-3.5 text-amber-300" />
                Lễ Tốt Nghiệp Đại Học • 2026
              </span>
              <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                IUH • Khoa CNTT
              </span>
            </div>

            <p className="font-script text-2xl sm:text-3xl text-amber-600 mt-2">
              Tân Kỹ Sư Kỹ Thuật Phần Mềm
            </p>

            {/* Clean, Powerful Montserrat Hero Name */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight hero-name-modern leading-tight mt-0.5">
              {INVITATION_CONFIG.graduate.fullName}
            </h1>

            {/* Gold & Royal Accent Bar */}
            <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-blue-700 via-amber-500 to-amber-300" />

            {/* Engineer Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-900">
                <Code2 className="h-3.5 w-3.5 text-blue-700" />
                Bachelor of Software Engineering
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-900">
                Trường Đại học Công nghiệp TP.HCM
              </span>
            </div>
          </div>

          {/* Invitation Quote */}
          <div className="rounded-2xl bg-slate-50/90 border-l-4 border-l-blue-600 px-4 py-3.5">
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              “{INVITATION_CONFIG.graduate.quote}”
            </p>
          </div>

          {/* Live Countdown Bar */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Đếm ngược tới 09:30 Sáng • Thứ Tư 25/11/2026
            </p>
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {[
                { label: 'Ngày', value: pad(timeLeft.days) },
                { label: 'Giờ', value: pad(timeLeft.hours) },
                { label: 'Phút', value: pad(timeLeft.minutes) },
                { label: 'Giây', value: pad(timeLeft.seconds) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-gradient-to-b from-blue-700 to-indigo-800 py-3 px-2 text-center shadow-md"
                >
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-amber-300 leading-none">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-wider font-medium text-blue-100">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Date & Location Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-3.5 flex items-start gap-3">
              <div className="rounded-xl bg-amber-400/90 p-2.5 text-slate-900 shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-amber-800">
                  Thời gian đón bạn
                </p>
                <p className="font-display text-sm font-bold text-slate-900 mt-0.5">
                  09:30 Sáng • Thứ Tư
                </p>
                <p className="text-xs font-semibold text-amber-700">Ngày 25/11/2026</p>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-3.5 flex items-start gap-3">
              <div className="rounded-xl bg-blue-700 p-2.5 text-white shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-blue-800">
                  Địa điểm tổ chức
                </p>
                <p className="font-display text-sm font-bold text-slate-900 mt-0.5">
                  ĐH Công Nghiệp TP.HCM
                </p>
                <p className="text-xs text-slate-600">
                  12 Nguyễn Văn Bảo, Gò Vấp
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tab Navigation & Call Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onSelectTab('schedule')}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow hover:bg-blue-800 transition-colors"
            >
              <Calendar className="h-4 w-4 text-amber-300" />
              <span>Xem Lịch Trình &amp; Lưu Lịch</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('map')}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-sm hover:bg-amber-300 transition-colors"
            >
              <Navigation className="h-4 w-4" />
              <span>Bản Đồ Trường IUH</span>
            </button>

            <a
              href={`tel:${INVITATION_CONFIG.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Gọi: {INVITATION_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Right: Portrait Frame + SWE Badge */}
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-sm space-y-3">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-amber-500 p-2.5 shadow-xl">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-blue-50 border border-white/80">
                <SmartPhoto
                  src={INVITATION_CONFIG.graduate.heroPhoto}
                  fallback={INVITATION_CONFIG.graduate.heroFallback}
                  alt={`Tân Kỹ sư ${INVITATION_CONFIG.graduate.fullName}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Clean Nameplate below photo */}
              <div className="mt-2.5 rounded-xl bg-white p-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                    B.Eng. Software Engineering
                  </p>
                  <p className="font-display text-base font-bold text-slate-900">
                    {INVITATION_CONFIG.graduate.fullName}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Graduated
                </span>
              </div>
            </div>

            {/* Light-Mode SWE Terminal Badge */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 font-mono text-[11px] text-left">
              <p className="text-blue-800 font-medium flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>iuh --confer &quot;Văn Chí Hiếu&quot; --major=&quot;KTPM&quot;</span>
              </p>
              <p className="text-emerald-700 font-semibold mt-0.5">
                ✔ Hẹn gặp bạn lúc 09:30 Sáng • 25/11/2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
