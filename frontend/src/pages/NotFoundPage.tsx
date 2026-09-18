import React from 'react';
import { Home } from 'lucide-react';

/**
 * 404 Not Found Page
 */
export const NotFoundPage: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6">
      <div className="text-9xl font-black text-slate-200 select-none">404</div>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">Page Not Found</h1>
      <p className="text-slate-500 mt-4 max-w-md text-sm sm:text-base font-medium leading-relaxed">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>
      <button
        onClick={onGoHome}
        className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/30 active:scale-[0.98]"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </button>
    </div>
  );
};
