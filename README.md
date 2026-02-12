# Task Management Application

A modern **Task Management** web application built with **React 19**, **TypeScript**, **Vite**, and a clean, scalable frontend architecture. The app allows users to authenticate, manage tasks (create, edit, delete, complete), and navigate efficiently with pagination and dialogs.

---

## 🚀 Features

* 🔐 Authentication flow (simulated JWT)
* ✅ Task CRUD (Create, Read, Update, Delete)
* 🔄 Task completion toggle (Switch component)
* 📄 Pagination support
* 🧩 Dialog-based forms
* 📐 Responsive UI with Tailwind CSS
* 🧠 State management with Zustand
* 🔄 Server state with React Query
* 🧪 Unit and integration testing

---

## 🧱 Tech Stack

### Core

* **React 19**
* **TypeScript**
* **Vite**
* **React Router v7**

### State & Data

* **Zustand** – global state (auth)
* **@tanstack/react-query** – async server state
* **Axios** – HTTP client

### Forms & Validation

* **React Hook Form**
* **Zod** + **@hookform/resolvers**

### UI & Styling

* **Tailwind CSS**
* **shadcn/ui** components
* **Base UI**
* **Lucide Icons**
* **Sonner** (toasts)

### Testing

* **Vitest**
* **Testing Library (React / DOM / User Event)**
* **MSW (Mock Service Worker)**

---

## 📦 Installation

### Prerequisites

* **Node.js 18+** (recommended: latest LTS)
* **npm** or **pnpm**

### Clone the repository

```bash
git clone <repository-url>
cd task-management
```

### Install dependencies

```bash
npm install
```

---

## ▶️ Running the App

### Development mode

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

### Production build

```bash
npm run build
npm run preview
```

---

## 🧪 Testing

Run all tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Coverage report:

```bash
npm run test:coverage
```

---

## 🗂 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Route-level pages
│   ├── auth/          # Login / auth logic
│   └── tasks/         # Task management
├── interfaces/        # TypeScript models
├── store/             # Zustand stores
├── services/          # API / data layer
├── mocks/             # MSW handlers
├── hooks/             # Custom hooks
├── routes/            # Router configuration
├── tests/             # Unit & integration tests
└── main.tsx
```

---

## 🧩 Task Model

```ts
export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
}
```

---

## 📝 Forms & Validation

* Forms are implemented using **React Hook Form**
* Validation handled with **Zod schemas**
* Errors are displayed inline using custom Field components
* Task forms support both **create** and **edit** modes
* Task completion is handled via **shadcn/ui Switch**

---

## 🔐 Authentication

Authentication is simulated:

* Login generates a fake JWT token
* Token is stored in Zustand
* Protected routes require authentication

---

## 🧪 Testing Strategy

* **Unit tests** for components and hooks
* **Integration tests** for pages and flows
* **MSW** mocks API calls for predictable tests
* **Vitest** used as the test runner

---

## 📌 Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:coverage": "vitest run --coverage"
}
```

---

## ✅ Requirements Covered

* Modern React architecture
* Type-safe forms and validation
* Global + server state management
* Pagination and dialogs
* Testing setup
* Clean and scalable structure

---

## 📄 License

This project is provided for educational and demonstration purposes.
