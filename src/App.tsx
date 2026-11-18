import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Camera,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Heart,
  Link2,
  MapPin,
  PhoneCall,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { INVITATION_CONFIG } from './config/invitationConfig';
import { getGuestFromUrl } from './utils/guestPersonalization';
import { soundtrack } from './utils/soundtrack';
import { WelcomeEnvelopeModal } from './components/WelcomeEnvelopeModal';
import { HeroSection } from './components/HeroSection';
import { JourneyAndGallery } from './components/JourneyAndGallery';
import { LocationSection } from './components/LocationSection';
import { TributeToFatherSection } from './components/TributeToFatherSection';
import { LinkGeneratorModal } from './components/LinkGeneratorModal';
import { GraduationBackdrop3D } from './components/GraduationScene3D';

type TabKey = 'main' | 'gallery' | 'map' | 'tribute';

const TABS: Array<{ key: TabKey; label: string; shortLabel: string; icon: React.ElementType }> = [
  { key: 'main', label: '1. Thiệp Mời Chính', shortLabel: 'Thiệp Mời', icon: Award },
  { key: 'gallery', label: '2. Kỷ Yếu & Hành Trình', shortLabel: 'Kỷ Yếu', icon: Camera },
  { key: 'tribute', label: '3. Ký Ức & Tri Ân Ba', shortLabel: 'Tri Ân Ba', icon: Heart },
  { key: 'map', label: '4. Bản Đồ IUH & Liên Hệ', shortLabel: 'Bản Đồ', icon: MapPin },
];

export const App: React.FC = () => {
  const guest = useMemo(() => getGuestFromUrl(), []);
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>('main');
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const isLocalMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  }, []);
  const [linkModalOpen, setLinkModalOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('host') === '1';
  });
  const [cursorGlow, setCursorGlow] = useState<{ x: number; y: number }>({ x: -500, y: -500 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        setCursorGlow({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const fireCelebration = () => {
    confetti({
      particleCount: 75,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors: ['#FACC15', '#2563EB', '#181E29', '#FFFFFF'],
    });
    confetti({
      particleCount: 75,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.6 },
      colors: ['#FACC15', '#2563EB', '#181E29', '#FFFFFF'],
    });
  };

  const handleOpenEnvelope = async (withMusic: boolean) => {
    setEnvelopeOpened(true);
    fireCelebration();

    if (withMusic) {
      const ok = await soundtrack.play();
      setMusicPlaying(ok);
    }
  };

  const toggleMusic = async () => {
    if (musicPlaying) {
      soundtrack.pause();
      setMusicPlaying(false);
    } else {
      const ok = await soundtrack.play();
      setMusicPlaying(ok);
    }
  };

  const currentTabIndex = TABS.findIndex((t) => t.key === activeTab);
  const goPrevTab = () => {
    const prevIdx = (currentTabIndex - 1 + TABS.length) % TABS.length;
    setActiveTab(TABS[prevIdx].key);
  };
  const goNextTab = () => {
    const nextIdx = (currentTabIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIdx].key);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-slate-900">
      {/* Nền WebGL 3D (Three.js) hiển thị rõ xuyên qua lớp thẻ kính */}
      <GraduationBackdrop3D enabled={true} />

      {/* Soft Cursor Ambient Spotlight trên Desktop */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden md:block transition-opacity duration-300"
        style={{
          background: `radial-gradient(420px circle at ${cursorGlow.x}px ${cursorGlow.y}px, rgba(250, 204, 21, 0.14), rgba(59, 130, 246, 0.08) 45%, transparent 72%)`,
        }}
        aria-hidden="true"
      />

      {/* Thiệp mở đầu */}
      {!envelopeOpened && (
        <WelcomeEnvelopeModal guest={guest} onOpen={handleOpenEnvelope} />
      )}

      {/* TOP BAR - Đồng bộ màu Lễ Phục IUH 2026: Đen Than - Xanh Cobalt - Vàng Rực */}
      <header className="relative z-20 border-b-2 border-yellow-400 bg-white/85 backdrop-blur-md shadow-sm px-3 sm:px-6 py-2.5">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-blue-700 text-yellow-300 font-bold shrink-0 shadow border border-yellow-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 leading-none">
                IUH • LỄ TỐT NGHIỆP 24.11.2026
              </p>
              <p className="font-display text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
                Tân Kỹ Sư {INVITATION_CONFIG.graduate.fullName}
              </p>
            </div>
          </div>

          {/* Right: Compact Sound Toggle + Local-only Invite Link Generator */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleMusic}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:border-blue-600 transition-colors"
              title="Bật hoặc tắt nhạc lễ"
              aria-label="Bật hoặc tắt nhạc lễ"
            >
              {musicPlaying ? (
                <>
                  <Volume2 className="h-4 w-4 text-blue-700 shrink-0" />
                  <span className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                    <span className="w-0.5 bg-blue-600 rounded-full animate-eq-1" />
                    <span className="w-0.5 bg-amber-500 rounded-full animate-eq-2" />
                    <span className="w-0.5 bg-blue-600 rounded-full animate-eq-3" />
                  </span>
                </>
              ) : (
                <VolumeX className="h-4 w-4 text-slate-500 shrink-0" />
              )}
              <span className="hidden sm:inline">
                {musicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
              </span>
            </button>

            {isLocalMode && (
              <button
                type="button"
                onClick={() => setLinkModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-yellow-300 shadow-sm hover:bg-blue-700 transition-colors"
                title="Tạo link mời tên riêng cho bạn bè (Chỉ hiển thị ở Local)"
              >
                <Link2 className="h-3.5 w-3.5" />
                <span>Tạo link mời</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN INTERACTIVE STAGE */}
      <main className="relative z-10 flex-1 mx-auto w-full max-w-6xl px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-center">
        {/* 4 Tab Switcher Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center justify-center gap-2 rounded-2xl py-3.5 px-3 text-sm sm:text-[15px] font-extrabold border-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-900 to-blue-700 text-white border-yellow-400 shadow-lg -translate-y-0.5'
                    : 'bg-white/85 backdrop-blur-md text-slate-800 border-white hover:border-yellow-400 hover:bg-white shadow-sm'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-yellow-300' : 'text-blue-700'}`} />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Card Content with 3D Flip Entrance */}
        <div key={activeTab} className="tab-enter-3d">
          {activeTab === 'main' && (
            <HeroSection guest={guest} onSelectTab={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === 'gallery' && <JourneyAndGallery />}
          {activeTab === 'map' && <LocationSection />}
          {activeTab === 'tribute' && <TributeToFatherSection />}
        </div>

        {/* Bottom Quick Flip Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/80 backdrop-blur-md border border-yellow-400 px-4 py-2.5 shadow-md">
          <button
            type="button"
            onClick={goPrevTab}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4 text-blue-700" />
            <span>Trang trước</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
            <span className="hidden sm:inline">
              Đang xem: <strong className="text-blue-700">{TABS[currentTabIndex].label}</strong>
            </span>
            <a
              href={`tel:${INVITATION_CONFIG.contact.phoneRaw}`}
              className="inline-flex items-center gap-1 text-blue-700 hover:underline font-mono font-bold"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>{INVITATION_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={goNextTab}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 px-4 py-2 text-xs font-bold text-white shadow hover:opacity-95"
          >
            <span>Trang tiếp theo</span>
            <ChevronRight className="h-4 w-4 text-yellow-300" />
          </button>
        </div>
      </main>

      <LinkGeneratorModal isOpen={linkModalOpen} onClose={() => setLinkModalOpen(false)} />
    </div>
  );
};

export default App;
