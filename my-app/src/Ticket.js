import React, { useState } from "react";
import './Ticket.css'
   
const Ticket = ({ event, onReserve, onCancel }) => {
    const [seatNumber, setSeatNumber] = useState("");

    const handleReserve = () => {
        if (!seatNumber) return alert("Please enter a seat number.");
        onReserve({
            id: Date.now(),
            eventId: event.id,
            eventTitle: event.title,
            eventDate: event.date,
            row: 'A',
            seatNumber,
            isVIP: false
        });
    };

    return (
        <div className="reservation-card">
            <h2>Reserve: {event.title}</h2>
            <p>🗓️ {event.date} · 📍 {event.location}</p>
            <div className="reservation-input-group">
                <label>Seat:</label>
                <input 
                    type="text" 
                    value={seatNumber} 
                    onChange={(e) => setSeatNumber(e.target.value)} 
                    placeholder="Enter seat # (e.g. 12)"
                />
            </div>
            <div className="reservation-actions">
                <button className="btn-confirm-reservation" onClick={handleReserve}>Confirm Reservation</button>
                <button className="btn-cancel-reservation" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default Ticket;