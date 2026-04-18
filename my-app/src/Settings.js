import React, { useState, useEffect } from "react";
import './Settings.css';

function Settings({ settings, onSave }) {
  const [activeTab, setActiveTab] = useState("general");
  const [clubName, setClubName] = useState(settings.clubName || "");
  const [contactEmail, setContactEmail] = useState(settings.contactEmail || "");
  const [notifications, setNotifications] = useState(settings.notifications !== false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    setClubName(settings.clubName || "");
    setContactEmail(settings.contactEmail || "");
    setNotifications(settings.notifications !== false);
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ clubName, contactEmail, notifications });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="page-shell settings-container">
      <header className="page-header">
        <h1>Global Settings</h1>
        <p className="page-lead">Manage your club profile, preferences, and workspace accessibility.</p>
      </header>

      <div className="settings-card">
        <div className="settings-tabs">
          <button 
            className={`settings-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            🏢 Club Profile
          </button>
          <button 
             className={`settings-tab-btn ${activeTab === 'access' ? 'active' : ''}`}
             onClick={() => setActiveTab('access')}
          >
            ⚙️ Accessibility
          </button>
        </div>

        <div className="settings-body">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit} className="settings-form">
              <h2 className="settings-section-title">Club Profile</h2>
              <div className="form-field">
                <label style={{ color: '#1e293b', fontWeight: 700 }}>Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Skyline Event Bureau"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  style={{ borderRadius: '14px', border: '1.5px solid #e2e8f0', padding: '14px' }}
                />
              </div>
              <div className="form-field">
                <label style={{ color: '#1e293b', fontWeight: 700 }}>Contact Email</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  style={{ borderRadius: '14px', border: '1.5px solid #e2e8f0', padding: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <button type="submit" className="btn-reserve">💾 Save Changes</button>
                {showSaved && (
                  <div className="save-status-toast">
                    ✅ Settings updated successfully
                  </div>
                )}
              </div>
            </form>
          )}

          {activeTab === 'access' && (
            <div className="settings-form">
              <h2 className="settings-section-title">Connectivity & Alerts</h2>
              
              <div className="setting-item-row">
                <div className="setting-text">
                  <h4>Email Notifications</h4>
                  <p>Get instant alerts when new events are created or updated.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications} 
                    onChange={(e) => {
                      setNotifications(e.target.checked);
                      onSave({ clubName, contactEmail, notifications: e.target.checked });
                    }} 
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item-row">
                <div className="setting-text">
                  <h4>Smart Sync Mode</h4>
                  <p>Keep your dashboard in sync with your shared team workspace.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked readOnly />
                  <span className="slider"></span>
                </label>
              </div>

              <p style={{ marginTop: '30px', background: '#f8fafc', padding: '15px', borderRadius: '12px', fontSize: '0.85rem', color: '#64748b' }}>
                <strong>Note:</strong> Most connectivity settings are automatically managed by your account administrator.
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '30px', opacity: 0.6, fontSize: '0.8rem', textAlign: 'center', color: '#64748b' }}>
        Version 2.4.0 — EventEcho Cloud Experience
      </div>
    </div>
  );
}

export default Settings;
