import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  highlightColor?: string;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  highlightColor = '#F1F5F9',
  subtitle
}) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#202F3D',
        border: '1px solid #334455',
        borderRadius: '14px',
        padding: '12px 10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 0
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: '#94A3B8',
          marginBottom: '4px',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '20px',
          fontWeight: 600,
          color: highlightColor,
          lineHeight: 1.2
        }}
      >
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};
