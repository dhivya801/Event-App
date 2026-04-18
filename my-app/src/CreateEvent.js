import React, { useState } from "react";
import './CreateEvent.css';

function CreateEvent({ addEvent }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date && location && description) {
      const newEvent = {
        id: Date.now(),
        title,
        date,
        location,
        description,
      };
      addEvent(newEvent);
      setTitle("");
      setDate("");
      setLocation("");
      setDescription("");
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Draft Your Next Milestone</h1>
        <p className="page-lead">Bring your club to life. Define the title, schedule, and venue to start your next unforgettable experience.</p>
      </header>

      <div className="create-event-layout">
        <form onSubmit={handleSubmit} className="create-event-form-card">
          <div className="create-form-header">
            <h2>Activity Details</h2>
            <p>Fill in the core information for your community event.</p>
          </div>

          <div className="form-field-wrapper">
            <label htmlFor="event-title">Event Title</label>
            <input
              id="event-title"
              type="text"
              placeholder="e.g. Annual Design Spotlight"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="premium-input-group">
            <div className="form-field-wrapper">
              <label htmlFor="event-date">Date Scheduled</label>
              <input 
                id="event-date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </div>
            <div className="form-field-wrapper">
              <label htmlFor="event-location">Venue / Location</label>
              <input
                id="event-location"
                type="text"
                placeholder="e.g. Creative Hub HQ"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-field-wrapper">
            <label htmlFor="event-description">Event Narrative</label>
            <textarea
              id="event-description"
              placeholder="Craft a brief narrative for your members..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ minHeight: '140px' }}
            />
          </div>

          {isSuccess && (
            <div className="create-success-overlay">
              <span>✅ Event has been added to the cloud queue.</span>
            </div>
          )}

          <button type="submit" className="btn-create-submit">
             ✨ Finalize & Launch Event
          </button>
        </form>

        <div className="preview-sidebar">
          <div className="preview-sidebar-header">
             <h3>Live Feed Preview</h3>
             <p style={{ fontSize: '0.85rem', color: '#64748b' }}>See how your event appears to members in the explorer feed.</p>
          </div>
          
          <div className="preview-card-mock">
            <div className="preview-header">
              <span className="preview-date-time">{date || "YYYY-MM-DD"}</span>
            </div>
            <h3 className="preview-title">{title || "Your Engaging Title Here..."}</h3>
            <p className="preview-location">📍 {location || "Define a Venue"}</p>
            <div className="preview-divider"></div>
            <p className="preview-desc">
              {description || "A compelling description will appear here as you type..."}
            </p>
          </div>
          
          <div style={{ marginTop: 'auto', background: '#eef2ff', padding: '20px', borderRadius: '18px', border: '1px solid #e0e7ff' }}>
             <p style={{ margin: 0, fontSize: '0.8rem', color: '#4338ca', fontWeight: 600 }}>
               💡 Tip: High-contrast titles and clear venue locations earn 25% more registrations on average.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
