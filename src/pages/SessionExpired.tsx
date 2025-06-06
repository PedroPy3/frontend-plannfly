import { Clock, LogIn, Shield } from 'lucide-react';

const SessionExpired = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Simple background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20">
          <Clock className="text-blue-500 w-16 h-16" />
        </div>
        <div className="absolute top-40 right-32">
          <Shield className="text-purple-600 w-12 h-12" />
        </div>
        <div className="absolute bottom-32 left-1/4">
          <LogIn className="text-indigo-500 w-14 h-14" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Clock className="text-blue-400 w-10 h-10" />
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Large clock icon */}
          <div className="flex justify-center mb-8">
            <Clock className="w-32 h-32 text-blue-600" />
          </div>
          
          {/* Error message */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
              Session Expired
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your session has timed out for security reasons. Please log in again to continue.
            </p>
          </div>
          
          {/* Simple status box */}
          <div className="bg-white border-l-4 border-purple-500 shadow-lg rounded-r-lg p-6 mb-8 mx-auto max-w-md">
            <div className="flex items-center">
              <Shield className="text-purple-500 w-8 h-8 mr-3" />
              <div className="text-left">
                <div className="font-semibold text-purple-800">Security Timeout</div>
                <div className="text-sm text-gray-600">Please authenticate again</div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Log In Again
            </button>
            <button 
              onClick={() => window.history.back()}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;