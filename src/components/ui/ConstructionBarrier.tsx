const ConstructionBarrier = () => {
  return (
    <div className="flex gap-2 absolute bottom-0 left-1/4 right-1/4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
          {/* Cone */}
          <div className="w-8 h-12 bg-gradient-to-t from-blue-600 to-blue-400 clip-triangle relative">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white"></div>
          </div>
          {/* Base */}
          <div className="w-10 h-2 bg-purple-800 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ConstructionBarrier;