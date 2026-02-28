# 🚀 Getting Started with AI Demo Engine Frontend

## Quick Start (5 minutes)

### 1. Prerequisites
- **Node.js 16+** - [Download](https://nodejs.org)
- **npm or yarn** - Usually comes with Node.js
- **Backend API** - Running on `http://localhost:8000`

### 2. Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
```

### 3. Configuration

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Update `.env` with your backend URL:
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SHARING=true
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The app will start at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx       # Top navigation
│   │   ├── Footer.jsx       # Footer component
│   │   └── ErrorBoundary.jsx # Error handling
│   │
│   ├── pages/               # Full page components
│   │   ├── Home.jsx         # Query input home page
│   │   ├── DemoPlayer.jsx   # Video player page
│   │   └── History.jsx      # Demo history page
│   │
│   ├── services/            # API and external services
│   │   └── api.js           # Axios API client
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── index.js         # useDebounce, useAsync, etc.
│   │
│   ├── constants.js         # App configuration constants
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # Global styles
│   ├── index.css            # Tailwind CSS setup
│   └── main.jsx             # Entry point
│
├── public/                  # Static assets
├── index.html               # HTML template
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite build configuration
├── package.json             # Dependencies
└── .env.example             # Environment template
```

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## Key Features Implemented

### ✅ Home Page
- Query input form with placeholder suggestions
- Quality and voice selection dropdowns
- Free tier credit counter
- Feature highlights
- Responsive design for all devices

### ✅ Demo Player
- Real-time video player with controls
- Progress tracking while demo generates
- Steps sidebar with current step highlighting
- Download functionality
- Share button with clipboard fallback
- Step details with descriptions and images
- Polling mechanism (checks every 3 seconds)

### ✅ History Page
- Grid view of all user's demos
- Sorting by recent, oldest, or duration
- Thumbnail previews
- Status indicators (✓ Completed, ⏳ Processing, ✗ Failed)
- Deletion capability
- Pagination support
- Created date and file size info

### ✅ API Integration
- Axios HTTP client with automatic token injection
- All endpoints from plan implemented
- Demo generation
- History retrieval
- Download and sharing

## API Integration Guide

The frontend communicates with a Django backend via REST API. Key endpoints:

### Generate a Demo
```javascript
POST /api/v1/generate
Body: {
  prompt: "Teach me how to cook Egusi soup",
  language: "en",
  quality: "hd",
  voice: "female-nigerian"
}
Response: { demo_id: "uuid", status: "processing" }
```

### Get Demo Details
```javascript
GET /api/v1/demo/{id}
Response: {
  id: "uuid",
  prompt: "...",
  status: "completed|processing|failed",
  progress_percent: 75,
  video_url: "...",
  steps: [...],
  ...
}
```

### Get History
```javascript
GET /api/v1/history?page=1&limit=10
Response: { demos: [...], total_pages: 5 }
```

## Customization Guide

### 1. Change Primary Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: "#your-color", // Change from #6366f1
      secondary: "#other-color",
    }
  }
}
```

### 2. Modify Quality Options

Edit `src/constants.js`:
```javascript
export const QUALITY_OPTIONS = [
  { value: 'sd', label: 'Standard (480p)' },
  // Add more options...
];
```

### 3. Add New Features

Create new components in `src/components/` and new pages in `src/pages/`

Create new API methods in `src/services/api.js`:
```javascript
export const demoAPI = {
  myNewMethod: (param) =>
    api.get(`/endpoint/${param}`),
};
```

## Styling with Tailwind CSS

The project uses Tailwind CSS for styling. Classes are automatically generated:

```jsx
// Responsive design
<div className="bg-white md:bg-gray-100 lg:bg-gray-50">

// Colors
<button className="bg-primary text-white hover:bg-primary/90">

// Spacing
<div className="p-4 md:p-8 lg:p-12">

// Flexbox
<div className="flex items-center justify-between gap-4">

// Animations (defined in App.css)
<div className="fade-in slide-up">
```

## Performance Optimization

### Current Optimizations:
- Lazy loading with React Router
- Tailwind CSS purging in production
- Efficient image loading
- API response caching via axios interceptors
- Debounced search inputs using `useDebounce` hook

### Future Optimizations:
- Code splitting for route components
- Image optimization with next/image equivalent
- Service worker for offline support
- Stale-while-revalidate caching strategy

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors connecting to backend
- Ensure backend has CORS enabled
- Check API URL in `.env`
- Verify backend is running on correct port

### Tailwind CSS not working
```bash
# Rebuild Tailwind
npm run build

# Or clear cache
rm -rf node_modules/.cache
npm run dev
```

### Port 5173 already in use
```bash
# Use different port
npm run dev -- --port 3000
```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** and test locally

3. **Check code quality**
   ```bash
   npm run lint
   ```

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

5. **Push and create pull request**

## Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build production files
npm run build

# Drag and drop 'dist' folder to Netlify
```

### Deploy to Traditional Server
```bash
# Build
npm run build

# Upload 'dist' folder to your server
# Configure server to serve dist/index.html for all routes
```

## Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `VITE_API_URL` | Yes | `http://localhost:8000/api/v1` | Backend API URL |
| `VITE_ENABLE_ANALYTICS` | No | `true` | Enable analytics |
| `VITE_ENABLE_SHARING` | No | `true` | Enable sharing features |

## Common Tasks

### Add a new page
1. Create `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx`

### Create a custom hook
1. Add to `src/hooks/index.js`
2. Export from `src/hooks/index.js`
3. Import and use in components

### Make API calls
```javascript
import { demoAPI } from '../services/api';

// In your component
const response = await demoAPI.generateDemo(query);
```

## Performance Metrics

Target metrics to monitor:
- Lighthouse Score: > 90
- First Contentful Paint: < 2s
- Time to Interactive: < 3.5s

Check with:
```bash
npm run build
npm run preview
```

Then use Chrome DevTools Lighthouse tab.

## Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## Need Help?

1. Check existing issues in GitHub
2. Review component documentation in code comments
3. Check API documentation in backend
4. Ask in team Slack/Discord

---

Happy coding! 🎉
