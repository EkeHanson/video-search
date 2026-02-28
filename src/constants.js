// API Configuration
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Quality Options
export const QUALITY_OPTIONS = [
  { value: 'sd', label: 'Standard (480p)' },
  { value: 'hd', label: 'HD (720p)' },
  { value: 'fullhd', label: 'Full HD (1080p)' },
];

// Voice Options
export const VOICE_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'female-nigerian', label: 'Female (Nigerian)' },
  { value: 'male-nigerian', label: 'Male (Nigerian)' },
  { value: 'female-british', label: 'Female (British)' },
  { value: 'male-british', label: 'Male (British)' },
];

// Language Options
export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'yo', label: 'Yoruba' },
  { value: 'ig', label: 'Igbo' },
  { value: 'ha', label: 'Hausa' },
];

// Demo Status
export const DEMO_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// Pagination
export const ITEMS_PER_PAGE = 10;
export const DEFAULT_PAGE = 1;

// Polling
export const POLL_INTERVAL = 3000; // 3 seconds
export const DEMO_GENERATION_TIMEOUT = 600000; // 10 minutes

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_SHARING: process.env.VITE_ENABLE_SHARING === 'true',
  ENABLE_SUBSCRIPTIONS: process.env.VITE_ENABLE_SUBSCRIPTIONS === 'true',
};

// Pricing
export const PRICING = {
  FREE: {
    name: 'Free',
    demos_per_month: 3,
    quality: 'hd',
    features: ['Basic quality', 'Standard voice', 'Community support'],
  },
  PRO: {
    name: 'Pro',
    price: 29,
    demos_per_month: 50,
    quality: 'fullhd',
    features: ['HD quality', 'Premium voices', 'Priority support', 'Download MP4', 'No watermark'],
  },
  BUSINESS: {
    name: 'Business',
    price: 199,
    demos_per_month: 'unlimited',
    quality: '4k',
    features: ['4K quality', 'Custom branding', 'API access', 'Team accounts', 'SLA guarantee'],
  },
};

export const PRICING_NIGERIA = {
  FREE: {
    name: 'Free',
    currency: '₦',
  },
  BASIC: {
    name: 'Basic',
    price: 5000,
    currency: '₦',
    demos_per_month: 10,
  },
  PRO: {
    name: 'Pro',
    price: 15000,
    currency: '₦',
    demos_per_month: 50,
  },
  BUSINESS: {
    name: 'Business',
    price: 50000,
    currency: '₦',
    demos_per_month: 'unlimited',
  },
};

// Navigation Links
export const NAVIGATION = [
  { path: '/', label: 'Home' },
  { path: '/history', label: 'History' },
];

// Toast Messages
export const MESSAGES = {
  SUCCESS: {
    DEMO_CREATED: 'Demo generation started!',
    DEMO_DELETED: 'Demo deleted successfully',
    COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
  },
  ERROR: {
    FAILED_TO_LOAD_DEMO: 'Failed to load demo',
    FAILED_TO_DELETE_DEMO: 'Failed to delete demo',
    FAILED_TO_SHARE_DEMO: 'Failed to share demo',
    API_ERROR: 'An error occurred. Please try again.',
  },
};

// Demo Duration Thresholds
export const DEMO_DURATION = {
  SHORT: 60,      // < 1 minute
  MEDIUM: 300,    // < 5 minutes
  LONG: 900,      // < 15 minutes
};

// File Size Limits
export const FILE_SIZE = {
  MAX_UPLOAD_MB: 100,
  MAX_VIDEO_MB: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  RECENT_QUERIES: 'recent_queries',
};

// Animation Timings
export const ANIMATION_DURATIONS = {
  FADE: 300,
  SLIDE: 300,
  SPIN: 1000,
};
