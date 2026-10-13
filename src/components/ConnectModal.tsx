import React, { useState } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Mail,
  Heart
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Najjanankumbi, Kampala');
  const [decision, setDecision] = useState<'visitor' | 'salvation' | 'rededication' | 'baptism' | 'membership'>('visitor');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121422] rounded-3xl border border-amber-900/40 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white text-base font-bold"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif-church text-2xl font-bold text-white">
              Welcome to the Family!
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
              {decision === 'salvation' || decision === 'rededication' 
                ? 'Heaven is rejoicing over your decision today! Our pastoral care team will reach out to nurture and walk with you in your spiritual walk.'
                : 'Thank you for connecting with Pastor James Kabali and Reframe Ministries International! We look forward to meeting you at our sanctuary in Najjanankumbi.'}
            </p>

            <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-800/40 text-xs text-purple-200">
              Need immediate pastoral care? WhatsApp our pastor directly at:
              <strong className="block text-amber-300 font-mono text-sm mt-1">
                {CHURCH_INFO.contacts.whatsapp}
              </strong>
            </div>

            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs hover:bg-amber-400 transition"
            >
              Back to Live Sanctuary
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between p-3 rounded-2xl bg-[#0e101b] border border-amber-900/30">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.svg"
                  alt="Reframe Ministries Logo"
                  className="w-11 h-11 rounded-full border border-amber-400 bg-white object-contain p-0.5 shadow-md shrink-0"
                />
                <div>
                  <h2 className="font-serif-church text-base sm:text-lg font-bold text-white leading-tight">
                    Reframe Ministries International
                  </h2>
                  <p className="text-[11px] text-amber-300 font-serif-church italic">
                    “The just shall live by faith” • Najjanankumbi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-2.5 border-l border-white/10 shrink-0">
                <img
                  src="/pastor-james-kabali.jpg"
                  alt="Pastor James Kabali"
                  className="w-10 h-12 rounded-xl object-cover object-top border border-amber-400 shadow-md"
                  title="Pastor James Kabali - Lead Pastor"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Stanley Mpanga"
                  className="w-full bg-[#181b2e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 700 ... or 077..."
                    className="w-full bg-[#181b2e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-[#181b2e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Your Location / Residence</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Najjanankumbi, Kibuye, Entebbe, Diaspora"
                  className="w-full bg-[#181b2e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1 font-semibold">Today's Decision / Reason</label>
                <select
                  value={decision}
                  onChange={(e) => setDecision(e.target.value as any)}
                  className="w-full bg-[#181b2e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="visitor">First-Time Online or In-Person Visitor</option>
                  <option value="salvation">I Gave My Life to Jesus Today (Salvation)</option>
                  <option value="rededication">Rededicating My Life to Christ</option>
                  <option value="baptism">I Desire Water Baptism</option>
                  <option value="membership">I Want to Join a Ministry Department</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Message for the Pastor (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any questions or prayer point..."
                  className="w-full bg-[#181b2e] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-bold text-xs hover:from-amber-300 hover:to-amber-400 transition shadow-lg shadow-amber-500/20"
              >
                Submit Connection Card
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
