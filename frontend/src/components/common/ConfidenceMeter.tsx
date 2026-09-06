import React from 'react';

interface ConfidenceMeterProps {
  humanProb: number;
  aiProb: number;
  showLabels?: boolean;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  humanProb,
  aiProb,
  showLabels = true
}) => {
  // Guarantee sum is 100
  const normalizedAi = Math.max(0, Math.min(100, Math.round(aiProb)));
  const normalizedHuman = humanProb !== undefined ? Math.max(0, Math.min(100, Math.round(humanProb))) : 100 - normalizedAi;

  return (
    <div style={{ width: '100%' }}>
      {showLabels && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '10px'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Human
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#35C98A' }}>
              {normalizedHuman}%
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AI / Synthetic
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#FF5C6C' }}>
              {normalizedAi}%
            </div>
          </div>
        </div>
      )}

      {/* Split Bar Meter */}
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#182532',
          borderRadius: '6px',
          overflow: 'hidden',
          display: 'flex',
          border: '1px solid #334455'
        }}
      >
        <div
          style={{
            width: `${normalizedHuman}%`,
            height: '100%',
            backgroundColor: '#35C98A',
            transition: 'width 200ms ease'
          }}
        />
        <div
          style={{
            width: `${normalizedAi}%`,
            height: '100%',
            backgroundColor: '#FF5C6C',
            transition: 'width 200ms ease'
          }}
        />
      </div>
    </div>
  );
};
