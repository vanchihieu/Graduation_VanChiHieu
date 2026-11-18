import React, { useEffect, useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Code2,
  MapPin,
  Move3d,
  Navigation,
  PhoneCall,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { GuestGreeting } from '../utils/guestPersonalization';
import { getGoogleCalendarUrl } from '../utils/calendar';
import { SmartPhoto } from './SmartPhoto';
import { Tilt3DCard } from './Tilt3DCard';
import { InteractiveGradCap3D } from './GraduationScene3D';

interface HeroSectionProps {
  guest: GuestGreeting;
  onSelectTab: (tab: 'gallery' | 'map' | 'tribute') => void;
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
    <div className="rounded-3xl glass-3d-shell p-5 sm:p-8 text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
        {/* Left: Bold, Clear, High-Impact Typography + Countdown */}
        <div className="lg:col-span-7 space-y-4.5 text-left">
          {/* Guest Greeting Pill - Nền Xanh Hoàng Gia + Highlight tên Vàng Rực không xuống dòng */}
          <div className="inline-flex items-center gap-2 rounded-2xl sm:rounded-full bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 border-2 border-yellow-400 px-4 py-2 shadow-md max-w-full">
            <Sparkles className="h-4 w-4 text-yellow-300 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-white leading-snug">
              {guest.invitePrefix}{' '}
              <strong className="text-yellow-300 font-extrabold whitespace-nowrap">
                {guest.inviteTarget}
              </strong>{' '}
              {guest.inviteSuffix}
            </span>
          </div>

          {/* TITLE PLAQUE — To, rõ, sắc nét & cuốn hút */}
          <Tilt3DCard maxTilt={3} className="rounded-2xl">
            <div className="relative rounded-2xl glass-3d-panel p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full grad-title-badge px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  <Award className="h-4 w-4 text-yellow-300" />
                  Lễ Tốt Nghiệp Đại Học • 2026
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
                  IUH • Khoa CNTT
                </span>
              </div>

              <p className="font-script text-3xl sm:text-4xl text-blue-700 mt-2">
                Tân Kỹ Sư Kỹ Thuật Phần Mềm
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight hero-name-modern leading-[1.1] mt-1">
                {INVITATION_CONFIG.graduate.fullName}
              </h1>

              <div className="mt-3.5 h-1.5 w-32 rounded-full bg-gradient-to-r from-slate-900 via-blue-600 to-yellow-400" />

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2 text-xs sm:text-sm font-bold text-blue-900">
                  <Code2 className="h-4 w-4 text-blue-700" />
                  Software Engineering
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-yellow-50 border border-yellow-300 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900">
                  ĐH Công Nghiệp TP.HCM
                </span>
              </div>
            </div>
          </Tilt3DCard>

          {/* Invitation Quote */}
          <div className="rounded-2xl glass-3d-panel border-l-4 border-l-blue-600 px-4 py-3.5 mt-4">
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              “{INVITATION_CONFIG.graduate.quote}”
            </p>
          </div>

          {/* Live Countdown Bar */}
          <div className="pt-1">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
              ⏳ Đếm ngược tới 09:30 Sáng • Thứ Tư 25/11/2026
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
                  className="rounded-2xl bg-gradient-to-b from-slate-900 to-blue-900 py-3 px-2 text-center shadow-md border-b-4 border-yellow-400"
                >
                  <p className="font-display text-2xl sm:text-4xl font-black text-yellow-300 leading-none">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-xs uppercase tracking-wider font-bold text-blue-100">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>


      
        </div>

        {/* Right: Interactive 3D IUH 2026 Cap + Portrait */}
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-sm space-y-3">

            {/* 3D Tilt Graduation Portrait */}
            <Tilt3DCard maxTilt={7}>
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-700 to-yellow-400 p-2.5 shadow-xl">
                <div className="aspect-[4/4.2] w-full overflow-hidden rounded-xl bg-white border border-white/80">
                  <SmartPhoto
                    src={INVITATION_CONFIG.graduate.heroPhoto}
                    fallback={INVITATION_CONFIG.graduate.heroFallback}
                    alt={`Tân Kỹ sư ${INVITATION_CONFIG.graduate.fullName}`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                {/* Clean Nameplate below photo */}
                <div className="mt-2.5 rounded-xl bg-white p-3.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                      Tân Kỹ Sư IUH 2026 • KTPM
                    </p>
                    <p className="font-display text-lg font-extrabold text-slate-900">
                      {INVITATION_CONFIG.graduate.fullName}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Graduated
                  </span>
                </div>
              </div>
            </Tilt3DCard>

            {/* Light-Mode SWE Terminal Badge */}
            <div className="rounded-xl glass-3d-panel px-4 py-2.5 font-mono text-xs text-left">
              <p className="text-emerald-700 font-bold mt-0.5">
                ✔ Hẹn gặp bạn lúc 09:30 Sáng • 25/11/2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
