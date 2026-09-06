import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(16, 24, 32, 0.85)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0',
        animation: 'fadeIn 200ms ease'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxHeight: '85%',
          backgroundColor: '#202F3D',
          borderTop: '1px solid #334455',
          borderLeft: '1px solid #334455',
          borderRight: '1px solid #334455',
          borderTopLeftRadius: '22px',
          borderTopRightRadius: '22px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 220ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Handle & Header */}
        <div
          style={{
            padding: '12px 18px 12px 18px',
            borderBottom: '1px solid #334455',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          {/* Top Pill Handle */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '36px',
              height: '4px',
              backgroundColor: '#334455',
              borderRadius: '2px'
            }}
          />

          <h2 style={{ fontSize: '17px', fontWeight: 600, color: '#F1F5F9', margin: '6px 0 0 0' }}>
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              marginTop: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '18px',
            overflowY: 'auto',
            maxHeight: 'calc(85vh - 70px)'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
