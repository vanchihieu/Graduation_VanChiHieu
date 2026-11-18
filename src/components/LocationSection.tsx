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
    <div className="rounded-3xl glass-3d-shell p-5 sm:p-7 text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Directions, Parking Tips & Direct Call/Zalo */}
        <div className="lg:col-span-5 rounded-2xl glass-3d-panel p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="rounded-2xl bg-slate-900 p-3 text-yellow-300 shrink-0 shadow">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold uppercase text-blue-700">
                  ĐỊA ĐIỂM TỔ CHỨC LỄ TỐT NGHIỆP
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold hero-name-modern mt-0.5 leading-snug">
                  {INVITATION_CONFIG.event.venueName}
                </h2>
                <p className="text-sm text-slate-700 font-medium mt-1">
                  {INVITATION_CONFIG.event.address}
                </p>
                <p className="text-xs font-mono font-bold text-blue-800 mt-1">
                  Điểm hẹn: {INVITATION_CONFIG.event.meetupSpot}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-yellow-50/90 p-4 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Bike className="h-4 w-4 text-blue-700" />
                <span>Lưu ý gửi xe &amp; di chuyển tại IUH</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>
                  <span className="font-bold text-slate-900">Đi xe máy:</span> Gửi xe tại hầm giữ xe trong trường (Cổng 12 Nguyễn Văn Bảo) hoặc bãi giữ xe gần Bách hóa xanh.
                </li>
                <li>
                  <span className="font-bold text-slate-900">Đi Grab / XanhSM / Taxi:</span> Khuyến khích nhất vì sáng lễ tốt nghiệp cổng trường rất đông. Đặt điểm đến{' '}
                  <span className="font-bold text-blue-700">Cổng chính ĐH Công Nghiệp TP.HCM</span>.
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Right: Clean Borderless Embedded Google Map */}
        <div className="lg:col-span-7 rounded-2xl bg-white shadow-md overflow-hidden min-h-[360px] flex flex-col">
          <div className="relative flex-1 w-full overflow-hidden bg-slate-100 min-h-[340px]">
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
