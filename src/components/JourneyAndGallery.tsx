import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  GitBranch,
  GitCommit,
  Maximize2,
  X,
} from 'lucide-react';
import { GalleryItem, INVITATION_CONFIG } from '../config/invitationConfig';
import { SmartPhoto } from './SmartPhoto';

export const JourneyAndGallery: React.FC = () => {
  const gallery: GalleryItem[] = INVITATION_CONFIG.gallery;
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const currentPhoto = gallery[selectedIdx];

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % gallery.length);
  };

  return (
    <div className="rounded-3xl bg-white border-2 border-amber-400 shadow-xl p-5 sm:p-7 text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left: Interactive Yearbook Photo Stage */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono font-extrabold uppercase tracking-wider text-blue-800">
                ALBUM KỶ YẾU &amp; KHOẢNH KHẮC
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                Khung Hình Thanh Xuân IUH
              </h2>
            </div>
            <span className="rounded-full bg-blue-700 px-3.5 py-1 font-mono text-xs font-extrabold text-amber-300 shadow">
              Ảnh {selectedIdx + 1} / {gallery.length}
            </span>
          </div>

          {/* Main Active Photo Frame - Bright Royal & Gold Border */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-amber-500 p-3 shadow-lg">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-blue-50 border-2 border-white">
              <SmartPhoto
                src={currentPhoto.src}
                fallback={currentPhoto.fallback}
                alt={currentPhoto.title}
                className="h-full w-full object-cover"
              />

              {/* Prev / Next Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 border-2 border-blue-700 p-2 text-blue-900 shadow-md hover:bg-amber-400 hover:border-amber-500 transition-colors"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 border-2 border-blue-700 p-2 text-blue-900 shadow-md hover:bg-amber-400 hover:border-amber-500 transition-colors"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute top-3 right-3 rounded-lg bg-white/95 border-2 border-blue-700 px-2.5 py-1.5 text-xs font-extrabold text-blue-900 shadow inline-flex items-center gap-1 hover:bg-amber-400"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Phóng to</span>
              </button>
            </div>

            {/* Solid White Caption Box below photo */}
            <div className="mt-3 rounded-xl bg-white p-3.5 flex flex-wrap items-center justify-between gap-2 shadow">
              <div>
                <span className="inline-block rounded bg-blue-700 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-amber-300 mb-1">
                  {currentPhoto.tag}
                </span>
                <h3 className="font-serif text-lg font-extrabold text-slate-900">
                  {currentPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                  {currentPhoto.caption}
                </p>
              </div>
            </div>
          </div>

          {/* 6 Thumbnail Selector Strip */}
          <div className="grid grid-cols-6 gap-2">
            {gallery.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  idx === selectedIdx
                    ? 'border-blue-700 ring-2 ring-amber-400 scale-105 shadow'
                    : 'border-slate-300 opacity-75 hover:opacity-100'
                }`}
              >
                <SmartPhoto
                  src={item.src}
                  fallback={item.fallback}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Bright 4-Year Software Engineering Roadmap */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-blue-50 via-white to-amber-50 p-5 border-2 border-blue-300 text-slate-900 shadow-inner">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-700 px-3.5 py-1 text-xs font-mono font-extrabold text-amber-300 mb-2 shadow-sm">
              <GitBranch className="h-3.5 w-3.5" />
              <span>git log --oneline iuh..2026</span>
            </div>
            <h3 className="font-serif text-2xl font-extrabold text-slate-900 mb-4">
              Hành Trình 4 Năm KTPM
            </h3>

            <div className="space-y-3">
              {INVITATION_CONFIG.journey.map((step, index) => {
                const isFinal = index === INVITATION_CONFIG.journey.length - 1;
                return (
                  <div
                    key={step.hash}
                    className={`rounded-xl p-3.5 border-2 ${
                      isFinal
                        ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-slate-900 border-amber-500 shadow-md'
                        : 'bg-white text-slate-900 border-blue-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-xs font-extrabold ${
                          isFinal ? 'text-red-700' : 'text-blue-800'
                        }`}
                      >
                        <GitCommit className="h-3.5 w-3.5" />
                        {step.year}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-extrabold ${
                          isFinal
                            ? 'bg-red-600 text-white'
                            : 'bg-blue-700 text-white'
                        }`}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{step.title}</h4>
                    <p className="text-xs mt-0.5 leading-relaxed font-medium text-slate-700">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-[11px] font-mono font-bold text-blue-800 text-center">
            💡 Mẹo: Chép ảnh thật <code className="underline">1.jpg..6.jpg</code> vào <code className="underline">public/images/</code>
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/85 backdrop-blur-md p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 rounded-full bg-amber-400 p-2.5 text-slate-950 font-bold shadow-lg"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="max-w-4xl w-full rounded-2xl overflow-hidden bg-white p-3 border-2 border-amber-400 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[72vh] rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
              <SmartPhoto
                src={currentPhoto.src}
                fallback={currentPhoto.fallback}
                alt={currentPhoto.title}
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>
            <div className="pt-3 px-2 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-lg font-extrabold text-slate-900">
                  {currentPhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {currentPhoto.caption}
                </p>
              </div>
              <span className="font-mono text-xs font-extrabold text-amber-300 bg-blue-700 px-3 py-1 rounded-full">
                {selectedIdx + 1} / {gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
