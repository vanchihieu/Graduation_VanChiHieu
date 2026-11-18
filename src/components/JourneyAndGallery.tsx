import React, { useEffect, useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  GitCommit,
  Maximize2,
  X,
} from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { SmartPhoto } from './SmartPhoto';
import { Tilt3DCard } from './Tilt3DCard';

interface LightboxPhoto {
  src: string;
  fallback: string;
  title: string;
  caption: string;
}

const FEATURED_PHOTOS: LightboxPhoto[] = [
  {
    src: '/images/BaoVeKhoaLuan.png',
    fallback: '/images/gallery-4.svg',
    title: 'Bảo vệ Khóa luận Tốt nghiệp',
    caption: 'Cột mốc hoàn thành chương trình Kỹ sư Kỹ thuật Phần mềm tại IUH.',
  },
  {
    src: '/images/Banbe.png',
    fallback: '/images/gallery-5.svg',
    title: 'Bạn bè thời đại học',
    caption: 'Kỷ niệm cùng nhau qua những năm tháng học tập tại IUH.',
  },
];

const SCHOLARSHIP_PHOTOS: LightboxPhoto[] = [
  {
    src: '/images/HocBong1.png',
    fallback: '/images/gallery-1.svg',
    title: 'Kỷ niệm nhận Học bổng #1',
    caption: 'Một chút động lực nhỏ trong hành trình học tập tại IUH.',
  },
  {
    src: '/images/HocBong2.png',
    fallback: '/images/gallery-2.svg',
    title: 'Kỷ niệm nhận Học bổng #2',
    caption: 'Thành quả từ những ngày cố gắng qua từng học kỳ.',
  },
  {
    src: '/images/HocBong3.png',
    fallback: '/images/gallery-3.svg',
    title: 'Kỷ niệm nhận Học bổng #3',
    caption: 'Lưu lại một cột mốc đáng nhớ thời sinh viên KTPM.',
  },
  {
    src: '/images/HocBong4.png',
    fallback: '/images/gallery-4.svg',
    title: 'Kỷ niệm nhận Học bổng #4',
    caption: 'Kỷ niệm đẹp dưới mái trường Đại học Công nghiệp TP.HCM.',
  },
];

const ALL_LIGHTBOX_PHOTOS: LightboxPhoto[] = [...FEATURED_PHOTOS, ...SCHOLARSHIP_PHOTOS];

export const JourneyAndGallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % ALL_LIGHTBOX_PHOTOS.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + ALL_LIGHTBOX_PHOTOS.length) % ALL_LIGHTBOX_PHOTOS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? ALL_LIGHTBOX_PHOTOS[lightboxIndex] : null;

  return (
    <div className="rounded-3xl glass-3d-shell p-5 sm:p-7 text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Balanced Bento Layout (Compact spacing, no stretched gaps) */}
        <div className="lg:col-span-7 rounded-2xl glass-3d-panel p-5 flex flex-col justify-start space-y-4">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              KỶ NIỆM THỜI SINH VIÊN
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold hero-name-modern leading-tight">
              Dấu Ấn Học Tập &amp; Bạn Bè
            </h2>
          </div>

          {/* Tầng 1: 2 Ảnh lớn song song (Bảo vệ khóa luận + Bạn bè) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURED_PHOTOS.map((photo, idx) => (
              <Tilt3DCard key={idx} maxTilt={4}>
                <div className="rounded-2xl bg-white overflow-hidden shadow-md border border-blue-200/75 h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <SmartPhoto
                      src={photo.src}
                      fallback={photo.fallback}
                      alt={photo.title}
                      className="h-full w-full object-cover object-center"
                    />
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="absolute top-2.5 right-2.5 rounded-lg bg-white/95 p-1.5 text-slate-900 shadow hover:bg-yellow-400 transition-colors"
                      title="Phóng to ảnh"
                      aria-label={`Phóng to ${photo.title}`}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-3.5 flex-1">
                    <h3 className="font-display text-base font-extrabold text-blue-900">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </Tilt3DCard>
            ))}
          </div>

          {/* Tầng 2: 4 Tấm Học Bổng chung 1 hàng ngang gọn gàng */}
          <Tilt3DCard maxTilt={2.5}>
            <div className="rounded-2xl bg-slate-50/90 p-3.5 shadow-md">
              <div className="flex items-center justify-between mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Award className="h-4 w-4 text-amber-500" />
                  Kỷ niệm học bổng khuyến khích học tập
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  Chạm ảnh để phóng to
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SCHOLARSHIP_PHOTOS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightboxIndex(FEATURED_PHOTOS.length + idx)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                    title={item.title}
                  >
                    <SmartPhoto
                      src={item.src}
                      fallback={item.fallback}
                      alt={item.title}
                      className="h-full w-full object-contain p-0.5 group-hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Tilt3DCard>
        </div>

        {/* Right: 4-Year Software Engineering Roadmap */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl glass-3d-panel p-5 text-slate-900">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1 text-xs font-mono font-bold text-yellow-300 mb-2 shadow-sm">
              <GitBranch className="h-3.5 w-3.5" />
              <span>git log --oneline iuh..2026</span>
            </div>
            <h3 className="font-display text-2xl font-extrabold hero-name-modern mb-4">
              Hành Trình 4.5 Năm KTPM
            </h3>

            <div className="space-y-3">
              {INVITATION_CONFIG.journey.map((step, index) => {
                const isFinal = index === INVITATION_CONFIG.journey.length - 1;
                return (
                  <div
                    key={step.hash}
                    className={`rounded-xl p-3.5 ${
                      isFinal
                        ? 'bg-gradient-to-r from-yellow-50 to-blue-50 text-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-xs font-bold ${
                          isFinal ? 'text-blue-800' : 'text-slate-700'
                        }`}
                      >
                        <GitCommit className="h-3.5 w-3.5" />
                        {step.year}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                          isFinal
                            ? 'bg-blue-700 text-yellow-300'
                            : 'bg-slate-900 text-yellow-300'
                        }`}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-blue-950">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm mt-0.5 leading-relaxed text-slate-700 font-medium">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-[11px] font-mono font-semibold text-blue-800 text-center">
            🎓 Khoa Công nghệ Thông tin — ĐH Công Nghiệp TP.HCM (IUH)
          </p>
        </div>
      </div>

      {/* Lightbox Modal với nút mũi tên chuyển ảnh trước / tiếp theo */}
      {activePhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 rounded-full bg-yellow-400 p-2.5 text-slate-950 font-bold shadow-lg hover:bg-yellow-300 transition-colors"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + ALL_LIGHTBOX_PHOTOS.length) % ALL_LIGHTBOX_PHOTOS.length
              );
            }}
            className="absolute left-3 sm:left-6 z-10 rounded-full bg-white/95 border border-slate-300 p-3 text-slate-900 shadow-xl hover:bg-yellow-400 transition-colors"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="max-w-4xl w-full rounded-2xl overflow-hidden bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[72vh] rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
              <SmartPhoto
                src={activePhoto.src}
                fallback={activePhoto.fallback}
                alt={activePhoto.title}
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>
            <div className="pt-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-display text-lg font-bold text-blue-900">
                  {activePhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">{activePhoto.caption}</p>
              </div>
              <span className="font-mono text-xs font-bold text-yellow-300 bg-slate-900 px-3 py-1 rounded-full shrink-0 w-fit">
                {lightboxIndex + 1} / {ALL_LIGHTBOX_PHOTOS.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % ALL_LIGHTBOX_PHOTOS.length);
            }}
            className="absolute right-3 sm:right-6 z-10 rounded-full bg-white/95 border border-slate-300 p-3 text-slate-900 shadow-xl hover:bg-yellow-400 transition-colors"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};
