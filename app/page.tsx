"use client";
import Link from "next/link";
import { TrendingDown, Shield, Zap, Globe, Star, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import SearchWidget from "./components/SearchWidget";
import { popularRoutes } from "./lib/flights";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden dot-grid">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-ultraviolet/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-electric/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/30 bg-electric/10 text-electric text-xs font-semibold mb-6 tracking-wide">
            <Zap size={12} />
            Compare 1000+ airlines in seconds
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-5 text-white">
            Find flights<br />
            <span className="gradient-text">ridiculously cheap</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We search hundreds of airlines and travel sites at once so you always get the best price.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <SearchWidget />
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-electric font-semibold uppercase tracking-widest mb-1">Top routes from London</p>
              <h2 className="font-display font-bold text-2xl text-white">Popular destinations</h2>
            </div>
            <button className="text-sm text-gray-400 hover:text-electric flex items-center gap-1 transition-colors">
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularRoutes.map((route) => (
              <Link
                key={route.toCode}
                href={`/results?origin=${route.from}&originCode=${route.fromCode}&destination=${route.to}&destinationCode=${route.toCode}&departDate=${getTomorrowDate()}&passengers=1&cabin=economy&tripType=return`}
                className="card-hover bg-deepspace border border-white/8 rounded-2xl p-4 text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3">{route.image}</div>
                <div className="text-sm font-semibold text-white group-hover:text-electric transition-colors">{route.to}</div>
                <div className="text-xs text-gray-400 mt-0.5">{route.toCode}</div>
                <div className="mt-2 text-electric font-bold text-sm">from £{route.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-3">Why travellers choose FFLIGHTSS</h2>
            <p className="text-gray-400">We work for you, not the airlines.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <TrendingDown className="text-electric" size={24} />, title: "Lowest prices", body: "We compare hundreds of sites so you never overpay for a flight again." },
              { icon: <Shield className="text-ultraviolet" size={24} />, title: "No hidden fees", body: "What you see is what you pay. No booking fees from FFLIGHTSS." },
              { icon: <Zap className="text-lime" size={24} />, title: "Lightning fast", body: "Results in under 2 seconds. Search once, compare everything." },
              { icon: <Globe className="text-coral" size={24} />, title: "Global coverage", body: "1,200+ airlines, 6,000+ airports and every corner of the globe." },
            ].map((f, i) => (
              <div key={i} className="card-hover bg-deepspace border border-white/8 rounded-2xl p-6">
                <div className="mb-4 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">{f.icon}</div>
                <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-12 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            {[
              { stat: "50M+", label: "searches monthly" },
              { stat: "4.8★", label: "app rating" },
              { stat: "1,200+", label: "airlines compared" },
              { stat: "£0", label: "booking fees" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-bold text-2xl gradient-text">{s.stat}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-white mb-8 text-center">What our users say</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Sarah M.", location: "London", review: "Found a return flight to Bali £200 cheaper than anywhere else. Absolutely brilliant.", rating: 5 },
              { name: "James T.", location: "Manchester", review: "The search is so fast and the price alerts have saved me a fortune. Highly recommend.", rating: 5 },
              { name: "Priya K.", location: "Birmingham", review: "Best flight comparison site. Simple, fast, no annoying popups or fake urgency.", rating: 5 },
            ].map((r, i) => (
              <div key={i} className="bg-deepspace border border-white/8 rounded-2xl p-6">
                <div className="flex text-yellow-400 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">"{r.review}"</p>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="font-display font-bold text-lg gradient-text mb-4">FFLIGHTSS</div>
              <p className="text-xs text-gray-400 leading-relaxed">The smartest way to compare and book flights from hundreds of airlines worldwide.</p>
            </div>
            {[
              { title: "Company", links: ["About us", "Careers", "Press", "Blog"] },
              { title: "Support", links: ["Help centre", "Contact us", "Cookie policy", "Privacy policy"] },
              { title: "Explore", links: ["Cheap flights", "Flight alerts", "Destinations", "Travel guides"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold text-white mb-3">{col.title}</div>
                {col.links.map((link) => (
                  <div key={link} className="text-xs text-gray-400 hover:text-white cursor-pointer py-1 transition-colors">{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-500">© 2025 FFLIGHTSS. All rights reserved.</p>
            <p className="text-xs text-gray-500">FFLIGHTSS is a price comparison service. We may earn commission from bookings.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}
