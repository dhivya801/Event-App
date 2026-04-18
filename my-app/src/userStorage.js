const STORAGE_VERSION = "v1";

export const SESSION_EMAIL_KEY = "eventecho_session_email";
export const SESSION_ROLE_KEY = "eventecho_session_role";

function userDataKey(email) {
  const safe = String(email).trim().toLowerCase();
  return `eventecho_data_${STORAGE_VERSION}_${safe}`;
}

export function getDefaultUserData() {
  return {
    events: [
      { id: 1, title: "React Developer Conference", date: "2026-05-15", location: "San Francisco, CA", description: "Annual conference for React developers." },
      { id: 2, title: "Annual Tech Meetup", date: "2026-06-20", location: "New York, NY", description: "Networking event for tech enthusiasts." },
      { id: 3, title: "Photography Workshop", date: "2026-04-10", location: "Chicago, IL", description: "Learn advanced photography techniques." },
      { id: 4, title: "Startup Pitch Night", date: "2026-07-05", location: "Austin, TX", description: "Watch startups pitch to investors." }
    ],
    members: [],
    notifications: [],
    reports: [],
    settings: { clubName: "", contactEmail: "", notifications: true },
    tickets: [],
    sponsors: [],
    profile: { name: "", bio: "" },
    feedback: [],
  };
}

export function loadUserData(email) {
  if (!email) return getDefaultUserData();
  try {
    const raw = localStorage.getItem(userDataKey(email));
    if (!raw) return getDefaultUserData();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultUserData(),
      ...parsed,
      settings: { ...getDefaultUserData().settings, ...(parsed.settings || {}) },
      tickets: parsed.tickets || [],
      sponsors: parsed.sponsors || [],
    };
  } catch {
    return getDefaultUserData();
  }
}

export function saveUserData(email, data) {
  if (!email) return;
  try {
    localStorage.setItem(userDataKey(email), JSON.stringify(data));
  } catch (e) {
    console.warn("EventEcho: could not save data", e);
  }
}

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}
