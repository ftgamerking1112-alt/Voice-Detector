import React, { useEffect } from 'react';
import { Shield, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { setShowSplash } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [setShowSplash]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#101820',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center',
        position: 'relative',
        userSelect: 'none'
      }}
    >
      {/* Centered Shield & Sound-wave Logo */}
      <div style={{ position: 'relative', marginBottom: '28px' }}>
        {/* Subtle Pulsing Ring */}
        <div
          className="animate-pulse-ring"
          style={{
            position: 'absolute',
            top: '-16px',
            left: '-16px',
            right: '-16px',
            bottom: '-16px',
            borderRadius: '50%',
            border: '2px solid rgba(79, 140, 255, 0.4)',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '24px',
            backgroundColor: '#182532',
            border: '1px solid #334455',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Shield size={52} color="#4F8CFF" />
          <Activity
            size={24}
            color="#35C98A"
            style={{
              position: 'absolute',
              bottom: '22px'
            }}
          />
        </div>
      </div>

      {/* App Name */}
      <h1
        style={{
          fontSize: '26px',
          fontWeight: 700,
          color: '#F1F5F9',
          letterSpacing: '-0.5px',
          margin: 0
        }}
      >
        VoiceGuard AI
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: '15px',
          color: '#94A3B8',
          margin: '8px 0 28px 0',
          fontWeight: 400
        }}
      >
        Detect AI. Protect Trust.
      </p>

      {/* Prototype Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '20px',
          backgroundColor: '#182532',
          border: '1px solid #334455',
          fontSize: '12px',
          color: '#6C8FFF',
          fontWeight: 500
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#4F8CFF'
          }}
        />
        <span>Prototype — Simulated Detection</span>
      </div>

      {/* Subtle bottom text */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          fontSize: '11px',
          color: '#64748b'
        }}
      >
        Mobile Security Demonstration
      </div>
    </div>
  );
};
