import React, { useRef, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - y) * (maxTilt * 2);

    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 180ms ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

