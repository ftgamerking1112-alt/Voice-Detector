import React from 'react';
import { ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: {
    text: string;
    color?: string;
  };
  onClick: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  badge,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="vg-card vg-card-interactive"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 16px',
        marginBottom: '12px',
        userSelect: 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#182532',
            border: '1px solid #334455',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4F8CFF',
            flexShrink: 0
          }}
        >
          {icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#F1F5F9',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {title}
            </h2>
            {badge && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: badge.color ? `${badge.color}20` : '#182532',
                  color: badge.color || '#4F8CFF',
                  border: `1px solid ${badge.color || '#334455'}`
                }}
              >
                {badge.text}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: '13px',
              color: '#94A3B8',
              margin: '2px 0 0 0',
              lineHeight: 1.35
            }}
          >
            {description}
          </p>
        </div>
      </div>

      <ChevronRight size={18} color="#94A3B8" style={{ flexShrink: 0 }} />
    </div>
  );
};
