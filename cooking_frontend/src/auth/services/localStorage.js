// wrapper to store with optional expiration
export const setItem = (key, value, expMins = null) => {
  const item = { value, timestamp: Date.now() };
  if (expMins) item.expiration = expMins * 60 * 1000;
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = (key) => {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const { value, timestamp, expiration } = JSON.parse(raw);
  if (expiration && Date.now() > timestamp + expiration) {
    localStorage.removeItem(key);
    return null;
  }
  return value;
};

export const setUserData = (u) => setItem('user', u);
export const setAuthToken = (t, m = 60) => setItem('token', t, m);
