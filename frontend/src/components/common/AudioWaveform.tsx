import React, { useEffect, useState } from 'react';

interface AudioWaveformProps {
  isAnalyzing?: boolean;
  barCount?: number;
  height?: number;
  color?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isAnalyzing = true,
  barCount = 28,
  height = 56,
  color = '#4F8CFF'
}) => {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: barCount }, () => Math.floor(Math.random() * 40) + 20)
  );

  useEffect(() => {
    if (!isAnalyzing) {
      setBars(Array.from({ length: barCount }, () => 20));
      return;
    }

    const interval = setInterval(() => {
      setBars(() =>
        Array.from({ length: barCount }, (_, i) => {
          // Dynamic wave pattern with slight center emphasis
          const centerFactor = 1 - Math.abs(i - barCount / 2) / (barCount / 2) * 0.4;
          const randomJitter = Math.random() * 50 + 15;
          return Math.min(100, Math.max(15, Math.round(randomJitter * centerFactor)));
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isAnalyzing, barCount]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: `${height}px`,
        width: '100%',
        padding: '0 12px',
        boxSizing: 'border-box'
      }}
      aria-label="Simulated Audio Waveform"
    >
      {bars.map((heightPercent, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            maxWidth: '6px',
            minWidth: '3px',
            height: `${heightPercent}%`,
            backgroundColor: isAnalyzing ? color : '#334455',
            borderRadius: '4px',
            transition: 'height 120ms ease, background-color 200ms ease',
            opacity: 0.85
          }}
        />
      ))}
    </div>
  );
};
