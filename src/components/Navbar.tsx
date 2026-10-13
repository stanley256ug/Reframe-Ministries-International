import React, { useState } from 'react';
import { 
  Tv, 
  Radio, 
  HeartHandshake, 
  BookOpen, 
  MapPin, 
  Share2, 
  Menu, 
  X, 
  Sparkles,
  Youtube,
  Instagram,
  Flame,
  UserPlus
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLive: boolean;
  setIsLive: (val: boolean) => void;
  onOpenConnectModal: () => void;
  onOpenGivingModal: () => void;
  onOpenPastorModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isLive,
  setIsLive,
  onOpenConnectModal,
  onOpenGivingModal,
  onOpenPastorModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'live', label: 'Live Sanctuary', icon: Tv, badge: isLive ? 'LIVE' : undefined },
    { id: 'social', label: 'Social Hub', icon: Share2, subtitle: 'TikTok • IG • YT' },
    { id: 'sermons', label: 'Sermons & Media', icon: Radio },
    { id: 'giving', label: 'Give & Tithe', icon: HeartHandshake, highlight: true },
    { id: 'devotional', label: 'Devotional & Bible', icon: BookOpen },
    { id: 'prayer', label: 'Prayer Wall', icon: Flame },
    { id: 'visit', label: 'Najjanankumbi Sanctuary', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d14]/90 backdrop-blur-md border-b border-amber-900/30">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-950 via-amber-950/80 to-purple-950 text-xs px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between text-amber-200/90 border-b border-amber-800/20">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            {isLive ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            )}
          </span>
          <span className="font-medium tracking-wide">
            {isLive 
              ? 'SUNDAY LIVE BROADCAST ON AIR • Najjanankumbi Sanctuary' 
              : 'NEXT SERVICE: Sunday Celebration 8:00 AM & 10:30 AM (EAT)'}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            title="Toggle Live Demo State"
            className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition border border-amber-500/30 ml-1"
          >
            {isLive ? 'Simulate Replay' : 'Simulate Live'}
          </button>
        </div>

        {/* Quick Social Handles */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <span className="text-gray-400">Connect:</span>
          <a 
            href={CHURCH_INFO.socialMedia.youtube.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-white transition text-red-400"
            title="YouTube: @reframeministriesinternational"
          >
            <Youtube className="w-3.5 h-3.5" />
            <span className="font-semibold">YouTube</span>
            <span className="text-[10px] text-gray-400">@reframeministriesinternational</span>
          </a>
          <span className="text-gray-600">•</span>
          <a 
            href={CHURCH_INFO.socialMedia.tiktok.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-white transition text-pink-400"
            title="TikTok: @reframeministriesinternational"
          >
            <span className="font-semibold">TikTok</span>
            <span className="text-[10px] text-gray-400">@reframeministriesinternational</span>
          </a>
          <span className="text-gray-600">•</span>
          <a 
            href={CHURCH_INFO.socialMedia.instagram.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-white transition text-purple-300"
            title="Instagram: @reframeministriesinternational"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span className="font-semibold">Instagram</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Church Name */}
          <div 
            onClick={() => handleNavClick('live')}
            className="flex items-center gap-3 cursor-pointer group py-2"
          >
            <div className="relative">
              <img
                src="/logo.svg"
                alt="Reframe Ministries International Official Logo"
                className="w-12 h-12 rounded-full border-2 border-amber-400/80 shadow-lg shadow-amber-500/20 bg-white object-contain p-0.5 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0c0d14]" title="Active Sanctuary Broadcast"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-church text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                  Reframe Ministries
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/40">
                  Najjanankumbi
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 hidden sm:block tracking-tight font-serif-church italic">
                “The just shall live by faith” • Entebbe Road
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-purple-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-red-600 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenPastorModal && (
              <button
                onClick={onOpenPastorModal}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold transition group shadow-sm"
                title="Pastor James Kabali - Lead Pastor & Founder"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-400 shrink-0 bg-slate-900">
                  <img
                    src="/pastor-james-kabali.jpg"
                    alt="Pastor James Kabali"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition"
                  />
                </div>
                <span className="hidden xl:inline">Pastor James Kabali</span>
                <span className="xl:hidden">Pastor</span>
              </button>
            )}

            <button
              onClick={onOpenConnectModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition hover:border-amber-400/40"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-400" />
              <span>I'm New Here</span>
            </button>

            <button
              onClick={onOpenGivingModal}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-gray-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-md shadow-amber-500/20 transition transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-gray-950" />
              <span>Give / MoMo</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenPastorModal && (
              <button
                onClick={onOpenPastorModal}
                className="flex items-center gap-1.5 p-1 rounded-full bg-amber-500/10 border border-amber-400/50"
                title="Pastor James Kabali"
              >
                <img
                  src="/pastor-james-kabali.jpg"
                  alt="Pastor James Kabali"
                  className="w-7 h-7 rounded-full object-cover object-top border border-amber-400"
                />
              </button>
            )}

            <button
              onClick={onOpenGivingModal}
              className="flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-950 bg-amber-400 hover:bg-amber-300"
            >
              <span>Give</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e101a] border-b border-amber-900/40 px-4 pt-3 pb-6 space-y-2">
          {/* Pastor James Kabali Banner in Mobile Drawer */}
          {onOpenPastorModal && (
            <div 
              onClick={() => {
                onOpenPastorModal();
                setMobileMenuOpen(false);
              }}
              className="mb-3 bg-gradient-to-r from-purple-950/80 to-amber-950/70 p-3 rounded-2xl border border-amber-500/30 flex items-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-14 rounded-xl overflow-hidden border border-amber-400 shrink-0">
                <img
                  src="/pastor-james-kabali.jpg"
                  alt="Pastor James Kabali"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Lead Pastor
                </span>
                <h4 className="font-serif-church font-bold text-white text-sm truncate">
                  Pastor James Kabali
                </h4>
                <p className="text-[10px] text-gray-300 italic truncate">
                  “The just shall live by faith”
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onOpenConnectModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-purple-950/60 border border-purple-800 text-purple-200"
            >
              <UserPlus className="w-3.5 h-3.5 text-purple-400" />
              <span>I'm New Here</span>
            </button>
            <button
              onClick={() => {
                onOpenGivingModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500 text-gray-950"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Give / MoMo</span>
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-gray-800/80 flex items-center justify-around text-xs text-gray-400">
            <a 
              href={CHURCH_INFO.socialMedia.tiktok.url} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-pink-400"
            >
              TikTok
            </a>
            <a 
              href={CHURCH_INFO.socialMedia.instagram.url} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-purple-400"
            >
              Instagram
            </a>
            <a 
              href={CHURCH_INFO.socialMedia.youtube.url} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-red-400"
            >
              YouTube
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
