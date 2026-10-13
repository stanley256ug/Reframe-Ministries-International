import React, { useState } from 'react';
import { 
  Youtube, 
  Instagram, 
  Play, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Share2, 
  Check, 
  Eye, 
  Flame, 
  Sparkles,
  ArrowRight,
  Copy
} from 'lucide-react';
import { SocialMediaPost } from '../types/church';
import { CHURCH_INFO, INITIAL_SOCIAL_POSTS } from '../data/churchData';

interface SocialMediaHubProps {
  onSelectVideo?: (post: SocialMediaPost) => void;
}

export const SocialMediaHub: React.FC<SocialMediaHubProps> = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'tiktok' | 'instagram' | 'youtube'>('all');
  const [activePreviewPost, setActivePreviewPost] = useState<SocialMediaPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const posts = INITIAL_SOCIAL_POSTS;

  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(p => p.platform === selectedPlatform);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Social Hub Hero */}
      <div className="bg-gradient-to-br from-purple-950 via-[#121422] to-amber-950/60 p-6 sm:p-8 rounded-3xl border border-amber-900/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Media Outreach • Najjanankumbi</span>
            </div>

            <h2 className="font-serif-church text-2xl sm:text-4xl font-bold text-white tracking-wide">
              Reframe on YouTube, TikTok & Instagram
            </h2>

            <p className="font-serif-church text-cyan-300 italic text-sm mt-1 font-semibold">
              {CHURCH_INFO.motto}
            </p>

            <p className="text-gray-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Subscribe to <strong className="text-white">@reframeministriesinternational</strong> on YouTube and TikTok for full Sunday live broadcasts, daily prophetic declarations, and worship nights from our Najjanankumbi sanctuary.
            </p>
          </div>

          {/* Official Logo Display */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl border-2 border-amber-400/80 hover:scale-105 transition-transform">
              <img
                src="/logo.svg"
                alt="Reframe Ministries International Official Emblem"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 3 Main Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
          
          {/* TikTok Card */}
          <div className="bg-[#181a2b]/90 border border-pink-500/30 p-5 rounded-2xl hover:border-pink-500/60 transition group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-black text-sm">
                  TT
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                  {CHURCH_INFO.socialMedia.tiktok.followers} Followers
                </span>
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-pink-300 transition">
                TikTok
              </h3>
              <p className="text-xs text-pink-300/80 font-mono mt-0.5">
                {CHURCH_INFO.socialMedia.tiktok.handle}
              </p>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {CHURCH_INFO.socialMedia.tiktok.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href={CHURCH_INFO.socialMedia.tiktok.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition"
              >
                <span>Follow on TikTok</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopyLink(CHURCH_INFO.socialMedia.tiktok.url)}
                title="Copy Handle"
                className="text-gray-400 hover:text-white p-1"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* YouTube Card */}
          <div className="bg-[#181a2b]/90 border border-red-500/30 p-5 rounded-2xl hover:border-red-500/60 transition group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                  <Youtube className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                  {CHURCH_INFO.socialMedia.youtube.subscribers} Subscribers
                </span>
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-red-300 transition">
                YouTube Channel
              </h3>
              <p className="text-xs text-red-300/80 font-mono mt-0.5">
                {CHURCH_INFO.socialMedia.youtube.handle}
              </p>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {CHURCH_INFO.socialMedia.youtube.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href={CHURCH_INFO.socialMedia.youtube.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition"
              >
                <span>Subscribe on YouTube</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopyLink(CHURCH_INFO.socialMedia.youtube.url)}
                title="Copy Handle"
                className="text-gray-400 hover:text-white p-1"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="bg-[#181a2b]/90 border border-purple-500/30 p-5 rounded-2xl hover:border-purple-500/60 transition group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  {CHURCH_INFO.socialMedia.instagram.followers} Followers
                </span>
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition">
                Instagram
              </h3>
              <p className="text-xs text-purple-300/80 font-mono mt-0.5">
                {CHURCH_INFO.socialMedia.instagram.handle}
              </p>
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {CHURCH_INFO.socialMedia.instagram.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href={CHURCH_INFO.socialMedia.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition"
              >
                <span>Follow on Instagram</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopyLink(CHURCH_INFO.socialMedia.instagram.url)}
                title="Copy Handle"
                className="text-gray-400 hover:text-white p-1"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-[#121422] p-1.5 rounded-xl border border-white/5">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedPlatform === 'all'
                ? 'bg-amber-500 text-gray-950 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Content ({posts.length})
          </button>

          <button
            onClick={() => setSelectedPlatform('tiktok')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              selectedPlatform === 'tiktok'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>TikTok</span>
          </button>

          <button
            onClick={() => setSelectedPlatform('youtube')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              selectedPlatform === 'youtube'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>YouTube</span>
          </button>

          <button
            onClick={() => setSelectedPlatform('instagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              selectedPlatform === 'instagram'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </button>
        </div>

        {copiedLink && (
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Channel link copied to clipboard!
          </span>
        )}
      </div>

      {/* Grid of Feed Posts / Media Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const isTiktok = post.platform === 'tiktok';
          const isYt = post.platform === 'youtube';
          const isIg = post.platform === 'instagram';

          return (
            <div
              key={post.id}
              className="bg-[#121422] rounded-2xl border border-white/5 overflow-hidden hover:border-amber-500/40 transition duration-300 group flex flex-col justify-between shadow-lg"
            >
              {/* Media Thumbnail Container */}
              <div 
                className="relative aspect-video sm:aspect-square bg-gray-950 overflow-hidden cursor-pointer"
                onClick={() => setActivePreviewPost(post)}
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Platform Badge */}
                <div className="absolute top-3 left-3">
                  {isTiktok && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-pink-600 text-white flex items-center gap-1 shadow-md">
                      TikTok
                    </span>
                  )}
                  {isYt && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-red-600 text-white flex items-center gap-1 shadow-md">
                      <Youtube className="w-3 h-3" /> YouTube
                    </span>
                  )}
                  {isIg && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center gap-1 shadow-md">
                      <Instagram className="w-3 h-3" /> Instagram
                    </span>
                  )}
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                    {post.category}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/90 text-gray-950 flex items-center justify-center group-hover:scale-110 transition shadow-xl shadow-black/40">
                    <Play className="w-5 h-5 fill-gray-950 ml-0.5" />
                  </div>
                </div>

                {/* Bottom stats overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                      {post.likes}
                    </span>
                    {post.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        {post.views}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-300">{post.date}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 
                    onClick={() => setActivePreviewPost(post)}
                    className="font-bold text-white text-sm line-clamp-2 hover:text-amber-300 transition cursor-pointer"
                  >
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {post.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono text-[11px] truncate max-w-[150px]">
                    {post.handle}
                  </span>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Media Detail & Play Modal */}
      {activePreviewPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121422] rounded-3xl border border-amber-900/40 max-w-2xl w-full overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#0d0f17] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  {activePreviewPost.platform}
                </span>
                <span className="text-xs text-gray-400">{activePreviewPost.handle}</span>
              </div>
              <button
                onClick={() => setActivePreviewPost(null)}
                className="text-gray-400 hover:text-white text-sm font-bold px-2 py-1"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Media Preview */}
            <div className="relative aspect-video bg-black">
              {activePreviewPost.platform === 'youtube' ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${
                    activePreviewPost.url.includes('v=')
                      ? activePreviewPost.url.split('v=')[1].split('&')[0]
                      : 'DYwRCEPP_CY'
                  }?autoplay=1&rel=0`}
                  title={activePreviewPost.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={activePreviewPost.thumbnail}
                    alt={activePreviewPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white text-base font-semibold mb-3 max-w-md">
                      Watch this short clip on the official {activePreviewPost.platform.toUpperCase()} app:
                    </p>
                    <a
                      href={activePreviewPost.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold text-sm hover:bg-amber-400 transition flex items-center gap-2"
                    >
                      <span>Open on {activePreviewPost.platform.toUpperCase()}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-5">
              <h3 className="font-serif-church text-lg font-bold text-white">
                {activePreviewPost.title}
              </h3>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                {activePreviewPost.caption}
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-4 text-gray-400">
                  <span>❤️ {activePreviewPost.likes} Likes</span>
                  {activePreviewPost.views && <span>👁️ {activePreviewPost.views} Views</span>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(activePreviewPost.url)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 transition flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </button>

                  <a
                    href={activePreviewPost.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 rounded-lg bg-amber-500 text-gray-950 font-bold transition flex items-center gap-1.5"
                  >
                    <span>View Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
