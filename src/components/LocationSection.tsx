import React, { useState } from 'react';
import {
  Bike,
  Check,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  PhoneCall,
} from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export const LocationSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyPhone = () => {
    navigator.clipboard.writeText(INVITATION_CONFIG.contact.phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  return (
    <div className="rounded-3xl bg-white border-2 border-amber-400 shadow-xl p-5 sm:p-7 text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left: Directions, Parking Tips & Direct Call/Zalo */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="rounded-2xl bg-blue-700 p-3 text-amber-300 shrink-0 shadow">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-mono font-extrabold uppercase text-blue-800">
                  ĐỊA ĐIỂM TỔ CHỨC LỄ TỐT NGHIỆP
                </p>
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {INVITATION_CONFIG.event.venueName}
                </h2>
                <p className="text-sm text-slate-800 font-semibold mt-1">
                  {INVITATION_CONFIG.event.address}
                </p>
                <p className="text-xs font-mono font-extrabold text-red-700 mt-1">
                  Điểm hẹn: {INVITATION_CONFIG.event.meetupSpot}
                </p>
              </div>
            </div>

            {/* Campus & Parking Tips */}
            <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <Bike className="h-4 w-4 text-red-700" />
                <span>Lưu ý gửi xe &amp; di chuyển tại IUH</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-800 font-medium space-y-1.5 list-disc list-inside leading-relaxed">
                <li>
                  <span className="font-extrabold text-slate-950">Đi xe máy:</span> Gửi xe tại hầm giữ xe trong trường (Cổng 12 Nguyễn Văn Bảo) hoặc bãi giữ xe đối diện cổng.
                </li>
                <li>
                  <span className="font-extrabold text-slate-950">Đi Grab / XanhSM / Taxi:</span> Khuyến khích nhất vì sáng lễ tốt nghiệp cổng trường rất đông. Đặt điểm đến{' '}
                  <span className="font-extrabold text-red-700">Cổng chính ĐH Công Nghiệp TP.HCM</span>.
                </li>
                <li>
                  <span className="font-extrabold text-slate-950">Khi tới cổng:</span> Gọi điện hoặc nhắn Zalo cho Chí Hiếu để mình ra đón ngay nhé!
                </li>
              </ul>
            </div>
          </div>

          {/* Instant Contact Buttons */}
          <div className="space-y-2.5 pt-3 border-t-2 border-slate-200">
            <p className="text-xs uppercase tracking-wider text-slate-600 font-extrabold">
              Liên hệ trực tiếp Văn Chí Hiếu
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`tel:${INVITATION_CONFIG.contact.phoneRaw}`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow hover:bg-emerald-700 transition-colors"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Gọi: {INVITATION_CONFIG.contact.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={copyPhone}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-50 border-2 border-blue-300 px-4 py-3 text-xs font-mono font-extrabold text-blue-900 hover:bg-blue-100 transition-colors"
              >
                {copiedPhone ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-700" />
                    <span className="text-emerald-800">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-blue-700" />
                    <span>Copy SĐT</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={INVITATION_CONFIG.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-blue-800 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Nhắn Zalo Chí Hiếu</span>
              </a>

              <a
                href={INVITATION_CONFIG.event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300 transition-colors"
              >
                <Navigation className="h-4 w-4" />
                <span>Mở Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Embedded Google Map */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-amber-500 p-2.5 shadow-lg overflow-hidden min-h-[360px] flex flex-col">
          <div className="relative flex-1 w-full overflow-hidden rounded-xl bg-slate-100 min-h-[340px]">
            <iframe
              title="Bản đồ Đại học Công nghiệp TP.HCM - 12 Nguyễn Văn Bảo"
              src={INVITATION_CONFIG.event.googleMapsEmbed}
              className="h-full w-full min-h-[340px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
