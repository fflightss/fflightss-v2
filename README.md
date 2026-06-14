# ✈️ FFLIGHTSS – Flight Price Comparison Website

A Skyscanner-style flight price comparison affiliate website built with Next.js 14, TypeScript, and Tailwind CSS.

---

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1 – Upload to GitHub

1. Go to github.com and click **New repository**
2. Name it `fflightss`, keep it Private, click **Create repository**
3. On your computer open Terminal and run:

```bash
cd path/to/fflightss-folder
git init
git add .
git commit -m "Initial commit – FFLIGHTSS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fflightss.git
git push -u origin main
```

### Step 2 – Deploy to Vercel

1. Go to vercel.com, sign in with GitHub
2. Click **Add New → Project**
3. Select your `fflightss` repo → click **Deploy**
4. Live at `https://fflightss.vercel.app` in ~60 seconds ✅

### Step 3 – Connect Your Custom Domain

1. Vercel dashboard → your project → **Settings → Domains**
2. Add your domain → Vercel gives you DNS records
3. Add records at your registrar → SSL auto-provisioned ✅

---

## 🔌 Connect Real Flight Data

### Skyscanner Affiliate API (Recommended)
1. Apply at partners.skyscanner.net
2. Add to `.env.local`: `SKYSCANNER_API_KEY=your_key_here`

### Amadeus API (Free tier)
1. Sign up at developers.amadeus.com
2. Add: `AMADEUS_API_KEY=key` and `AMADEUS_API_SECRET=secret`

---

## 💰 Affiliate Revenue

- **Skyscanner**: partners.skyscanner.net (CPC model)
- **Booking.com**: booking.com/affiliate-program
- **Kayak**: kayak.com/affiliates
- **Kiwi.com**: kiwi.com/en/pages/affiliate

---

## 🛠 Project Structure

```
fflightss/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── SearchWidget.tsx
│   ├── lib/
│   │   └── flights.ts
│   ├── results/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── vercel.json
├── tailwind.config.ts
└── next.config.ts
```

## Tech Stack

Next.js 14 · TypeScript · Tailwind CSS · Lucide Icons · Vercel
