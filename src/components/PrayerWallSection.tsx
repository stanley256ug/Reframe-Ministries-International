import React, { useState } from 'react';
import { 
  Flame, 
  Heart, 
  Plus, 
  Check, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Filter,
  UserCheck
} from 'lucide-react';
import { PrayerRequest } from '../types/church';

interface PrayerWallSectionProps {
  requests: PrayerRequest[];
  onAddRequest: (req: Omit<PrayerRequest, 'id' | 'submittedAt' | 'prayCount' | 'hasPrayed' | 'pastorNoted'>) => void;
  onPrayForRequest: (id: string) => void;
}

export const PrayerWallSection: React.FC<PrayerWallSectionProps> = ({
  requests,
  onAddRequest,
  onPrayForRequest
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Modal Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Najjanankumbi');
  const [category, setCategory] = useState<PrayerRequest['category']>('Breakthrough');
  const [petition, setPetition] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);

  const categories = ['All', 'Breakthrough', 'Healing', 'Family', 'Deliverance', 'Finances', 'Spiritual Growth', 'Thanksgiving'];

  const publicRequests = requests.filter(r => !r.isConfidential);

  const filteredRequests = selectedFilter === 'All'
    ? publicRequests
    : publicRequests.filter(r => r.category === selectedFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petition.trim()) return;

    onAddRequest({
      name: name.trim() || 'Online Believer',
      location: location.trim() || 'Uganda',
      category,
      request: petition.trim(),
      isConfidential
    });

    setPetition('');
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Altar of Intercession</span>
          </div>
          <h2 className="font-serif-church text-2xl sm:text-4xl font-bold text-white tracking-wide">
            Community Prayer Wall
          </h2>
          <p className="text-gray-300 text-sm mt-1 max-w-2xl">
            “The effective, fervent prayer of a righteous man avails much.” Stand in agreement with brothers and sisters from Najjanankumbi and across the globe.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Prayer Request</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedFilter === cat
                ? 'bg-amber-500 text-gray-950 shadow-sm'
                : 'bg-[#121422] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prayer Request Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="bg-[#121422] p-5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {req.name}
                  </span>
                  {req.location && (
                    <span className="text-[11px] text-gray-400">
                      • {req.location}
                    </span>
                  )}
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {req.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2">
                "{req.request}"
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                <span>{req.submittedAt}</span>
                {req.pastorNoted && (
                  <span className="flex items-center gap-1 text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/30">
                    <UserCheck className="w-3 h-3 text-purple-400" />
                    Pastoral Altar
                  </span>
                )}
              </div>

              {/* Pray in Agreement Button */}
              <button
                onClick={() => onPrayForRequest(req.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  req.hasPrayed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/5 hover:bg-amber-500 hover:text-gray-950 text-gray-300 border border-white/10'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${req.hasPrayed ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span>{req.hasPrayed ? 'Prayed in Agreement' : 'I Prayed'}</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">
                  {req.prayCount}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Submit Prayer Request */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121422] rounded-3xl border border-amber-900/40 max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-serif-church text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Submit a Prayer Petition
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Christine or Anonymous"
                  className="w-full bg-[#171a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Najjanankumbi, Entebbe, London"
                    className="w-full bg-[#171a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#171a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Breakthrough">Breakthrough</option>
                    <option value="Healing">Healing</option>
                    <option value="Family">Family & Marriage</option>
                    <option value="Deliverance">Deliverance</option>
                    <option value="Finances">Finances</option>
                    <option value="Spiritual Growth">Spiritual Growth</option>
                    <option value="Thanksgiving">Thanksgiving</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Your Prayer Request</label>
                <textarea
                  rows={4}
                  value={petition}
                  onChange={(e) => setPetition(e.target.value)}
                  placeholder="Explain your burden or thanksgiving point in detail..."
                  required
                  className="w-full bg-[#171a2c] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="confidentialModal"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="rounded bg-black/40 border-white/20 text-amber-500 mt-0.5"
                />
                <label htmlFor="confidentialModal" className="text-xs text-gray-300">
                  <strong className="text-white block font-medium">Confidential Pastoral Altar Only</strong>
                  Do not display on public prayer wall. Send directly to Pastor Stanley and the senior intercessory team.
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs hover:bg-amber-400 transition"
                >
                  Send for Prayer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
