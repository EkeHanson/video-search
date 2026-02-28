# 🗂️ Quick Reference Card

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Environment Variables

```bash
# .env file
VITE_API_URL=http://localhost:8000/api/v1
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SHARING=true
```

## 📦 NPM Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality with ESLint |

## 🗂️ Project Structure

```
src/
├── pages/              # Full page components
├── components/         # Reusable components
├── services/           # API calls
├── hooks/              # Custom React hooks
├── App.jsx             # Main component
└── constants.js        # Configuration
```

## 🎯 Key Endpoints (API)

```javascript
// Generate demo
POST /api/v1/generate
{ prompt, language, quality, voice }

// Get demo
GET /api/v1/demo/{id}

// Get history
GET /api/v1/history?page=1&limit=10

// Download video
GET /api/v1/demo/{id}/download

// Delete demo
DELETE /api/v1/demo/{id}

// Share demo
POST /api/v1/demo/{id}/share
```

## 📱 Page Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Query input page |
| `/demo/:id` | DemoPlayer | Video player page |
| `/history` | History | Demo history page |

## 🎨 Tailwind CSS Classes

```jsx
// Colors
text-primary, bg-primary, hover:bg-primary/90

// Responsive
sm: small, md: medium, lg: large

// Spacing
p-4, gap-4, mb-8

// Flexbox
flex, items-center, justify-between

// Grid
grid, grid-cols-1, md:grid-cols-2
```

## 🪝 Custom Hooks

```javascript
// Import hooks
import { useDebounce, useAsync, useLocalStorage } from '../hooks';

// Use debounce
const debouncedQuery = useDebounce(query, 500);

// Use async
const { execute, status, data, error } = useAsync(fetchFn);

// Use local storage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

## 🔌 API Service Usage

```javascript
import { demoAPI, authAPI } from '../services/api';

// Generate demo
const response = await demoAPI.generateDemo(prompt, options);

// Get demo details
const demo = await demoAPI.getDemo(demoId);

// Get history
const history = await demoAPI.getHistory(page, limit);

// Download
const blob = await demoAPI.downloadDemo(demoId);

// Delete
await demoAPI.deleteDemo(demoId);
```

## 🚀 Deployment Checklist

- [ ] Build: `npm run build`
- [ ] Test build: `npm run preview`
- [ ] Check env variables
- [ ] Update API URL in `.env`
- [ ] Run linter: `npm run lint`
- [ ] Deploy to Vercel/Netlify/server

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| CORS error | Check backend CORS settings |
| Port 5173 in use | `npm run dev -- --port 3000` |
| Tailwind not working | Rebuild: `npm run build` |
| Module not found | `rm -rf node_modules && npm install` |
| API not responding | Check backend is running and URL is correct |

## 📝 Component Creation Template

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoAPI } from '../services/api';

export default function MyComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAction = async () => {
    try {
      setLoading(true);
      // API call here
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <button onClick={handleAction} disabled={loading}>
        {loading ? 'Loading...' : 'Action'}
      </button>
    </div>
  );
}
```

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `src/services/api.js` | All API calls |
| `src/constants.js` | Configuration |
| `src/hooks/index.js` | Custom hooks |
| `tailwind.config.js` | Tailwind setup |
| `.env.example` | Environment template |
| `GETTING_STARTED.md` | Setup guide |
| `COMPONENT_GUIDE.md` | Components docs |

## 💡 Pro Tips

1. **Use Ctrl+Shift+P** for quick file search in VS Code
2. **React DevTools** - Install browser extension for debugging
3. **Tailwind IntelliSense** - Install VS Code extension
4. **ESLint** - Install VS Code extension for linting
5. **Check mobile** - Use `npm run build && npm run preview`

## 📞 Quick Debugging

```javascript
// Log API response
console.log('Response:', response.data);

// Check state
console.log('State:', { loading, error, data });

// Use React DevTools Profiler
// React DevTools > Profiler tab > Record > Click action
```

## 🎓 Quality Gates Before Push

```bash
# Check code quality
npm run lint

# Build successfully
npm run build

# Preview built version
npm run preview

# All green? Ready to commit!
```

## 📚 Documentation Files

- **GETTING_STARTED.md** - Setup & installation
- **COMPONENT_GUIDE.md** - All components documented
- **FRONTEND_README.md** - Features overview
- **BUILD_SUMMARY.md** - Build completion summary

## 🔗 Useful Links

- React: https://react.dev
- Tailwind: https://tailwindcss.com
- Vite: https://vitejs.dev
- React Router: https://reactrouter.com
- Axios: https://axios-http.com

## ⏱️ Typical Workflow

```bash
# 1. Make changes
# 2. Test locally
npm run dev

# 3. Check quality
npm run lint

# 4. Build
npm run build
npm run preview

# 5. Deploy
# Push to Vercel/Netlify or upload dist/
```

---

**Save this file for quick reference!** 📌
