import React from 'react';
import { Heart } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { SmartPhoto } from './SmartPhoto';
import { Tilt3DCard } from './Tilt3DCard';

const CatholicCrossIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2v20" />
    <path d="M6 8h12" />
  </svg>
);

export const TributeToFatherSection: React.FC = () => {
  const tribute = INVITATION_CONFIG.fatherTribute;

  return (
    <div className="rounded-3xl glass-3d-shell overflow-hidden text-slate-900">
      {/* Top Memorial Ribbon - Đồng nhất màu Xanh Hoàng Gia & Vàng Kim của toàn web */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 px-6 py-4 flex flex-wrap items-center justify-between gap-2 border-b-2 border-yellow-400">
        <div className="inline-flex items-center gap-2 text-yellow-300 font-bold text-xs sm:text-sm tracking-wider uppercase">
          <CatholicCrossIcon className="h-4 w-4 text-yellow-400" />
          <span>IN LOVING MEMORY • KÍNH NHỚ BA</span>
        </div>
        <span className="font-mono text-xs font-bold text-blue-100">
          {tribute.passedNote}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-7 items-stretch">
        {/* Left Column: Clean Borderless Father Portrait + Bible Verse */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-4">
          <Tilt3DCard maxTilt={5}>
            <div className="rounded-2xl bg-white overflow-hidden shadow-lg">
              <div className="aspect-[4/4.4] w-full overflow-hidden bg-slate-100">
                <SmartPhoto
                  src={tribute.fatherPhoto}
                  fallback={tribute.fatherFallback}
                  alt={tribute.fatherLabel}
                  className="h-full w-full object-cover object-bottom"
                />
              </div>

              <div className="p-4 flex items-center justify-between gap-2 bg-white">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    {tribute.passedNote}
                  </p>
                  <p className="font-display text-lg font-extrabold hero-name-modern">
                    {tribute.fatherLabel}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-blue-800 text-yellow-300 shrink-0">
                  <CatholicCrossIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Tilt3DCard>

          {/* Bible Verse Card */}
          <div className="rounded-2xl bg-white/95 p-5 shadow-md text-left">
            <p className="text-sm sm:text-base font-semibold italic text-slate-800 leading-relaxed">
              {tribute.bibleVerse}
            </p>
            <p className="mt-1.5 text-xs font-mono font-bold text-amber-800 text-right">
              — {tribute.bibleRef} —
            </p>
          </div>
        </div>

        {/* Right Column: Heartfelt Memories & Catholic Gratitude */}
        <div className="lg:col-span-7 rounded-2xl bg-white/95 p-5 sm:p-7 shadow-md flex flex-col justify-between space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-800 mb-2">
              <Heart className="h-3.5 w-3.5 text-blue-700 fill-blue-600" />
              <span>Những Dòng Ký Ức Hoài Niệm</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold hero-name-modern leading-tight mt-2">
              {tribute.title}
            </h2>

            {/* Memory Paragraphs */}
            <div className="mt-5 space-y-4">
              {tribute.memories.map((mem, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#FFFDF8] p-4 sm:p-5 shadow-sm"
                >
                  <h3 className="font-display text-base sm:text-lg font-extrabold text-blue-900 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-blue-800 text-[11px] font-mono font-bold text-yellow-300 shrink-0">
                      {idx + 1}
                    </span>
                    <span>{mem.heading}</span>
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] text-slate-700 leading-relaxed font-medium">
                    {mem.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Catholic Prayer Box */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 text-white p-4 sm:p-5 shadow-md border-b-4 border-yellow-400">
            <div className="flex items-center gap-2 text-yellow-300 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
              <CatholicCrossIcon className="h-4 w-4" />
              <span>Lời Nguyện Ngày Tốt Nghiệp</span>
            </div>
            <p className="text-sm sm:text-[15px] text-blue-50 leading-relaxed italic font-medium">
              “{tribute.prayerText}”
            </p>
            <p className="mt-2 text-right font-script text-xl text-yellow-300">
              Con trai, Văn Chí Hiếu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
