import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoAPI } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [quality, setQuality] = useState('hd');
  const [voice, setVoice] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedCount, setSubmittedCount] = useState(3); // Free tier: 3 demos/month

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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-12 slide-up">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Demo Generator
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Generate instant, personalized video demonstrations for any task
          </p>
          <p className="text-gray-500">
            Just describe what you want to learn, and our AI creates a step-by-step video guide
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Query Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                What would you like to learn?
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Teach me how to cook Egusi soup with ₦5000 in Lagos' or 'Show me how to operate a laminating machine'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows="4"
              />
              <p className="text-sm text-gray-500 mt-2">
                Be as specific as possible for better results
              </p>
            </div>

            {/* Quality & Voice Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Video Quality
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="sd">Standard (480p)</option>
                  <option value="hd">HD (720p)</option>
                  <option value="fullhd">Full HD (1080p)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Voice
                </label>
                <select
                  value={voice}
                  onChange={(e) => setVoice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-700">
            <span className="font-semibold text-primary">{submittedCount}</span> demos remaining this month
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Free tier includes 3 demos/month. <a href="#" className="text-primary font-medium hover:underline">Upgrade to Pro</a> for unlimited access.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
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
            <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-3xl mb-2">{feature.icon}</p>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
