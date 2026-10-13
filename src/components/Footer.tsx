import React from 'react';
import { 
  Youtube, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Heart,
  Sparkles
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenConnectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConnectModal }) => {
  return (
    <footer className="bg-[#090a10] border-t border-amber-900/30 text-gray-300 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Church Bio & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Reframe Ministries International Logo"
                className="w-12 h-12 rounded-full border-2 border-amber-400 bg-white object-contain p-0.5 shadow-md"
              />
              <div>
                <span className="font-serif-church font-bold text-white text-base block">
                  Reframe Ministries
                </span>
                <span className="text-xs text-amber-300 font-mono">International</span>
              </div>
            </div>

            <p className="text-xs text-cyan-300 font-serif-church italic font-semibold">
              {CHURCH_INFO.motto}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              A vibrant, Spirit-filled church family in Najjanankumbi raising kingdom ambassadors rooted in Christ.
            </p>

            <div className="text-xs text-gray-400">
              <strong className="text-white block">Sanctuary:</strong>
              {CHURCH_INFO.location.address}, {CHURCH_INFO.location.city}
              <span className="block text-[11px] text-amber-300/80 mt-0.5">
                {CHURCH_INFO.location.landmark}
              </span>
            </div>
          </div>

          {/* Col 2: Service Schedule */}
          <div className="space-y-3">
            <h4 className="font-serif-church text-sm font-bold text-white tracking-wider uppercase">
              Sanctuary Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-gray-300 font-medium">Sunday 1st Service</span>
                <span className="text-amber-400 font-mono">8:00 AM – 10:00 AM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-gray-300 font-medium">Sunday 2nd Service</span>
                <span className="text-amber-400 font-mono">10:30 AM – 1:00 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-white/5">
                <span className="text-gray-300 font-medium">Wednesday Breakthrough</span>
                <span className="text-amber-400 font-mono">5:30 PM – 7:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300 font-medium">Monthly Overnight</span>
                <span className="text-amber-400 font-mono">Last Friday 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Media Channels */}
          <div className="space-y-3">
            <h4 className="font-serif-church text-sm font-bold text-white tracking-wider uppercase">
              Official Media Channels
            </h4>
            <div className="space-y-2">
              <a
                href={CHURCH_INFO.socialMedia.tiktok.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition border border-white/5 text-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-[10px]">
                  TT
                </div>
                <div>
                  <span className="text-white font-medium group-hover:text-pink-300 block">TikTok</span>
                  <span className="text-[10px] text-gray-500">{CHURCH_INFO.socialMedia.tiktok.handle}</span>
                </div>
              </a>

              <a
                href={CHURCH_INFO.socialMedia.youtube.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition border border-white/5 text-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-medium group-hover:text-red-300 block">YouTube</span>
                  <span className="text-[10px] text-gray-500">{CHURCH_INFO.socialMedia.youtube.handle}</span>
                </div>
              </a>

              <a
                href={CHURCH_INFO.socialMedia.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition border border-white/5 text-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-medium group-hover:text-purple-300 block">Instagram</span>
                  <span className="text-[10px] text-gray-500">{CHURCH_INFO.socialMedia.instagram.handle}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Col 4: Pastoral Contact & Giving Note */}
          <div className="space-y-3">
            <h4 className="font-serif-church text-sm font-bold text-white tracking-wider uppercase">
              Connect With Us
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <a 
                href={`tel:${CHURCH_INFO.contacts.phonePrimary}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono">{CHURCH_INFO.contacts.phonePrimary}</span>
              </a>

              <a 
                href={`https://wa.me/256700849201`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp Pastor Line</span>
              </a>

              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{CHURCH_INFO.contacts.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConnectModal}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
              >
                First Time Visiting? Connect Card
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Reframe Ministries International (Najjanankumbi) • Led by Pastor James Kabali. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            <span>Built for the glory of God • Najjanankumbi, Entebbe Road, Kampala</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
