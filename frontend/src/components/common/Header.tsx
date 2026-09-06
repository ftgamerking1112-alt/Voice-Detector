import React from 'react';
import { Shield, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightElement
}) => {
  const { setSubScreen } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setSubScreen(null);
    }
  };

  return (
    <header
      style={{
        padding: '16px 18px 12px 18px',
        backgroundColor: '#182532',
        borderBottom: '1px solid #334455',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        flexShrink: 0
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {showBack ? (
          <button
            onClick={handleBack}
            aria-label="Go back"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '6px',
              marginLeft: '-6px',
              borderRadius: '8px'
            }}
          >
            <ChevronLeft size={22} color="#4F8CFF" />
          </button>
        ) : (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#202F3D',
              border: '1px solid #334455',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Shield size={18} color="#4F8CFF" />
          </div>
        )}

        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, marginTop: '2px' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightElement ? (
          rightElement
        ) : (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(79, 140, 255, 0.12)',
              border: '1px solid #334455',
              fontSize: '10px',
              color: '#4F8CFF',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Simulated
          </div>
        )}
      </div>
    </header>
  );
};
