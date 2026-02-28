import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { demoAPI } from '../services/api';

export default function History() {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await demoAPI.getHistory(page, 10);
        setDemos(response.data.demos || []);
        setTotalPages(response.data.total_pages || 1);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history');
        setDemos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  const handleDelete = async (demoId) => {
    if (window.confirm('Are you sure you want to delete this demo?')) {
      try {
        await demoAPI.deleteDemo(demoId);
        setDemos(demos.filter(d => d.id !== demoId));
      } catch (err) {
        setError('Failed to delete demo');
      }
    }
  };

  const sortedDemos = [...demos].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sortBy === 'duration') {
      return (b.duration || 0) - (a.duration || 0);
    }
    return 0;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'failed':
        return '✗';
      case 'processing':
        return '⏳';
      default:
        return '•';
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Demo History</h1>
          <p className="text-gray-600">View and manage all your generated demonstrations</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{demos.length}</span> demos on this page
          </div>
          
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="spinner" style={{width: '40px', height: '40px', borderWidth: '4px'}}></div>
          </div>
        ) : demos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No demos yet</p>
            <p className="text-gray-400 mb-6">Start by creating your first demo on the home page</p>
            <Link
              to="/"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Create New Demo
            </Link>
          </div>
        ) : (
          <>
            {/* Demos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {sortedDemos.map((demo) => (
                <Link
                  key={demo.id}
                  to={`/demo/${demo.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="relative bg-gray-900 aspect-video overflow-hidden">
                    {demo.thumbnail_url ? (
                      <img
                        src={demo.thumbnail_url}
                        alt={demo.prompt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                        <svg className="w-12 h-12 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 9h12" />
                        </svg>
                      </div>
                    )}
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(demo.status)}`}>
                        {getStatusIcon(demo.status)} {demo.status}
                      </span>
                    </div>
                  </div>

                  {/* Demo Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                      {demo.prompt}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {demo.duration && (
                        <p>Duration: <span className="font-medium">{demo.duration}s</span></p>
                      )}
                      <p>
                        Created: <span className="font-medium">
                          {new Date(demo.created_at).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(demo.id);
                        }}
                        className="flex-1 px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        page === p
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
