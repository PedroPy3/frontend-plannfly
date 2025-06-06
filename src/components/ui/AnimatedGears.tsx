const AnimatedGears = () => {
  return (
    <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
      {/* Large gear */}
      <div className="w-16 h-16 border-4 border-blue-600 rounded-full relative animate-spin">
        <div className="absolute inset-2 border-2 border-blue-500 rounded-full"></div>
        {/* Gear teeth */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-1 bg-blue-600"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-32px)`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Small gear */}
      <div className="w-10 h-10 border-3 border-purple-500 rounded-full relative animate-spin absolute top-12 left-12" style={{ animationDirection: 'reverse' }}>
        <div className="absolute inset-1 border border-purple-400 rounded-full"></div>
        {/* Gear teeth */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-0.5 bg-purple-500"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedGears;