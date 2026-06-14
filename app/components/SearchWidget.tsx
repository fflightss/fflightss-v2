"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeftRight, Calendar, Users, ChevronDown, Plane } from "lucide-react";
import { airports } from "../lib/flights";

type TripType = "one-way" | "return" | "multi-city";

interface AirportInputProps {
  label: string;
  placeholder: string;
  value: string;
  code: string;
  onChange: (city: string, code: string) => void;
  icon?: React.ReactNode;
}

function AirportInput({ label, placeholder, value, code, onChange, icon }: AirportInputProps) {
  const [query, setQuery] = useState(value || "");
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = airports.filter(
    (a) =>
      a.city.toLowerCase().includes(query.toLowerCase()) ||
      a.code.toLowerCase().includes(query.toLowerCase()) ||
      a.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <label className="block text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">{label}</label>
      <div className={`flex items-center gap-2 search-input rounded-xl px-3 py-3 ${focused ? "border-electric" : ""}`}>
        {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
        <div className="min-w-0 flex-1">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); onChange("", ""); }}
            onFocus={() => setFocused(true)}
            className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
          />
          {code && <div className="text-xs text-electric font-semibold">{code}</div>}
        </div>
      </div>
      {focused && query.length >= 1 && filtered.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-panel border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {filtered.map((airport) => (
            <button
              key={airport.code}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
              onMouseDown={() => {
                onChange(airport.city, airport.code);
                setQuery(`${airport.city} (${airport.code})`);
                setFocused(false);
              }}
            >
              <Plane size={14} className="text-electric shrink-0" />
              <div>
                <div className="text-sm text-white font-medium">{airport.city} ({airport.code})</div>
                <div className="text-xs text-gray-400">{airport.name}, {airport.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchWidget({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>("return");
  const [origin, setOrigin] = useState({ city: "", code: "" });
  const [destination, setDestination] = useState({ city: "", code: "" });
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("economy");
  const [showPassengers, setShowPassengers] = useState(false);

  const cabins = ["economy", "premium", "business", "first"];

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const search = () => {
    if (!origin.code || !destination.code || !departDate) return;
    const params = new URLSearchParams({
      origin: origin.city,
      originCode: origin.code,
      destination: destination.city,
      destinationCode: destination.code,
      departDate,
      returnDate: returnDate || "",
      passengers: passengers.toString(),
      cabin,
      tripType,
    });
    router.push(`/results?${params.toString()}`);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`bg-deepspace/80 backdrop-blur border border-white/10 rounded-2xl ${compact ? "p-4" : "p-6"} shadow-2xl`}>
      {/* Trip type tabs */}
      <div className="flex gap-2 mb-5">
        {(["return", "one-way", "multi-city"] as TripType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTripType(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize ${
              tripType === t
                ? "tab-active border-electric text-electric bg-electric/10"
                : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main search row */}
      <div className="flex flex-col lg:flex-row gap-3 items-end">
        {/* From / To */}
        <div className="flex flex-1 gap-2 items-end relative">
          <AirportInput
            label="From"
            placeholder="City or airport"
            value={origin.city ? `${origin.city} (${origin.code})` : ""}
            code=""
            onChange={(city, code) => setOrigin({ city, code })}
            icon={<Plane size={14} />}
          />

          <button
            onClick={swap}
            className="shrink-0 mb-0.5 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-electric"
          >
            <ArrowLeftRight size={14} />
          </button>

          <AirportInput
            label="To"
            placeholder="City or airport"
            value={destination.city ? `${destination.city} (${destination.code})` : ""}
            code=""
            onChange={(city, code) => setDestination({ city, code })}
            icon={<Plane size={14} className="rotate-90" />}
          />
        </div>

        {/* Dates */}
        <div className="flex gap-2 flex-shrink-0">
          <div className="min-w-[140px]">
            <label className="block text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">Depart</label>
            <div className="search-input rounded-xl px-3 py-3 flex items-center gap-2">
              <Calendar size={14} className="text-gray-400 shrink-0" />
              <input
                type="date"
                value={departDate}
                min={today}
                onChange={(e) => setDepartDate(e.target.value)}
                className="bg-transparent text-sm text-white focus:outline-none w-full"
              />
            </div>
          </div>

          {tripType === "return" && (
            <div className="min-w-[140px]">
              <label className="block text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">Return</label>
              <div className="search-input rounded-xl px-3 py-3 flex items-center gap-2">
                <Calendar size={14} className="text-gray-400 shrink-0" />
                <input
                  type="date"
                  value={returnDate}
                  min={departDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="bg-transparent text-sm text-white focus:outline-none w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Passengers + cabin */}
        <div className="relative shrink-0">
          <label className="block text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">Travellers</label>
          <button
            onClick={() => setShowPassengers(!showPassengers)}
            className="search-input rounded-xl px-3 py-3 flex items-center gap-2 text-sm text-white"
          >
            <Users size={14} className="text-gray-400" />
            <span>{passengers} adult{passengers !== 1 ? "s" : ""}</span>
            <span className="text-gray-400 capitalize ml-1">· {cabin}</span>
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          {showPassengers && (
            <div className="absolute top-full mt-2 right-0 z-50 bg-panel border border-white/10 rounded-xl p-4 w-64 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-300">Adults</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-electric hover:text-electric transition-colors flex items-center justify-center text-lg">−</button>
                  <span className="text-white font-semibold w-4 text-center">{passengers}</span>
                  <button onClick={() => setPassengers(Math.min(9, passengers + 1))} className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-electric hover:text-electric transition-colors flex items-center justify-center text-lg">+</button>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Cabin class</div>
                <div className="grid grid-cols-2 gap-2">
                  {cabins.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCabin(c)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${cabin === c ? "bg-electric/20 text-electric border border-electric/50" : "border border-white/10 text-gray-400 hover:border-white/30"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowPassengers(false)} className="mt-4 w-full btn-primary py-2 rounded-lg text-sm">Done</button>
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          onClick={search}
          className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shrink-0 mb-0.5 h-[46px]"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </div>
  );
}
