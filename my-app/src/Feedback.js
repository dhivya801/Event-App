import React, { useState } from "react";

function Feedback({ feedbackList, addFeedback, deleteFeedback }) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      addFeedback(feedback);
      setFeedback("");
    }
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Submit Feedback</h1>
        <p className="page-lead">We value your input. Your feedback helps us improve the EventEcho dashboard experience.</p>
      </header>
      
      <form className="event-form" onSubmit={handleSubmit} style={{ marginBottom: '40px', background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '30px' }}>
        <div className="form-field">
          <label style={{ color: '#1e293b', fontWeight: 700 }}>Your Message</label>
          <textarea
            id="feedback-text"
            placeholder="Tell us what you think..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{ color: '#0f172a', minHeight: '120px' }}
          />
        </div>
        <button type="submit" className="btn-reserve" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
          ✨ Submit Feedback
        </button>
      </form>

      {feedbackList && feedbackList.length > 0 && (
        <div>
          <h2 className="home-section-title">Submitted Feedback</h2>
          <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {feedbackList.map((item) => (
              <div key={item.id} className="card" style={{ padding: '24px', position: 'relative', background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '18px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>MEMBER INPUT</div>
                  <button 
                    onClick={() => deleteFeedback(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.25rem', padding: 0 }}
                    title="Delete feedback"
                  >
                    🗑️
                  </button>
                </div>
                <p style={{ margin: 0, color: '#334155', fontStyle: 'italic', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  "{item.text}"
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '12px', textAlign: 'right', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                  REF: {item.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
