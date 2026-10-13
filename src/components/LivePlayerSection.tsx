import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Radio,
  Tv,
  Users,
  Send,
  Download,
  Copy,
  Check,
  Flame,
  Heart,
  Sparkles,
  ExternalLink,
  BookOpen,
  Share2,
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { 
  LiveBroadcast, 
  ChatMessage, 
  PrayerRequest,
  SermonNote 
} from '../types/church';
import { CHURCH_INFO, SAMPLE_BIBLE_VERSES } from '../data/churchData';

interface LivePlayerSectionProps {
  broadcast: LiveBroadcast;
  isLive: boolean;
  onOpenGivingModal: () => void;
  onOpenConnectModal: () => void;
  onAddPrayerRequest: (request: Omit<PrayerRequest, 'id' | 'submittedAt' | 'prayCount' | 'hasPrayed' | 'pastorNoted'>) => void;
  onOpenPastorModal?: () => void;
}

interface FloatingAmen {
  id: number;
  text: string;
  x: number;
}

export const LivePlayerSection: React.FC<LivePlayerSectionProps> = ({
  broadcast,
  isLive,
  onOpenGivingModal,
  onOpenConnectModal,
  onAddPrayerRequest,
  onOpenPastorModal
}) => {
  // Mode: video vs audio-only (data saver)
  const [streamMode, setStreamMode] = useState<'video' | 'audio'>('video');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState<'chat' | 'notes' | 'prayer' | 'giving'>('chat');
  
  // Floating amens
  const [floatingAmens, setFloatingAmens] = useState<FloatingAmen[]>([]);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('rmi_chat_messages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'c1',
        user: 'Elder Joseph Mukasa',
        location: 'Najjanankumbi Sanctuary',
        message: 'Welcome everyone! The presence of God is already thick in the sanctuary!',
        timestamp: '10:32 AM',
        isHost: true,
        avatarColor: 'from-amber-500 to-amber-700'
      },
      {
        id: 'c2',
        user: 'Sarah Nalubega',
        location: 'Entebbe, Uganda',
        message: 'Tuned in from Entebbe! Expecting a personal word today! Amen! 🔥🙏',
        timestamp: '10:34 AM',
        avatarColor: 'from-purple-500 to-pink-600'
      },
      {
        id: 'c3',
        user: 'David Ochieng',
        location: 'Nairobi, Kenya',
        message: 'Reframe Ministries is our home online! Receiving with faith!',
        timestamp: '10:35 AM',
        avatarColor: 'from-blue-500 to-cyan-600'
      },
      {
        id: 'c4',
        user: 'Deaconess Grace K.',
        location: 'Media Team Najjanankumbi',
        message: 'Intercessors are actively praying for every request submitted in the Prayer tab!',
        timestamp: '10:37 AM',
        isHost: true,
        avatarColor: 'from-amber-600 to-yellow-600'
      },
      {
        id: 'c5',
        user: 'Brian Katende',
        location: 'London, UK Diaspora',
        message: 'Watching live with the family in London. Romans 12:2 hit so deep! 🕊️',
        timestamp: '10:38 AM',
        avatarColor: 'from-emerald-500 to-teal-700'
      }
    ];
  });
  
  const [chatInput, setChatInput] = useState('');
  const [userName, setUserName] = useState(() => localStorage.getItem('rmi_user_name') || '');
  const [userLocation, setUserLocation] = useState(() => localStorage.getItem('rmi_user_location') || 'Najjanankumbi');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Notes state
  const [personalNotes, setPersonalNotes] = useState(() => {
    return localStorage.getItem('rmi_sermon_notes') || '';
  });
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [copiedNoteFeedback, setCopiedNoteFeedback] = useState(false);

  // Quick Prayer Slip state
  const [prayerName, setPrayerName] = useState(userName);
  const [prayerCategory, setPrayerCategory] = useState<'Healing' | 'Breakthrough' | 'Family' | 'Deliverance' | 'Finances' | 'Thanksgiving' | 'Spiritual Growth'>('Breakthrough');
  const [prayerContent, setPrayerContent] = useState('');
  const [prayerIsConfidential, setPrayerIsConfidential] = useState(false);
  const [prayerSentFeedback, setPrayerSentFeedback] = useState(false);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendAmen = (label: string) => {
    const newAmen: FloatingAmen = {
      id: Date.now() + Math.random(),
      text: label,
      x: 20 + Math.random() * 60
    };
    setFloatingAmens((prev) => [...prev, newAmen]);
    setTimeout(() => {
      setFloatingAmens((prev) => prev.filter((a) => a.id !== newAmen.id));
    }, 1700);

    // Also post to chat if appropriate
    const sender = userName.trim() || 'Online Member';
    const newMsg: ChatMessage = {
      id: 'c-' + Date.now(),
      user: sender,
      location: userLocation.trim() || 'Online',
      message: label + ' ✝️',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarColor: 'from-amber-600 to-purple-600'
    };
    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);
    localStorage.setItem('rmi_chat_messages', JSON.stringify(updated.slice(-30)));
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const sender = userName.trim() || 'Online Believer';
    const loc = userLocation.trim() || 'Uganda';
    localStorage.setItem('rmi_user_name', sender);
    localStorage.setItem('rmi_user_location', loc);

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      user: sender,
      location: loc,
      message: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarColor: 'from-amber-500 to-purple-600'
    };

    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);
    setChatInput('');
    localStorage.setItem('rmi_chat_messages', JSON.stringify(updated.slice(-30)));
  };

  const handleSaveNotes = () => {
    localStorage.setItem('rmi_sermon_notes', personalNotes);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2500);
  };

  const handleDownloadNotes = () => {
    const fullText = `REFRAMING MINISTRIES INTERNATIONAL - NAJJANANKUMBI
SERMON NOTES: ${broadcast.title}
Speaker: ${broadcast.speaker} (${broadcast.speakerRole})
Scripture: ${broadcast.scriptureAnchor}
Date: ${new Date().toLocaleDateString()}

KEY TEACHING POINTS:
${broadcast.keyPoints.join('\n')}

MY PERSONAL NOTES & REVELATIONS:
${personalNotes}

Reframe Ministries International • “The just shall live by faith”
Najjanankumbi Sanctuary, Entebbe Road, Kampala, Uganda
YouTube: https://www.youtube.com/@reframeministriesinternational
TikTok: https://www.tiktok.com/@reframeministriesinternational
`;
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RMI-Sermon-Notes-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(personalNotes);
    setCopiedNoteFeedback(true);
    setTimeout(() => setCopiedNoteFeedback(false), 2000);
  };

  const insertScriptureToNotes = (verse: { ref: string; text: string }) => {
    const textToInsert = `\n[${verse.ref} - "${verse.text}"]\n`;
    setPersonalNotes((prev) => prev + textToInsert);
  };

  const handleSubmitPrayerSlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerContent.trim()) return;

    onAddPrayerRequest({
      name: prayerName.trim() || 'Online Believer',
      location: userLocation.trim() || 'Najjanankumbi',
      category: prayerCategory,
      request: prayerContent.trim(),
      isConfidential: prayerIsConfidential
    });

    setPrayerSentFeedback(true);
    setPrayerContent('');
    setTimeout(() => setPrayerSentFeedback(false), 4000);
  };

  // Real YouTube sermons from @reframeministriesinternational
  const channelVideos = [
    { id: 'DYwRCEPP_CY', title: '🔴 LIVE: LOVE VS SACRIFICE PART IV', type: 'Pastor James Kabali' },
    { id: '65O6mdliEI4', title: 'LOVE VS SACRIFICE PART III', type: 'Pastor James Kabali' },
    { id: 'tuu3fnan_QM', title: 'Praise & Worship 4th Edition', type: 'Reframe Youth' },
    { id: 'XNOTJ3W6TFk', title: 'Yesu Olina Ekitiibwa', type: 'Sanctuary Worship' },
    { id: '2LSs5KgZv-E', title: 'Under the Blood Of Jesus', type: 'Youth Service' },
    { id: 'g_wsUhE1Znc', title: 'Inspiring Faith & Transforming Lives', type: 'Sunday Service' },
    { id: '6gqHtmJYnhE', title: 'Dance Presentation 4th Edition', type: 'Creative Arts' }
  ];

  const [selectedVideoId, setSelectedVideoId] = useState<string>('DYwRCEPP_CY');

  return (
    <div className="relative">
      {/* Broadcast Header Info with Pastor James Kabali Photo */}
      <div className="mb-4 bg-gradient-to-r from-purple-950/80 via-[#131522] to-amber-950/60 p-4 sm:p-5 rounded-3xl border border-amber-900/30 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-start sm:items-center gap-4">
            {/* Pastor James Kabali Visible Portrait */}
            <div 
              onClick={onOpenPastorModal}
              className="relative shrink-0 cursor-pointer group"
              title="Click to view full portrait of Pastor James Kabali"
            >
              <div className="w-20 h-26 sm:w-24 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl shadow-amber-500/25 bg-[#0e101a] group-hover:border-amber-300 transition-all">
                <img
                  src="/pastor-james-kabali.jpg"
                  alt="Pastor James Kabali - Lead Pastor Reframe Ministries International"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500 text-gray-950 font-mono shadow-md border border-amber-400">
                LEAD PASTOR
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                  isLive 
                    ? 'bg-red-600/90 text-white shadow-lg shadow-red-600/40 animate-pulse'
                    : 'bg-amber-600/30 text-amber-300 border border-amber-500/30'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  {isLive ? 'LIVE ON AIR' : 'ON-DEMAND REPLAY'}
                </span>

                <span className="text-xs text-amber-200/90 bg-black/50 px-2.5 py-0.5 rounded-full border border-white/5 font-serif-church italic">
                  “The just shall live by faith”
                </span>

                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <strong className="text-white font-semibold">{isLive ? broadcast.viewerCount.toLocaleString() : '8,410'}</strong> watching
                </span>
              </div>

              <h1 className="font-serif-church text-lg sm:text-2xl font-bold text-white tracking-wide">
                {channelVideos.find(v => v.id === selectedVideoId)?.title || broadcast.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-300">
                <span className="text-amber-400 font-bold">Pastor James Kabali</span>
                <span className="text-gray-500">•</span>
                <span className="text-purple-300">Reframe Ministries International</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 font-mono bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">
                  {broadcast.scriptureAnchor}
                </span>
              </div>
            </div>
          </div>

          {/* Live Channel Platform Links */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`https://www.youtube.com/watch?v=${selectedVideoId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white transition border border-red-500/30"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={CHURCH_INFO.socialMedia.tiktok.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-900/30 text-pink-300 hover:bg-pink-600 hover:text-white transition border border-pink-500/30"
            >
              <span>TikTok Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={CHURCH_INFO.socialMedia.youtube.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-900/30 text-purple-200 hover:bg-purple-600 hover:text-white transition border border-purple-500/30"
            >
              <span>@reframeministriesinternational</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>

      {/* Main Grid: Player on left, interactive tabs on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Player & Reaction Bar (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          
          {/* Stream Container */}
          <div className="relative rounded-2xl overflow-hidden bg-black border border-amber-900/30 shadow-2xl shadow-purple-950/20 aspect-video group">
            
            {streamMode === 'video' ? (
              <div className="relative w-full h-full">
                {/* Real YouTube Video Embed from @reframeministriesinternational */}
                <iframe
                  key={selectedVideoId}
                  className="w-full h-full object-cover"
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideoId}?autoplay=0&rel=0&modestbranding=1`}
                  title="Reframe Ministries International - Pastor James Kabali"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>

                {/* Live Watermark Overlay with Official Logo */}
                <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 shadow-xl">
                  <img
                    src="/logo.svg"
                    alt="Reframe Logo"
                    className="w-5 h-5 rounded-full bg-white object-contain border border-amber-400"
                  />
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                  <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">
                    REFRAME • NAJJANANKUMBI
                  </span>
                </div>
              </div>
            ) : (
              /* Audio-Only Data Saver Mode for Uganda Mobile Data Savings */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-[#0f111a] to-amber-950 p-6 text-center">
                <div 
                  onClick={onOpenPastorModal}
                  className="relative mb-3 cursor-pointer group"
                  title="Click to view full portrait of Pastor James Kabali"
                >
                  <div className="w-28 h-36 sm:w-36 sm:h-46 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-slate-900 group-hover:border-amber-300 transition-all">
                    <img
                      src="/pastor-james-kabali.jpg"
                      alt="Pastor James Kabali - Lead Pastor"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center shadow-lg">
                    <Headphones className="w-3.5 h-3.5 text-black" />
                  </span>
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
                  DATA SAVER AUDIO STREAM • Saves 90% Mobile Data
                </div>
                <h3 className="font-serif-church text-lg sm:text-xl font-bold text-white max-w-md">
                  Pastor James Kabali • Reframe Ministries
                </h3>
                <p className="text-xs text-amber-300 mt-0.5 font-serif-church italic">
                  “The just shall live by faith” • Najjanankumbi Sanctuary
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Live Sanctuary Audio Stream • Reframe Ministries International
                </p>

                {/* Animated Audio Equalizer Bars */}
                <div className="flex items-end gap-1.5 h-10 my-4">
                  {[40, 75, 100, 60, 85, 45, 95, 70, 50, 80, 65, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-amber-500 to-purple-400 rounded-full animate-pulse"
                      style={{
                        height: isPlaying ? `${h}%` : '20%',
                        animationDelay: `${i * 0.12}s`,
                        animationDuration: '0.8s'
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold hover:bg-amber-400 transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-gray-950" /> : <Play className="w-4 h-4 fill-gray-950" />}
                    <span>{isPlaying ? 'Pause Audio' : 'Play Live Audio'}</span>
                  </button>

                  <button
                    onClick={() => setStreamMode('video')}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition flex items-center gap-2 border border-white/15"
                  >
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>Switch to Video</span>
                  </button>
                </div>
              </div>
            )}

            {/* Floating Amen Animations */}
            {floatingAmens.map((amen) => (
              <div
                key={amen.id}
                className="absolute bottom-12 pointer-events-none z-30 font-bold text-amber-300 bg-black/75 px-3 py-1 rounded-full border border-amber-400/40 text-sm shadow-xl animate-float-amen flex items-center gap-1"
                style={{ left: `${amen.x}%` }}
              >
                <span>{amen.text}</span>
              </div>
            ))}
          </div>

          {/* Video Switcher Bar for YouTube Channel Videos */}
          <div className="bg-[#121422] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Select Video from @reframeministriesinternational:
              </span>
              <a
                href="https://www.youtube.com/@reframeministriesinternational"
                target="_blank"
                rel="noreferrer"
                className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold text-[11px]"
              >
                <span>Open YouTube Channel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {channelVideos.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => {
                    setSelectedVideoId(vid.id);
                    setStreamMode('video');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    selectedVideoId === vid.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{vid.title}</span>
                  <span className="text-[10px] opacity-75 font-mono">({vid.type})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Player Control Bar & Stream Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#131522] p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStreamMode('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  streamMode === 'video'
                    ? 'bg-amber-500 text-gray-950 shadow-sm'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Video Stream</span>
              </button>

              <button
                onClick={() => setStreamMode('audio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  streamMode === 'audio'
                    ? 'bg-amber-500 text-gray-950 shadow-sm'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Audio (Data Saver)</span>
              </button>
            </div>

            {/* Quick Amen / Worship Reaction Emojis */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs text-gray-400 mr-1 hidden sm:inline">Send Reaction:</span>
              <button
                onClick={() => handleSendAmen('🔥 Amen!')}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/20 transition active:scale-90"
              >
                🔥 Amen!
              </button>
              <button
                onClick={() => handleSendAmen('🙏 Praying')}
                className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/20 transition active:scale-90"
              >
                🙏 Praying
              </button>
              <button
                onClick={() => handleSendAmen('🕊️ Hallelujah')}
                className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/20 transition active:scale-90"
              >
                🕊️ Hallelujah
              </button>
              <button
                onClick={() => handleSendAmen('❤️ Glory to God')}
                className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/20 transition active:scale-90"
              >
                ❤️ Glory
              </button>
            </div>
          </div>

          {/* Key Sermon Teaching Outline Card */}
          <div className="bg-[#121420] p-4 rounded-xl border border-amber-900/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif-church text-sm font-bold text-amber-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Today's Revelation Outline • {broadcast.scriptureAnchor}
              </h4>
              <button
                onClick={() => {
                  setActiveSideTab('notes');
                  insertScriptureToNotes({ ref: broadcast.scriptureAnchor, text: 'Scripture Anchor' });
                }}
                className="text-xs text-amber-400 hover:text-amber-300 underline"
              >
                Take Notes on Outline &rarr;
              </button>
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-gray-300">
              {broadcast.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Streaming Callout Banner */}
          <div className="bg-gradient-to-r from-purple-900/40 via-amber-900/30 to-purple-900/40 p-4 rounded-xl border border-purple-700/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-sm text-white flex items-center gap-2">
                <span>Follow Reframe Ministries International Across All Channels</span>
              </div>
              <p className="text-xs text-gray-300">
                Share today’s broadcast with friends & family in Najjanankumbi and abroad.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={CHURCH_INFO.socialMedia.tiktok.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-semibold border border-pink-500/40 transition"
              >
                TikTok
              </a>
              <a
                href={CHURCH_INFO.socialMedia.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold border border-purple-500/40 transition"
              >
                Instagram
              </a>
              <a
                href={CHURCH_INFO.socialMedia.youtube.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/40 transition"
              >
                YouTube
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Sanctuary Sidebar (Tabs: Chat, Notes, Prayer, Give) (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-[650px] bg-[#11131e] rounded-2xl border border-amber-900/30 overflow-hidden shadow-xl">
          
          {/* Tab Selection Header */}
          <div className="flex items-center border-b border-amber-900/20 bg-[#0d0f17]">
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeSideTab === 'chat'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span>Live Chat</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>

            <button
              onClick={() => setActiveSideTab('notes')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeSideTab === 'notes'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notes</span>
            </button>

            <button
              onClick={() => setActiveSideTab('prayer')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeSideTab === 'prayer'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Prayer</span>
            </button>

            <button
              onClick={() => setActiveSideTab('giving')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition ${
                activeSideTab === 'giving'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Give</span>
            </button>
          </div>

          {/* TAB 1: LIVE CHAT */}
          {activeSideTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Member identification bar */}
              <div className="bg-[#141724] px-3 py-2 border-b border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-300">
                  <span>Chatting as:</span>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Name (e.g. Stanley)"
                    className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-amber-300 w-28 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    placeholder="Location"
                    className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-gray-300 w-24 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Chat Messages scroll area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2.5 text-xs">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${msg.avatarColor || 'from-amber-600 to-purple-600'} flex items-center justify-center text-white font-bold text-[11px] shrink-0 border border-white/15`}>
                      {msg.user.charAt(0)}
                    </div>
                    <div className="flex-1 bg-[#161928] p-2.5 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold ${msg.isHost ? 'text-amber-300' : 'text-gray-200'}`}>
                            {msg.user}
                          </span>
                          {msg.isHost && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded border border-amber-500/30 font-semibold uppercase">
                              Host
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400">• {msg.location}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChat} className="p-3 bg-[#0d0f17] border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Share an Amen or testimony..."
                    className="flex-1 bg-[#191d30] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="p-2 rounded-xl bg-amber-500 text-gray-950 font-bold hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: SERMON NOTES */}
          {activeSideTab === 'notes' && (
            <div className="flex-1 flex flex-col overflow-hidden p-3 bg-[#11131e]">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h4 className="text-xs font-bold text-amber-300">Interactive Sermon Notes</h4>
                  <p className="text-[10px] text-gray-400">Notes are automatically stored on your browser</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyNotes}
                    title="Copy notes"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs flex items-center gap-1 transition"
                  >
                    {copiedNoteFeedback ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={handleDownloadNotes}
                    title="Download notes file"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs flex items-center gap-1 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Scripture Buttons */}
              <div className="py-2">
                <span className="text-[10px] text-gray-400 block mb-1">Click to insert scripture quote:</span>
                <div className="flex flex-wrap gap-1">
                  {SAMPLE_BIBLE_VERSES.slice(0, 4).map((verse, i) => (
                    <button
                      key={i}
                      onClick={() => insertScriptureToNotes(verse)}
                      className="text-[10px] px-2 py-0.5 rounded bg-purple-900/30 text-purple-300 hover:bg-purple-800/40 border border-purple-700/30 transition"
                    >
                      + {verse.ref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Textarea */}
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Type your personal insights, rhema word, and scriptures here as Pastor Stanley preaches..."
                className="flex-1 w-full bg-[#161928] border border-white/10 rounded-xl p-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400 resize-none font-mono"
              />

              {/* Save Feedback button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">
                  {personalNotes.length} characters
                </span>
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-gray-950 font-bold text-xs hover:bg-amber-400 transition flex items-center gap-1.5"
                >
                  {noteSavedFeedback ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  <span>{noteSavedFeedback ? 'Saved!' : 'Save Notes'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRAYER SLIP */}
          {activeSideTab === 'prayer' && (
            <div className="flex-1 overflow-y-auto p-4 bg-[#11131e] space-y-3">
              <div>
                <h4 className="font-serif-church text-sm font-bold text-amber-300">Live Service Prayer Request</h4>
                <p className="text-xs text-gray-400">
                  Our pastoral intercession team at Najjanankumbi receives and prays over requests in real-time.
                </p>
              </div>

              {prayerSentFeedback ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-white text-sm">Prayer Request Received!</h5>
                  <p className="text-xs text-emerald-200 mt-1">
                    Pastor Stanley and the altar intercessors have your request before the Lord. Believe and receive your testimony!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitPrayerSlip} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      value={prayerName}
                      onChange={(e) => setPrayerName(e.target.value)}
                      placeholder="e.g. Stanley or Anonymous"
                      className="w-full bg-[#161928] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1 font-medium">Prayer Category</label>
                    <select
                      value={prayerCategory}
                      onChange={(e) => setPrayerCategory(e.target.value as any)}
                      className="w-full bg-[#161928] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Healing">Healing & Health</option>
                      <option value="Breakthrough">Breakthrough & Open Doors</option>
                      <option value="Deliverance">Deliverance & Freedom</option>
                      <option value="Finances">Finances & Job/Business</option>
                      <option value="Family">Family & Marriage</option>
                      <option value="Spiritual Growth">Spiritual Growth</option>
                      <option value="Thanksgiving">Thanksgiving Testimony</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1 font-medium">Your Petition</label>
                    <textarea
                      rows={4}
                      value={prayerContent}
                      onChange={(e) => setPrayerContent(e.target.value)}
                      placeholder="Share your specific burden or prayer need..."
                      className="w-full bg-[#161928] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="confidential"
                      checked={prayerIsConfidential}
                      onChange={(e) => setPrayerIsConfidential(e.target.checked)}
                      className="rounded bg-black/40 border-white/20 text-amber-500 focus:ring-0"
                    />
                    <label htmlFor="confidential" className="text-xs text-gray-300">
                      Keep confidential (Pastoral team only, don't show on Public Prayer Wall)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/20"
                  >
                    Submit for Intercession
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: QUICK GIVING */}
          {activeSideTab === 'giving' && (
            <div className="flex-1 overflow-y-auto p-4 bg-[#11131e] space-y-4">
              <div>
                <h4 className="font-serif-church text-sm font-bold text-amber-300">Honor the Lord with Your Substance</h4>
                <p className="text-xs text-gray-400">
                  Quick Mobile Money & Bank details for your Tithe, Offering, or Seed.
                </p>
              </div>

              {/* MTN MoMo Box */}
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-yellow-400">MTN MoMoPay (Uganda)</span>
                  <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded font-mono">
                    *165*3#
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-300">Merchant Code:</span>
                  <span className="text-base font-extrabold font-mono text-yellow-300">
                    {CHURCH_INFO.mobileMoneyDetails.mtn.merchantCode}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Name: {CHURCH_INFO.mobileMoneyDetails.mtn.merchantName}
                </p>
              </div>

              {/* Airtel Money Box */}
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-400">Airtel Money Pay</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-mono">
                    *185*9#
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-300">Merchant Code:</span>
                  <span className="text-base font-extrabold font-mono text-red-300">
                    {CHURCH_INFO.mobileMoneyDetails.airtel.merchantCode}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Name: {CHURCH_INFO.mobileMoneyDetails.airtel.merchantName}
                </p>
              </div>

              {/* Full Giving Portal button */}
              <button
                onClick={onOpenGivingModal}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs hover:bg-amber-400 transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 fill-gray-950" />
                <span>Open Full Giving Portal / Instant Push</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
