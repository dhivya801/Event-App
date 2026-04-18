import React, { useState } from "react";
import './EventList.css';

function EventList({ events, deleteEvent, userRole }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((e) => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEventIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes("party") || t.includes("celebration")) return "🎈";
    if (t.includes("meetup") || t.includes("networking")) return "🤝";
    if (t.includes("workshop") || t.includes("class")) return "💼";
    if (t.includes("concert") || t.includes("music")) return "🎶";
    if (t.includes("sports") || t.includes("game")) return "⚽";
    if (t.includes("tech") || t.includes("meet")) return "🏢";
    return "🎪"; // Default
  };

  return (
    <div className="page-shell event-explorer-container">
      <header className="page-header">
        <h1>Event Explorer</h1>
        <p className="page-lead">A unified view of every scheduled activity. Seamlessly search and manage your workspace.</p>
      </header>
      
      <div className="explorer-toolbar">
         <div className="search-input-wrapper">
           <span className="search-icon">🔍</span>
           <input 
             type="search" 
             placeholder="Search events by title or location..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
         </div>
         <div className="explorer-stats-bar">
             <span>Showing {filteredEvents.length} items</span>
             <span>Total Archives: {events.length}</span>
         </div>
      </div>

      <div className="explorer-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => (
            <div key={event.id} className="explorer-row" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="explorer-main-info">
                <div className="explorer-type-icon">
                  {getEventIcon(event.title)}
                </div>
                <div className="explorer-details">
                  <h4>{event.title}</h4>
                  <p>
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </p>
                </div>
              </div>
              <div className="explorer-actions">
                <button 
                  type="button" 
                  className="btn-explorer-delete" 
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete Activity
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card empty-notifications" style={{ width: '100%', padding: '60px' }}>
            <div style={{ fontSize: '3rem', opacity: 0.2 }}>🔍</div>
            <h3>No matching activities found</h3>
            <p>Try refining your search terms or view the full list.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;
