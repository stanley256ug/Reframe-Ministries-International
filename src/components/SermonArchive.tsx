import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Headphones, 
  Download, 
  BookOpen, 
  Clock, 
  Eye, 
  User, 
  Sparkles, 
  Share2, 
  Pause, 
  Volume2, 
  Check,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import { SermonArchiveItem } from '../types/church';
import { SERMON_ARCHIVE } from '../data/churchData';

interface SermonArchiveProps {
  onPlayInLivePlayer?: (sermon: SermonArchiveItem) => void;
}

export const SermonArchive: React.FC<SermonArchiveProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeries, setSelectedSeries] = useState<string>('All');
  
  // Audio Podcast Player state
  const [activeAudioSermon, setActiveAudioSermon] = useState<SermonArchiveItem | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedSermonDetail, setSelectedSermonDetail] = useState<SermonArchiveItem | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories = ['All', 'Faith & Mindset', 'Deliverance & Warfare', 'Prophetic Impartation', 'Giving & Prosperity'];
  const seriesList = ['All', 'The Renewed Mind Masterclass', 'Kingdom Foundations', 'Supernatural Acceleration', 'Covenant Wealth'];

  const filteredSermons = SERMON_ARCHIVE.filter((sermon) => {
    const matchesSearch = 
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;
    const matchesSeries = selectedSeries === 'All' || sermon.series === selectedSeries;

    return matchesSearch && matchesCategory && matchesSeries;
  });

  const handlePlayAudio = (sermon: SermonArchiveItem) => {
    if (activeAudioSermon?.id === sermon.id) {
      setIsAudioPlaying(!isAudioPlaying);
    } else {
      setActiveAudioSermon(sermon);
      setIsAudioPlaying(true);
    }
  };

  const handleSimulateDownload = (sermonTitle: string) => {
    setDownloadProgress(sermonTitle);
    setTimeout(() => {
      setDownloadProgress(null);
      setDownloadNotice(`Downloaded "${sermonTitle}" audio for offline listening!`);
      setTimeout(() => setDownloadNotice(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Word Sanctuary Library</span>
          </div>
          <h2 className="font-serif-church text-2xl sm:text-4xl font-bold text-white tracking-wide">
            Sermons & Audio Messages
          </h2>
          <p className="text-gray-300 text-sm mt-1 max-w-2xl">
            Stream life-changing sermons preached by Pastor James Kabali at Reframe Ministries International in Najjanankumbi. Watch official YouTube broadcasts or listen to audio podcasts.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scripture, speaker, topic..."
            className="w-full bg-[#131522] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadNotice && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ {downloadNotice}</span>
          <button onClick={() => setDownloadNotice(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Filter Chips */}
      <div className="flex flex-col gap-3">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-gray-400 font-medium shrink-0">Topic:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-gray-950 shadow-sm'
                  : 'bg-[#121422] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSermons.map((sermon) => {
          const isCurrentAudio = activeAudioSermon?.id === sermon.id && isAudioPlaying;
          return (
            <div
              key={sermon.id}
              className="bg-[#121422] rounded-2xl border border-white/5 overflow-hidden hover:border-amber-500/40 transition duration-300 flex flex-col justify-between group shadow-lg"
            >
              {/* Thumbnail with overlay */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Series badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                    {sermon.series}
                  </span>
                </div>

                {/* Duration */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-gray-300">
                    {sermon.duration}
                  </span>
                </div>

                {/* Central Play Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedSermonDetail(sermon)}
                    className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition shadow-xl"
                    title="Watch on YouTube"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>

                  <button
                    onClick={() => handlePlayAudio(sermon)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition shadow-xl ${
                      isCurrentAudio
                        ? 'bg-purple-600 text-white animate-pulse'
                        : 'bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/30'
                    }`}
                    title="Listen to Podcast Audio"
                  >
                    {isCurrentAudio ? <Pause className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
                  </button>
                </div>

                {/* Bottom Scripture Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-300 font-semibold bg-black/70 px-2 py-0.5 rounded border border-white/10">
                    📖 {sermon.scripture}
                  </span>
                  <span className="text-gray-300 text-[11px]">{sermon.date}</span>
                </div>
              </div>

              {/* Sermon Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => setSelectedSermonDetail(sermon)}
                    className="font-serif-church text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition cursor-pointer"
                  >
                    {sermon.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src="/pastor-james-kabali.jpg"
                      alt="Pastor James Kabali"
                      className="w-5 h-5 rounded-full object-cover object-top border border-amber-400 shrink-0"
                    />
                    <p className="text-xs text-amber-300 font-semibold">
                      {sermon.speaker} • {sermon.speakerTitle}
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {sermon.summary}
                  </p>

                  {/* Key takeaways bullet points */}
                  <div className="mt-3 space-y-1">
                    {sermon.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <div key={i} className="text-[11px] text-gray-300 flex items-start gap-1.5">
                        <span className="text-amber-400">✓</span>
                        <span className="line-clamp-1">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedSermonDetail(sermon)}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>Full Sermon Details</span>
                    <span>&rarr;</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayAudio(sermon)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition flex items-center gap-1"
                    >
                      <Headphones className="w-3.5 h-3.5 text-purple-400" />
                      <span>{isCurrentAudio ? 'Playing' : 'Podcast'}</span>
                    </button>

                    <button
                      onClick={() => handleSimulateDownload(sermon.title)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
                      title="Download audio"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Audio Podcast Player Bar */}
      {activeAudioSermon && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#161929] border border-amber-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                Playing Podcast
              </span>
            </div>
            <button
              onClick={() => setActiveAudioSermon(null)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={activeAudioSermon.thumbnail}
              alt=""
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10"
            />
            <div className="overflow-hidden flex-1">
              <h5 className="font-bold text-white text-xs truncate">
                {activeAudioSermon.title}
              </h5>
              <p className="text-[11px] text-amber-300 truncate">
                {activeAudioSermon.speaker}
              </p>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                className="w-8 h-8 rounded-full bg-amber-500 text-gray-950 flex items-center justify-center font-bold"
              >
                {isAudioPlaying ? <Pause className="w-4 h-4 fill-gray-950" /> : <Play className="w-4 h-4 fill-gray-950 ml-0.5" />}
              </button>

              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1)}
                className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-gray-300 hover:text-white"
              >
                {playbackSpeed}x
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-mono text-[10px] text-amber-300/80">
                {activeAudioSermon.scripture}
              </span>
              <button
                onClick={() => handleSimulateDownload(activeAudioSermon.title)}
                title="Download"
                className="text-gray-400 hover:text-white"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sermon Detail Modal */}
      {selectedSermonDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121422] rounded-3xl border border-amber-900/40 max-w-3xl w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 bg-[#0d0f17] border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-amber-400 font-bold">
                {selectedSermonDetail.series} • {selectedSermonDetail.date}
              </span>
              <button
                onClick={() => setSelectedSermonDetail(null)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="aspect-video bg-black relative">
              <iframe
                className="w-full h-full"
                src={`${selectedSermonDetail.videoUrl}?autoplay=1&rel=0`}
                title={selectedSermonDetail.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="font-serif-church text-xl font-bold text-white">
                  {selectedSermonDetail.title}
                </h3>
                <p className="text-sm text-amber-400 mt-1">
                  {selectedSermonDetail.speaker} ({selectedSermonDetail.speakerTitle})
                </p>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Scripture Base: {selectedSermonDetail.scripture}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Message Overview
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedSermonDetail.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Key Revelations & Principles
                </h4>
                <div className="space-y-2">
                  {selectedSermonDetail.keyTakeaways.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-xl border border-white/5 text-xs text-gray-200">
                      <span className="text-amber-400 font-bold">0{i+1}.</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
