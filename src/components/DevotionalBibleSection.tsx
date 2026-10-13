import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  Search, 
  Heart, 
  Volume2, 
  VolumeX, 
  Bookmark,
  Calendar,
  Quote
} from 'lucide-react';
import { DAILY_DEVOTIONAL, SAMPLE_BIBLE_VERSES } from '../data/churchData';

export const DevotionalBibleSection: React.FC = () => {
  const [copiedDevo, setCopiedDevo] = useState(false);
  const [searchBible, setSearchBible] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [likedDevo, setLikedDevo] = useState(false);
  const [savedDevo, setSavedDevo] = useState(false);

  const devo = DAILY_DEVOTIONAL;

  const handleCopy = () => {
    const text = `REFRAMING MINISTRIES INTERNATIONAL • WORD FOR TODAY
${devo.title} (${devo.date})
Scripture: ${devo.scriptureReference}
"${devo.scriptureText}"

FAITH CONFESSION:
${devo.faithConfession}

PRAYER:
${devo.prayer}

Reframe Ministries International • “The just shall live by faith”
Najjanankumbi Sanctuary, Entebbe Road, Kampala
Follow us: YouTube & TikTok @reframeministriesinternational`;
    navigator.clipboard.writeText(text);
    setCopiedDevo(true);
    setTimeout(() => setCopiedDevo(false), 2000);
  };

  const filteredVerses = SAMPLE_BIBLE_VERSES.filter((v) =>
    v.ref.toLowerCase().includes(searchBible.toLowerCase()) ||
    v.text.toLowerCase().includes(searchBible.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Devotional Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Daily Word of Faith • Pastor James Kabali</span>
          </div>
          <h2 className="font-serif-church text-2xl sm:text-4xl font-bold text-white tracking-wide">
            Reframe Faith Devotional
          </h2>
          <p className="text-gray-300 text-sm mt-1 max-w-2xl">
            Start your morning with prophetic revelation and mental alignment with Heaven’s promises.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLikedDevo(!likedDevo)}
            className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
              likedDevo 
                ? 'bg-pink-500/20 text-pink-300 border-pink-500/40' 
                : 'bg-white/5 text-gray-300 border-white/10 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${likedDevo ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span>{likedDevo ? 'Blessed' : 'Amen'}</span>
          </button>

          <button
            onClick={() => setSavedDevo(!savedDevo)}
            className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
              savedDevo 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-white/5 text-gray-300 border-white/10 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${savedDevo ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{savedDevo ? 'Bookmarked' : 'Save'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            {copiedDevo ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedDevo ? 'Copied to Share!' : 'Share Devotional'}</span>
          </button>
        </div>
      </div>

      {/* Main Devotional Article Card */}
      <div className="bg-[#121422] rounded-3xl border border-amber-900/30 p-6 sm:p-10 shadow-2xl relative space-y-6">
        
        {/* Date and Author Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
            <Calendar className="w-4 h-4" />
            <span>{devo.date}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300">{devo.theme}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/50 text-purple-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-purple-900/60 transition"
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isPlayingAudio ? 'Pause Narration' : 'Listen Read-Aloud'}</span>
            </button>
          </div>
        </div>

        {isPlayingAudio && (
          <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-800/40 text-xs text-purple-200 flex items-center justify-between animate-pulse">
            <span>Audio devotional reading currently streaming...</span>
            <span className="font-mono text-amber-400">01:42 / 04:15</span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif-church text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {devo.title}
        </h1>

        {/* Scripture Spotlight */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 via-[#181b2e] to-amber-950/40 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
            <Quote className="w-4 h-4" />
            <span>SCRIPTURE FOCUS: {devo.scriptureReference}</span>
          </div>
          <p className="text-base sm:text-lg font-serif-church italic text-amber-100 leading-relaxed">
            {devo.scriptureText}
          </p>
        </div>

        {/* Reflection Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-light">
          {devo.reflection.map((para, idx) => (
            <p key={idx} className="tracking-wide">
              {para}
            </p>
          ))}
        </div>

        {/* Faith Confession Box */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 fill-amber-400" />
            <span>Today's Prophetic Confession</span>
          </div>
          <p className="text-sm sm:text-base text-white font-medium italic">
            "{devo.faithConfession}"
          </p>
        </div>

        {/* Prayer of the Day */}
        <div className="p-5 rounded-2xl bg-[#171a2c] border border-white/10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 block">
            Prayer of Alignment
          </span>
          <p className="text-sm text-gray-200 leading-relaxed">
            {devo.prayer}
          </p>
        </div>

        {/* Author signature with Pastor James Kabali Photo */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-18 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-slate-900">
              <img
                src="/pastor-james-kabali.jpg"
                alt="Pastor James Kabali"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">Pastor James Kabali</span>
              <span className="text-[11px] text-amber-300">Lead Pastor & Founder • Reframe Ministries International</span>
              <p className="text-[11px] text-gray-400 italic">“The just shall live by faith” • Najjanankumbi</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-mono hidden sm:inline">Najjanankumbi Sanctuary</span>
        </div>

      </div>

      {/* Scripture Search & Multi-Verse Reference Tool */}
      <div className="bg-[#121422] p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-church text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Quick Scripture & Promise Bank
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Anchor scriptures taught at Reframe Ministries International.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchBible}
              onChange={(e) => setSearchBible(e.target.value)}
              placeholder="Filter scriptures (e.g. Romans 12)..."
              className="w-full bg-[#181b2e] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVerses.map((verse, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-black/30 border border-white/5 hover:border-amber-500/30 transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {verse.ref}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${verse.ref} - "${verse.text}"`);
                    alert(`Copied ${verse.ref} to clipboard!`);
                  }}
                  className="text-gray-400 group-hover:text-white p-1"
                  title="Copy scripture"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-serif-church italic leading-relaxed">
                "{verse.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
