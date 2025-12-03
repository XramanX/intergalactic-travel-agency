# 🚀 Intergalactic Travel Agency – Booking Wizard

A production-ready multi-step booking wizard built with **Next.js 14 (App Router)** and **TypeScript**.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Booking Flow](#booking-flow)
- [API Routes](#api-routes)
- [State Management](#state-management)
- [Validation](#validation)
- [Testing](#testing)
- [Styling](#styling)

---

## 🌟 Overview

The Intergalactic Travel Agency booking wizard guides users through a seamless 3-step process to book their next space adventure:

1. **🪐 Destination Selection** – Choose your cosmic destination and travel dates
2. **👥 Traveler Management** – Add and manage 1-5 travelers
3. **✅ Review & Confirm** – Review your booking and submit

All data is handled client-side with mocked Next.js API routes, simulating real-world API interactions.

---

## ✨ Features

- ✅ **Multi-step wizard** with smart navigation
- ✅ **Persistent state** across page refreshes (localStorage)
- ✅ **Responsive design** (mobile & desktop)
- ✅ **Dark/Light themes** support
- ✅ **Loading states** and skeleton loaders
- ✅ **Type-safe** API routes and components
- ✅ **Accessible** UI components
- ✅ **Simulated API latency** for realistic UX

---

## 🛠 Tech Stack

| Technology        | Purpose                              |
| ----------------- | ------------------------------------ |
| **Next.js 14**    | React framework with App Router      |
| **TypeScript**    | Type safety and developer experience |
| **React 18**      | UI library with modern hooks         |
| **SCSS Modules**  | Scoped styling with variables        |
| **React Context** | Global state management              |
| **localStorage**  | State persistence                    |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** / **yarn** / **pnpm** / **bun**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd intergalactic-travel-agency

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The wizard will redirect to `/booking/destination` automatically.

### Building for Production

```bash
npm run build
npm run start
```

---

## 🎯 Booking Flow

### Step 1: Destination Selection

**Features:**

- Fetches destinations from `GET /api/destinations`
- Displays destination cards with name, distance, and travel time
- Date picker for departure and return dates

**Validation:**

- ✅ Destination must be selected
- ✅ Both dates are required
- ✅ Return date must be after departure date
- ✅ Trip duration must meet minimum travel time
  - Example: Cannot book a 1-day trip to Mars (requires 7 months travel time)

### Step 2: Traveler Management

**Features:**

- Add/remove travelers (1-5 max)
- Each traveler has:
  - Full name
  - Age

**Validation:**

- ✅ At least 1 traveler required
- ✅ All travelers must have a non-empty name
- ✅ All travelers must have a valid age (> 0)

### Step 3: Review & Confirm

**Features:**

- Consolidated summary of:
  - Selected destination
  - Travel dates
  - All travelers
- Submit button with loading state

**Submission:**

- Posts to `POST /api/bookings`
- Simulates 1-2 second API latency
- On success, redirects to confirmation page with booking ID

---

## 🔌 API Routes

### `GET /api/destinations`

Returns available destinations:

```json
[
  {
    "id": "mars",
    "name": "Mars",
    "distance": "225M km",
    "travelTime": "7 months"
  },
  {
    "id": "europa",
    "name": "Europa",
    "distance": "628M km",
    "travelTime": "2 years"
  },
  {
    "id": "titan",
    "name": "Titan",
    "distance": "1.2B km",
    "travelTime": "4 years"
  },
  {
    "id": "luna",
    "name": "Luna (Moon)",
    "distance": "384K km",
    "travelTime": "3 days"
  }
]
```

### `POST /api/bookings`

Accepts booking data:

```json
{
  "destination": "mars",
  "departureDate": "2025-06-01",
  "returnDate": "2026-01-01",
  "travelers": [
    { "fullName": "John Doe", "age": 32 },
    { "fullName": "Jane Smith", "age": 28 }
  ]
}
```

Returns:

```json
{
  "success": true,
  "bookingId": "XYZ123"
}
```

---

## 🧠 State Management

**Approach:** React Context + localStorage

**Why not Redux?**

For this assessment:

- ✅ Small, linear state surface (single wizard flow)
- ✅ No complex cross-feature interactions
- ✅ No server cache management needed
- ✅ Simpler to review and maintain

**Benefits:**

- State persists across page refreshes
- Easy to navigate between completed steps
- No unnecessary boilerplate

**When to upgrade:**
In a production app with multiple flows (auth, payments, seat selection), Redux Toolkit or Zustand would be appropriate.

**Implementation:**

```typescript
// useBooking hook provides:
const {
  bookingState,
  setDestination,
  setDates,
  updateTraveler,
  addTraveler,
  removeTraveler,
  resetBooking,
} = useBooking();
```

---

## ✅ Validation

All validation is centralized in `features/booking/utils/validation.ts`:

### Date Validation

```typescript
validateDates(departureDate, returnDate);
```

- Checks both dates exist
- Ensures return > departure

### Traveler Validation

```typescript
validateTravelers(travelers);
```

- At least 1 traveler
- Non-empty names
- Valid ages (> 0)

### Trip Duration Validation

```typescript
validateTripDurationWithDestination(departureDate, returnDate, destination);
```

- Converts travel time ("7 months", "3 days") to days
- Ensures trip duration ≥ travel time
- Example: Mars trip (7 months) requires ~210 day duration

### Step Gating

**Navigation Rules:**

- **Step 1** (Destination): Always accessible
- **Step 2** (Travelers): Enabled when Step 1 valid
- **Step 3** (Review): Enabled when Step 2 valid

Users can freely navigate between completed steps but cannot skip ahead.

---

## 🧪 Testing

Unit tests with **Jest** and **React Testing Library** cover critical validation logic and component behavior.

```bash
npm run test
# or
yarn test
```

**Coverage includes:**

- Date validation (range checks, missing dates)
- Traveler validation (required fields, age constraints)
- Trip duration validation (minimum travel time enforcement)

---

## 🎨 Styling

**Approach:** SCSS Modules + CSS Variables

**Theme System:**

- Light/Dark themes mode toggle
- CSS variables for easy theming
- Shared design tokens in `variables.scss`

---

## 📄 License

MIT License - feel free to use this project for learning and assessment purposes.

---

## 🤝 Contributing

This is an assessment project, but feedback and suggestions are welcome!

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

---

## 👨‍💻 Author

Created as an assessment project demonstrating production-ready frontend architecture and best practices.

---

**Happy Space Travel! 🚀🌌**
