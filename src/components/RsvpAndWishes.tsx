import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CalendarCheck,
  Camera,
  CheckCircle2,
  Heart,
  HeartHandshake,
  MessageSquareHeart,
  Phone,
  Send,
  Sparkles,
  User,
  Users,
  X,
} from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';
import { GuestGreeting } from '../utils/guestPersonalization';

export type AttendanceStatus = 'attending' | 'maybe' | 'absent';

export interface WishEntry {
  id: string;
  name: string;
  attendance: AttendanceStatus;
  guestsCount: string;
  message: string;
  createdAt: string;
}

interface RsvpAndWishesProps {
  guest: GuestGreeting;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

const STORAGE_KEY = 'iuh_grad_wishes_van_chi_hieu_2026';

const QUICK_WISHES = [
  'Chúc Tân Kỹ sư Văn Chí Hiếu tốt nghiệp rực rỡ, sự nghiệp thăng hoa, lương nghìn đô! 🎓🚀',
  'Chúc mừng Hiếu hoàn thành 4.5 năm IUH xuất sắc! Code mượt không bug, sớm lên Senior nhé! 💻✨',
  'Hẹn gặp Tân Kỹ sư sáng 25/11 lúc 09:30 tại IUH để chụp bộ ảnh để đời nha! 📸🎉',
  'Chúc bạn chân cứng đá mềm trên chặng đường mới, luôn giữ vững đam mê công nghệ! 🌟',
];

const GUEST_COUNT_OPTIONS = ['Đi 1 mình', 'Đi 2 người', 'Đi cùng nhóm bạn', 'Đi cùng gia đình'];

export const RsvpAndWishes: React.FC<RsvpAndWishesProps> = ({
  guest,
  isModalOpen,
  onOpenModal,
  onCloseModal,
}) => {
  const [name, setName] = useState<string>(guest.rawName || '');
  const [phone, setPhone] = useState<string>('');
  const [attendance, setAttendance] = useState<AttendanceStatus>('attending');
  const [guestsCount, setGuestsCount] = useState<string>('Đi 1 mình');
  const [message, setMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const [wishes, setWishes] = useState<WishEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INVITATION_CONFIG.initialWishes;
  });

  useEffect(() => {
    if (guest.rawName && !name) {
      setName(guest.rawName);
    }
  }, [guest.rawName, name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);

    const now = new Date();
    const formattedTime = now.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newEntry: WishEntry = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      attendance,
      guestsCount,
      message: message.trim(),
      createdAt: formattedTime,
    };

    if (INVITATION_CONFIG.googleSheetWebhookUrl) {
      try {
        await fetch(INVITATION_CONFIG.googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newEntry, phone: phone.trim() }),
        });
      } catch {
        // continue local save
      }
    }

    const updated = [newEntry, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmitting(false);
    setSubmittedSuccess(true);
    setMessage('');

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#EAB308', '#FDE047', '#1D4ED8', '#10B981'],
    });
  };

  const renderAttendanceBadge = (status: AttendanceStatus) => {
    if (status === 'attending') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-3 py-0.5 text-xs font-bold text-white">
          🎉 Sẽ tham dự
        </span>
      );
    }
    if (status === 'maybe') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white">
          📸 Sắp xếp ghé
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-700 px-3 py-0.5 text-xs font-bold text-white">
        💐 Gửi lời chúc từ xa
      </span>
    );
  };

  const renderInteractiveForm = (inModal = false) => (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5">
            Tên của bạn <span className="text-crimson-600">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Minh Tuấn / Hội bạn K18..."
              className="w-full rounded-xl bg-white border-2 border-slate-300 pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-oxford-900 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5">
            Số điện thoại (để Hiếu đón)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Không bắt buộc"
              className="w-full rounded-xl bg-white border-2 border-slate-300 pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-oxford-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Visual Attendance Selector Cards */}
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
          Xác nhận tham dự Lễ Tốt Nghiệp (09:30 • 25/11/2026)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              value: 'attending' as const,
              icon: CalendarCheck,
              title: 'Chắc chắn tham dự',
              desc: 'Hẹn gặp Hiếu sáng 25/11!',
            },
            {
              value: 'maybe' as const,
              icon: Camera,
              title: 'Sẽ thu xếp ghé',
              desc: 'Cố gắng qua chụp hình',
            },
            {
              value: 'absent' as const,
              icon: HeartHandshake,
              title: 'Gửi lời chúc từ xa',
              desc: 'Tiếc quá mình bận mất rồi',
            },
          ].map((opt) => {
            const Icon = opt.icon;
            const active = attendance === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAttendance(opt.value)}
                className={`rounded-2xl p-3.5 text-left border-2 transition-all flex flex-col justify-between ${
                  active
                    ? 'bg-oxford-900 border-amber-400 text-white shadow-md'
                    : 'bg-white border-slate-300 text-slate-900 hover:border-oxford-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`rounded-lg p-2 ${
                      active ? 'bg-amber-400 text-oxford-950' : 'bg-slate-100 text-oxford-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  {active && <CheckCircle2 className="h-4 w-4 text-amber-400" />}
                </div>
                <div>
                  <p className={`text-xs sm:text-sm font-extrabold ${active ? 'text-amber-300' : 'text-slate-900'}`}>
                    {opt.title}
                  </p>
                  <p className={`text-[11px] mt-0.5 ${active ? 'text-slate-200' : 'text-slate-600'}`}>
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Companion Pill Selector */}
      {attendance !== 'absent' && (
        <div>
          <label className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
            <Users className="h-3.5 w-3.5 text-oxford-900" />
            <span>Bạn đi cùng ai?</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GUEST_COUNT_OPTIONS.map((item) => {
              const active = guestsCount === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGuestsCount(item)}
                  className={`rounded-xl py-2.5 px-3 text-xs font-bold border-2 transition-all ${
                    active
                      ? 'bg-oxford-900 border-amber-400 text-amber-300'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Row 4: Quick Wishes & Message Textarea */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            Lời chúc gửi Tân Kỹ sư Văn Chí Hiếu <span className="text-crimson-600">*</span>
          </label>
          <span className="text-xs font-bold text-crimson-700 inline-flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Chạm để chọn nhanh mẫu câu chúc:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {QUICK_WISHES.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMessage(sample)}
              className="rounded-xl bg-[#FAF8F3] border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 hover:border-oxford-900 hover:bg-amber-50 transition-colors text-left line-clamp-2"
            >
              “{sample}”
            </button>
          ))}
        </div>

        <textarea
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập lời chúc tốt nghiệp hoặc kỷ niệm đáng nhớ của bạn với Chí Hiếu..."
          className="w-full rounded-xl bg-white border-2 border-slate-300 p-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-oxford-900 focus:outline-none resize-none"
        />
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-oxford-900 border-2 border-amber-400 px-6 py-4 text-sm font-extrabold text-amber-300 shadow-lg hover:bg-oxford-800 hover:text-white transition-all disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        <span>{submitting ? 'Đang gửi...' : 'Hoàn Tất Xác Nhận & Gửi Lời Chúc'}</span>
      </button>

      {submittedSuccess && (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-emerald-800 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-amber-300 shrink-0" />
            <span>Đã lưu xác nhận &amp; lời chúc của bạn thành công! Cảm ơn bạn rất nhiều!</span>
          </div>
          {inModal && (
            <button
              type="button"
              onClick={onCloseModal}
              className="rounded-lg bg-white px-3 py-1 text-xs font-extrabold text-emerald-900 shrink-0"
            >
              Đóng
            </button>
          )}
        </div>
      )}
    </form>
  );

  return (
    <>
      <section id="loi-chuc" className="py-16 sm:py-24 bg-royal-stage text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-oxford-950 border border-amber-400 px-4 py-1 text-xs font-mono font-bold text-amber-300 mb-3">
              <MessageSquareHeart className="h-3.5 w-3.5" />
              <span>RSVP &amp; SỔ VÀNG LƯU BÚT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Xác Nhận Tham Dự &amp; Lời Chúc
            </h2>
            <p className="mt-3 text-slate-200 font-medium text-sm sm:text-base">
              Sự hiện diện và những lời chúc của {guest.guestPronoun} là niềm vinh hạnh lớn nhất của Chí Hiếu!
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs sm:text-sm font-extrabold text-oxford-950 shadow-gold-aura hover:bg-amber-300 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>Mở Form Xác Nhận Nhanh (Popup)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Crisp Solid Cream Form Card */}
            <div className="lg:col-span-7 rounded-3xl bg-[#FAF8F3] p-6 sm:p-8 shadow-2xl border-2 border-amber-400 text-slate-900">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-crimson-700">
                    PHIẾU PHẢN HỒI THAM DỰ
                  </span>
                  <h3 className="font-serif text-2xl font-extrabold text-slate-900 mt-0.5">
                    Gửi Xác Nhận &amp; Lời Chúc Mừng
                  </h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-oxford-900 text-amber-300">
                  <HeartHandshake className="h-6 w-6" />
                </div>
              </div>

              {renderInteractiveForm(false)}
            </div>

            {/* Right: Sổ Vàng Lưu Bút (High-Contrast Cards) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#FAF8F3] p-6 sm:p-8 shadow-2xl border-2 border-amber-400 flex flex-col max-h-[720px] text-slate-900">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-5">
                <div>
                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-700">
                    GUESTBOOK WALL
                  </span>
                  <h3 className="font-serif text-2xl font-extrabold text-slate-900 mt-0.5">
                    Sổ Vàng Lưu Bút ({wishes.length})
                  </h3>
                </div>
                <Heart className="h-6 w-6 text-crimson-600 fill-crimson-600" />
              </div>

              <div className="space-y-4 overflow-y-auto pr-1 flex-1">
                {wishes.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white border-2 border-slate-200 p-4 space-y-2.5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-oxford-900 font-serif text-sm font-bold text-amber-300">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-extrabold text-sm sm:text-base text-slate-900">
                          {item.name}
                        </p>
                      </div>
                      {renderAttendanceBadge(item.attendance)}
                    </div>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                      “{item.message}”
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-500 pt-1 border-t border-slate-100">
                      <span>{item.attendance !== 'absent' ? item.guestsCount : 'Gửi từ xa'}</span>
                      <span>{item.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Popup Modal when clicking RSVP buttons */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-oxford-950/90 p-4 overflow-y-auto"
          onClick={onCloseModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F3] p-6 sm:p-8 shadow-2xl border-2 border-amber-400 text-slate-900 my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-5">
              <div>
                <span className="inline-block rounded-md bg-oxford-900 px-2.5 py-0.5 text-[11px] font-mono font-bold text-amber-300 mb-1">
                  LỄ TỐT NGHIỆP VĂN CHÍ HIẾU • 25/11/2026
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Xác Nhận Tham Dự &amp; Gửi Lời Chúc
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="rounded-xl bg-slate-200 p-2 text-slate-800 hover:bg-oxford-900 hover:text-white transition-colors"
                aria-label="Đóng form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {renderInteractiveForm(true)}
          </div>
        </div>
      )}
    </>
  );
};
