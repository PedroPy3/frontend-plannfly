import { useEffect, useState } from 'react';

interface WalkingRobotProps {
  direction?: 'left' | 'right';
  speed?: number;
  delay?: number;
}

const WalkingRobot = ({ direction = 'right', speed = 3, delay = 0 }: WalkingRobotProps) => {
  const [position, setPosition] = useState(direction === 'right' ? -100 : window.innerWidth + 100);
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWalking(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isWalking) return;

    const interval = setInterval(() => {
      setPosition(prev => {
        const newPos = direction === 'right' ? prev + speed : prev - speed;
        
        // Reset position when robot goes off screen
        if (direction === 'right' && newPos > window.innerWidth + 100) {
          return -100;
        }
        if (direction === 'left' && newPos < -100) {
          return window.innerWidth + 100;
        }
        
        return newPos;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isWalking, direction, speed]);

  // Robot colors based on delay to make them different
  const robotColors = [
    { body: 'bg-blue-500', head: 'bg-blue-400', arms: 'bg-blue-600', legs: 'bg-blue-700' },
    { body: 'bg-purple-500', head: 'bg-purple-400', arms: 'bg-purple-600', legs: 'bg-purple-700' },
    { body: 'bg-indigo-500', head: 'bg-indigo-400', arms: 'bg-indigo-600', legs: 'bg-indigo-700' },
  ];
  
  const colorIndex = delay % robotColors.length;
  const colors = robotColors[colorIndex];

  return (
    <div 
      className="absolute bottom-20 transition-all duration-75 ease-linear"
      style={{ 
        left: `${position}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
      }}
    >
      <div className="relative animate-bounce">
        {/* Robot body */}
        <div className={`w-12 h-16 ${colors.body} rounded-lg border-2 border-blue-600 relative`}>
          {/* Robot head */}
          <div className={`w-8 h-8 ${colors.head} rounded-full border-2 border-blue-500 absolute -top-6 left-2`}>
            {/* Eyes */}
            <div className="flex gap-1 justify-center mt-2">
              <div className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Robot arms */}
          <div className={`w-2 h-8 ${colors.arms} rounded-full absolute -left-3 top-2 animate-pulse`}></div>
          <div className={`w-2 h-8 ${colors.arms} rounded-full absolute -right-3 top-2 animate-pulse`}></div>
          
          {/* Robot legs */}
          <div className={`w-2 h-6 ${colors.legs} rounded-full absolute -bottom-6 left-2`}></div>
          <div className={`w-2 h-6 ${colors.legs} rounded-full absolute -bottom-6 right-2`}></div>
        </div>
      </div>
    </div>
  );
};

export default WalkingRobot;