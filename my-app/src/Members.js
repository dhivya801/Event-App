import React, { useState } from "react";
import './Members.css';

function Members({ members, addMember, deleteMember }) {
  const [memberName, setMemberName] = useState("");

  const handleAddMember = (e) => {
    e.preventDefault();
    if (memberName.trim()) {
      addMember(memberName);
      setMemberName("");
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="page-shell members-container">
      <header className="page-header">
        <div className="members-header-stats">
          <h1>Club Directory</h1>
          <span className="stat-badge">{members.length} Members</span>
        </div>
        <p className="page-lead">Building a strong community. Register and manage your active club members below.</p>
      </header>

      <div className="members-form-card">
        <form onSubmit={handleAddMember} className="members-form-inner">
          <div className="form-field">
            <label htmlFor="member-name" style={{ color: '#1e293b', fontWeight: 700 }}>Full Name</label>
            <input
              id="member-name"
              type="text"
              placeholder="e.g. John Doe"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              autoComplete="name"
              style={{ padding: '14px 18px', borderRadius: '12px' }}
            />
          </div>
          <button type="submit">✨ Add Member</button>
        </form>
      </div>

      <div className="members-grid">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="member-identity-card">
              <div className="member-avatar">
                {getInitials(member.name)}
              </div>
              <div className="member-details">
                <h3>{member.name}</h3>
                <span className="member-role">ACTIVE MEMBER</span>
              </div>
              <div className="member-actions">
                <button
                  type="button"
                  className="btn-remove-member"
                  onClick={() => deleteMember(member.id)}
                  aria-label={`Remove ${member.name}`}
                >
                  Remove Member
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card empty-notifications" style={{ width: '100%', gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '3rem', opacity: 0.2 }}>👥</div>
            <h3>Your directory is empty</h3>
            <p>Start your community by adding the first member today!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Members;
