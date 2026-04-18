import React, { useState } from "react";
import Ticket from "./Ticket";
import './UpcomingEvents.css';

function UpcomingEvents({ events, deleteEvent, userRole, addTicket }) {
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter((event) => event.date >= today);
  const [reservingEvent, setReservingEvent] = useState(null);

  const eventIcons = ["🎭", "🎪", "🏢", "🏫", "👔", "🚀", "🎸", "🎯"];

  const handleReserve = (ticketData) => {
    addTicket(ticketData);
    setReservingEvent(null);
    alert("Ticket reserved successfully!");
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Discover Upcoming Events</h1>
        <p className="page-lead">Explore your club's latest schedule. Reserve seats and plan your journey.</p>
      </header>

      <div className="upcoming-events-grid">
        {reservingEvent && (
            <Ticket 
                event={reservingEvent} 
                onReserve={handleReserve} 
                onCancel={() => setReservingEvent(null)} 
            />
        )}

        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, idx) => (
            <div key={event.id} className="upcoming-event-card">
              {event.date === today && <div className="status-badge-live">Live Today</div>}
              
              <div className="event-card-header" style={{ opacity: 0.9 }}>
                <span className="event-header-icon">
                  {eventIcons[idx % eventIcons.length]}
                </span>
              </div>

              <div className="event-card-content">
                <h3 className="event-card-title">{event.title}</h3>
                <div className="event-card-meta">
                  <span className="event-meta-tag tag-date">📅 {event.date}</span>
                  <span className="event-meta-tag tag-location">📍 {event.location}</span>
                </div>
                <p className="event-card-description">
                  {event.description}
                </p>
              </div>

              <div className="event-card-footer">
                <button className="btn-upcoming-reserve" onClick={() => setReservingEvent(event)}>
                  ✨ Reserve Ticket
                </button>
                <button 
                  type="button" 
                  className="btn-upcoming-delete" 
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-notifications" style={{ width: '100%', gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '3rem', opacity: 0.2 }}>🔍</div>
            <h3>No upcoming events found</h3>
            <p>Check back later or try creating a new event yourself!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingEvents;
