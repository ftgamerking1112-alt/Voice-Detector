import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert, Flag, ChevronRight } from 'lucide-react';
import { ScanResult } from '../../types';

interface HistoryCardProps {
  scan: ScanResult;
  index: number;
  onClick: () => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ scan, index, onClick }) => {
  const getStatusDetails = () => {
    switch (scan.resultState) {
      case 'human':
        return {
          label: 'Likely Human',
          color: '#35C98A',
          icon: <CheckCircle2 size={16} color="#35C98A" />,
          badgeClass: 'badge-human'
        };
      case 'suspicious':
        return {
          label: 'Suspicious Voice',
          color: '#F5B942',
          icon: <AlertTriangle size={16} color="#F5B942" />,
          badgeClass: 'badge-suspicious'
        };
      case 'ai':
      default:
        return {
          label: 'Likely AI-Generated',
          color: '#FF5C6C',
          icon: <ShieldAlert size={16} color="#FF5C6C" />,
          badgeClass: 'badge-ai'
        };
    }
  };

  const status = getStatusDetails();
  const scanNumberStr = `Scan ${String(index + 1).padStart(2, '0')}`;

  return (
    <div
      onClick={onClick}
      className="vg-card vg-card-interactive"
      style={{
        padding: '14px 16px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        userSelect: 'none'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>
            {scanNumberStr}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {scan.reported && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 92, 108, 0.15)',
                  color: '#FF5C6C',
                  border: '1px solid #FF5C6C'
                }}
              >
                <Flag size={10} /> Reported
              </span>
            )}
            <span className={`status-badge ${status.badgeClass}`} style={{ padding: '2px 8px' }}>
              {status.icon}
              <span>{status.label}</span>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#F1F5F9' }}>
              Estimated AI Probability: <span style={{ color: status.color, fontWeight: 600 }}>{scan.aiProbability}%</span>
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>
              {scan.durationSec}s · {scan.timestamp}
            </div>
          </div>
          <ChevronRight size={18} color="#94A3B8" />
        </div>
      </div>
    </div>
  );
};
