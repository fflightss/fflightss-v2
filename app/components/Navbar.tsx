"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Plane } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-midnight/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Plane size={16} className="text-white rotate-45" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="gradient-text">FFLIGHTSS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Flights</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Hotels</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Car Hire</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Deals</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Sign in</button>
            <button className="btn-primary text-sm px-4 py-2 rounded-lg">Sign up free</button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-deepspace border-t border-white/5 px-4 py-4 space-y-3">
          {["Flights", "Hotels", "Car Hire", "Deals"].map((item) => (
            <Link key={item} href="#" className="block text-sm text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setOpen(false)}>
              {item}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/5 flex gap-3">
            <button className="text-sm text-gray-400 hover:text-white">Sign in</button>
            <button className="btn-primary text-sm px-4 py-2 rounded-lg">Sign up free</button>
          </div>
        </div>
      )}
    </nav>
  );
}
