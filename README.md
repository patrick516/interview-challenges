# Notes Dashboard (React + Tailwind)

A clean, reusable UI that mirrors the attached mockup: sidebar navigation, top search bar with “New Note”, and two sections (“Coming up”, “Today”) listing meeting/notes as soft cards.

Built with **Vite + React + TypeScript + Tailwind CSS**. Components are modular and easy to extend.

---

## ✨ Features

- **Pixel-clean layout**: sidebar, sticky topbar, content area
- **Reusable components**: `Layout`, `Header`, `Sidebar`, `Section`, `NoteItem`, `Icon`
- **Utility-first styling** with Tailwind (no extra UI libs)
- **Mock data** decoupled in `src/data.ts` (ready to swap for APIs)
- **Responsive** and accessible SVG icons

---

## 📸 Preview

> The UI matches the provided design:
>
> - Left: app brand + nav + “My Notes” list + upgrade card
> - Top: search input + “New Note” button + avatar
> - Main: “Coming up” and “Today” sections with rounded note rows

_(If you want a screenshot in the README, save one to `public/preview.png` and reference it here.)_

---

## 🧱 Tech Stack

- **React 18 + TypeScript**
- **Vite** for fast dev/build
- **Tailwind CSS v3** (with PostCSS + Autoprefixer)
- SVG icons (inline) – no icon library dependency

---

## 🚀 Quick Start

```bash
# from the repository root
cd web
npm i
npm run dev
# open http://localhost:5173
```
