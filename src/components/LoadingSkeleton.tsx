
import React from 'react';

type LoadingSkeletonProps = {
  title: string;
  description: string;
  statsCount?: number;
  cardsCount?: number;
};

const LoadingSkeleton = ({ 
  title, 
  description, 
  statsCount = 4, 
  cardsCount = 6 
}: LoadingSkeletonProps) => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96 mb-6"></div>
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(statsCount, 4)} gap-6 mb-6`}>
            {[...Array(statsCount)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(cardsCount)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
