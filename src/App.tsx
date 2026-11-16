import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Link2,
  MapPin,
  PhoneCall,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { INVITATION_CONFIG } from './config/invitationConfig';
import { getGuestFromUrl } from './utils/guestPersonalization';
import { MusicTrack, soundtrack } from './utils/soundtrack';
import { WelcomeEnvelopeModal } from './components/WelcomeEnvelopeModal';
import { HeroSection } from './components/HeroSection';
import { CountdownAndSchedule } from './components/CountdownAndSchedule';
import { JourneyAndGallery } from './components/JourneyAndGallery';
import { LocationSection } from './components/LocationSection';
import { LinkGeneratorModal } from './components/LinkGeneratorModal';

type TabKey = 'main' | 'schedule' | 'gallery' | 'map';

const TABS: Array<{ key: TabKey; label: string; shortLabel: string; icon: React.ElementType }> = [
  { key: 'main', label: '1. Thiệp Mời Chính', shortLabel: 'Thiệp Mời', icon: Award },
  { key: 'schedule', label: '2. Lịch Trình 25/11', shortLabel: 'Lịch Trình', icon: Calendar },
  { key: 'gallery', label: '3. Kỷ Yếu & Hành Trình', shortLabel: 'Kỷ Yếu', icon: Camera },
  { key: 'map', label: '4. Bản Đồ IUH & Liên Hệ', shortLabel: 'Bản Đồ', icon: MapPin },
];

export const App: React.FC = () => {
  const guest = useMemo(() => getGuestFromUrl(), []);
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>('main');
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(() =>
    soundtrack.getCurrentTrack()
  );
  const [linkModalOpen, setLinkModalOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('host') === '1';
  });

  const fireCelebration = () => {
    confetti({
      particleCount: 75,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors: ['#EAB308', '#2563EB', '#DC2626', '#10B981'],
    });
    confetti({
      particleCount: 75,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.6 },
      colors: ['#EAB308', '#2563EB', '#DC2626', '#10B981'],
    });
  };

  const handleOpenEnvelope = async (withMusic: boolean) => {
    setEnvelopeOpened(true);
    fireCelebration();

    if (withMusic) {
      const ok = await soundtrack.play();
      setMusicPlaying(ok);
      setCurrentTrack(soundtrack.getCurrentTrack());
    }
  };

  const toggleMusic = async () => {
    if (musicPlaying) {
      soundtrack.pause();
      setMusicPlaying(false);
    } else {
      const ok = await soundtrack.play();
      setMusicPlaying(ok);
      setCurrentTrack(soundtrack.getCurrentTrack());
    }
  };

  const handleNextTrack = async () => {
    const next = await soundtrack.nextTrack();
    setCurrentTrack(next);
    if (!musicPlaying) {
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
    <div className="min-h-screen flex flex-col justify-between text-slate-900">
      {/* Thiệp mở đầu */}
      {!envelopeOpened && (
        <WelcomeEnvelopeModal guest={guest} onOpen={handleOpenEnvelope} />
      )}

      {/* BRIGHT SUNLIT TOP BAR */}
      <header className="border-b-2 border-amber-400 bg-white/95 shadow-md px-3 sm:px-6 py-2.5">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 text-amber-300 font-bold shrink-0 shadow">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-blue-800 leading-none">
                IUH • LỄ TỐT NGHIỆP 25.11.2026
              </p>
              <p className="text-sm sm:text-base font-black uppercase text-slate-900 leading-tight mt-0.5">
                Tân Kỹ Sư {INVITATION_CONFIG.graduate.fullName}
              </p>
            </div>
          </div>

          {/* Right: Music Player + Firework + Create Link */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Bright Music Control Pill */}
            <div className="flex items-center gap-1 rounded-xl bg-blue-50 border-2 border-blue-300 px-2.5 py-1.5">
              <button
                type="button"
                onClick={toggleMusic}
                className="flex items-center gap-1.5 text-left"
                title="Bật hoặc tắt nhạc lễ"
              >
                {musicPlaying ? (
                  <Volume2 className="h-4 w-4 text-blue-700 shrink-0" />
                ) : (
                  <VolumeX className="h-4 w-4 text-slate-500 shrink-0" />
                )}
                <span className="text-xs font-extrabold text-blue-900 max-w-[115px] sm:max-w-[175px] truncate">
                  {musicPlaying ? currentTrack.title : 'Bật Nhạc Lễ'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleNextTrack}
                className="ml-1 rounded-lg bg-blue-700 px-2.5 py-1 text-[11px] font-extrabold text-amber-300 hover:bg-blue-800 inline-flex items-center gap-1"
                title="Đổi bản nhạc lễ khác"
              >
                <SkipForward className="h-3 w-3" />
                <span className="hidden sm:inline">Đổi nhạc</span>
              </button>
            </div>

            <button
              type="button"
              onClick={fireCelebration}
              className="inline-flex items-center gap-1 rounded-xl bg-amber-400 border-2 border-amber-500 px-3 py-2 text-xs font-extrabold text-slate-950 shadow-sm hover:bg-amber-300"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Pháo Hoa</span>
            </button>

            <button
              type="button"
              onClick={() => setLinkModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-xl bg-white border-2 border-slate-300 px-3 py-2 text-xs font-extrabold text-slate-800 hover:border-blue-600 hover:text-blue-700"
              title="Tạo link mời tên riêng cho bạn bè"
            >
              <Link2 className="h-3.5 w-3.5 text-blue-700" />
              <span className="hidden md:inline">Tạo link mời</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN INTERACTIVE STAGE: 4 Tab Bright Deck */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-center">
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
                className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-3 text-xs sm:text-sm font-extrabold border-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white border-amber-400 shadow-lg scale-[1.01]'
                    : 'bg-white text-slate-800 border-blue-200 hover:border-blue-500 hover:bg-blue-50 shadow-sm'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-blue-700'}`} />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Card Content */}
        <div>
          {activeTab === 'main' && (
            <HeroSection guest={guest} onSelectTab={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === 'schedule' && <CountdownAndSchedule guest={guest} />}
          {activeTab === 'gallery' && <JourneyAndGallery />}
          {activeTab === 'map' && <LocationSection />}
        </div>

        {/* Bright Bottom Quick Flip Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white border-2 border-amber-400 px-4 py-2.5 shadow-md">
          <button
            type="button"
            onClick={goPrevTab}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2 text-xs font-extrabold text-blue-900 hover:bg-blue-100"
          >
            <ChevronLeft className="h-4 w-4 text-blue-700" />
            <span>Trang trước</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
            <span className="hidden sm:inline">
              Đang xem: <strong className="text-blue-800">{TABS[currentTabIndex].label}</strong>
            </span>
            <a
              href={`tel:${INVITATION_CONFIG.contact.phoneRaw}`}
              className="inline-flex items-center gap-1 text-red-700 hover:underline font-mono font-extrabold"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>{INVITATION_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={goNextTab}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2 text-xs font-extrabold text-white shadow hover:from-blue-600 hover:to-indigo-600"
          >
            <span>Trang tiếp theo</span>
            <ChevronRight className="h-4 w-4 text-amber-300" />
          </button>
        </div>
      </main>

      {/* Modal tạo link cá nhân hóa dành cho Chí Hiếu */}
      <LinkGeneratorModal isOpen={linkModalOpen} onClose={() => setLinkModalOpen(false)} />
    </div>
  );
};

export default App;
