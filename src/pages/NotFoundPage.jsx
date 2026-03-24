import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 font-sans selection:bg-teal-100 selection:text-teal-900 border-t border-slate-200">

      <div className="text-center max-w-2xl mx-auto z-10">

        {/* Editorial 404 Treatment */}
        <div className="mb-6">
          <span className="font-serif font-black text-[12rem] leading-none text-slate-200 tracking-tighter" style={{ userSelect: 'none' }}>
            404
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight -mt-16 sm:-mt-20">
          Page not found
        </h1>

        <p className="text-lg text-slate-500 font-medium mb-12 max-w-md mx-auto">
          The story you are looking for may have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/home"
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 shadow-sm transition-colors text-sm w-full sm:w-auto justify-center"
          >
            <Home size={18} /> Return Home
          </Link>

          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-bold border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors text-sm w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>

      </div>

    </div>
  );
};

export default NotFoundPage;
