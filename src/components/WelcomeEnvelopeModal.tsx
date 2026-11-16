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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-amber-500 p-1 shadow-2xl">
        <div className="rounded-[22px] bg-white px-6 py-8 sm:px-10 sm:py-9 text-center">
          {/* University Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1 text-xs font-semibold tracking-wider text-blue-800 mb-5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>IUH • SOFTWARE ENGINEERING • 2026</span>
          </div>

          {/* Cap Icon */}
          <div className="mx-auto mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 p-4 w-fit shadow-md">
            <GraduationCap className="h-9 w-9 text-amber-300" />
          </div>

          <p className="font-script text-2xl sm:text-3xl text-amber-600 mb-1">
            Thiệp Mời Lễ Tốt Nghiệp
          </p>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight hero-name-modern py-1">
            {INVITATION_CONFIG.graduate.fullName}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 mb-6">
            Tân {INVITATION_CONFIG.graduate.degreeVi} • {INVITATION_CONFIG.graduate.universityShort}
          </p>

          {/* Guest Box */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-blue-50/80 border border-amber-300 px-5 py-4 mb-6 shadow-sm">
            <p className="font-script text-xl text-slate-500 mb-0.5">
              Trân trọng thân mời
            </p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-blue-900">
              {guest.displayName}
            </p>
            <p className="mt-2 text-xs font-medium text-slate-600">
              {INVITATION_CONFIG.event.timeDisplay} • {INVITATION_CONFIG.event.dayOfWeek},{' '}
              {INVITATION_CONFIG.event.dateDisplay}
            </p>
          </div>

          {/* Open CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => onOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Mở Thiệp &amp; Bật Nhạc Lễ</span>
              <Volume2 className="w-4 h-4 text-amber-300" />
            </button>

            <button
              type="button"
              onClick={() => onOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Mở không nhạc</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
