import React, { useState } from 'react';
import { Fingerprint, UserCheck, Plus, Mic, CheckCircle2, Sparkles, Scale, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusRing } from '../components/common/StatusRing';
import { Modal } from '../components/common/Modal';
import { AudioWaveform } from '../components/common/AudioWaveform';
import { PrototypeDisclaimer } from '../components/common/PrototypeDisclaimer';

export const VoiceVerificationScreen: React.FC = () => {
  const { voiceProfiles, addVoiceProfile, showToast } = useApp();

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [enrollStep, setEnrollStep] = useState<'input' | 'recording' | 'success'>('input');
  const [profileNameInput, setProfileNameInput] = useState<string>('');
  const [enrollTimer, setEnrollTimer] = useState<number>(3);

  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareStep, setCompareStep] = useState<'comparing' | 'result'>('comparing');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    voiceProfiles[0]?.id || ''
  );
  const [similarityScore, setSimilarityScore] = useState<number>(76);

  const handleStartEnroll = () => {
    setProfileNameInput('');
    setEnrollStep('input');
    setIsEnrollModalOpen(true);
  };

  const handleConfirmEnroll = () => {
    const name = profileNameInput.trim() || 'Custom Contact';
    setEnrollStep('recording');
    setEnrollTimer(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      setEnrollTimer(current);
      if (current <= 0) {
        clearInterval(interval);
        addVoiceProfile(name);
        setEnrollStep('success');
        setTimeout(() => {
          setIsEnrollModalOpen(false);
        }, 1200);
      }
    }, 1000);
  };

  const handleStartCompare = () => {
    if (voiceProfiles.length === 0) {
      showToast('Create a voice profile first.');
      return;
    }
    setCompareStep('comparing');
    setIsCompareModalOpen(true);

    setTimeout(() => {
      const simulatedScore = Math.floor(Math.random() * 25) + 68; // 68% - 92%
      setSimilarityScore(simulatedScore);
      setCompareStep('result');
    }, 2800);
  };

  const activeProfile = voiceProfiles.find((p) => p.id === selectedProfileId) || voiceProfiles[0];

  return (
    <div className="screen-scroll">
      {/* Intro Card */}
      <div
        className="vg-card"
        style={{
          padding: '18px 16px',
          marginBottom: '16px',
          backgroundColor: '#182532'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Fingerprint size={24} color="#4F8CFF" />
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>
            Speaker Verification
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
          Create biometric acoustic templates for trusted contacts. Compare incoming caller audio against stored baseline profiles to confirm identity.
        </p>
      </div>

      {/* Saved Profiles Section */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '0 2px'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Enrolled Profiles ({voiceProfiles.length})
          </span>
          <button
            onClick={handleStartEnroll}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#4F8CFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Plus size={16} /> Enroll Voice
          </button>
        </div>

        {voiceProfiles.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {voiceProfiles.map((profile) => {
              const isSelected = profile.id === selectedProfileId;
              return (
                <div
                  key={profile.id}
                  onClick={() => setSelectedProfileId(profile.id)}
                  className="vg-card vg-card-interactive"
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: isSelected ? '1px solid #4F8CFF' : '1px solid #334455',
                    backgroundColor: isSelected ? '#1e2e3d' : '#202F3D'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: '#182532',
                        border: '1px solid #334455',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <UserCheck size={20} color="#4F8CFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9' }}>
                        {profile.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#35C98A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#35C98A' }} />
                        Voice profile enrolled
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                    {profile.enrolledDate}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="vg-card"
            style={{
              padding: '24px',
              textAlign: 'center',
              color: '#94A3B8',
              fontSize: '13px'
            }}
          >
            No voice profiles stored. Tap "+ Enroll Voice" to create your first baseline sample.
          </div>
        )}
      </div>

      {/* Comparison Action Card */}
      <div
        className="vg-card"
        style={{
          padding: '18px 16px',
          marginBottom: '16px',
          backgroundColor: '#202F3D'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Scale size={18} color="#4F8CFF" />
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#F1F5F9', margin: 0 }}>
            Biometric Profile Matching
          </h3>
        </div>

        <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 16px 0' }}>
          Compare incoming speech sample against <strong style={{ color: '#F1F5F9' }}>{activeProfile?.name || 'Selected Contact'}</strong>.
        </p>

        <button
          onClick={handleStartCompare}
          className="btn-primary"
          style={{ marginBottom: '10px' }}
        >
          <Sparkles size={18} />
          <span>Compare Incoming Voice</span>
        </button>
      </div>

      {/* Important Notice */}
      <div
        style={{
          padding: '14px',
          backgroundColor: '#182532',
          border: '1px solid #334455',
          borderRadius: '12px',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <Info size={16} color="#6C8FFF" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
            <strong style={{ color: '#F1F5F9' }}>Security Notice:</strong> Voice similarity and AI detection are distinct signals. A cloned voice may produce a high voice match with a victim’s family member while still being an AI synthetic deepfake.
          </p>
        </div>
      </div>

      {/* Privacy Disclaimer */}
      <PrototypeDisclaimer />

      {/* Enroll Voice Modal */}
      <Modal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        title="Enroll Voice Profile"
      >
        {enrollStep === 'input' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>
                Contact or Profile Label
              </label>
              <input
                type="text"
                placeholder="e.g. Mom, Boss, John Doe"
                value={profileNameInput}
                onChange={(e) => setProfileNameInput(e.target.value)}
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: '#182532',
                  border: '1px solid #334455',
                  borderRadius: '12px',
                  padding: '0 14px',
                  color: '#F1F5F9',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: '#182532',
                borderRadius: '10px',
                border: '1px solid #334455',
                fontSize: '12px',
                color: '#94A3B8'
              }}
            >
              Simulates a 3-second acoustic recording to extract formant reference tensors.
            </div>

            <button onClick={handleConfirmEnroll} className="btn-primary">
              <Mic size={18} />
              <span>Record Simulated Sample (3s)</span>
            </button>
          </div>
        )}

        {enrollStep === 'recording' && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                position: 'relative',
                width: '96px',
                height: '96px',
                margin: '0 auto 16px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                className="animate-pulse-ring"
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  border: '2px solid rgba(79, 140, 255, 0.4)',
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#182532',
                  border: '2px solid #4F8CFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Mic size={36} color="#4F8CFF" />
              </div>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F1F5F9', margin: '0 0 6px 0' }}>
              Recording sample…
            </h3>
            <div style={{ fontSize: '20px', fontFamily: 'monospace', color: '#4F8CFF', fontWeight: 700 }}>
              00:0{enrollTimer}
            </div>

            <div style={{ marginTop: '16px' }}>
              <AudioWaveform isAnalyzing={true} barCount={20} height={42} />
            </div>
          </div>
        )}

        {enrollStep === 'success' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(53, 201, 138, 0.15)',
                border: '1px solid #35C98A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <CheckCircle2 size={36} color="#35C98A" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F1F5F9', margin: '0 0 4px 0' }}>
              Voice profile created
            </h3>
            <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
              Biometric acoustic baseline successfully stored locally.
            </p>
          </div>
        )}
      </Modal>

      {/* Compare Modal */}
      <Modal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        title="Voice Match Comparison"
      >
        {compareStep === 'comparing' ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#182532',
                border: '2px solid #4F8CFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <Scale size={32} color="#4F8CFF" className="animate-pulse-ring" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#F1F5F9', margin: '0 0 4px 0' }}>
              Comparing acoustic features…
            </h3>
            <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 16px 0' }}>
              Cross-referencing incoming voice with "{activeProfile?.name || 'Contact'}".
            </p>
            <AudioWaveform isAnalyzing={true} barCount={22} height={44} />
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F1F5F9', margin: '0 0 4px 0' }}>
              Voice Match: <span style={{ color: '#4F8CFF' }}>{similarityScore}%</span>
            </h3>

            <div style={{ margin: '16px auto' }}>
              <StatusRing
                size={130}
                strokeWidth={8}
                percentage={similarityScore}
                color={similarityScore > 80 ? '#35C98A' : similarityScore > 65 ? '#F5B942' : '#FF5C6C'}
              >
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#F1F5F9' }}>
                  {similarityScore}%
                </div>
                <div style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>
                  Acoustic Match
                </div>
              </StatusRing>
            </div>

            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '8px',
                backgroundColor: '#182532',
                border: '1px solid #334455',
                fontSize: '13px',
                color: similarityScore > 80 ? '#35C98A' : '#F5B942',
                fontWeight: 600,
                marginBottom: '16px'
              }}
            >
              {similarityScore > 80 ? 'High acoustic similarity' : 'Moderate similarity'}
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: '#182532',
                borderRadius: '12px',
                border: '1px solid #334455',
                fontSize: '12px',
                color: '#94A3B8',
                textAlign: 'left',
                lineHeight: 1.45,
                marginBottom: '16px'
              }}
            >
              <strong style={{ color: '#F1F5F9' }}>Crucial Context:</strong> High vocal similarity does NOT guarantee authenticity. Advanced voice clones mimic the timbre of loved ones. Run a full Voice Scan to detect synthetic neural anomalies.
            </div>

            <button onClick={() => setIsCompareModalOpen(false)} className="btn-primary">
              Done
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
