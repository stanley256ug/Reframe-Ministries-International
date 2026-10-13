import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Share2, 
  Radio, 
  HeartHandshake, 
  BookOpen, 
  Flame, 
  MapPin, 
  Sparkles, 
  PhoneCall, 
  MessageSquare,
  Plus
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { LivePlayerSection } from './components/LivePlayerSection';
import { SocialMediaHub } from './components/SocialMediaHub';
import { SermonArchive } from './components/SermonArchive';
import { GivingSection } from './components/GivingSection';
import { DevotionalBibleSection } from './components/DevotionalBibleSection';
import { PrayerWallSection } from './components/PrayerWallSection';
import { LocationScheduleSection } from './components/LocationScheduleSection';
import { ConnectModal } from './components/ConnectModal';
import { PastorModal } from './components/PastorModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_LIVE_BROADCAST, 
  INITIAL_PRAYER_REQUESTS, 
  CHURCH_INFO 
} from './data/churchData';
import { PrayerRequest } from './types/church';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('live');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false);
  const [pastorModalOpen, setPastorModalOpen] = useState<boolean>(false);
  const [givingModalOpen, setGivingModalOpen] = useState<boolean>(false);

  // Prayer requests list state with localStorage backup
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('rmi_prayer_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PRAYER_REQUESTS;
  });

  const handleAddPrayerRequest = (
    newReq: Omit<PrayerRequest, 'id' | 'submittedAt' | 'prayCount' | 'hasPrayed' | 'pastorNoted'>
  ) => {
    const created: PrayerRequest = {
      ...newReq,
      id: 'pr-' + Date.now(),
      submittedAt: 'Just now',
      prayCount: 1,
      hasPrayed: true,
      pastorNoted: true
    };

    const updated = [created, ...prayerRequests];
    setPrayerRequests(updated);
    localStorage.setItem('rmi_prayer_requests', JSON.stringify(updated));
  };

  const handlePrayForRequest = (id: string) => {
    const updated = prayerRequests.map((req) => {
      if (req.id === id) {
        const hasPrayed = !req.hasPrayed;
        return {
          ...req,
          hasPrayed,
          prayCount: hasPrayed ? req.prayCount + 1 : Math.max(0, req.prayCount - 1)
        };
      }
      return req;
    });

    setPrayerRequests(updated);
    localStorage.setItem('rmi_prayer_requests', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0c0d14] text-gray-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLive={isLive}
        setIsLive={setIsLive}
        onOpenConnectModal={() => setConnectModalOpen(true)}
        onOpenGivingModal={() => {
          setActiveTab('giving');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPastorModal={() => setPastorModalOpen(true)}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        {activeTab === 'live' && (
          <div className="space-y-12">
            <LivePlayerSection
              broadcast={INITIAL_LIVE_BROADCAST}
              isLive={isLive}
              onOpenGivingModal={() => {
                setActiveTab('giving');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenConnectModal={() => setConnectModalOpen(true)}
              onAddPrayerRequest={handleAddPrayerRequest}
              onOpenPastorModal={() => setPastorModalOpen(true)}
            />

            {/* Pastor James Kabali Feature & Welcome Banner (Visible, Unedited, Prominent Portrait) */}
            <div className="bg-gradient-to-r from-[#171a2c] via-[#1a1528] to-[#141624] p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 flex flex-col md:flex-row items-center gap-6 lg:gap-8 shadow-2xl relative overflow-hidden">
              {/* Subtle gold aura */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Pastor Portrait Display */}
              <div 
                onClick={() => setPastorModalOpen(true)}
                className="relative shrink-0 cursor-pointer group flex flex-col items-center"
                title="Click to view full unedited photo of Pastor James Kabali"
              >
                <div className="w-48 sm:w-56 md:w-64 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-2xl shadow-amber-500/30 bg-slate-900 group-hover:border-amber-300 transition-all transform group-hover:scale-[1.02]">
                  <img
                    src="/pastor-james-kabali.jpg"
                    alt="Pastor James Kabali - Lead Pastor Reframe Ministries International"
                    className="w-full h-auto object-contain block"
                  />
                </div>
                
                <div className="absolute bottom-2 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xl border border-amber-300 flex items-center gap-1">
                  <span>LEAD PASTOR & FOUNDER</span>
                </div>
              </div>

              {/* Pastor Details & Ministry Bio */}
              <div className="flex-1 text-center md:text-left space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  <span>Leadership • Reframe Ministries International (Najjanankumbi)</span>
                </div>
                
                <div>
                  <h3 className="font-serif-church text-2xl sm:text-4xl font-bold text-white tracking-wide">
                    Pastor James Kabali
                  </h3>
                  <p className="font-serif-church text-cyan-300 text-sm sm:text-base italic font-semibold mt-0.5">
                    “The just shall live by faith” (Romans 1:17 • Habakkuk 2:4)
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                  {CHURCH_INFO.leadPastor.bio}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs">
                  <button
                    onClick={() => setPastorModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-gray-950 hover:bg-amber-400 font-extrabold transition shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                  >
                    <span>View Full Photo & Profile 🔍</span>
                  </button>

                  <a
                    href="https://www.youtube.com/@reframeministriesinternational"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white font-bold transition border border-red-500/30 flex items-center gap-1.5"
                  >
                    <span>YouTube (@reframeministriesinternational)</span>
                  </a>

                  <a
                    href="https://www.tiktok.com/@reframeministriesinternational"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-pink-600/20 text-pink-300 hover:bg-pink-600 hover:text-white font-bold transition border border-pink-500/30"
                  >
                    <span>TikTok</span>
                  </a>

                  <button
                    onClick={() => setConnectModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 font-bold transition border border-white/15"
                  >
                    Connect With Pastor
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Teasers on Live Page */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
              
              {/* Teaser 1: Social Media Hub */}
              <div 
                onClick={() => { setActiveTab('social'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#121422] p-5 rounded-2xl border border-white/5 hover:border-pink-500/40 cursor-pointer transition group shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <Share2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-pink-300 transition">
                  TikTok, IG & YouTube Hub &rarr;
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Watch 60s viral sermon snippets, praise highlights, and subscribe to our channels.
                </p>
              </div>

              {/* Teaser 2: Giving & MoMo */}
              <div 
                onClick={() => { setActiveTab('giving'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#121422] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/40 cursor-pointer transition group shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-yellow-300 transition">
                  Give Tithes via MTN MoMo & Airtel &rarr;
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Support the Najjanankumbi sanctuary expansion and give your weekly worship seed.
                </p>
              </div>

              {/* Teaser 3: Najjanankumbi Directions */}
              <div 
                onClick={() => { setActiveTab('visit'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#121422] p-5 rounded-2xl border border-white/5 hover:border-purple-500/40 cursor-pointer transition group shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-purple-300 transition">
                  Visit Us in Najjanankumbi &rarr;
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Stella Stage, Entebbe Road. Sunday services 8:00 AM & 10:30 AM EAT.
                </p>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'social' && <SocialMediaHub />}

        {activeTab === 'sermons' && <SermonArchive />}

        {activeTab === 'giving' && <GivingSection />}

        {activeTab === 'devotional' && <DevotionalBibleSection />}

        {activeTab === 'prayer' && (
          <PrayerWallSection
            requests={prayerRequests}
            onAddRequest={handleAddPrayerRequest}
            onPrayForRequest={handlePrayForRequest}
          />
        )}

        {activeTab === 'visit' && (
          <LocationScheduleSection
            onOpenConnectModal={() => setConnectModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar for Mobile church members */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0f17]/95 backdrop-blur-lg border-t border-amber-900/40 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 rounded-lg transition ${
            activeTab === 'live' ? 'text-amber-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Tv className="w-4 h-4" />
            {isLive && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 animate-ping"></span>
            )}
          </div>
          <span>Live</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 rounded-lg transition ${
            activeTab === 'social' ? 'text-pink-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Social Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('giving')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 rounded-lg transition ${
            activeTab === 'giving' ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Give / MoMo</span>
        </button>

        <button
          onClick={() => setActiveTab('prayer')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 rounded-lg transition ${
            activeTab === 'prayer' ? 'text-purple-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Prayer</span>
        </button>

        <button
          onClick={() => setActiveTab('visit')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold p-1 rounded-lg transition ${
            activeTab === 'visit' ? 'text-amber-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Najjanankumbi</span>
        </button>
      </nav>

      {/* Connect Modal */}
      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />

      {/* Pastor James Kabali Full Portrait & Bio Lightbox Modal */}
      <PastorModal
        isOpen={pastorModalOpen}
        onClose={() => setPastorModalOpen(false)}
        onOpenConnectModal={() => setConnectModalOpen(true)}
        onOpenPrayerModal={() => {
          setActiveTab('prayer');
          setPastorModalOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenConnectModal={() => setConnectModalOpen(true)}
      />

    </div>
  );
}
