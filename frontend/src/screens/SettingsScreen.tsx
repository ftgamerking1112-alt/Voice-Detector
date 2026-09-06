import React from 'react';
import { Shield, Bell, Lock, Database, Info, Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Toggle } from '../components/common/Toggle';
import { PrototypeDisclaimer } from '../components/common/PrototypeDisclaimer';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, toggleCallProtection } = useApp();

  const retentionOptions: { id: 'immediate' | '24h' | '7d' | 'manual'; label: string }[] = [
    { id: 'immediate', label: 'Delete immediately' },
    { id: '24h', label: 'After 24 hours' },
    { id: '7d', label: 'After 7 days' },
    { id: 'manual', label: 'Keep until manually deleted' }
  ];

  return (
    <div className="screen-scroll">
      {/* Section: Protection */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            padding: '0 4px'
          }}
        >
          Protection Engine
        </div>

        <div className="vg-card" style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#182532',
                  border: '1px solid #334455',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Shield size={18} color="#4F8CFF" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9' }}>
                  Real-Time Protection
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                  Synchronized with Call Protection module
                </div>
              </div>
            </div>
            <Toggle
              checked={settings.callProtectionActive}
              onChange={toggleCallProtection}
              ariaLabel="Toggle Real-Time Protection"
            />
          </div>
        </div>
      </div>

      {/* Section: Notifications */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            padding: '0 4px'
          }}
        >
          Notifications
        </div>

        <div className="vg-card" style={{ padding: '6px 16px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #334455'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Bell size={18} color="#4F8CFF" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#F1F5F9' }}>
                  Suspicious Call Alerts
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                  Instant warning on synthetic risk detection
                </div>
              </div>
            </div>
            <Toggle
              checked={settings.suspiciousCallAlerts}
              onChange={(val) => updateSettings({ suspiciousCallAlerts: val })}
              ariaLabel="Toggle Suspicious Call Alerts"
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={18} color="#6C8FFF" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#F1F5F9' }}>
                  Weekly Summary
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                  Weekly security recap and safe score
                </div>
              </div>
            </div>
            <Toggle
              checked={settings.weeklySummary}
              onChange={(val) => updateSettings({ weeklySummary: val })}
              ariaLabel="Toggle Weekly Summary"
            />
          </div>
        </div>
      </div>

      {/* Section: Privacy */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            padding: '0 4px'
          }}
        >
          Privacy & Data
        </div>

        <div className="vg-card" style={{ padding: '14px 16px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock size={18} color="#4F8CFF" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#F1F5F9' }}>
                  Store Audio Samples Locally
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                  No real audio is collected in this prototype.
                </div>
              </div>
            </div>
            <Toggle
              checked={settings.storeAudioLocally}
              onChange={(val) => updateSettings({ storeAudioLocally: val })}
              ariaLabel="Toggle Local Audio Storage"
            />
          </div>
        </div>

        {/* Audio Storage Retention Selector */}
        <div className="vg-card" style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Database size={16} color="#6C8FFF" />
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>
              Audio Retention Policy
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {retentionOptions.map((opt) => {
              const isSelected = settings.audioStorageRetention === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => updateSettings({ audioStorageRetention: opt.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? '#182532' : 'transparent',
                    border: isSelected ? '1px solid #4F8CFF' : '1px solid #334455',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '13px', color: isSelected ? '#F1F5F9' : '#94A3B8', fontWeight: isSelected ? 600 : 400 }}>
                    {opt.label}
                  </span>
                  {isSelected && <Check size={16} color="#4F8CFF" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section: About */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            padding: '0 4px'
          }}
        >
          About VoiceGuard AI
        </div>

        <div className="vg-card" style={{ padding: '16px', backgroundColor: '#182532' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={18} color="#4F8CFF" />
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#F1F5F9' }}>
                VoiceGuard AI
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(79, 140, 255, 0.15)',
                color: '#4F8CFF',
                border: '1px solid #4F8CFF'
              }}
            >
              v1.0.0 Prototype
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 14px 0', lineHeight: 1.45 }}>
            VoiceGuard AI is a student project demonstrating how AI-based voice deepfake detection could help users identify potentially synthetic voices.
          </p>

          <div
            style={{
              padding: '10px 12px',
              backgroundColor: '#101820',
              borderRadius: '8px',
              border: '1px solid #334455',
              fontSize: '12px',
              color: '#94A3B8',
              lineHeight: 1.4
            }}
          >
            <strong style={{ color: '#F1F5F9' }}>Notice:</strong> No real phone calls, microphone input, or AI detection models are used in this prototype.
          </div>
        </div>
      </div>

      <PrototypeDisclaimer />
    </div>
  );
};
