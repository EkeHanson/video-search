# 📚 Frontend Component Guide

## Overview

This guide documents all React components, their props, usage examples, and integration points.

## Global Components

### Navbar
**Location:** `src/components/Navbar.jsx`

Navigation bar at the top of every page with responsive mobile menu.

**Features:**
- Logo/brand link
- Navigation links (Home, History)
- Sign In button
- Mobile hamburger menu
- Responsive design

**Example Usage:**
```jsx
import Navbar from './components/Navbar';

<Navbar />
```

**Props:** None

---

### Footer
**Location:** `src/components/Footer.jsx`

Footer with company info, links, and social media.

**Features:**
- Company description
- Quick links (Product, Company, Legal)
- Social media icons
- Copyright year (auto-updates)
- Responsive grid layout

**Example Usage:**
```jsx
import Footer from './components/Footer';

<Footer />
```

**Props:** None

---

### ErrorBoundary
**Location:** `src/components/ErrorBoundary.jsx`

Catches React errors and displays a user-friendly error page.

**Features:**
- Catches all React errors in child components
- Shows error details in development mode
- Provides recovery buttons (Try Again, Go Home)
- Logs errors to console

**Example Usage:**
```jsx
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**Props:**
- `children` (ReactNode) - Components to wrap with error protection

---

## Page Components

### Home Page
**Location:** `src/pages/Home.jsx`

Main landing page where users input queries to generate demos.

**Features:**
- Query textarea with placeholder examples
- Quality selector (SD, HD, Full HD)
- Voice selector (multiple languages/accents)
- Submit button with loading state
- Credits display
- Feature highlights section
- Error handling

**State:**
```javascript
query = "";              // User input
quality = "hd";          // Selected quality
voice = "default";       // Selected voice
loading = false;         // Loading state
error = "";              // Error message
submittedCount = 3;      // Remaining demos for free tier
```

**Example Usage:**
```jsx
import Home from './pages/Home';

<Home />
```

**Integration:**
- Calls `demoAPI.generateDemo()` to submit query
- Navigates to `/demo/{demoId}` after submission
- Checks free tier limits before allowing submission

---

### DemoPlayer Page
**Location:** `src/pages/DemoPlayer.jsx`

Displays generated demo video with playback controls and step information.

**Features:**
- Real-time video player with ReactPlayer
- Progress tracking (status badge updates)
- Steps sidebar with clickable steps
- Step details panel with descriptions and images
- Download video button
- Share button with native share or clipboard
- Auto-polls backend every 3 seconds
- Responsive grid layout

**State:**
```javascript
demo = null;             // Demo data from API
loading = true;          // Initial load state
error = "";              // Error messages
activeStep = 0;          // Currently displayed step
playing = false;         // Video play state
```

**URL Params:**
- `demoId` - UUID of the demo to display

**Example Usage:**
```jsx
import DemoPlayer from './pages/DemoPlayer';

<Route path="/demo/:demoId" element={<DemoPlayer />} />
```

**API Data Structure Expected:**
```javascript
{
  id: "uuid",
  prompt: "...",
  status: "completed|processing|failed",
  progress_percent: 75,
  video_url: "https://...",
  thumbnail_url: "https://...",
  duration: 120,
  file_size: 52428800,
  steps: [
    {
      step_number: 1,
      title: "Prepare Ingredients",
      description: "...",
      media: "https://..."
    }
  ],
  created_at: "2024-01-01T00:00:00Z"
}
```

---

### History Page
**Location:** `src/pages/History.jsx`

Display user's previous demos with sorting, filtering, and management options.

**Features:**
- Grid view of all demos
- Sorting (recent, oldest, duration)
- Pagination with previous/next buttons
- Demo status indicators
- Thumbnail previews
- Delete functionality
- Demo duration and creation date
- Empty state with call-to-action

**State:**
```javascript
demos = [];              // Array of demo objects
loading = true;          // Loading state
error = "";              // Error messages
page = 1;                // Current page
totalPages = 1;          // Total pages available
sortBy = "recent";       // Current sort option
```

**Sorting Options:**
- `recent` - Newest first (default)
- `oldest` - Oldest first
- `duration` - Longest first

**Example Usage:**
```jsx
import History from './pages/History';

<Route path="/history" element={<History />} />
```

---

## Custom Hooks

**Location:** `src/hooks/index.js`

### useDebounce(value, delay)
Debounces a value to avoid rapid updates.

```javascript
const debouncedQuery = useDebounce(query, 500);
// debouncedQuery only updates 500ms after query changes
```

**Parameters:**
- `value` (any) - Value to debounce
- `delay` (number, default 500) - Debounce delay in ms

**Returns:** Debounced value

---

### useAsync(asyncFunction, immediate)
Handles async operations with loading/error states.

```javascript
const { execute, status, data, error } = useAsync(
  async () => {
    return await demoAPI.getHistory();
  },
  true // Run immediately on mount
);
```

**Parameters:**
- `asyncFunction` (function) - Async function to execute
- `immediate` (boolean, default true) - Execute on component mount

**Returns:**
```javascript
{
  execute: () => Promise,  // Manual execution function
  status: string,          // 'idle' | 'pending' | 'success' | 'error'
  data: any,               // Result data
  error: Error             // Error if failed
}
```

---

### useLocalStorage(key, initialValue)
Persists state to localStorage.

```javascript
const [tema, setThema] = useLocalStorage('user_theme', 'light');
// Automatically syncs with localStorage
```

**Parameters:**
- `key` (string) - localStorage key
- `initialValue` (any) - Initial value if key doesn't exist

**Returns:** [value, setValue] like useState

---

### usePrevious(value)
Tracks previous value of a prop or state.

```javascript
const prevCount = usePrevious(count);
// prevCount holds the previous count value
```

**Parameters:**
- `value` (any) - Value to track

**Returns:** Previous value

---

## Services

### API Service
**Location:** `src/services/api.js`

Centralized API client for all backend communication.

#### Demo API

**generateDemo(prompt, options)**
```javascript
const response = await demoAPI.generateDemo(
  "Teach me how to cook soup",
  { quality: "hd", voice: "female-nigerian" }
);
// Returns: { demo_id: "uuid", status: "processing" }
```

**getDemo(demoId)**
```javascript
const demo = await demoAPI.getDemo("uuid");
// Returns full demo object with video, steps, etc.
```

**getHistory(page, limit)**
```javascript
const history = await demoAPI.getHistory(1, 10);
// Returns: { demos: [...], total_pages: 5 }
```

**downloadDemo(demoId)**
```javascript
const blob = await demoAPI.downloadDemo("uuid");
// Returns video file as blob
```

**deleteDemo(demoId)**
```javascript
await demoAPI.deleteDemo("uuid");
```

**shareDemo(demoId)**
```javascript
const response = await demoAPI.shareDemo("uuid");
// Returns: { share_url: "..." }
```

**getCredits()**
```javascript
const credits = await demoAPI.getCredits();
// Returns: { remaining: 3, total: 3 }
```

#### Auth API

**register(email, password, name)**
```javascript
const response = await authAPI.register(
  "user@example.com",
  "password123",
  "User Name"
);
// Returns: { token: "...", user: {...} }
```

**login(email, password)**
```javascript
const response = await authAPI.login("user@example.com", "password123");
// Returns: { token: "...", user: {...} }
```

**logout()**
```javascript
await authAPI.logout();
// Clears localStorage and returns resolved promise
```

**getCurrentUser()**
```javascript
const user = await authAPI.getCurrentUser();
// Returns: { id: "...", email: "...", name: "..." }
```

---

## Constants

**Location:** `src/constants.js`

### Quality Options
```javascript
QUALITY_OPTIONS = [
  { value: 'sd', label: 'Standard (480p)' },
  { value: 'hd', label: 'HD (720p)' },
  { value: 'fullhd', label: 'Full HD (1080p)' },
]
```

### Voice Options
```javascript
VOICE_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'female-nigerian', label: 'Female (Nigerian)' },
  { value: 'male-nigerian', label: 'Male (Nigerian)' },
  // ... more options
]
```

### Demo Status
```javascript
DEMO_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
}
```

### Pricing Tiers
```javascript
PRICING = {
  FREE: { demos_per_month: 3, ... },
  PRO: { price: 29, demos_per_month: 50, ... },
  BUSINESS: { price: 199, demos_per_month: 'unlimited', ... },
}

PRICING_NIGERIA = {
  FREE: { ... },
  BASIC: { price: 5000, currency: '₦', ... },
  // ... local pricing
}
```

---

## Styling

### CSS Classes

**Animations (in `App.css`):**
- `.fade-in` - Fade in animation (300ms)
- `.slide-up` - Slide up animation (300ms)
- `.spinner` - Rotating loading spinner

**Tailwind Usage:**
```jsx
// Colors
<div className="text-primary bg-secondary">

// Responsive
<div className="flex flex-col md:flex-row lg:flex-row">

// States
<button className="hover:bg-primary/90 disabled:opacity-50">

// Spacing
<div className="p-4 md:p-8 gap-4">
```

### Color Palette

| Name | Hex Value | Usage |
|------|-----------|-------|
| primary | #6366f1 | Main brand color |
| secondary | #8b5cf6 | Secondary actions |
| success | #10b981 | Success states |
| danger | #ef4444 | Error/delete actions |
| warning | #f59e0b | Warnings |

---

## Component Relationships

```
App
├── ErrorBoundary
│   └── Router
│       ├── Navbar
│       ├── Main (Routes)
│       │   ├── Home
│       │   ├── DemoPlayer
│       │   └── History
│       └── Footer
```

---

## Best Practices

### 1. Creating New Components
```jsx
// Use function components with hooks
export default function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(null);
  
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### 2. Error Handling
```jsx
try {
  const result = await demoAPI.generateDemo(query);
  // Handle success
} catch (error) {
  setError(error.response?.data?.message || 'Failed');
}
```

### 3. Loading States
```jsx
{loading ? (
  <div className="spinner"></div>
) : (
  <div>Content</div>
)}
```

### 4. Responsive Design
```jsx
// Mobile first approach
<div className="p-4 md:p-8 lg:p-12">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 5. Accessibility
```jsx
<button
  aria-label="Delete demo"
  onClick={handleDelete}
  className="..."
>
  Delete
</button>
```

---

## Testing Components

### Mounting a Component
```jsx
import { render, screen } from '@testing-library/react';
import Home from './pages/Home';

test('renders home page', () => {
  render(<Home />);
  expect(screen.getByText(/What would you like to learn/i)).toBeInTheDocument();
});
```

---

## Performance Tips

1. **Use custom hooks** for repeated logic
2. **Memoize callbacks** with useCallback in DemoPlayer
3. **Lazy load routes** with React.lazy()
4. **Optimize images** with proper sizing
5. **Use React DevTools Profiler** to find bottlenecks

---

## Debugging

### Common Issues

**"Cannot read property of undefined"**
- Check API response structure
- Verify data exists before rendering
- Use optional chaining: `demo?.video_url`

**"Route not working"**
- Check RouteProvider wraps Routes
- Verify path prop matches component location
- Check typos in Link `to` prop

**"Tailwind styles not showing"**
- Clear build: `npm run build`
- Restart dev server
- Check tailwind.config.js includes correct paths

---

## Future Components to Add

- [ ] Auth pages (Login, Register, Profile)
- [ ] Settings page
- [ ] Premium upgrade modal
- [ ] Demo search/filter
- [ ] User dashboard
- [ ] Analytics view
- [ ] Notification system
- [ ] Comment section
- [ ] Rating system

---

Last Updated: 2024
