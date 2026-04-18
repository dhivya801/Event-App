import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './Calendar.css';

function MyCalendar({ events = [] }) {
  const [date, setDate] = useState(new Date());

  // Normalize date comparison by removing time
  const isSameDay = (d1, d2) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const selectedEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    return isSameDay(eventDate, date);
  });

  const tileContent = ({ date: viewDate, view }) => {
    if (view === 'month') {
      const hasEvent = events.some(e => isSameDay(new Date(e.date), viewDate));
      return hasEvent ? <div className="event-dot" title="Event scheduled"></div> : null;
    }
  };

  return (
    <div className="page-shell calendar-page">
      <header className="page-header">
        <h1>Event Calendar</h1>
        <p className="page-lead">Pick a date to discover club activity. Syncs with your scheduled events.</p>
      </header>

      <div className="calendar-main-layout">
        <div className="calendar-card">
          <Calendar 
            onChange={setDate} 
            value={date} 
            tileContent={tileContent}
          />
        </div>

        <div className="calendar-agenda">
          <div className="agenda-header">
            <h2>Agenda: <span>{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span></h2>
            <p>{selectedEvents.length} events scheduled for today</p>
          </div>

          <div className="agenda-list">
            {selectedEvents.length > 0 ? (
              selectedEvents.map(e => (
                <div key={e.id} className="agenda-item">
                  <div className="agenda-item-title">{e.title}</div>
                  <div className="agenda-item-meta">
                    <span>📍 {e.location}</span>
                    <span>🕒 {e.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-events-hint">
                No events scheduled for this day
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
