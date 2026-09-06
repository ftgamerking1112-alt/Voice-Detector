import React from 'react';

interface StatusRingProps {
  size?: number;
  strokeWidth?: number;
  percentage?: number;
  color?: string;
  pulse?: boolean;
  children?: React.ReactNode;
}

export const StatusRing: React.FC<StatusRingProps> = ({
  size = 180,
  strokeWidth = 10,
  percentage = 100,
  color = '#4F8CFF',
  pulse = false,
  children
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}
    >
      {/* Optional Outer Pulse Ring */}
      {pulse && (
        <div
          className="animate-pulse-ring"
          style={{
            position: 'absolute',
            width: `${size + 16}px`,
            height: `${size + 16}px`,
            borderRadius: '50%',
            border: `1px solid ${color}`,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* SVG Progress Ring */}
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#182532"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Active Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 250ms ease, stroke 200ms ease'
          }}
        />
      </svg>

      {/* Inner Content */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '12px'
        }}
      >
        {children}
      </div>
    </div>
  );
};
