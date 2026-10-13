import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Smartphone, 
  Building, 
  CreditCard, 
  Sparkles, 
  Copy, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Receipt, 
  Download,
  Share2
} from 'lucide-react';
import { CHURCH_INFO, GIVING_OPTIONS } from '../data/churchData';

interface GivingSectionProps {
  onGivingSuccess?: () => void;
}

export const GivingSection: React.FC<GivingSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tithe');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'airtel' | 'bank' | 'card'>('mtn');
  const [currency, setCurrency] = useState<'UGX' | 'USD'>('UGX');
  const [customAmount, setCustomAmount] = useState<string>('50000');
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Simulation status
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<{
    txId: string;
    amount: string;
    category: string;
    method: string;
    donor: string;
    timestamp: string;
  } | null>(null);

  const presetUgx = [10000, 20000, 50000, 100000, 250000, 500000, 1000000];
  const presetUsd = [10, 25, 50, 100, 250, 500];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleTriggerGiving = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCompletedReceipt({
        txId: 'RMI-' + Math.floor(100000 + Math.random() * 900000),
        amount: `${currency} ${parseInt(customAmount || '0').toLocaleString()}`,
        category: selectedCategory,
        method: paymentMethod.toUpperCase(),
        donor: donorName.trim() || 'Covenant Partner',
        timestamp: new Date().toLocaleString()
      });
    }, 2000);
  };

  const buildingProject = GIVING_OPTIONS.find(o => o.category === 'Building Project');
  const buildingPct = buildingProject?.targetGoalUgx 
    ? Math.round((buildingProject.currentRaisedUgx! / buildingProject.targetGoalUgx) * 100) 
    : 67;

  return (
    <div className="space-y-8">
      {/* Giving Hero */}
      <div className="bg-gradient-to-br from-amber-950/70 via-[#131522] to-purple-950 p-6 sm:p-8 rounded-3xl border border-amber-900/40 relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kingdom Stewardship & Covenant Partnership</span>
          </div>
          <h2 className="font-serif-church text-2xl sm:text-4xl font-bold text-white tracking-wide">
            Giving, Tithes & Sanctuary Building
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 leading-relaxed">
            “Bring all the tithes into the storehouse, that there may be food in My house...” — Malachi 3:10. 
            Thank you for partnering with Pastor James Kabali and Reframe Ministries International to transform destinies in Najjanankumbi and across the world.
          </p>
        </div>

        {/* Najjanankumbi Building Project Progress Bar */}
        <div className="mt-8 p-5 bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                Featured Campaign: Najjanankumbi Sanctuary Expansion Project
              </span>
              <p className="text-xs text-gray-300">
                Expanding our auditorium, media live broadcast control room, and children's education pavilion.
              </p>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-amber-300 font-mono">
                UGX 168.4M / 250M
              </span>
              <span className="text-xs text-gray-400 block">({buildingPct}% of target reached)</span>
            </div>
          </div>

          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
            <div 
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 h-full rounded-full transition-all duration-1000 shadow-lg shadow-amber-500/50"
              style={{ width: `${buildingPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Giving Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#121422] p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6 shadow-xl">
          
          {completedReceipt ? (
            /* Digital Giving Receipt */
            <div className="bg-[#171a2c] p-6 rounded-2xl border border-emerald-500/40 space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif-church text-xl font-bold text-white">
                  Payment Request Initiated!
                </h3>
                <p className="text-xs text-emerald-300 mt-1">
                  Check your phone screen for the network PIN prompt. God bless your seed!
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="font-mono text-white font-bold">{completedReceipt.txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="font-bold text-amber-300 text-sm font-mono">{completedReceipt.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{completedReceipt.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Method:</span>
                  <span className="text-white">{completedReceipt.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Partner Name:</span>
                  <span className="text-white">{completedReceipt.donor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timestamp:</span>
                  <span className="text-gray-400">{completedReceipt.timestamp}</span>
                </div>
              </div>

              <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-800/40 text-[11px] text-purple-200 italic">
                “And God is able to make all grace abound toward you, that you, always having all sufficiency in all things, may have an abundance for every good work.” — 2 Cor 9:8
              </div>

              <button
                onClick={() => setCompletedReceipt(null)}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs hover:bg-amber-400 transition"
              >
                Make Another Gift / Seed
              </button>
            </div>
          ) : (
            <form onSubmit={handleTriggerGiving} className="space-y-6">
              
              {/* Category Selection */}
              <div>
                <label className="text-xs font-bold text-gray-200 uppercase tracking-wider block mb-2">
                  1. Select Giving Purpose
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GIVING_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSelectedCategory(opt.category)}
                      className={`p-3 rounded-xl text-left border transition text-xs flex flex-col justify-between ${
                        selectedCategory === opt.category
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-white/[0.02] border-white/10 text-gray-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="font-bold">{opt.category}</span>
                      <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">
                        {opt.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount & Currency */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                    2. Giving Amount
                  </label>
                  <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => { setCurrency('UGX'); setCustomAmount('50000'); }}
                      className={`px-2 py-0.5 rounded font-bold transition ${currency === 'UGX' ? 'bg-amber-500 text-gray-950' : 'text-gray-400'}`}
                    >
                      UGX (Uganda)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCurrency('USD'); setCustomAmount('50'); }}
                      className={`px-2 py-0.5 rounded font-bold transition ${currency === 'USD' ? 'bg-amber-500 text-gray-950' : 'text-gray-400'}`}
                    >
                      USD (Diaspora)
                    </button>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(currency === 'UGX' ? presetUgx : presetUsd).map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setCustomAmount(preset.toString())}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                        customAmount === preset.toString()
                          ? 'bg-amber-500 text-gray-950 border-amber-500'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {currency} {preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom input */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">
                    {currency}
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    className="w-full bg-[#171a2c] border border-white/10 rounded-xl pl-14 pr-4 py-3 text-white text-base font-mono font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold text-gray-200 uppercase tracking-wider block mb-2">
                  3. Payment Channel
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mtn')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      paymentMethod === 'mtn'
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-bold">MTN MoMo</span>
                    <span className="text-[10px] text-gray-400">*165*3#</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('airtel')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      paymentMethod === 'airtel'
                        ? 'bg-red-500/20 border-red-500 text-red-300'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold">Airtel Money</span>
                    <span className="text-[10px] text-gray-400">*185*9#</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      paymentMethod === 'bank'
                        ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold">Stanbic Bank</span>
                    <span className="text-[10px] text-gray-400">Account No</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold">Card / Remit</span>
                    <span className="text-[10px] text-gray-400">Visa / WorldRemit</span>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Your Full Name (Optional)</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Stanley Mpanga"
                    className="w-full bg-[#171a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">
                    {paymentMethod === 'mtn' ? 'MTN Phone Number' : paymentMethod === 'airtel' ? 'Airtel Phone Number' : 'Phone / Contact'}
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder={paymentMethod === 'mtn' ? '077... or 078...' : paymentMethod === 'airtel' ? '070... or 075...' : '+256...'}
                    required={paymentMethod === 'mtn' || paymentMethod === 'airtel'}
                    className="w-full bg-[#171a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-gray-950 font-extrabold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Sending USSD Prompt to Your Phone...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-gray-950" />
                    <span>Give {currency} {parseInt(customAmount || '0').toLocaleString()} Now</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Encrypted church giving gateway. Official receipt generated instantly.</span>
              </div>
            </form>
          )}

        </div>

        {/* Right Reference Box: Direct USSD & Bank Instructions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* MTN MoMo Box */}
          <div className="bg-[#121422] p-5 rounded-2xl border border-yellow-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">
                MTN MoMoPay Guide (Uganda)
              </span>
              <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded font-mono">
                USSD: *165*3#
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span>Merchant Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-base text-yellow-300">
                    {CHURCH_INFO.mobileMoneyDetails.mtn.merchantCode}
                  </span>
                  <button
                    onClick={() => handleCopy(CHURCH_INFO.mobileMoneyDetails.mtn.merchantCode, 'mtn')}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'mtn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>Merchant Name:</span>
                <span className="text-white font-medium">{CHURCH_INFO.mobileMoneyDetails.mtn.merchantName}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>Direct Phone:</span>
                <span className="font-mono text-gray-300">{CHURCH_INFO.mobileMoneyDetails.mtn.directPhone}</span>
              </div>
            </div>
          </div>

          {/* Airtel Money Box */}
          <div className="bg-[#121422] p-5 rounded-2xl border border-red-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wide">
                Airtel Money Pay Guide
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                USSD: *185*9#
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span>Merchant Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-base text-red-300">
                    {CHURCH_INFO.mobileMoneyDetails.airtel.merchantCode}
                  </span>
                  <button
                    onClick={() => handleCopy(CHURCH_INFO.mobileMoneyDetails.airtel.merchantCode, 'airtel')}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'airtel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>Merchant Name:</span>
                <span className="text-white font-medium">{CHURCH_INFO.mobileMoneyDetails.airtel.merchantName}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>Direct Phone:</span>
                <span className="font-mono text-gray-300">{CHURCH_INFO.mobileMoneyDetails.airtel.directPhone}</span>
              </div>
            </div>
          </div>

          {/* Bank Transfer Box */}
          <div className="bg-[#121422] p-5 rounded-2xl border border-blue-500/30 space-y-2.5">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wide block">
              Direct Bank Deposit (Stanbic Bank)
            </span>

            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Bank:</span>
                <span className="text-white font-medium">{CHURCH_INFO.mobileMoneyDetails.bank.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account Name:</span>
                <span className="text-white font-medium">{CHURCH_INFO.mobileMoneyDetails.bank.accountName}</span>
              </div>
              <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg">
                <span className="text-gray-400">Account No:</span>
                <div className="flex items-center gap-1 font-mono text-amber-300 font-bold">
                  <span>{CHURCH_INFO.mobileMoneyDetails.bank.accountNumber}</span>
                  <button
                    onClick={() => handleCopy(CHURCH_INFO.mobileMoneyDetails.bank.accountNumber, 'bank')}
                    className="p-0.5 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'bank' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Branch:</span>
                <span className="text-gray-300">{CHURCH_INFO.mobileMoneyDetails.bank.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SWIFT Code:</span>
                <span className="font-mono text-gray-300">{CHURCH_INFO.mobileMoneyDetails.bank.swift}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
