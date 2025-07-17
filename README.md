# TravelNest 🧳

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-000000?style=flat&logo=vercel&logoColor=white)](https://travelnest-one.vercel.app/)

**TravelNest** is a full-stack hotel booking web application inspired by platforms like Booking.com. It allows users to browse hotel listings, filter by location and category, register/login securely, and manage bookings — all built with modern web technologies like Next.js 14, App Router, and PostgreSQL (NeonDB).

## 🚀 Live Demo

👉  [travelnest-one.vercel.app](travelnest-one.vercel.app)

---

## 🧩 Features

- 🔐 **Authentication & Authorization** (NextAuth.js with GitHub and Email providers)
- 🏨 **Hotel Listings** with filtering by location and category
- 📅 **Booking System** with availability management
- 🧾 **User Dashboard** to view bookings and hosted listings
- 🌍 **Dynamic Routing** with SEO-friendly URLs
- ⚙️ **Server Actions & Server Components** using Next.js App Router
- 📬 **Form Validation** with Zod for type-safe inputs
- 🌈 **Responsive UI** built with Tailwind CSS
- 🚀 **Deployed on Vercel** with PostgreSQL hosted on NeonDB

### 🛡️ Admin Functionality (`/properties`)

- 🔐 Protected route accessible only to admin users
- ➕ Create, ✏️ Edit, and ❌ Delete hotel property listings
- 🔎 **Search functionality** to filter properties by title
- 📄 **Pagination** for scalable management of large property datasets

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, NextAuth.js, Prisma ORM
- **Database:** PostgreSQL (NeonDB), Prisma ORM
- **Validation:** Zod
- **Auth:** NextAuth.js
- **Deployment:** Vercel

---

## 📁 Folder Structure

- `/app` → Pages, layouts, routes (App Router)
- `/components` → Reusable UI components
- `/libs` → Prisma client, utility functions
- `/actions` → Server-side logic for booking, listings, etc.
- `/prisma` – Prisma schema and migrations
- `/public` → Static assets (images, icons)
- `/styles` → Tailwind and global styles


---
## 🧰 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (NeonDB or local)
- Vercel (for deployment) – optional

### Installation

1. **Clone the repo**
    ```bash
    git clone https://github.com/aaryan2016/travelnest.git
    cd travelnest

2. **Install dependencies**
    ``` bash
    npm install
    # or
    yarn install

3. **Set up environment variables**

    Create a `.env` file in the root directory:

    ```ini
    DATABASE_URL=your_postgres_connection_string
    NEXTAUTH_SECRET=your_random_secret_key
    NEXTAUTH_URL=http://localhost:3000

4. **Push Prisma schema to DB**
    ```bash
    npx prisma db push

5. **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev

Visit http://localhost:3000 in your browser 🚀

Made with ❤️ by Rahul Vaiwala


