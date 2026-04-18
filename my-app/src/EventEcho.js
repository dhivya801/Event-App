/*import React, { useState } from "react";
import "./EventEcho.css";

function EventEcho() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const addEvent = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title,
      date,
      location
    };

    setEvents([...events, newEvent]);

    setTitle("");
    setDate("");
    setLocation("");
  };

  return (
    <div className="container">
      <h2>Event Echo - Club Event Planner</h2>

      <form onSubmit={addEvent}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type="submit">Add Event</button>
      </form>

      <div className="event-list">
        <h3>Upcoming Events</h3>

        {events.map((event) => (
          <div key={event.id} className="event-item">
            <strong>{event.title}</strong> <br />
            📅 {event.date} <br />
            📍 {event.location}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventEcho;*/