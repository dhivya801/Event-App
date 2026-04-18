import React from 'react';
import './Ticket.css';

function MyTickets({ tickets, deleteTicket }) {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>My Tickets</h1>
        <p className="page-lead">View your reserved tickets below. Swipe or scroll to see details.</p>
      </header>

      <div className="compact-ticket-container">
        {tickets.length > 0 ? (
          tickets.map((t) => (
            <div key={t.id} className="compact-ticket">
              <div className="compact-ticket-cut-top"></div>
              <div className="compact-ticket-cut-bottom"></div>
              
              <div className="compact-ticket-main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 className="compact-ticket-title">{t.eventTitle}</h3>
                  <span className="compact-ticket-badge badge-status">✓ Confirmed</span>
                </div>
                
                <div className="compact-ticket-meta">
                  <span className="compact-ticket-badge badge-date">
                    📅 {t.eventDate}
                  </span>
                  <span className="compact-ticket-badge badge-seat">
                    🎟️ Row {t.row}, Seat {t.seatNumber}
                  </span>
                </div>
              </div>

              <div className="compact-ticket-stub">
                <div style={{ width: '60px', height: '60px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '2rem' }}>📱</span>
                </div>
                <button 
                  className="btn-cancel-compact" 
                  onClick={() => deleteTicket(t.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
         ) : (
          <div className="card empty-hint">No tickets reserved yet. Head over to Upcoming Events!</div>
        )}
      </div>
    </div>
  );
}

export default MyTickets;
