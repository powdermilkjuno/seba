"use client";

import React, { useEffect, useState } from 'react';
import Leaf from './leaf';

const MultiLeaf: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false); // Add mounted state
  const [leafStyles, setLeafStyles] = useState<{ left: string; animationDelay: string }[]>([]);
  const leafCount = 10;

  const randomizeLeafPositions = () => {
    const newLeafStyles = Array.from({ length: leafCount }).map(() => {
      const windowWidth = window.innerWidth;

      const randomLeft = Math.random() * (windowWidth - 50);

      const randomAnimationDelay = `${Math.random() * 5}s`;

      const opacity = randomAnimationDelay > 0 ? 1 : 0;

      return {
        left: `${randomLeft}px`,
        opacity: opacity,
        animationDelay: randomAnimationDelay,
        zIndex: -1,
      };
    });
    setLeafStyles(newLeafStyles);
  };

  useEffect(() => {
    setIsMounted(true);
    randomizeLeafPositions();
    const interval = setInterval(randomizeLeafPositions, 10000);
    return () => {
      clearInterval(interval);
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="MultiLeaf">
      {leafStyles.map((style, index) => (
        <Leaf key={index} style={style} />
      ))}
    </div>
  );
};

export default MultiLeaf;
