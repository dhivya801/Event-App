import React, { useState } from 'react';
import './Profile.css';

const SocialLogos = {
  LinkedIn: (
    <svg className="social-logo" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  GitHub: (
    <svg className="social-logo" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Google: (
    <svg className="social-logo" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42s1.95-4.42 4.34-4.42c1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61z"/>
    </svg>
  ),
  Facebook: (
    <svg className="social-logo" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.806h-2.96v-3.429h2.96v-2.528c0-2.933 1.791-4.529 4.406-4.529 1.252 0 2.328.094 2.641.135v3.061h-1.811c-1.424 0-1.7.677-1.7 1.67v2.191h3.39l-.441 3.429h-2.949v8.806h6.128c.732 0 1.325-.593 1.325-1.324v-21.351c0-.732-.593-1.325-1.325-1.325z"/>
    </svg>
  )
};

function Profile({ userEmail, userRole, profile, onSave, stats }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || userEmail.split('@')[0]);
  const [bio, setBio] = useState(profile?.bio || "I'm a passionate member of the EventEcho community, joining events and staying connected with organized club management.");
  
  const [socials, setSocials] = useState(profile?.socials || {
    linkedin: "linkedin.com",
    github: "github.com",
    google: "google.com",
    facebook: "facebook.com"
  });

  const handleSave = () => {
    onSave({ name, bio, socials });
    setIsEditing(false);
  };

  const initials = name ? name.substring(0, 2).toUpperCase() : userEmail.substring(0, 2).toUpperCase();

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <div className="profile-hero-glow"></div>
      </div>

      <div className="profile-main-card">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {initials}
          </div>
        </div>

        <div className="profile-header-info">
          <div className="profile-name-area">
            <h2>{name}</h2>
            <div className="profile-email">{userEmail}</div>
            <div className="profile-role-badge">{userRole}</div>
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button 
                className="profile-btn profile-btn--primary" 
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <button 
                className="profile-btn profile-btn--primary" 
                onClick={handleSave}
              >
                💾 Save Changes
              </button>
            )}
            <button className="profile-btn profile-btn--secondary">🔗 Share</button>
          </div>
        </div>

        {isEditing ? (
          <div className="profile-form">
            <div className="profile-field">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name"
              />
            </div>
            <div className="profile-field">
              <label>Bio</label>
              <textarea 
                rows="3" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <div className="profile-form-social">
              <div className="profile-field">
                <label>LinkedIn URL</label>
                <input type="text" value={socials.linkedin} onChange={(e) => setSocials({...socials, linkedin: e.target.value})} />
              </div>
              <div className="profile-field">
                <label>GitHub URL</label>
                <input type="text" value={socials.github} onChange={(e) => setSocials({...socials, github: e.target.value})} />
              </div>
              <div className="profile-field">
                <label>Google URL</label>
                <input type="text" value={socials.google} onChange={(e) => setSocials({...socials, google: e.target.value})} />
              </div>
              <div className="profile-field">
                <label>Facebook URL</label>
                <input type="text" value={socials.facebook} onChange={(e) => setSocials({...socials, facebook: e.target.value})} />
              </div>
            </div>

            <button className="profile-btn profile-btn--secondary" onClick={() => setIsEditing(false)}>Cancel Edit</button>
          </div>
        ) : (
          <>
            <div className="profile-bio-section">
              <h3>About Me</h3>
              <p className="profile-bio-text">{bio}</p>
            </div>

            <div className="profile-social-section">
              <h3>Connectivity</h3>
              <div className="profile-social-grid">
                <a href={`https://${socials.linkedin}`} target="_blank" rel="noreferrer" className="social-connect-btn social-connect-btn--linkedin">
                  {SocialLogos.LinkedIn} LinkedIn
                </a>
                <a href={`https://${socials.github}`} target="_blank" rel="noreferrer" className="social-connect-btn social-connect-btn--github">
                  {SocialLogos.GitHub} GitHub
                </a>
                <a href={`https://${socials.google}`} target="_blank" rel="noreferrer" className="social-connect-btn social-connect-btn--google">
                  {SocialLogos.Google} Google
                </a>
                <a href={`https://${socials.facebook}`} target="_blank" rel="noreferrer" className="social-connect-btn social-connect-btn--facebook">
                  {SocialLogos.Facebook} Facebook
                </a>
              </div>
            </div>
          </>
        )}

        <div className="profile-stats-grid">
          <div className="profile-stat-card">
            <div className="profile-stat-value">{stats.eventsCount}</div>
            <div className="profile-stat-label">Events Created</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{stats.ticketsCount}</div>
            <div className="profile-stat-label">Tickets Held</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{stats.sponsorsCount}</div>
            <div className="profile-stat-label">Sponsorships</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
