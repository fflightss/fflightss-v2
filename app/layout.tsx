import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FFLIGHTSS – Compare flights & find the cheapest prices",
  description: "Search and compare hundreds of airlines to find the cheapest flights. No hidden fees. No booking charges. Just great prices.",
  keywords: "cheap flights, flight comparison, airline tickets, cheap airfare",
  openGraph: {
    title: "FFLIGHTSS – Find flights ridiculously cheap",
    description: "Compare 1000+ airlines and find the cheapest flights instantly.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
