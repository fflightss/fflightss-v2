import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "FFLIGHTSS – Compare flights & find the cheapest prices",
  description: "Search and compare hundreds of airlines to find the cheapest flights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="travelpayouts-tracking" strategy="afterInteractive">
          {`
            (function () {
              var script = document.createElement("script");
              script.async = 1;
              script.src = 'https://tp-em.com/NTQzODcw.js?t=543870';
              document.head.appendChild(script);
            })();
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}