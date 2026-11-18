import React from 'react';
import { Award, GraduationCap, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { GuestGreeting } from '../utils/guestPersonalization';

interface WelcomeEnvelopeModalProps {
  guest: GuestGreeting;
  onOpen: (withMusic: boolean) => void;
}

export const WelcomeEnvelopeModal: React.FC<WelcomeEnvelopeModalProps> = ({ guest, onOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-slate-900 via-blue-700 to-yellow-400 p-1 shadow-2xl">
        <div className="rounded-[22px] bg-white/95 backdrop-blur-md px-6 py-8 sm:px-10 sm:py-10 text-center">
          {/* University Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-slate-900 mb-5">
            <Award className="w-4 h-4 text-blue-700" />
            <span>IUH • SOFTWARE ENGINEERING • 2026</span>
          </div>

          {/* Cap Icon */}
          <div className="mx-auto mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-700 p-4 w-fit shadow-md border border-yellow-400">
            <GraduationCap className="h-10 w-10 text-yellow-300" />
          </div>

          <p className="font-script text-3xl sm:text-4xl text-blue-700 mb-1">
            Thiệp Mời Lễ Tốt Nghiệp
          </p>

          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight hero-name-modern py-1">
            {INVITATION_CONFIG.graduate.fullName}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 font-bold mt-1 mb-6">
            Tân {INVITATION_CONFIG.graduate.degreeVi} • {INVITATION_CONFIG.graduate.universityShort}
          </p>

          {/* Guest Box - Nổi bật Vàng Rực trên nền Xanh Hoàng Gia, giữ tên 1 dòng không xuống hàng */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-2 border-yellow-400 px-4 py-4 sm:px-6 sm:py-5 mb-6 shadow-lg">
            <p className="font-script text-2xl text-blue-100 mb-1">
              Trân trọng thân mời
            </p>
            <p className="font-display font-black text-yellow-300 whitespace-nowrap text-[clamp(1.15rem,4.6vw,1.85rem)] tracking-tight leading-snug">
              {guest.displayName}
            </p>
            <p className="mt-2.5 text-xs sm:text-sm font-bold text-blue-100">
              {INVITATION_CONFIG.event.timeDisplay} • {INVITATION_CONFIG.event.dayOfWeek},{' '}
              {INVITATION_CONFIG.event.dateDisplay}
            </p>
          </div>

          {/* Open CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => onOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 px-6 py-4 text-base font-bold text-white shadow-lg hover:opacity-95 transition-all border border-yellow-400"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Mở Thiệp &amp; Bật Nhạc Lễ</span>
              <Volume2 className="w-5 h-5 text-yellow-300" />
            </button>

            <button
              type="button"
              onClick={() => onOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span>Mở không nhạc</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
