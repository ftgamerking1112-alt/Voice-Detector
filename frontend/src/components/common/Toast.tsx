import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.toLowerCase().includes('submitted') || toast.toLowerCase().includes('created');

  return (
    <div
      style={{
        position: 'absolute',
        top: '68px',
        left: '16px',
        right: '16px',
        backgroundColor: '#182532',
        border: '1px solid #334455',
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        zIndex: 200,
        animation: 'fadeInDown 200ms ease'
      }}
    >
      {isSuccess ? (
        <CheckCircle size={18} color="#35C98A" style={{ flexShrink: 0 }} />
      ) : (
        <Info size={18} color="#4F8CFF" style={{ flexShrink: 0 }} />
      )}
      <span style={{ fontSize: '14px', color: '#F1F5F9', fontWeight: 500 }}>
        {toast}
      </span>
    </div>
  );
};
