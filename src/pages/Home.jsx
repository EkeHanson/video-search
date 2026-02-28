import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { demoAPI } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [quality, setQuality] = useState('hd');
  const [voice, setVoice] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedCount, setSubmittedCount] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentDemos, setRecentDemos] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const queryRef = useRef(null);

  useEffect(() => {
    const fetchRecentDemos = async () => {
      try {
        const response = await demoAPI.getHistory(1, 5);
        setRecentDemos(response.data.demos || []);
      } catch (err) {
        console.error('Failed to load recent demos');
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchRecentDemos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    if (submittedCount <= 0) {
      setError('You have reached your monthly demo limit. Upgrade to continue.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await demoAPI.generateDemo(query, {
        quality,
        voice,
      });

      if (response.data && response.data.demo_id) {
        setSubmittedCount(submittedCount - 1);
        setQuery('');
        // Navigate to the demo player page
        navigate(`/demo/${response.data.demo_id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate demo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // called by sidebar button to start fresh
  const handleNewDemo = () => {
    setQuery('');
    setQuality('hd');
    setVoice('default');
    setError('');
    setSidebarOpen(false);
    navigate('/');
    // focus textarea after reset
    setTimeout(() => {
      queryRef.current?.focus();
    }, 10);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-gray-50 lg:bg-white">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-16 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 z-40 lg:z-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto`}>
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={handleNewDemo}
            className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            + New Demo
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Demos</h3>
          {historyLoading ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : recentDemos.length === 0 ? (
            <div className="text-sm text-gray-400">No demos yet</div>
          ) : (
            <div className="space-y-2">
              {recentDemos.map((demo) => (
                <Link
                  key={demo.id}
                  to={`/demo/${demo.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className="block p-3 rounded-lg hover:bg-gray-800 transition-colors text-sm group"
                >
                  <p className="text-gray-100 text-sm group-hover:text-white line-clamp-2 mb-1">{demo.prompt}</p>
                  <p className="text-xs text-gray-500">{new Date(demo.created_at).toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 mt-auto border-t border-gray-700">
          <Link
            to="/history"
            onClick={() => setSidebarOpen(false)}
            className="block w-full px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            View All Demos
          </Link>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden mt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 w-full overflow-y-auto">
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-20 left-4 lg:hidden p-2 text-gray-900 z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="w-full max-w-2xl">
            {/* Hero Section */}
            <div className="text-center mb-6 sm:mb-12 slide-up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                AI Demo Generator
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-1 sm:mb-2">
                Generate instant, personalized video demonstrations for any task
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Just describe what you want to learn, and our AI creates a step-by-step video guide
              </p>
            </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 fade-in w-full">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Query Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                What would you like to learn?
              </label>
              <textarea
                ref={queryRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Teach me how to cook Egusi soup with ₦5000 in Lagos'"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                rows="3"
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                Be as specific as possible for better results
              </p>
            </div>

            {/* Quality & Voice Selection */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                  Video Quality
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm"
                >
                  <option value="sd">Standard (480p)</option>
                  <option value="hd">HD (720p)</option>
                  <option value="fullhd">Full HD (1080p)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                  Voice
                </label>
                <select
                  value={voice}
                  onChange={(e) => setVoice(e.target.value)}
                  className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm"
                >
                  <option value="default">Default</option>
                  <option value="female-nigerian">Female (Nigerian)</option>
                  <option value="male-nigerian">Male (Nigerian)</option>
                  <option value="female-british">Female (British)</option>
                  <option value="male-british">Male (British)</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-4">
                <p className="text-red-800 text-xs sm:text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                'Generate Demo'
              )}
            </button>
          </form>
        </div>

        {/* Credits Info */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 text-center">
          <p className="text-gray-700 text-xs sm:text-sm">
            <span className="font-semibold text-primary">{submittedCount}</span> demos remaining this month
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Free tier includes 3 demos/month. <a href="#" className="text-primary font-medium hover:underline">Upgrade to Pro</a> for unlimited access.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12">
          {[
            {
              icon: '⚡',
              title: 'Instant Generation',
              desc: 'Your demo video is generated in minutes, not hours'
            },
            {
              icon: '🎯',
              title: 'Personalized',
              desc: 'Get demos tailored to your specific needs and context'
            },
            {
              icon: '🌍',
              title: 'Multilingual',
              desc: 'Support for multiple languages and accents'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-2xl sm:text-3xl mb-2">{feature.icon}</p>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
