import React, { useState } from "react";
import './PastEvents.css';

function PastEvents({ events, deleteEvent }) {
  const [ratings, setRatings] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const pastEvents = events.filter((event) => event.date < today);

  const handleRate = (eventId, star) => {
    setRatings(prev => ({ ...prev, [eventId]: star }));
    alert(`Thank you for rating this event: ${star} stars!`);
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Past Events Archive</h1>
        <p className="page-lead">A beautiful summary of your club's past achievements and memories.</p>
      </header>

      <div className="past-events-grid">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <div key={event.id} className="past-event-card">
              <button 
                type="button" 
                className="past-event-delete" 
                onClick={() => deleteEvent(event.id)}
                title="Remove from archive"
              >
                ✕
              </button>

              <div className="past-event-info">
                <h3>{event.title}</h3>
                <div className="past-event-date">
                  📅 {event.date}
                </div>
                <div className="past-event-location">
                  📍 {event.location}
                </div>
              </div>

              <div className="past-event-recaps">
                <button className="btn-past-recap" onClick={() => alert("Memory recap coming soon! Stay tuned for the photo gallery.")}>
                 📸 Show Memories
                </button>
              </div>

              <div className="past-event-footer">
                <div className="past-event-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      onClick={() => handleRate(event.id, star)}
                      style={{ color: (ratings[event.id] || 0) >= star ? '#f59e0b' : '#cbd5e1' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="past-event-badge">Completed</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-notifications" style={{ width: '100%', gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '3rem', opacity: 0.2 }}>🎞️</div>
            <h3>No past events in the archive</h3>
            <p>Complete your first event to see it here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PastEvents;
