import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-1 sm:gap-2 text-lg sm:text-2xl font-bold text-primary"
          >
            <span className="bg-gradient-to-r from-primary to-secondary text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-lg">
              AI
            </span>
            <span className="hidden sm:inline text-sm sm:text-base">Demo Engine</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm lg:text-base"
            >
              Home
            </Link>
            <Link 
              to="/history" 
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm lg:text-base"
            >
              History
            </Link>
            <button className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-xs sm:text-sm">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-3 sm:pb-4 space-y-1 sm:space-y-2">
            <Link 
              to="/" 
              className="block px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/history" 
              className="block px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
              onClick={() => setIsOpen(false)}
            >
              History
            </Link>
            <button className="w-full bg-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
