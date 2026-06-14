"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, Clock, TrendingDown, Plane, ChevronDown, ChevronUp, ExternalLink, Leaf, X, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import SearchWidget from "../components/SearchWidget";
import { generateFlights, Flight, SearchParams } from "../lib/flights";

function FlightCard({ flight, index }: { flight: Flight; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-deepspace border rounded-2xl overflow-hidden card-hover transition-all ${flight.isTopDeal ? "border-electric/50" : "border-white/8"}`}>
      {flight.isTopDeal && (
        <div className="bg-electric/10 border-b border-electric/20 px-4 py-1.5 flex items-center gap-2">
          <TrendingDown size={12} className="text-electric" />
          <span className="text-xs text-electric font-semibold">Top Deal — Best value flight</span>
        </div>
      )}
      {flight.isCheapest && !flight.isTopDeal && (
        <div className="bg-lime/10 border-b border-lime/20 px-4 py-1.5">
          <span className="text-xs text-lime font-semibold">Cheapest option</span>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Airline */}
          <div className="flex items-center gap-3 min-w-[120px]">
            <div className="text-2xl">{flight.airlineLogo}</div>
            <div>
              <div className="text-sm font-semibold text-white">{flight.airline}</div>
              <div className="text-xs text-gray-400">{flight.airlineCode} · {flight.cabin}</div>
            </div>
          </div>

          {/* Times */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-white font-display">{flight.departureTime}</div>
              <div className="text-xs text-gray-400 font-semibold">{flight.originCode}</div>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1 max-w-[120px]">
              <div className="text-xs text-gray-400">{flight.duration}</div>
              <div className="w-full flex items-center gap-1">
                <div className="flex-1 h-px bg-gradient-to-r from-electric/40 to-ultraviolet/40"></div>
                <Plane size={10} className="text-gray-400 rotate-90" />
              </div>
              <div className={`text-xs font-semibold ${flight.stops === 0 ? "text-lime" : "text-yellow-400"}`}>
                {flight.stops === 0 ? "Non-stop" : flight.stops === 1 ? "1 stop" : "2 stops"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white font-display">{flight.arrivalTime}</div>
              <div className="text-xs text-gray-400 font-semibold">{flight.destinationCode}</div>
            </div>
          </div>

          {/* CO2 */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
            <Leaf size={12} className="text-green-400" />
            {flight.co2kg}kg CO₂
          </div>

          {/* Price + CTA */}
          <div className="text-right ml-auto">
            <div className="text-2xl font-bold text-white font-display">£{flight.price.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mb-3">per person</div>
            {flight.seatsLeft && (
              <div className="text-xs text-coral mb-2 font-medium">Only {flight.seatsLeft} seats left!</div>
            )}
            <a
              href={flight.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm"
            >
              Book now <ExternalLink size={12} />
            </a>
            <div className="text-xs text-gray-500 mt-1">via {flight.provider}</div>
          </div>
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-electric transition-colors"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? "Hide" : "Show"} flight details
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/8 grid sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div>
              <div className="text-gray-500 mb-1">Route</div>
              <div>{flight.origin} ({flight.originCode}) → {flight.destination} ({flight.destinationCode})</div>
              {flight.stopDetail && <div className="text-yellow-400 mt-1">{flight.stopDetail}</div>}
            </div>
            <div>
              <div className="text-gray-500 mb-1">Baggage</div>
              <div>{flight.baggage}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">CO₂ emissions</div>
              <div className="flex items-center gap-1">
                <Leaf size={11} className="text-green-400" />
                {flight.co2kg}kg per passenger
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<"price" | "duration" | "stops">("price");
  const [filterStops, setFilterStops] = useState<number[]>([0, 1, 2]);
  const [maxPrice, setMaxPrice] = useState<number>(9999);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const params: SearchParams = {
    origin: searchParams.get("origin") || "London",
    originCode: searchParams.get("originCode") || "LHR",
    destination: searchParams.get("destination") || "New York",
    destinationCode: searchParams.get("destinationCode") || "JFK",
    departDate: searchParams.get("departDate") || "",
    returnDate: searchParams.get("returnDate") || "",
    passengers: parseInt(searchParams.get("passengers") || "1"),
    cabin: searchParams.get("cabin") || "economy",
    tripType: (searchParams.get("tripType") as "one-way" | "return" | "multi-city") || "return",
  };

  const allFlights = useMemo(() => generateFlights(params), [params.originCode, params.destinationCode, params.cabin]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, [params.originCode, params.destinationCode]);

  const displayedFlights = useMemo(() => {
    let flights = allFlights.filter((f) => filterStops.includes(f.stops) && f.price <= maxPrice);
    if (sortBy === "price") flights = flights.sort((a, b) => a.price - b.price);
    else if (sortBy === "duration") flights = flights.sort((a, b) => a.duration.localeCompare(b.duration));
    else if (sortBy === "stops") flights = flights.sort((a, b) => a.stops - b.stops);
    return flights;
  }, [allFlights, sortBy, filterStops, maxPrice]);

  const minPrice = Math.min(...allFlights.map((f) => f.price));
  const maxPriceAll = Math.max(...allFlights.map((f) => f.price));

  return (
    <div className="min-h-screen bg-midnight">
      <Navbar />

      {/* Search bar */}
      <div className="pt-20 pb-4 px-4 bg-deepspace border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <SearchWidget compact />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Route heading */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h1 className="font-display font-bold text-xl text-white">
              {params.origin} → {params.destination}
            </h1>
            <p className="text-sm text-gray-400">
              {params.departDate} · {params.passengers} passenger{params.passengers !== 1 ? "s" : ""} · {params.cabin} · {params.tripType}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{displayedFlights.length} flights found</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-white/15 rounded-xl text-sm text-gray-300 hover:border-electric hover:text-electric transition-colors"
            >
              <Filter size={14} />Filters
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-64 shrink-0`}>
            <div className="bg-deepspace border border-white/8 rounded-2xl p-5 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-white text-sm flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-electric" /> Filters
                </h3>
                <button onClick={() => setShowFilters(false)} className="md:hidden text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              </div>

              {/* Stops filter */}
              <div className="mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Stops</div>
                {[{ label: "Non-stop", value: 0 }, { label: "1 stop", value: 1 }, { label: "2+ stops", value: 2 }].map((s) => (
                  <label key={s.value} className="flex items-center gap-3 py-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filterStops.includes(s.value)}
                      onChange={(e) => {
                        if (e.target.checked) setFilterStops([...filterStops, s.value]);
                        else setFilterStops(filterStops.filter((v) => v !== s.value));
                      }}
                      className="w-4 h-4 rounded accent-electric"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{s.label}</span>
                  </label>
                ))}
              </div>

              {/* Max price */}
              <div className="mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Max price</div>
                <div className="text-electric font-bold font-display text-lg mb-2">
                  £{Math.min(maxPrice, maxPriceAll).toLocaleString()}
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPriceAll}
                  value={Math.min(maxPrice, maxPriceAll)}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-electric"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>£{minPrice}</span>
                  <span>£{maxPriceAll.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => { setFilterStops([0, 1, 2]); setMaxPrice(9999); }}
                className="text-xs text-gray-400 hover:text-electric transition-colors"
              >
                Reset all filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Sort tabs */}
            <div className="flex gap-2 mb-4">
              {([
                { key: "price", label: "Cheapest", icon: <TrendingDown size={12} /> },
                { key: "duration", label: "Fastest", icon: <Clock size={12} /> },
                { key: "stops", label: "Best", icon: <Plane size={12} /> },
              ] as const).map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${sortBy === s.key ? "tab-active" : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"}`}
                >
                  {s.icon}{s.label}
                </button>
              ))}
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-deepspace border border-white/8 rounded-2xl p-5 animate-pulse">
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-10 w-32 bg-white/5 rounded-lg" />
                      <div className="flex-1 h-10 bg-white/5 rounded-lg" />
                      <div className="h-12 w-24 bg-white/5 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedFlights.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="font-display text-lg text-white mb-2">No flights match your filters</h3>
                <p className="text-sm text-gray-400">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayedFlights.map((flight, i) => (
                  <FlightCard key={flight.id} flight={flight} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-midnight flex items-center justify-center"><div className="text-electric text-lg animate-pulse">Searching flights...</div></div>}>
      <ResultsContent />
    </Suspense>
  );
}
