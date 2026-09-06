import React, { useState } from 'react';
import { History, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HistoryCard } from '../components/common/HistoryCard';
import { Modal } from '../components/common/Modal';
import { ResultScreen } from './ResultScreen';
import { ScanResult } from '../types';

export const HistoryScreen: React.FC = () => {
  const { scanHistory, clearHistory, setActiveTab } = useApp();
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const [filter, setFilter] = useState<'all' | 'human' | 'suspicious' | 'ai'>('all');

  const filteredHistory = scanHistory.filter((item) => {
    if (filter === 'all') return true;
    return item.resultState === filter;
  });

  const handleOpenScan = (scan: ScanResult) => {
    setSelectedScan(scan);
  };

  const handleCloseScan = () => {
    setSelectedScan(null);
  };

  return (
    <div className="screen-scroll">
      {/* Top Filter & Clear Controls */}
      {scanHistory.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            gap: '8px'
          }}
        >
          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            {(['all', 'human', 'suspicious', 'ai'] as const).map((f) => {
              const isSelected = filter === f;
              const labels = {
                all: 'All',
                human: 'Human',
                suspicious: 'Suspicious',
                ai: 'AI'
              };
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    backgroundColor: isSelected ? '#4F8CFF' : '#182532',
                    color: isSelected ? '#FFFFFF' : '#94A3B8',
                    border: '1px solid #334455',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {labels[f]}
                </button>
              );
            })}
          </div>

          {/* Clear History Button */}
          <button
            onClick={clearHistory}
            aria-label="Clear scan history"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '4px 6px'
            }}
          >
            <Trash2 size={14} />
            <span>Clear</span>
          </button>
        </div>
      )}

      {/* History List or Empty State */}
      {filteredHistory.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredHistory.map((scan, index) => (
            <HistoryCard
              key={scan.id}
              scan={scan}
              index={index}
              onClick={() => handleOpenScan(scan)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          style={{
            textAlign: 'center',
            padding: '48px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              backgroundColor: '#182532',
              border: '1px solid #334455',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            <History size={36} color="#4F8CFF" />
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F1F5F9', margin: '0 0 6px 0' }}>
            No scans yet
          </h2>

          <p style={{ fontSize: '14px', color: '#94A3B8', margin: '0 0 24px 0', maxWidth: '240px' }}>
            Run your first voice scan from Home to evaluate simulated audio signals.
          </p>

          <button
            onClick={() => setActiveTab('scan')}
            className="btn-primary"
            style={{ maxWidth: '220px' }}
          >
            <span>Start Voice Scan</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Read-Only Result Modal */}
      <Modal
        isOpen={selectedScan !== null}
        onClose={handleCloseScan}
        title="Saved Scan Details"
      >
        {selectedScan && (
          <div style={{ margin: '-18px' }}>
            <ResultScreen scanOverride={selectedScan} isReadOnly={true} />
          </div>
        )}
      </Modal>
    </div>
  );
};
