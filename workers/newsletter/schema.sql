CREATE TABLE IF NOT EXISTS subscribers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT NOT NULL UNIQUE,
  role        TEXT NOT NULL,
  company     TEXT NOT NULL,
  region      TEXT,
  country     TEXT,
  referrer    TEXT,
  user_agent  TEXT,
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscribers_role       ON subscribers(role);
CREATE INDEX IF NOT EXISTS idx_subscribers_region     ON subscribers(region);
CREATE INDEX IF NOT EXISTS idx_subscribers_country    ON subscribers(country);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);
