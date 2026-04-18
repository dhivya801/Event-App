const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());   // ⭐ MUST BE THERE

const PORT = 5000;

/* Fake DB */
let users = [
  { email: "admin@admin.com", password: "admin", role: "admin" },
  { email: "john.doe@example.com", password: "password123", role: "user" },
  { email: "sydney_smith@techcorp.com", password: "password123", role: "user" },
  { email: "michael.w@startup.io", password: "password123", role: "user" },
  { email: "designer_amy@studio.com", password: "password123", role: "user" }
];



/* SIGNUP */
app.post("/signup", (req, res) => {
  console.log("Signup request:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing data" });
  }

  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.json({ success: false, message: "User already exists" });
  }

  users.push({ email, password, role: "user" });

  res.json({ success: true, message: "Signup successful" });
});

/* LOGIN */
app.post("/login", (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const password = (req.body.password || "").trim();

  // Master override for the admin account: Any password works
  if (email === "admin@admin.com") {
    return res.json({ success: true, message: "Login successful", role: "admin" });
  }

  const user = users.find(
    u => u.email.toLowerCase() === email && u.password === password
  );

  if (user) {
    res.json({ success: true, message: "Login successful", role: user.role });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

/* GET ALL USERS */
app.get("/users", (req, res) => {
  res.json(users);
});

/* Fake DB Extensions */
let events = [
  { id: 1, title: "Tech Meetup", date: "2026-05-10", location: "Convention Center", attendees: 120, status: "upcoming" },
  { id: 2, title: "Design Sprint", date: "2026-05-15", location: "Innovation Hub", attendees: 45, status: "upcoming" },
  { id: 3, title: "AI Workshop", date: "2026-06-01", location: "Online", attendees: 300, status: "upcoming" }
];

let pastEvents = [
  { id: 101, title: "Startup Pitch 2025", date: "2025-11-20", location: "Main Hall", rating: 4.8, attendees: 150 },
  { id: 102, title: "React Conf 2025", date: "2025-09-10", location: "City Center", rating: 4.9, attendees: 500 }
];

let sponsors = [
  { id: 1, name: "TechCorp", tier: "Gold", contribution: "$10,000" },
  { id: 2, name: "Designify", tier: "Silver", contribution: "$5,000" },
  { id: 3, name: "CloudNet", tier: "Bronze", contribution: "$2,000" }
];

let notifications = [
  { id: 1, message: "New event posted: AI Workshop", read: false },
  { id: 2, message: "TechCorp sponsored the upcoming meetup!", read: true },
  { id: 3, message: "Reminder: Design Sprint starts tomorrow", read: false }
];

/* EVENTS API */
app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  const newEvent = { id: Date.now(), ...req.body };
  events.push(newEvent);
  res.json({ success: true, message: "Event added", event: newEvent });
});

app.delete("/events/:id", (req, res) => {
  events = events.filter(e => e.id !== parseInt(req.params.id));
  res.json({ success: true, message: "Event deleted" });
});

/* PAST EVENTS API */
app.get("/past-events", (req, res) => {
  res.json(pastEvents);
});

/* SPONSORS API */
app.get("/sponsors", (req, res) => {
  res.json(sponsors);
});

/* NOTIFICATIONS API */
app.get("/notifications", (req, res) => {
  res.json(notifications);
});

app.post("/notifications/mark-read", (req, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.json({ success: true, message: "All notifications marked as read" });
});

/* ANALYTICS API */
app.get("/analytics", (req, res) => {
  res.json({
    totalUsers: users.length,
    totalEvents: events.length,
    upcomingEvents: events.length,
    pastEvents: pastEvents.length,
    activeSponsors: sponsors.length
  });
});

/* HOME - API AGGREGATION */
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running ✅",
    collections: {
      users,
      events,
      pastEvents,
      sponsors,
      notifications
    }
  });
});

app.listen(PORT, () => {
  console.log("Backend is running 🚀");
});