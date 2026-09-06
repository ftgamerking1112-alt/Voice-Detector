import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface PrototypeDisclaimerProps {
  compact?: boolean;
}

export const PrototypeDisclaimer: React.FC<PrototypeDisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '8px 12px',
          backgroundColor: '#182532',
          border: '1px solid #334455',
          borderRadius: '10px',
          fontSize: '12px',
          color: '#94A3B8',
          textAlign: 'center',
          margin: '12px 0'
        }}
      >
        <Info size={14} color="#4F8CFF" style={{ flexShrink: 0 }} />
        <span>Prototype — Simulated Detection. Estimates are not guaranteed.</span>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#182532',
        border: '1px solid #334455',
        borderRadius: '14px',
        padding: '14px 16px',
        marginTop: '16px',
        marginBottom: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <ShieldCheck size={18} color="#4F8CFF" />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#F1F5F9' }}>
          Your voice analysis stays private.
        </span>
      </div>
      <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
        No audio is uploaded or recorded in this prototype. AI detection is an estimate and may not always be accurate.
      </p>
      <div
        style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #202F3D',
          fontSize: '11px',
          color: '#6C8FFF',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#4F8CFF',
            display: 'inline-block'
          }}
        />
        <span>Prototype — Simulated Detection Mode</span>
      </div>
    </div>
  );
};
