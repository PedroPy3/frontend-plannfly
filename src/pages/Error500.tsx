import WalkingRobot from '../components/ui/WalkingRobot';
import ConstructionCrane from '../components/ui/ConstructionCrane';
import AnimatedGears from '../components/ui/AnimatedGears';
import FloatingNumbers from '../components/ui/FloatingNumbers';
import ConstructionBarrier from '../components/ui/ConstructionBarrier';
import { Construction } from 'lucide-react';

const Error500 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 overflow-hidden relative">
      <FloatingNumbers />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <AnimatedGears />
        <ConstructionCrane />
        
        {/* Walking robots */}
        <WalkingRobot direction="right" speed={2} delay={0} />
        <WalkingRobot direction="left" speed={3} delay={2} />
        <WalkingRobot direction="right" speed={1.5} delay={4} />
        
        <ConstructionBarrier />
        
        {/* Floating Construction Tools */}
        <div className="absolute top-1/4 left-1/4 animate-[float_3s_ease-in-out_infinite]">
          <Construction className="text-blue-500 w-8 h-8" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-[float_3s_ease-in-out_infinite] delay-1000">
          <Construction className="text-purple-600 w-6 h-6" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-[float_3s_ease-in-out_infinite] delay-2000">
          <Construction className="text-indigo-500 w-7 h-7" />
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Large 500 number */}
          <div className="text-9xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-8 animate-pulse drop-shadow-lg">
            500
          </div>
          
          {/* Error message */}
          <div className="relative mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-600 animate-bounce drop-shadow-lg">
              Woops! That's something error
            </h1>
            <div className="absolute -top-4 -right-4 animate-[spin_3s_linear_infinite]">
              <Construction className="text-purple-500 w-12 h-12" />
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-700 mb-8 animate-fade-in">
            Our robots are working hard to fix this issue!
          </p>
          
          {/* Construction warning sign */}
          <div className="inline-block bg-gradient-to-r from-blue-200 to-purple-200 border-4 border-blue-400 rounded-lg p-6 mb-8 animate-pulse transform rotate-1">
            <div className="text-2xl font-bold text-blue-800 mb-2">⚠️ UNDER CONSTRUCTION ⚠️</div>
            <div className="text-sm text-purple-700">Internal Server Error - Please try again later</div>
          </div>
          
          {/* Progress Bar Animation */}
          <div className="w-64 mx-auto bg-gray-200 rounded-full h-3 mb-8 animate-[fadeIn_1s_ease-out_1s_both]">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full animate-[progress_3s_ease-in-out_infinite]"></div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              🔄 Try Again
            </button>
            <button 
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
      
      {/* Additional animated elements */}
      <div className="absolute top-1/4 right-1/4 animate-spin">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3 animate-bounce">
        <div className="text-4xl">🔧</div>
      </div>
      
      <div className="absolute top-1/3 left-1/4 animate-pulse">
        <div className="text-3xl">⚙️</div>
      </div>
    </div>
  );
};

export default Error500;