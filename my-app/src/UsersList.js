import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/users");
        setUserList(res.data || []);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Registered Users</h1>
        <p className="page-lead">A comprehensive list of all members and admins on the platform.</p>
      </header>
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {userList.map((u, i) => (
            <div key={i} className="card" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '24px 20px', 
              gap: '18px', 
              borderLeft: u.role === 'admin' ? '4px solid #f43f5e' : '4px solid #8b5cf6',
              textAlign: 'left',
              backgroundColor: 'rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{ 
                flexShrink: 0, 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'rgba(255, 255, 255, 0.8)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.5rem',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                {u.role === 'admin' ? '🛡️' : '👤'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', color: '#1e1b4b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 700 }}>
                  {u.email}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 800, 
                    color: u.role === 'admin' ? '#be123c' : '#4f46e5', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.06em',
                    background: u.role === 'admin' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    {u.role}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                    ••• Encrypted
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersList;
