# ✨ ShineUp — AI-Powered Automotive Detailing Marketplace

A premium AI-powered marketplace that helps vehicle owners identify paint and condition issues using AI and connect with verified detailing professionals.

🌐 **Live Demo:** [https://shine-up.netlify.app/](https://shine-up.netlify.app/)
🔗 **GitHub:** [github.com/vivekbhattacharya01-gif](https://github.com/vivekbhattacharya01-gif)

---

## 🚗 About ShineUp

ShineUp is an AI-powered automotive detailing marketplace built with a **Technical Luxury** design philosophy. Users can upload vehicle photos to receive AI-generated health reports, then seamlessly connect with verified premium detailing professionals for bookings.

> *"Know Your Vehicle's Condition Before You Spend."*

---

## 🛤️ Primary User Journey

```
Landing Page
     ↓
┌─────────────────────────────────┐
│  Path A            │  Path B    │
│  Marketplace       │  AI Health │
│  Discovery         │  Check     │
│       ↓            │     ↓      │
│  Detailer          │  AI Health │
│  Profile           │  Report    │
└─────────────────────────────────┘
          ↓
     Booking Flow
          ↓
   Booking Confirmed ✅
```

---

## 📱 Screens (MVP)

### 1. 🏠 Landing Page
- Hero — *"Know Your Vehicle's Condition Before You Spend."*
- Primary CTA: **"Start AI Analysis"** | Secondary CTA: **"Explore Detailers"**
- Search bar, Featured detailers, How It Works
- Customer testimonials, Partner CTA & Footer

### 2. 🔍 Marketplace Discovery
- Search with filters — Ceramic Coating, Paint Correction, Interior Detailing, PPF, Rating, Distance
- Map View & List View toggle
- Detailer cards — Name, Rating, Location, Services, Starting Price

### 3. 👤 Verified Detailer Profile
- Business overview with Verified Badge
- Portfolio gallery & Before/After transformations
- Reviews, Services, Pricing & Certifications
- Book Service CTA

### 4. 🤖 AI Vehicle Health Check
- Upload up to 5 photos (drag & drop)
- Photo types: Front, Rear, Side View, Paint Close-Up, Interior
- Vehicle information form → **"Analyze Vehicle"** CTA

### 5. 📊 AI Health Report
- Vehicle Health Score
- Detected Issues: Scratches, Swirl Marks, Paint Oxidation, Water Spots, Paint Fading, Interior Wear
- DIY guidance + Professional Solutions (Ceramic Coating, Paint Correction, PPF)
- Estimated pricing & Recommended detailers
- **"Book Recommended Service"** CTA

### 6. 📅 Booking Flow

| Step | Description |
|---|---|
| Step 1 | Select Service |
| Step 2 | Select Vehicle Type |
| Step 3 | Choose Date & Time |
| Step 4 | Review Booking |
| Step 5 | ✅ Booking Confirmation |

Post-booking: WhatsApp Contact · Call Detailer · Return to Marketplace

---

## 🎨 Design System

| Element | Value |
|---|---|
| Style | Technical Luxury |
| Background | Deep Black |
| Accent | Premium Gold |
| UI Style | Glassmorphism |
| Typography | Premium / Cinematic |
| Inspiration | Tesla App · Porsche Experience · Luxury Concierge |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4, tw-animate-css |
| Animations | Motion (Framer Motion) |
| UI Components | Radix UI (Accordion, Dialog, Select, Tabs, Tooltip...) |
| Icons | Lucide React |
| Charts | Recharts |
| Forms | React Hook Form |
| Routing | React Router v7 |
| Drag & Drop | React DnD + HTML5 Backend |
| Carousel | Embla Carousel, React Slick |
| Date Picker | React Day Picker + date-fns |
| Theming | next-themes |
| Notifications | Sonner |
| Material UI | MUI Material + MUI Icons |
| Utilities | clsx, tailwind-merge, class-variance-authority |
| Deployment | Netlify / Vercel |

---

## ⚡ Getting Started

```bash
# Clone the repository
git clone https://github.com/vivekbhattacharya01-gif/shineup.git

cd shineup

# Install dependencies
npm install

# Run development server
npm run dev
```

Open in browser: `http://localhost:5173`

---

## 🏗️ Build for Production

```bash
npm run build
```

Output directory: `dist`

---

## 📂 Project Structure

```
shineup/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FeaturedDetailers.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Testimonials.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Marketplace.jsx
│   │   ├── DetailerProfile.jsx
│   │   ├── AIHealthCheck.jsx
│   │   ├── AIHealthReport.jsx
│   │   └── BookingFlow.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## ⭐ Future Improvements

- [ ] Real AI model integration for vehicle photo analysis
- [ ] User authentication & profiles
- [ ] Live booking with payment gateway (Razorpay/Stripe)
- [ ] Detailer dashboard & management panel
- [ ] Reviews & ratings system
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] SEO & performance optimization

---

## 👨‍💻 Author

**Vivek Bhattacharya** — Computer Science Student | Frontend Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vivek-bhattacharya-9a661528a/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/vivekbhattacharya01-gif)

---

📜 No License
