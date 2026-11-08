# Guru Lights and Sounds - Premium Event Services Website
**Paluri Vari Palli, Andhra Pradesh, India**

A modern, high-conversion business website designed for **Guru Lights and Sounds**, an established event services provider based in **Paluri Vari Palli, Andhra Pradesh, India**.

Designed with an editorial luxury visual identity (Deep Navy, Dark Charcoal, Muted Gold, White typography), this application showcases complete event solutions across six key services:

1. **DJ Services** &mdash; High-energy celebration music and crowd entertainment.
2. **Lighting Services** &mdash; Stage moving heads, ambient LED par lights, and decorative fairy lighting.
3. **Tent House Services** &mdash; Royal shamiana canopies, comfortable banquet seating, and weather-proof setups.
4. **Car / Driving Services** &mdash; Chauffeured transportation for bridal parties, guests, and special occasions.
5. **Professional Sound System** &mdash; High-output speaker walls, monitors, audio mixers, and cordless microphones.
6. **Event Decoration** &mdash; Grand ceremonial stage backdrops, floral arches, and thematic styling.

---

## 💎 Key Features & Strict Business Policies

- **Cinematic DJ Concert Stage Preloader**: Immersive intro featuring laser beams, dynamic audio equalizer bars, stage smoke, golden light streak sweeps, and responsive loading counter before revealing the homepage.
- **Strict No-Booking-Forms Policy**: No online checkout, appointment calendars, or hidden intermediaries. All bookings and inquiries take place directly between the customer and the business owner via direct telephone calls (`tel:`) or official WhatsApp (`wa.me`).
- **Right-Side Call & WhatsApp Icons**: Persistent quick actions in both the desktop/mobile navigation bar and a floating bottom-right dock.
- **Dynamic Configuration Guard**: When phone or WhatsApp numbers are not yet configured in `src/config/business.ts`, respective contact buttons are automatically hidden or display clear owner setup instructions.
- **Hero Section Owner Composition**: Displays the business owner's photograph on the **right** and headline on the **left**, maintaining aspect ratios without facial cropping.
- **Paluri Vari Palli Google Maps Integration**: Interactive responsive embed focusing on Paluri Vari Palli village, with a one-click "Get Directions" navigation button.
- **Indian Wedding Photography Portfolio**: High-resolution gallery representing authentic Indian marriages, sangeets, mandapam decorations, and baaraat celebrations with a responsive lightbox.
- **Digital Visiting Card**:
  - High-resolution printable PNG export (`downloadVisitingCard`).
  - Web Share API sharing with automatic clipboard fallback (`shareBusinessCard`).
  - Automatic dynamic WhatsApp QR code generator (only active when a valid WhatsApp number is present).

---

## 🛠️ Technology Stack

- **React 18** + **TypeScript**
- **Vite 6** (Fast development server and optimized production bundler)
- **Tailwind CSS 3** (Custom editorial design tokens & gold color palette)
- **Framer Motion** (Smooth luxury entrance, scroll animations, and interactive transitions)
- **Lucide React** (Clean, modern iconography)
- **HTML-to-Image** (Visiting card 2x retina PNG export)
- **QRCode** (Real-time WhatsApp QR code generation)

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Development Mode
Start the live local development server with hot-module replacement:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 2. Production Build
Verify TypeScript types and build the production bundle:
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Central Business Configuration Guide

All business details are centrally managed in a single file:
👉 `src/config/business.ts`

When any detail is updated here, the entire website (Navbar, Hero, Services, Maps, Contact Cards, Digital Visiting Card, and Footer) updates automatically.

### 1. Update Business Name & Tagline
Open `src/config/business.ts` and edit:
```typescript
businessName: "Guru Lights and Sounds",
tagline: "Making Every Celebration Unforgettable.",
```

### 2. Update Official Logo
Drop the logo image into `public/images/logo.jpg` and update:
```typescript
logo: "/images/logo.jpg",
```

### 3. Update Business Owner Photo
Place the owner's portrait in `public/images/` and update:
```typescript
ownerImage: "/images/owner-photo.jpg",
```

### 4. Update Contact Numbers
Set the actual phone and WhatsApp numbers:
```typescript
// Number displayed on screen and dialed on tap
phoneNumber: "+91 98765 43210",

// WhatsApp digits in international format (no spaces or '+' sign)
whatsappNumber: "919876543210",
```
> **Note:** If either field is left as an empty string `""`, its call/WhatsApp button will automatically hide.

### 5. Update Exact Google Maps Location
Once the exact location pin is known:
```typescript
displayAddress: "Paluri Vari Palli, Andhra Pradesh, India",
googleMapsUrl: "https://maps.google.com/?q=...",
latitude: 14.1234,
longitude: 78.5678,
```

---

## 📋 Owner Information Checklist

| Item | Current Status | Action Needed from Owner |
|------|---------------|--------------------------|
| **Business Name** | ✅ Guru Lights and Sounds | Configured |
| **Brand Logo** | ✅ Official Logo Added | Configured in `public/images/logo.jpg` |
| **Owner Photograph** | ✅ Original Owner Photo Added | P. Guru Brahmam (`public/images/owner-photo.jpg`) |
| **Visiting Card** | ✅ Official Visiting Card Added | Configured in `public/images/visiting-card.jpg` |
| **Phone Number 1** | 📱 Active (`+91 79896 09307`) | Official Primary Line |
| **Phone Number 2** | 📱 Active (`+91 79936 29400`) | Official Secondary Line |
| **WhatsApp Number** | 💬 Active (`917989609307`) | Official Direct WhatsApp |
| **Google Maps Location** | ✅ Exact Location Configured | `https://maps.app.goo.gl/KSjNJwgXrG7ZAyS89?g_st=aw` (9JCV+68F Guru Tent House) |
| **Actual Event Photos** | 📸 Indian wedding assets | Replace with local event photographs when available |

---

## 📁 Project Folder Structure

```
pvp/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── logo.jpg
│       ├── owner-photo.jpg
│       └── gallery/
│           ├── dj-services.jpg
│           ├── lighting-services.jpg
│           ├── tent-house.jpg
│           ├── car-services.jpg
│           ├── sound-system.jpg
│           ├── event-decoration.jpg
│           └── ...
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Preloader.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── Gallery.tsx
│   │   ├── LocationMap.tsx
│   │   ├── ContactSection.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── VisitingCard.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── LocationSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── VisitingCardSection.tsx
│   │
│   ├── config/
│   │   └── business.ts
│   │
│   ├── utils/
│   │   ├── whatsapp.ts
│   │   └── visitingCard.ts
│   │
│   ├── pages/
│   │   └── Home.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```
# gurudj
