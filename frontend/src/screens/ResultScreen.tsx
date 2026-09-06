import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Info,
  Flag,
  FileText,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusRing } from '../components/common/StatusRing';
import { Modal } from '../components/common/Modal';
import { PrototypeDisclaimer } from '../components/common/PrototypeDisclaimer';
import { ScanResult } from '../types';

interface ResultScreenProps {
  scanOverride?: ScanResult | null;
  isReadOnly?: boolean;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ scanOverride, isReadOnly = false }) => {
  const {
    currentResult,
    selectedHistoryScan,
    setActiveTab,
    setSubScreen,
    reportScan
  } = useApp();

  const scan = scanOverride || selectedHistoryScan || currentResult;
  const [isWhyFlaggedExpanded, setIsWhyFlaggedExpanded] = useState<boolean>(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  if (!scan) {
    return (
      <div className="screen-scroll" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <p style={{ color: '#94A3B8' }}>No scan data found.</p>
        <button
          onClick={() => {
            setActiveTab('scan');
            setSubScreen(null);
          }}
          className="btn-primary"
          style={{ maxWidth: '240px', margin: '20px auto' }}
        >
          Start Voice Scan
        </button>
      </div>
    );
  }

  const getTheme = () => {
    switch (scan.resultState) {
      case 'human':
        return {
          title: 'Likely Human',
          color: '#35C98A',
          bgColor: 'rgba(53, 201, 138, 0.12)',
          icon: <CheckCircle2 size={32} color="#35C98A" />,
          badgeClass: 'badge-human',
          summary: 'Natural speech harmonics and continuous vocal tract resonance detected.'
        };
      case 'suspicious':
        return {
          title: 'Suspicious Voice',
          color: '#F5B942',
          bgColor: 'rgba(245, 185, 66, 0.12)',
          icon: <AlertTriangle size={32} color="#F5B942" />,
          badgeClass: 'badge-suspicious',
          summary: 'Moderate anomalies in frequency distribution and atypical pitch contours.'
        };
      case 'ai':
      default:
        return {
          title: 'Likely AI-Generated',
          color: '#FF5C6C',
          bgColor: 'rgba(255, 92, 108, 0.12)',
          icon: <ShieldAlert size={32} color="#FF5C6C" />,
          badgeClass: 'badge-ai',
          summary: 'High probability of neural voice synthesis or voice cloning characteristics.'
        };
    }
  };

  const theme = getTheme();

  const handleAnalyzeAgain = () => {
    setSubScreen(null);
    setActiveTab('scan');
  };

  const handleReport = () => {
    reportScan(scan.id);
  };

  return (
    <div className="screen-scroll">
      {/* Top Completion Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '16px'
        }}
      >
        <Sparkles size={14} color="#4F8CFF" />
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#94A3B8',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          Voice Analysis Complete
        </span>
      </div>

      {/* Main Result Card */}
      <div
        className="vg-card"
        style={{
          padding: '24px 18px',
          textAlign: 'center',
          marginBottom: '16px',
          border: `1px solid ${theme.color}40`,
          position: 'relative'
        }}
      >
        {/* Reported Badge if applicable */}
        {scan.reported && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 92, 108, 0.15)',
              color: '#FF5C6C',
              border: '1px solid #FF5C6C',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <Flag size={10} /> Reported
          </div>
        )}

        {/* State Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            backgroundColor: '#182532',
            border: `1px solid ${theme.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}
        >
          {theme.icon}
        </div>

        {/* Result Title */}
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#F1F5F9', margin: '0 0 4px 0' }}>
          {theme.title}
        </h2>

        <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 20px 0' }}>
          {theme.summary}
        </p>

        {/* Large Circular Confidence Ring */}
        <div style={{ margin: '8px 0 16px 0' }}>
          <StatusRing
            size={144}
            strokeWidth={9}
            percentage={scan.aiProbability}
            color={theme.color}
          >
            <div style={{ fontSize: '28px', fontWeight: 700, color: theme.color, lineHeight: 1 }}>
              {scan.aiProbability}%
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Estimated AI Prob.
            </div>
          </StatusRing>
        </div>

        {/* Human vs AI Breakdown */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '#182532',
            borderRadius: '12px',
            padding: '10px 14px',
            border: '1px solid #334455'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Human Signal</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#35C98A' }}>
              {scan.humanProbability}%
            </div>
          </div>
          <div style={{ width: '1px', backgroundColor: '#334455' }} />
          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Synthetic Signal</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#FF5C6C' }}>
              {scan.aiProbability}%
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Metadata Card */}
      <div
        className="vg-card"
        style={{
          padding: '14px 16px',
          marginBottom: '14px',
          backgroundColor: '#182532'
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '10px'
          }}
        >
          Analysis Metadata
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Audio Analyzed:</span>
            <span style={{ color: '#F1F5F9', fontWeight: 500 }}>{scan.durationSec} seconds</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Completed:</span>
            <span style={{ color: '#F1F5F9', fontWeight: 500 }}>{scan.timestamp}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94A3B8' }}>Detection Mode:</span>
            <span style={{ color: '#4F8CFF', fontWeight: 500 }}>Simulated Engine</span>
          </div>
        </div>
      </div>

      {/* Expandable "Why was this flagged?" Card */}
      <div
        className="vg-card"
        style={{
          padding: '16px',
          marginBottom: '16px',
          backgroundColor: '#202F3D'
        }}
      >
        <div
          onClick={() => setIsWhyFlaggedExpanded(!isWhyFlaggedExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#4F8CFF" />
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>
              Why was this flagged?
            </h3>
          </div>
          {isWhyFlaggedExpanded ? (
            <ChevronUp size={18} color="#94A3B8" />
          ) : (
            <ChevronDown size={18} color="#94A3B8" />
          )}
        </div>

        {isWhyFlaggedExpanded && (
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #334455' }}>
            <div
              style={{
                fontSize: '11px',
                color: '#6C8FFF',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Simulated Indicators
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scan.indicators.map((ind, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#F1F5F9'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: theme.color,
                      marginTop: '6px',
                      flexShrink: 0
                    }}
                  />
                  <span>{ind}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '12px', fontStyle: 'italic', margin: '12px 0 0 0' }}>
              Simulated indicators demonstrate how a neural classifier reports vocal characteristics without processing real microphone audio.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {!isReadOnly && (
          <button onClick={handleAnalyzeAgain} className="btn-primary">
            <RotateCcw size={18} />
            <span>Analyze Again</span>
          </button>
        )}

        <button onClick={() => setIsDetailModalOpen(true)} className="btn-outline">
          <Info size={18} color="#4F8CFF" />
          <span>View Details</span>
        </button>

        <button
          onClick={handleReport}
          className="btn-outline"
          style={{
            borderColor: scan.reported ? '#334455' : 'rgba(255, 92, 108, 0.4)',
            color: scan.reported ? '#94A3B8' : '#FF5C6C'
          }}
        >
          <Flag size={18} color={scan.reported ? '#94A3B8' : '#FF5C6C'} />
          <span>{scan.reported ? 'Reported to Safety Registry' : 'Report Suspicious Call'}</span>
        </button>
      </div>

      {/* Disclaimer */}
      <PrototypeDisclaimer compact={true} />

      {/* Detailed Inspection Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Technical Analysis Report"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#182532',
              borderRadius: '12px',
              border: '1px solid #334455'
            }}
          >
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>Scan Identifier</div>
            <div style={{ fontSize: '14px', fontFamily: 'monospace', color: '#4F8CFF' }}>{scan.id}</div>
          </div>

          <div
            style={{
              padding: '12px',
              backgroundColor: '#182532',
              borderRadius: '12px',
              border: '1px solid #334455'
            }}
          >
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Confidence Breakdown</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
              <span style={{ color: '#94A3B8' }}>Organic Human Signal:</span>
              <span style={{ color: '#35C98A', fontWeight: 600 }}>{scan.humanProbability}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#94A3B8' }}>Synthetic Cloned Signal:</span>
              <span style={{ color: '#FF5C6C', fontWeight: 600 }}>{scan.aiProbability}%</span>
            </div>
          </div>

          <div
            style={{
              padding: '12px',
              backgroundColor: '#182532',
              borderRadius: '12px',
              border: '1px solid #334455'
            }}
          >
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>Detected Features</div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#F1F5F9' }}>
              {scan.indicators.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              padding: '12px',
              backgroundColor: '#182532',
              borderRadius: '12px',
              border: '1px solid #334455',
              fontSize: '12px',
              color: '#94A3B8',
              lineHeight: 1.4
            }}
          >
            <strong style={{ color: '#F1F5F9' }}>Note for Demonstrations:</strong> In production, this module will query a Python neural backend via secure REST/gRPC API. No raw audio ever leaves the client device unencrypted.
          </div>

          <button onClick={() => setIsDetailModalOpen(false)} className="btn-primary" style={{ marginTop: '8px' }}>
            Close Report
          </button>
        </div>
      </Modal>
    </div>
  );
};
