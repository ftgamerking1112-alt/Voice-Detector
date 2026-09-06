import React from 'react';
import { Shield, AlertCircle, Radio, Sliders } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Toggle } from '../components/common/Toggle';
import { StatCard } from '../components/common/StatCard';
import { PrototypeDisclaimer } from '../components/common/PrototypeDisclaimer';

export const CallProtectionScreen: React.FC = () => {
  const { settings, toggleCallProtection, callStats } = useApp();
  const isActive = settings.callProtectionActive;

  return (
    <div className="screen-scroll">
      {/* Protection Master Switch Card */}
      <div
        className="vg-card"
        style={{
          padding: '24px 20px',
          textAlign: 'center',
          marginBottom: '16px',
          border: isActive ? '1px solid rgba(53, 201, 138, 0.4)' : '1px solid #334455'
        }}
      >
        {/* Animated Shield / Pulse Icon */}
        <div
          style={{
            position: 'relative',
            width: '84px',
            height: '84px',
            margin: '0 auto 16px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isActive && (
            <div
              className="animate-pulse-ring"
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                border: '2px solid rgba(53, 201, 138, 0.4)',
                pointerEvents: 'none'
              }}
            />
          )}

          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              backgroundColor: '#182532',
              border: isActive ? '2px solid #35C98A' : '1px solid #334455',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 200ms ease'
            }}
          >
            <Shield size={42} color={isActive ? '#35C98A' : '#94A3B8'} />
          </div>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#F1F5F9', margin: '0 0 6px 0' }}>
          {isActive ? 'Protection Active' : 'Protection Paused'}
        </h2>

        <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 20px 0' }}>
          {isActive
            ? 'Background monitoring is actively scanning incoming voice streams.'
            : 'Call monitoring is currently turned off.'}
        </p>

        {/* Big Switch Control */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#182532',
            padding: '8px 18px',
            borderRadius: '24px',
            border: '1px solid #334455'
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: isActive ? '#35C98A' : '#94A3B8' }}>
            {isActive ? 'ENABLED' : 'DISABLED'}
          </span>
          <Toggle checked={isActive} onChange={toggleCallProtection} ariaLabel="Toggle Real-Time Call Protection" />
        </div>
      </div>

      {/* Real-Time Live Statistics */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            padding: '0 2px'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Monitored Telephony Activity
          </span>
          {isActive && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#35C98A' }}>
              <Radio size={12} className="animate-pulse-ring" /> Live
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <StatCard
            label="Calls Monitored"
            value={callStats.monitored}
            subtitle={isActive ? 'Auto-incrementing' : 'Paused'}
            highlightColor="#4F8CFF"
          />
          <StatCard
            label="Suspicious Calls"
            value={callStats.suspicious}
            highlightColor="#F5B942"
          />
          <StatCard
            label="Alerts Generated"
            value={callStats.alerts}
            highlightColor="#FF5C6C"
          />
        </div>
      </div>

      {/* Important Prototype Notice Card */}
      <div
        className="vg-card"
        style={{
          padding: '16px',
          marginBottom: '16px',
          backgroundColor: '#182532',
          border: '1px solid #334455'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <AlertCircle size={18} color="#4F8CFF" />
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>
            Prototype Simulation
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
          This feature does not access, intercept, monitor, or block real phone calls or OS dialers. It demonstrates how autonomous background detection will operate on supported mobile OS integrations.
        </p>
      </div>

      {/* Protection Settings Preview */}
      <div
        className="vg-card"
        style={{
          padding: '16px',
          backgroundColor: '#202F3D',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sliders size={18} color="#4F8CFF" />
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>
            Threshold Filters
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#F1F5F9' }}>Suspicious Threshold Alert</span>
            <span style={{ color: '#F5B942', fontWeight: 600 }}>&gt; 30% AI</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#F1F5F9' }}>High Confidence Alarm</span>
            <span style={{ color: '#FF5C6C', fontWeight: 600 }}>&gt; 65% AI</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#F1F5F9' }}>Telemetry Synchronization</span>
            <span style={{ color: '#35C98A', fontWeight: 600 }}>Synchronized with Settings</span>
          </div>
        </div>
      </div>

      {/* Privacy Disclaimer */}
      <PrototypeDisclaimer />
    </div>
  );
};
