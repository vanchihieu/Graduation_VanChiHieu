import React, { useMemo, useState } from 'react';
import { Check, Copy, Link2, MessageSquareShare, X } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

interface LinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkGeneratorModal: React.FC<LinkGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [guestName, setGuestName] = useState<string>('');
  const [pronounMode, setPronounMode] = useState<string>('ban');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const generatedUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.origin + window.location.pathname);
    if (guestName.trim()) {
      url.searchParams.set('to', guestName.trim());
    }
    if (pronounMode !== 'ban') {
      url.searchParams.set('p', pronounMode);
    }
    return url.toString();
  }, [guestName, pronounMode]);

  const sampleMessage = useMemo(() => {
    const target = guestName.trim() || 'bạn';
    if (pronounMode === 'em') {
      return `Dạ em chào ${target}! Sáng Thứ Tư ngày 25/11/2026 lúc 09:30 em có Lễ Tốt Nghiệp Kỹ sư Kỹ thuật Phần mềm tại ĐH Công Nghiệp TP.HCM (12 Nguyễn Văn Bảo, Gò Vấp). Em gửi thiệp mời thân mời ${target} ghé chung vui và chụp hình kỷ niệm cùng em ạ:\n👉 ${generatedUrl}`;
    }
    if (pronounMode === 'thayco') {
      return `Dạ em kính chào ${target} ạ! Sáng Thứ Tư ngày 25/11/2026 lúc 09:30 là Lễ Tốt Nghiệp của em tại trường IUH. Em xin phép gửi thiệp mời điện tử kính mời ${target} cùng chung vui với em trong cột mốc ý nghĩa này ạ:\n👉 ${generatedUrl}`;
    }
    if (pronounMode === 'anh') {
      return `Chào ${target} nha! Sáng Thứ Tư 25/11/2026 lúc 09:30 anh có Lễ Tốt Nghiệp tại trường IUH (12 Nguyễn Văn Bảo, Gò Vấp). Anh gửi thiệp mời thân mời ${target} qua chung vui chụp ảnh cùng anh nhé:\n👉 ${generatedUrl}`;
    }
    return `Chào ${target} ơi! 🎓 Sáng Thứ Tư 25/11/2026 lúc 09:30 mình chính thức tốt nghiệp Kỹ sư KTPM tại ĐH Công Nghiệp TP.HCM (12 Nguyễn Văn Bảo, Gò Vấp). Mình gửi thiệp mời riêng cho ${target}, rất mong bạn ghé chung vui & chụp ảnh kỷ niệm cùng Chí Hiếu nha:\n👉 ${generatedUrl}`;
  }, [guestName, pronounMode, generatedUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(sampleMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 border-2 border-amber-400 shadow-2xl space-y-4 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-slate-900" />
            <h3 className="font-serif text-xl font-extrabold text-slate-900">
              Tạo Link Thiệp Mời Tên Riêng
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 p-1.5 text-slate-800 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-medium">
          Nhập tên từng người bạn để tạo đường link thiệp mời hiển thị trang trọng đúng tên của họ:
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-800 mb-1">
              Tên khách mời hiển thị trên thiệp
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="VD: Minh Khôi, Anh Tuấn, Hội bạn thân..."
              className="w-full rounded-xl bg-slate-50 border-2 border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-800 mb-1">
              Cách xưng hô trên thiệp
            </label>
            <select
              value={pronounMode}
              onChange={(e) => setPronounMode(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border-2 border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-slate-900 focus:outline-none"
            >
              <option value="ban">Bạn bè đồng trang lứa (Mình - Bạn)</option>
              <option value="em">Mời Anh / Chị (Em Hiếu - Anh/Chị)</option>
              <option value="anh">Mời các Em khóa dưới (Anh Hiếu - Em)</option>
              <option value="thayco">Kính mời Thầy / Cô (Em - Thầy/Cô)</option>
            </select>
          </div>

          <div className="rounded-xl bg-slate-100 border border-slate-300 p-3">
            <p className="text-[11px] font-mono font-bold text-slate-600 mb-1">
              Đường link cá nhân hóa:
            </p>
            <p className="font-mono text-xs font-bold text-blue-800 break-all">{generatedUrl}</p>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-300 p-3">
            <p className="text-[11px] font-mono font-bold text-amber-800 mb-1">
              Tin nhắn mẫu gửi Zalo / Messenger:
            </p>
            <p className="text-xs font-medium text-slate-900 whitespace-pre-line leading-relaxed">
              {sampleMessage}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 border-2 border-slate-300 px-4 py-2.5 text-xs font-extrabold text-slate-900 hover:bg-slate-200"
          >
            {copiedLink ? (
              <>
                <Check className="h-4 w-4 text-emerald-700" />
                <span className="text-emerald-800">Đã copy Link!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-900" />
                <span>Chỉ copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border-2 border-amber-400 px-4 py-2.5 text-xs font-extrabold text-amber-300 shadow-md hover:bg-slate-800"
          >
            {copiedText ? (
              <>
                <Check className="h-4 w-4" />
                <span>Đã copy cả lời mời!</span>
              </>
            ) : (
              <>
                <MessageSquareShare className="h-4 w-4" />
                <span>Copy Lời Mời + Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
