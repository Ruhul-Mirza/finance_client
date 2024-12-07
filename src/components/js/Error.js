import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 animate-ping bg-violet-400 rounded-full opacity-20"></div>
              <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-violet-600/20">
                <Ghost className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</p>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for seems to have vanished into thin air.
          </p>

          <div className="space-y-3">
            <Link
              to="/home"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30 transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 px-6 py-3 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>

   
      </div>
    </div>
  );
};

export default Error;