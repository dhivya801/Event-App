import React from "react";
import './Notifications.css';

function Notifications({ events }) {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Notifications Center</h1>
        <p className="page-lead">Stay updated with the latest event announcements and changes for your club.</p>
      </header>

      <div className="notifications-container">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={event.id} className="notification-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="notification-stripe"></div>
              <div className="notification-icon-wrapper">
                <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>📢</span>
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h3 className="notification-title">
                    New event announced: <strong>{event.title}</strong>
                  </h3>
                </div>
                
                <div className="notification-footer">
                  <span className="notification-date">
                    📅 {event.date}
                  </span>
                  <span className="notification-tag">
                    📣 Announcement
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-notifications">
            <div style={{ fontSize: '3rem', opacity: 0.2 }}>📭</div>
            <h3>No notifications yet</h3>
            <p>We'll notify you when new events are posted.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
