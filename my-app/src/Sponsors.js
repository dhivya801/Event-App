import React, { useState } from "react";

function Sponsors({ sponsors, addSponsor }) {
  const [name, setName] = useState("");
  const [tier, setTier] = useState("Gold");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return alert("Please fill all fields!");
    addSponsor({ id: Date.now(), name, tier, amount });
    setName("");
    setAmount("");
  };

  const getTierColor = (tierName) => {
    if(tierName === 'Platinum') return { bg: '#e0e7ff', text: '#4338ca' };
    if(tierName === 'Gold') return { bg: '#fef3c7', text: '#b45309' };
    if(tierName === 'Silver') return { bg: '#f1f5f9', text: '#475569' };
    return { bg: '#ffedd5', text: '#9a3412' }; // Bronze
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Sponsors Management</h1>
        <p className="page-lead">Manage event sponsors and securely record new contributions here.</p>
      </header>

      <form className="event-form" onSubmit={handleSubmit} style={{ marginBottom: '40px', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '1.25rem', color: '#1e1b4b' }}>Add New Sponsor</h2>
        <div className="form-field">
          <label style={{ color: '#1e293b' }}>Sponsor Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. TechCorp" style={{ color: '#0f172a' }} />
        </div>
        <div className="form-field">
          <label style={{ color: '#1e293b' }}>Tier</label>
          <select style={{ padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.92)', border: '1.5px solid rgba(199, 210, 254, 0.65)', color: '#0f172a', fontWeight: '600', fontSize: '15px' }} value={tier} onChange={e => setTier(e.target.value)}>
            <option>Platinum</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>
        </div>
        <div className="form-field">
          <label style={{ color: '#1e293b' }}>Donation Amount ($)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 5000" style={{ color: '#0f172a' }} />
        </div>
        <button type="submit" className="btn-reserve" style={{ marginTop: '16px', alignSelf: 'flex-start' }}>➕ Add Sponsor Details</button>
      </form>

      <div>
        <h2 className="home-section-title">Current Sponsors</h2>
        <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {sponsors && sponsors.length > 0 ? (
            sponsors.map(s => {
              const colors = getTierColor(s.tier);
              return (
                <div key={s.id} className="card" style={{ 
                  background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(10px)',
                  padding: '24px', borderRadius: '16px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.3rem', fontWeight: 800 }}>{s.name}</h3>
                    <span style={{ 
                      background: colors.bg, color: colors.text, 
                      padding: '6px 12px', borderRadius: '8px', 
                      fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' 
                    }}>
                      {s.tier}
                    </span>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Total Donation</p>
                    <p style={{ margin: 0, color: '#059669', fontSize: '1.5rem', fontWeight: 800 }}>${parseInt(s.amount).toLocaleString()}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="card empty-hint">No sponsors listed yet. Add one above!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
