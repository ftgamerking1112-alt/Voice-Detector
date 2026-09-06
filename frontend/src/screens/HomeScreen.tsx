import React from 'react';
import { Shield, Fingerprint, Activity, UploadCloud, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusRing } from '../components/common/StatusRing';
import { StatCard } from '../components/common/StatCard';
import { FeatureCard } from '../components/common/FeatureCard';
import { PrototypeDisclaimer } from '../components/common/PrototypeDisclaimer';

export const HomeScreen: React.FC = () => {
  const {
    setActiveTab,
    setSubScreen,
    settings,
    isSimulatingUpload,
    setIsSimulatingUpload
  } = useApp();

  const handleStartScan = () => {
    setActiveTab('scan');
  };

  const handleAnalyzeRecording = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      setIsSimulatingUpload(false);
      setActiveTab('scan');
    }, 1200);
  };

  return (
    <div className="screen-scroll">
      {/* Upload Simulation Overlay */}
      {isSimulatingUpload && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(16, 24, 32, 0.92)',
            zIndex: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              backgroundColor: '#182532',
              border: '1px solid #334455',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            <Loader2 size={32} color="#4F8CFF" className="animate-slow-spin" />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F1F5F9', marginBottom: '6px' }}>
            Analyzing uploaded audio…
          </h2>
          <p style={{ fontSize: '13px', color: '#94A3B8' }}>
            Simulating file ingestion and feature extraction…
          </p>
        </div>
      )}

      {/* Main Status Card */}
      <div
        className="vg-card"
        style={{
          padding: '24px 16px 20px 16px',
          textAlign: 'center',
          marginBottom: '16px',
          backgroundColor: '#202F3D'
        }}
      >
        <div style={{ margin: '8px 0 16px 0' }}>
          <StatusRing size={164} strokeWidth={8} percentage={100} color="#4F8CFF" pulse={true}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#182532',
                border: '1px solid #334455',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '6px'
              }}
            >
              <Activity size={26} color="#4F8CFF" />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9' }}>
              Ready to Analyze
            </div>
            <div style={{ fontSize: '11px', color: '#6C8FFF', marginTop: '2px' }}>
              AI Engine Active
            </div>
          </StatusRing>
        </div>

        <p style={{ fontSize: '14px', color: '#94A3B8', margin: '0 0 18px 0' }}>
          Your voice protection is ready.
        </p>

        {/* Primary Action */}
        <button
          onClick={handleStartScan}
          className="btn-primary"
          style={{ marginBottom: '10px' }}
        >
          <span>Start Voice Scan</span>
          <ArrowRight size={18} />
        </button>

        {/* Secondary Action */}
        <button
          onClick={handleAnalyzeRecording}
          className="btn-outline"
        >
          <UploadCloud size={18} color="#6C8FFF" />
          <span>Analyze Recording</span>
        </button>
      </div>

      {/* Statistics Section */}
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
            System Statistics
          </span>
          <span style={{ fontSize: '11px', color: '#4F8CFF' }}>Simulated</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <StatCard label="Calls Scanned" value="128" />
          <StatCard label="Suspicious Calls" value="9" highlightColor="#F5B942" />
          <StatCard label="Detection Accuracy" value="94.2%" highlightColor="#35C98A" />
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ marginBottom: '8px' }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            padding: '0 2px'
          }}
        >
          Security Modules
        </div>

        <FeatureCard
          icon={<Shield size={22} />}
          title="Call Protection"
          description="Monitor suspicious voice activity"
          badge={{
            text: settings.callProtectionActive ? 'ON' : 'PAUSED',
            color: settings.callProtectionActive ? '#35C98A' : '#94A3B8'
          }}
          onClick={() => setSubScreen('call-protection')}
        />

        <FeatureCard
          icon={<Fingerprint size={22} />}
          title="Verify a Known Voice"
          description="Compare a voice with a saved profile"
          badge={{
            text: '2 Saved',
            color: '#4F8CFF'
          }}
          onClick={() => setSubScreen('voice-verification')}
        />
      </div>

      {/* Privacy Footer */}
      <PrototypeDisclaimer />
    </div>
  );
};
