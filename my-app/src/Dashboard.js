import React, { useState, useEffect, useCallback } from "react";

import Home from "./Home";
import CreateEvent from "./CreateEvent";
import EventList from "./EventList";
import UpcomingEvents from "./UpcomingEvents";
import PastEvents from "./PastEvents";
import Calendar from "./Calendar";
import Members from "./Members";
import Notifications from "./Notifications";
import Reports from "./Reports";
import Settings from "./Settings";
import MyTickets from "./MyTickets";
import Analytics from "./Analytics";
import Sponsors from "./Sponsors";
import Feedback from "./Feedback";
import UsersList from "./UsersList";
import Profile from "./Profile";
import { loadUserData, saveUserData, getDefaultUserData } from "./userStorage";

function Dashboard({ userEmail, userRole, onLogout }) {
  const [page, setPage] = useState("home");
  const [hydrated, setHydrated] = useState(false);

  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  const [settings, setSettings] = useState(getDefaultUserData().settings);
  const [tickets, setTickets] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [profile, setProfile] = useState(getDefaultUserData().profile);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (!userEmail) return;
    const data = loadUserData(userEmail);
    setEvents(data.events);
    setMembers(data.members);
    setNotifications(data.notifications);
    setReports(data.reports);
    setSettings(data.settings);
    setTickets(data.tickets || []);
    setSponsors(data.sponsors || []);
    setProfile(data.profile || getDefaultUserData().profile);
    setFeedbackList(data.feedback || []);
    setHydrated(true);
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail || !hydrated) return;
    saveUserData(userEmail, {
      events,
      members,
      notifications,
      reports,
      settings,
      tickets,
      sponsors,
      profile,
      feedback: feedbackList,
    });
  }, [userEmail, hydrated, events, members, notifications, reports, settings, tickets, sponsors, profile, feedbackList]);

  const addEvent = useCallback((newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message: `New event created: ${newEvent.title}` },
    ]);
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  const addMember = useCallback((memberName) => {
    setMembers((prev) => [...prev, { id: Date.now(), name: memberName }]);
  }, []);

  const deleteMember = useCallback((memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  }, []);

  const updateSettings = useCallback((next) => {
    setSettings((prev) => ({ ...prev, ...next }));
  }, []);

  const addTicket = useCallback((ticketData) => {
    setTickets((prev) => [...prev, ticketData]);
  }, []);

  const deleteTicket = useCallback((ticketId) => {
    setTickets((prev) => prev.filter((t) => t.id !== ticketId));
  }, []);

  const addSponsor = useCallback((sponsorData) => {
    setSponsors((prev) => [...prev, sponsorData]);
  }, []);

  const addFeedback = useCallback((text) => {
    setFeedbackList((prev) => [...prev, { id: Date.now(), text }]);
  }, []);

  const deleteFeedback = useCallback((id) => {
    setFeedbackList((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const updateProfile = useCallback((next) => {
    setProfile((prev) => ({ ...prev, ...next }));
  }, []);

  const renderPage = () => {
    switch (page) {
      case "create":
        return <CreateEvent addEvent={addEvent} />;
      case "events":
        return <EventList events={events} deleteEvent={deleteEvent} userRole={userRole} />;
      case "upcoming":
        return <UpcomingEvents events={events} deleteEvent={deleteEvent} userRole={userRole} addTicket={addTicket} />;
      case "past":
        return <PastEvents events={events} deleteEvent={deleteEvent} />;
      case "calendar":
        return <Calendar events={events} />;
      case "tickets":
        return <MyTickets tickets={tickets} deleteTicket={deleteTicket} />;
      case "analytics":
        return <Analytics events={events} tickets={tickets} />;
      case "sponsors":
        return <Sponsors sponsors={sponsors} addSponsor={addSponsor} />;
      case "feedback":
        return <Feedback feedbackList={feedbackList} addFeedback={addFeedback} deleteFeedback={deleteFeedback} />;
      case "users":
        return <UsersList />;
      case "members":
        return <Members members={members} addMember={addMember} deleteMember={deleteMember} />;
      case "notifications":
        return <Notifications events={events} />;
      case "reports":
        return <Reports events={events} reports={reports} />;
      case "settings":
        return <Settings settings={settings} onSave={updateSettings} />;
      case "profile":
        return (
          <Profile 
            userEmail={userEmail} 
            userRole={userRole} 
            profile={profile} 
            onSave={updateProfile}
            stats={{
              eventsCount: events.length,
              ticketsCount: tickets.length,
              sponsorsCount: sponsors.length
            }}
          />
        );
      default:
        return <Home events={events} members={members} onNavigate={setPage} />;
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>EventEcho</h2>
          <span>Premium Management</span>
        </div>

        <nav className="nav-group">
          <div className="nav-group-label">General</div>
          <button
            type="button"
            className={page === "home" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("home")}
          >
            <span className="nav-icon">🏠</span> Home
          </button>

          <button
            type="button"
            className={page === "create" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("create")}
          >
            <span className="nav-icon">✨</span> Create Event
          </button>

          <button
            type="button"
            className={page === "calendar" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("calendar")}
          >
            <span className="nav-icon">📅</span> Calendar
          </button>

          <button
            type="button"
            className={page === "events" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("events")}
          >
            <span className="nav-icon">📋</span> Event List
          </button>
        </nav>

        <nav className="nav-group">
          <div className="nav-group-label">Personal</div>
          <button
            type="button"
            className={page === "profile" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("profile")}
          >
            <span className="nav-icon">👤</span> My Profile
          </button>
          <button
            type="button"
            className={page === "upcoming" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("upcoming")}
          >
            <span className="nav-icon">🚀</span> Upcoming
          </button>
          <button
            type="button"
            className={page === "past" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("past")}
          >
            <span className="nav-icon">⏳</span> Past Events
          </button>
          <button
            type="button"
            className={page === "tickets" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("tickets")}
          >
            <span className="nav-icon">🎟️</span> My Tickets
          </button>
          <button
            type="button"
            className={page === "notifications" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("notifications")}
          >
            <span className="nav-icon">🔔</span> Notifications
          </button>
          <button
            type="button"
            className={page === "feedback" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("feedback")}
          >
            <span className="nav-icon">💬</span> Feedback
          </button>
        </nav>

        {userRole === "admin" && (
          <nav className="nav-group">
            <div className="nav-group-label">Admin Panel</div>
            <button
              type="button"
              className={page === "members" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("members")}
            >
              <span className="nav-icon">👥</span> Members
            </button>
            <button
              type="button"
              className={page === "users" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("users")}
            >
              <span className="nav-icon">🛡️</span> Registered Users
            </button>
            <button
              type="button"
              className={page === "analytics" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("analytics")}
            >
              <span className="nav-icon">📈</span> Analytics
            </button>
            <button
              type="button"
              className={page === "sponsors" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("sponsors")}
            >
              <span className="nav-icon">🤝</span> Sponsors
            </button>
            <button
              type="button"
              className={page === "reports" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("reports")}
            >
              <span className="nav-icon">📊</span> Reports
            </button>
            <button
              type="button"
              className={page === "settings" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("settings")}
            >
              <span className="nav-icon">⚙️</span> Settings
            </button>
          </nav>
        )}

        <button type="button" className="nav-btn nav-btn--logout" onClick={onLogout}>
          <span className="nav-icon">🚪</span> Log out
        </button>
      </div>

      <main className="content">
        <div className="content-inner">{renderPage()}</div>
      </main>
    </div>
  );
}

export default Dashboard;
