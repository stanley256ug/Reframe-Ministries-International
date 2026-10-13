import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  Navigation, 
  Users, 
  Car, 
  Calendar, 
  Check, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CHURCH_INFO, MINISTRIES_LIST, CHURCH_EVENTS } from '../data/churchData';

interface LocationScheduleSectionProps {
  onOpenConnectModal: () => void;
}

export const LocationScheduleSection: React.FC<LocationScheduleSectionProps> = ({
  onOpenConnectModal
}) => {
  const [selectedRoute, setSelectedRoute] = useState<'taxi' | 'airport' | 'personal'>('taxi');
  const [reminderAdded, setReminderAdded] = useState<string | null>(null);

  const handleSetReminder = (serviceName: string) => {
    setReminderAdded(serviceName);
    setTimeout(() => setReminderAdded(null), 3000);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-950 via-[#131522] to-amber-950/70 p-6 sm:p-8 rounded-3xl border border-amber-900/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sanctuary Headquarters • Entebbe Road</span>
            </div>
            <h2 className="font-serif-church text-2xl sm:text-4xl font-bold text-white tracking-wide">
              Visit Reframe Ministries in Najjanankumbi
            </h2>
            <p className="font-serif-church text-cyan-300 italic text-sm mt-1 font-semibold">
              “The just shall live by faith” (Romans 1:17)
            </p>
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              We welcome you to experience the manifest presence of God at our sanctuary along Entebbe Road, Kampala, Uganda. Come worship with our church family in person this Sunday!
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/256700849201?text=Hello%20Reframe%20Ministries,%20I%20am%20planning%20to%20visit%20the%20church%20in%20Najjanankumbi`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Pastor on WhatsApp</span>
              </a>

              <button
                onClick={onOpenConnectModal}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-gray-950" />
                <span>Plan First-Time Visit Card</span>
              </button>
            </div>
          </div>

          {/* Official Logo Display */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl border-2 border-amber-400/80 hover:scale-105 transition-transform">
              <img
                src="/logo.svg"
                alt="Reframe Ministries International Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sanctuary Leadership Feature: Pastor James Kabali */}
      <div className="bg-[#121422] p-6 sm:p-7 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="relative shrink-0">
          <div className="w-40 sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-900">
            <img
              src="/pastor-james-kabali.jpg"
              alt="Pastor James Kabali - Lead Pastor Reframe Ministries International"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-amber-500 text-gray-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
            LEAD PASTOR
          </span>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            Sanctuary Leadership & Oversight
          </span>
          <h3 className="font-serif-church text-xl sm:text-2xl font-bold text-white">
            Pastor James Kabali
          </h3>
          <p className="font-serif-church text-cyan-300 italic text-xs sm:text-sm font-semibold">
            “The just shall live by faith” (Romans 1:17)
          </p>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Leading the congregation at Najjanankumbi, Entebbe Road, Pastor James Kabali delivers life-transforming apostolic teaching on faith, spiritual deliverance, and covenant sacrifice.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
            <a
              href="https://www.youtube.com/@reframeministriesinternational"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white font-bold transition border border-red-500/30"
            >
              YouTube: @reframeministriesinternational
            </a>
            <a
              href="https://wa.me/256700849201"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white font-bold transition border border-emerald-500/30"
            >
              WhatsApp Pastor
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Service Times & Location Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Service Schedule (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-church text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Weekly Service Schedule
            </h3>
            <span className="text-xs text-amber-300/80 font-mono">East Africa Time (EAT)</span>
          </div>

          <div className="space-y-3">
            {CHURCH_INFO.serviceSchedule.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#121422] p-5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition space-y-2 group shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {service.day}
                    </span>
                    <h4 className="font-bold text-white text-base mt-1 group-hover:text-amber-300 transition">
                      {service.name}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 shrink-0">
                    {service.time}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-500 text-[11px]">
                    📍 Najjanankumbi Sanctuary
                  </span>
                  <button
                    onClick={() => handleSetReminder(service.name)}
                    className="text-amber-400 hover:text-amber-300 font-semibold text-[11px] flex items-center gap-1"
                  >
                    {reminderAdded === service.name ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Reminder Added!
                      </span>
                    ) : (
                      <span>Add to Calendar &rarr;</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Contact Card */}
          <div className="bg-[#121422] p-5 rounded-2xl border border-white/5 space-y-3">
            <h4 className="font-bold text-white text-sm">Direct Pastoral & Office Contacts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-300 bg-black/30 p-2.5 rounded-xl border border-white/5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">Primary Sanctuary Line</span>
                  <span className="font-mono font-bold text-white">{CHURCH_INFO.contacts.phonePrimary}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-300 bg-black/30 p-2.5 rounded-xl border border-white/5">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">24/7 Prayer Line</span>
                  <span className="font-mono font-bold text-white">{CHURCH_INFO.contacts.prayerLine}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Detailed Directions to Najjanankumbi (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-church text-xl font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-400" />
              How to Reach Najjanankumbi
            </h3>
            <a
              href={CHURCH_INFO.location.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Location Details Box */}
          <div className="bg-[#121422] p-5 rounded-2xl border border-white/5 space-y-4 shadow-lg">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Physical Address</span>
              <p className="text-base font-bold text-white mt-0.5">
                {CHURCH_INFO.location.address}, {CHURCH_INFO.location.city}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                <strong>Landmark:</strong> {CHURCH_INFO.location.landmark}
              </p>
            </div>

            {/* Travel Mode Switcher */}
            <div>
              <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 text-xs mb-3">
                <button
                  onClick={() => setSelectedRoute('taxi')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                    selectedRoute === 'taxi'
                      ? 'bg-amber-500 text-gray-950'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  By Taxi / Matatu
                </button>
                <button
                  onClick={() => setSelectedRoute('personal')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                    selectedRoute === 'personal'
                      ? 'bg-amber-500 text-gray-950'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Personal Car / Uber
                </button>
                <button
                  onClick={() => setSelectedRoute('airport')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                    selectedRoute === 'airport'
                      ? 'bg-amber-500 text-gray-950'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  From Airport
                </button>
              </div>

              {selectedRoute === 'taxi' && (
                <div className="p-3.5 bg-black/30 rounded-xl border border-white/5 text-xs text-gray-300 space-y-2">
                  <p>
                    <strong>From Kampala City (Old/New Taxi Park):</strong> Board any taxi heading towards <em>Entebbe, Kajjansi, or Namasuba</em>.
                  </p>
                  <p>
                    Alight at <strong>Najjanankumbi Stella Stage</strong> (right after Kibuye roundabout and before Namasuba).
                  </p>
                  <p className="text-amber-300">
                    Walk 50 meters into the designated worship avenue behind Shell Najjanankumbi. Church ushers will welcome you at the gate!
                  </p>
                </div>
              )}

              {selectedRoute === 'personal' && (
                <div className="p-3.5 bg-black/30 rounded-xl border border-white/5 text-xs text-gray-300 space-y-2">
                  <p>
                    Drive along Entebbe Road towards Namasuba. As you pass Stella Stage, take the access road behind Shell Najjanankumbi.
                  </p>
                  <p>
                    <strong>Parking:</strong> Secure in-compound parking is available for cars and motorcycles with church security stewards on duty.
                  </p>
                </div>
              )}

              {selectedRoute === 'airport' && (
                <div className="p-3.5 bg-black/30 rounded-xl border border-white/5 text-xs text-gray-300 space-y-2">
                  <p>
                    <strong>From Entebbe International Airport:</strong> Drive via Entebbe Expressway or the Old Entebbe Road towards Kampala.
                  </p>
                  <p>
                    Pass Kajjansi, Seguku, and Namasuba. Alight at Najjanankumbi opposite Freedom City corridor. Approximately 35 minutes off-peak.
                  </p>
                </div>
              )}
            </div>

            {/* Boda Boda Note */}
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/30 text-xs text-purple-200">
              🛵 <strong>Taking a Boda Boda?</strong> Simply instruct the rider: <em>"{CHURCH_INFO.location.bodaBodaNote}"</em>.
            </div>
          </div>

          {/* Upcoming Events Box */}
          <div className="bg-[#121422] p-5 rounded-2xl border border-white/5 space-y-3">
            <h4 className="font-serif-church text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              Special Sanctuary Events
            </h4>

            <div className="space-y-2">
              {CHURCH_EVENTS.slice(0, 2).map((evt) => (
                <div key={evt.id} className="p-3 bg-black/30 rounded-xl border border-white/5 text-xs">
                  <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
                    <span>{evt.title}</span>
                    <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">{evt.date}</span>
                  </div>
                  <p className="text-gray-400 text-[11px]">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Ministries & Departments in Najjanankumbi */}
      <div>
        <div className="mb-6">
          <h3 className="font-serif-church text-2xl font-bold text-white">
            Church Ministries & Departments
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Discover a place to belong, serve, and grow your spiritual gifts at Reframe Ministries International.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES_LIST.map((min) => (
            <div
              key={min.id}
              className="bg-[#121422] rounded-2xl border border-white/5 overflow-hidden hover:border-amber-500/30 transition flex flex-col justify-between shadow-lg"
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={min.image}
                  alt={min.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121422] via-[#121422]/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-serif-church text-base font-bold text-white leading-tight">
                    {min.name}
                  </h4>
                  <p className="text-[11px] text-amber-300">{min.tagline}</p>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  {min.description}
                </p>

                <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-gray-400">
                  <div><strong>Leader:</strong> {min.leader}</div>
                  <div><strong>Fellowship:</strong> {min.meetingDay}</div>
                </div>

                <button
                  onClick={onOpenConnectModal}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-gray-950 text-amber-300 font-bold text-xs transition border border-white/10"
                >
                  Join Department
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
