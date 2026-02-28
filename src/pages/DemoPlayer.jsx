import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { demoAPI } from '../services/api';

export default function DemoPlayer() {
  const { demoId } = useParams();
  const navigate = useNavigate();
  const [demo, setDemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchDemo = async () => {
      try {
        setLoading(true);
        const response = await demoAPI.getDemo(demoId);
        setDemo(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load demo');
      } finally {
        setLoading(false);
      }
    };

    // Poll for demo status if still processing
    const interval = setInterval(() => {
      fetchDemo();
    }, 3000); // Check every 3 seconds

    fetchDemo();

    return () => clearInterval(interval);
  }, [demoId]);

  const handleDownload = async () => {
    try {
      const response = await demoAPI.downloadDemo(demoId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `demo-${demoId}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (err) {
      setError('Failed to download demo');
    }
  };

  const handleShare = async () => {
    try {
      const response = await demoAPI.shareDemo(demoId);
      const shareUrl = response.data.share_url;
      
      if (navigator.share) {
        navigator.share({
          title: 'AI Demo Engine',
          text: 'Check out this demo video I generated!',
          url: shareUrl,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        alert('Share link copied to clipboard!');
      }
    } catch (err) {
      setError('Failed to share demo');
    }
  };

  if (loading && !demo) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" style={{width: '40px', height: '40px', borderWidth: '4px'}}></div>
          <p className="text-gray-700 font-medium">Generating your demo...</p>
          <p className="text-gray-500 text-sm mt-2">This usually takes 2-5 minutes</p>
        </div>
      </div>
    );
  }

  if (error && !demo) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Video Player Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Status Badge */}
            {demo && (
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  demo.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : demo.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {demo.status === 'completed' 
                    ? '✓ Completed' 
                    : demo.status === 'failed'
                    ? '✗ Failed'
                    : `⏳ ${demo.progress_percent || 0}% Complete`}
                </span>
              </div>
            )}

            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-6 aspect-video">
              {demo?.video_url ? (
                <ReactPlayer
                  url={demo.video_url}
                  playing={playing}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  controls
                  light={demo.thumbnail_url}
                  width="100%"
                  height="100%"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400">Video processing...</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {demo?.status === 'completed' && (
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleDownload}
                  className="flex-1 min-w-[200px] bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 min-w-[200px] bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.589 12.938 10 12.502 10 12c0-.502-.411-.938-1.316-1.342m0 2.684a3 3 0 110-2.684m9.532-4.974a.75.75 0 00-1.25-.75A6.75 6.75 0 1015 12a.75.75 0 001.5 0 5.25 5.25 0 10-9.27 3.694.75.75 0 11.98.98A6.75 6.75 0 1015 12z" />
                  </svg>
                  Share
                </button>
              </div>
            )}
          </div>

          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Steps</h2>
              
              {demo?.steps && demo.steps.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {demo.steps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeStep === idx
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <p className="font-semibold">Step {step.step_number}</p>
                      <p className="text-sm mt-1 line-clamp-2">{step.title}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Steps not yet generated...</p>
              )}

              {/* Video Info */}
              {demo && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{demo.duration ? `${demo.duration}s` : 'Calculating...'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">File Size</p>
                    <p className="font-semibold text-gray-900">{demo.file_size ? `${(demo.file_size / 1024 / 1024).toFixed(2)} MB` : 'Calculating...'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step Details */}
        {demo?.steps && demo.steps[activeStep] && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">{demo.steps[activeStep].title}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{demo.steps[activeStep].description}</p>
              
              {/* Step Media */}
              {demo.steps[activeStep].media && (
                <div className="mt-4">
                  <img
                    src={demo.steps[activeStep].media}
                    alt={`Step ${demo.steps[activeStep].step_number}`}
                    className="rounded-lg max-h-96 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
