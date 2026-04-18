import React from "react";
import './Reports.css';

function Reports({ events = [] }) {
  const today = new Date().toISOString().split("T")[0];
  const totalEvents = events.length;
  const upcomingCount = events.filter((e) => e.date >= today).length;
  const pastCount = events.filter((e) => e.date < today).length;

  const handleExport = (type) => {
    alert(`Exporting event audit as ${type}... This would normally generate a file for all ${totalEvents} records.`);
  };

  return (
    <div className="reports-container">
      <header className="page-header">
        <h1>Event Status Audit</h1>
        <p className="page-lead">Detailed operational reporting including event status tracking and audit trails for all club activities.</p>
      </header>

      <div className="reports-summary-cards">
        <div className="report-stat-card">
          <h3>Total Archive</h3>
          <p>{totalEvents}</p>
        </div>
        <div className="report-stat-card">
          <h3>Active Queue</h3>
          <p>{upcomingCount}</p>
        </div>
        <div className="report-stat-card">
          <h3>Finalized</h3>
          <p>{pastCount}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="home-section-title" style={{ margin: 0 }}>Event Audit Trail</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-report-export" onClick={() => handleExport('CSV')}>📥 Export CSV</button>
          <button className="btn-report-export" onClick={() => handleExport('PDF')}>📄 Export PDF</button>
        </div>
      </div>

      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Activity Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((e) => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 800, color: '#a78bfa' }}>#{e.id}</td>
                  <td style={{ fontWeight: 700 }}>{e.title}</td>
                  <td>{e.date}</td>
                  <td>{e.location}</td>
                  <td>
                    <span className={`report-badge ${e.date >= today ? 'badge-upcoming' : 'badge-past'}`}>
                      {e.date >= today ? 'UPCOMING' : 'PAST'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: '#94a3b8', fontStyle: 'italic' }}>
                  No operational records found in the current audit window.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="reports-footer-text">
        Generated on {new Date().toLocaleDateString()} — Powered by EventEcho Reports
      </div>
    </div>
  );
}

export default Reports;
