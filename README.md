# AI Demonstration Engine — Frontend

This repository contains the **React + Vite frontend** for the AI Demonstration Engine (also referred to as DemoAI or SkillForge), an AI‑powered platform that transforms text queries into bespoke, step‑by‑step video demonstrations. The system targets skill acquisition, industrial training, cooking tutorials, DIY repairs and more with rich, personalized visual guides.

> **Vision:** democratize skill transfer by creating instant, localized video demonstrations for any task.

> **MVP Focus:** industrial training, cooking tutorials, vocational skills, DIY repairs.

---

## 🚀 Project Overview

Users type a natural‑language “how‑to” query (e.g. “Teach me how to cook Egusi soup with ₦5000 in Lagos”) and the backend orchestrates AI models to generate steps, images, narration and compose a video. The frontend handles input, shows progress, plays the resulting video, and manages user history.

From the architecture plan:

- **Frontend:** React + Vite, styled with Tailwind CSS
- **Backend:** Django REST Framework (API gateway, orchestration)
- **AI & Media:** GPT‑4 / Claude for steps, Leonardo/Roadway for images/videos, ElevenLabs for voice, FFmpeg for composition
- **Queue & Events:** Celery + Redis and Kafka
- **Storage:** Cloudflare R2, PostgreSQL for metadata

> See `plan.md` for a complete product documentation and system architecture diagrams.

---

## 📦 What’s In This Folder

```
frontend/
├── public/               # static assets
├── src/
│   ├── components/       # Navbar, Footer, ErrorBoundary
│   ├── pages/            # Home, DemoPlayer, History
│   ├── services/         # API client (axios)
│   ├── hooks/            # custom React hooks
│   ├── constants.js      # shared configuration
│   ├── App.jsx           # root component with router
│   ├── index.css         # Tailwind directives
│   └── main.jsx          # entry point
├── tailwind.config.js    # Tailwind setup
├── vite.config.js        # Vite build configuration
├── package.json
└── .env.example          # environment variable template
```

Additional documentation lives at the project root and inside this folder:

- `GETTING_STARTED.md` – quick start & setup guide
- `COMPONENT_GUIDE.md` – full component reference
- `BUILD_SUMMARY.md` – what was built in the frontend
- `QUICK_REFERENCE.md` – cheat sheet for developers

---

## 🛠 Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Frontend   | React 19, Vite        |
| Styling    | Tailwind CSS, PostCSS |
| Router     | React Router v6       |
| HTTP       | Axios                 |
| Video      | ReactPlayer           |
| Linting    | ESLint                |
| Build tool | Vite                  |

Dev dependencies include Tailwind, PostCSS, ESLint plugins, and types for React.

---

## 📥 Getting Started

1. **Clone the repository** and navigate to the frontend directory:
   ```bash
   git clone https://github.com/EkeHanson/video-search.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Copy the environment template** and update as needed:
   ```bash
   cp .env.example .env
   # set VITE_API_URL to your backend endpoint (default http://localhost:8000/api/v1)
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

> For full installation and development instructions, please read `GETTING_STARTED.md`.

---

## 🏗 Development Workflow

- Start server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

Use VS Code with Tailwind IntelliSense and ESLint extensions to maximize productivity. Refer to `COMPONENT_GUIDE.md` when adding or modifying components.

---

## 🧩 Features

- **Prompt input** with quality and voice selectors
- **Real‑time generation status** with progress badge
- **Video playback** and step‑by‑step breakdown
- **Download/share** generated demos
- **History page** with sorting, pagination, deletion
- **Free‑tier credit counter** (3 demos/month)
- Responsive layout for mobile, tablet, and desktop
- Error boundaries and loading states throughout

Additional capabilities such as authentication, subscriptions, and analytics are scaffolded but require backend support.

---

## 🔗 API Integration

Frontend consumes the following backend routes (see plan.md Appendix A):

```http
POST /api/v1/generate          # start a demo
GET  /api/v1/demo/{id}         # retrieve status/details
GET  /api/v1/history           # list user demos
GET  /api/v1/demo/{id}/download
DELETE /api/v1/demo/{id}
POST /api/v1/demo/{id}/share
GET  /api/v1/user/credits
```

All requests are made through `src/services/api.js`, which injects a JWT from `localStorage` if available.

---

## 🎨 Styling

Tailwind CSS is configured in `tailwind.config.js` with custom colors and utility classes. Global styles and animations (fade‑in, slide‑up, spinner) live in `src/App.css`.

Run `npm run build` to purge unused classes and optimize sizing for production.

---

## 📝 Documentation

This frontend is thoroughly documented:

- **GETTING_STARTED.md** – quick start & environment setup
- **COMPONENT_GUIDE.md** – props, usage, and design notes for every component
- **BUILD_SUMMARY.md** – overview of the completed build and architecture
- **QUICK_REFERENCE.md** – command cheat sheet and common fixes

Feel free to browse or contribute to these docs as the project evolves.

---

## 📦 Deployment

The frontend can be deployed to any static hosting service (Vercel, Netlify, Surfer, etc.). Use the build output from `npm run build`.

### Example with Vercel

```bash
npm i -g vercel
vercel --prod
```

Be sure to set `VITE_API_URL` in the deployment environment settings.

---

## 🤝 Contributing

1. Fork the repo and create a branch: `feature/my-feature`
2. Make changes, run `npm run lint` and test locally
3. Build and preview: `npm run build && npm run preview`
4. Submit a pull request with a clear description

Refer to the main project `plan.md` for broader roadmap items and priorities.

---

## 📄 License

This codebase is proprietary. See main project documentation or contact the development team for license details.

---

## 📌 Notes

This README supplements, rather than replaces, `plan.md`; read that document for vision, system architecture, and long‑term roadmap. Frontend code should always align with the backend API described there.

Happy coding! 🎉
