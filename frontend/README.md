# E-Guide Frontend

A modern, responsive web application for accessing, sharing, and managing college study materials. Built with React, Tailwind CSS, and Firebase for seamless user experience and authentication.

## 🚀 Features
- User authentication (Sign up, Sign in, Forgot password)
- Role-based dashboards (Admin & User)
- Upload, view, and download study materials
- Animated, mobile-friendly UI
- Feedback form and testimonials
- Secure access and data handling

## 🛠 Tech Stack
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase (Auth & Firestore)](https://firebase.google.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

## 📦 Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Firebase:**
   - Copy your Firebase config to `src/components/firebase.js` (already set up for demo, but use your own for production).
   - Add a `.env` file if you use environment variables (see `.env.example` if present).
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or as shown in your terminal)

## 📜 Available Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code with ESLint

## 📁 Project Structure
- `src/pages/` — Main pages (Login, Dashboard, etc.)
- `src/components/` — Reusable UI components
- `src/assets/` — Images and static assets
- `src/hooks/` — Custom React hooks

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📧 Contact
For support or questions, contact [support@e-guide.com](mailto:support@e-guide.com)

---
© {new Date().getFullYear()} E-Guide. All rights reserved.
