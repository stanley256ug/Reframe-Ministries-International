import React from 'react';
import { 
  X, 
  Youtube, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  MapPin, 
  Check, 
  ExternalLink,
  Flame,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface PastorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConnectModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const PastorModal: React.FC<PastorModalProps> = ({
  isOpen,
  onClose,
  onOpenConnectModal,
  onOpenPrayerModal
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative bg-gradient-to-br from-[#121424] via-[#161324] to-[#0d0f17] rounded-3xl border border-amber-500/40 max-w-3xl w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-[#0e101b] border-b border-amber-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-amber-400 shrink-0">
              <img 
                src="/logo.svg" 
                alt="Reframe Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <h4 className="font-serif-church font-bold text-white text-sm sm:text-base leading-none">
                Reframe Ministries International
              </h4>
              <p className="text-[11px] text-amber-300 font-serif-church italic mt-0.5">
                Najjanankumbi • “The just shall live by faith”
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition border border-white/10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center md:items-start">
            
            {/* Pastor's Portrait (Visible, unedited, full natural aspect ratio) */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="w-56 sm:w-64 md:w-72 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-2xl shadow-amber-500/25 bg-slate-900">
                <img
                  src="/pastor-james-kabali.jpg"
                  alt="Pastor James Kabali - Lead Pastor Reframe Ministries International"
                  className="w-full h-auto object-contain block"
                />
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Lead Pastor & Founder</span>
              </div>
            </div>

            {/* Pastor Information */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  Church Leadership
                </span>
                <h2 className="font-serif-church text-2xl sm:text-4xl font-bold text-white mt-1.5">
                  Pastor James Kabali
                </h2>
                <p className="font-serif-church text-cyan-300 italic text-sm sm:text-base font-semibold mt-1">
                  “The just shall live by faith” (Romans 1:17)
                </p>
              </div>

              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-amber-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sanctuary: Najjanankumbi, Entebbe Road, Kampala, Uganda</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Pastor James Kabali is the visionary leader and founder of <strong>Reframe Ministries International</strong>. Called with an apostolic mandate to reframe mindsets and empower believers across Uganda and the nations to walk in authentic faith, supernatural victory, and kingdom authority.
                </p>
              </div>

              {/* Ministry Focus & Sermons */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Key Apostolic Teachings & Themes:
                </h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200">
                    🔴 Love vs Sacrifice (Parts I - IV)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200">
                    ⚔️ Exposing the Devil & Altars
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200">
                    🔥 The Just Shall Live by Faith
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200">
                    👑 Kingdom Possession & Dominion
                  </span>
                </div>
              </div>

              {/* Direct Connect & Socials */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <p className="text-xs text-gray-400">
                  Follow Pastor James Kabali on official church channels:
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs">
                  <a
                    href="https://www.youtube.com/@reframeministriesinternational"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition shadow-md shadow-red-600/20"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>YouTube (@reframeministriesinternational)</span>
                  </a>

                  <a
                    href="https://www.tiktok.com/@reframeministriesinternational"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold transition shadow-md"
                  >
                    <span>TikTok</span>
                  </a>

                  <a
                    href="https://wa.me/256700849201"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Pastor</span>
                  </a>

                  <a
                    href="tel:+256700849201"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 font-bold transition border border-white/10"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+256 700 849 201</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-3 justify-center md:justify-start">
                {onOpenConnectModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenConnectModal();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Connect Card / Salvation Decision</span>
                  </button>
                )}

                {onOpenPrayerModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPrayerModal();
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs transition flex items-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Send Prayer to Pastor's Altar</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
