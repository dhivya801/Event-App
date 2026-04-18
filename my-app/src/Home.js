import React from "react";
import "./Home.css";

function Home({ events, members, onNavigate }) {
  const today = new Date().toISOString().split("T")[0];
  const totalEvents = events.length;
  const upcomingEvents = events.filter((event) => event.date >= today).length;
  const pastEvents = events.filter((event) => event.date < today).length;
  const totalMembers = members.length;

  const nextEvent = events
    .filter((event) => event.date >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  const eventQuotes = [
    "Events are the memories we create together.",
    "Every event tells a story worth remembering.",
    "Great events happen when people come together.",
    "Your next unforgettable moment is just an event away.",
    "Events: Where planning meets perfection.",
  ];

  const randomQuote = eventQuotes[Math.floor(Math.random() * eventQuotes.length)];

  return (
    <div className="home-root">
      <div className="home-hero">
        <p className="home-hero-sub">✨ {getGreeting()}!</p>
        <h1>Let's Create Something <br/> Unforgettable Today.</h1>
        <div className="home-hero-quote">&ldquo;{randomQuote}&rdquo;</div>
      </div>

      <div className="home-stats">
        <div className="home-stat home-stat--total">
          <div className="emoji">📊</div>
          <h3>{totalEvents}</h3>
          <p>Total Events</p>
        </div>

        <div className="home-stat home-stat--upcoming">
          <div className="emoji">🚀</div>
          <h3>{upcomingEvents}</h3>
          <p>Upcoming</p>
        </div>

        <div className="home-stat home-stat--members">
          <div className="emoji">🤝</div>
          <h3>{totalMembers}</h3>
          <p>Active Members</p>
        </div>

        <div className="home-stat home-stat--past">
          <div className="emoji">🎞️</div>
          <h3>{pastEvents}</h3>
          <p>Archived</p>
        </div>
      </div>

      {nextEvent ? (
        <div className="home-next">
          <div className="home-next-info">
            <h2>Next Spotlight Event</h2>
            <h3>{nextEvent.title}</h3>
            <p>📅 Scheduled for {nextEvent.date}</p>
            <p>📍 {nextEvent.location}</p>
            <span className="next-event-badge">🎟️ Reservations Open</span>
          </div>
          <div className="big-emoji">🎭</div>
        </div>
      ) : (
        <div className="home-next" style={{ padding: '60px', textAlign: 'center', justifyContent: 'center' }}>
           <h3 style={{ margin: 0 }}>Ready to plan your next milestone?</h3>
        </div>
      )}

      <div>
        <h2 className="home-section-title">Ready to take action?</h2>
        <div className="home-actions">
          <div className="home-action-card" onClick={() => onNavigate("create")} style={{ cursor: 'pointer' }}>
            <div className="emoji">✨</div>
            <h4>Draft New Event</h4>
            <p>Start a new chapter for your club journey.</p>
          </div>

          <div className="home-action-card" onClick={() => onNavigate("upcoming")} style={{ cursor: 'pointer' }}>
            <div className="emoji">🚀</div>
            <h4>Explore Upcoming</h4>
            <p>See what's coming next and manage tickets.</p>
          </div>

          <div className="home-action-card" onClick={() => onNavigate("members")} style={{ cursor: 'pointer' }}>
            <div className="emoji">👥</div>
            <h4>Network Hub</h4>
            <p>Manage member registrations and roles.</p>
          </div>

          <div className="home-action-card" onClick={() => onNavigate("analytics")} style={{ cursor: 'pointer' }}>
            <div className="emoji">📈</div>
            <h4>Impact Report</h4>
            <p>View analytics and deep-dive into stats.</p>
          </div>
        </div>
      </div>

      <div className="home-tip" style={{ marginTop: '50px', background: 'rgba(255,255,255,0.4)', color: '#1e1b4b', border: '1px solid rgba(255,255,255,0.5)', opacity: 0.8 }}>
        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>💡 Pro-Tip: Consistently updating your event calendar keeps members engaged and active!</p>
      </div>
    </div>
  );
}

export default Home;
