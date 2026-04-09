# 💧 AquaSupply Supplier

A mobile-first web application for 20L water can suppliers to manage customers, deliveries, payments, and can inventory — all without a backend.

---

## 🚀 Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **React Router v6**
- **LocalStorage** (no backend needed)

---

## 📱 Features

- OTP-based login with 60s resend timer
- Customer management with search
- Daily delivery planner with status tracking
- Can inventory tracking (given / returned / overdue)
- Payment & balance tracking
- New customer request system
- Revenue and delivery reports

---

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/idkdennis/Aquasupply
cd Aquasupply

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/       # Button, Card, Input, BottomNav
├── pages/            # One file per screen (11 pages)
└── utils/            # storage.js, validation.js, helpers.js
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📌 Notes

- All data is stored in **browser localStorage** — no server required
- Optimized for **390px mobile width**
- Works on Chrome, Firefox, Safari, Edge

---

## 📄 License

MIT
