import { useEffect, useState } from 'react';

const FloatingNumbers = () => {
  const [numbers, setNumbers] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        opacity: 1
      };
      
      setNumbers(prev => [...prev.slice(-4), newNumber]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setNumbers(prev => 
        prev.map(num => ({
          ...num,
          y: num.y - 2,
          opacity: num.opacity - 0.02
        })).filter(num => num.opacity > 0)
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {numbers.map(num => (
        <div
          key={num.id}
          className="absolute text-6xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text select-none"
          style={{
            left: num.x,
            top: num.y,
            opacity: num.opacity,
            transform: 'translateX(-50%)'
          }}
        >
          500
        </div>
      ))}
    </div>
  );
};

export default FloatingNumbers;
