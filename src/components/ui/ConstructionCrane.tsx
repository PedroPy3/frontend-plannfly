import { useState, useEffect } from 'react';

const ConstructionCrane = () => {
  const [hookPosition, setHookPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setHookPosition(prev => {
        const newPos = prev + (direction * 2);
        if (newPos >= 100) {
          setDirection(-1);
          return 100;
        }
        if (newPos <= 0) {
          setDirection(1);
          return 0;
        }
        return newPos;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="absolute top-10 right-10">
      {/* Crane base */}
      <div className="w-4 h-32 bg-blue-600 border-2 border-blue-700"></div>
      
      {/* Crane arm */}
      <div className="w-24 h-3 bg-purple-600 border-2 border-purple-700 absolute top-8 -right-20 origin-left rotate-12"></div>
      
      {/* Hook cable */}
      <div 
        className="w-0.5 bg-blue-800 absolute top-12 transition-all duration-300 ease-in-out"
        style={{ 
          right: `${20 - hookPosition * 0.2}px`,
          height: `${60 + hookPosition * 0.3}px`
        }}
      ></div>
      
      {/* Hook */}
      <div 
        className="w-3 h-3 bg-purple-500 rounded-full absolute transition-all duration-300 ease-in-out animate-pulse"
        style={{ 
          right: `${18 - hookPosition * 0.2}px`,
          top: `${70 + hookPosition * 0.3}px`
        }}
      ></div>
    </div>
  );
};

export default ConstructionCrane;