CREATE TABLE IF NOT EXISTS users (
  clerk_user_id TEXT PRIMARY KEY,
  referral_code TEXT NOT NULL UNIQUE,
  points INTEGER NOT NULL DEFAULT 50 CHECK (points >= 0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referrals (
  invitee_user_id TEXT PRIMARY KEY REFERENCES users(clerk_user_id),
  inviter_user_id TEXT NOT NULL REFERENCES users(clerk_user_id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (invitee_user_id <> inviter_user_id)
);

CREATE TABLE IF NOT EXISTS point_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(clerk_user_id),
  points_delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS point_transactions_user_created_idx
  ON point_transactions (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS referrals_inviter_idx
  ON referrals (inviter_user_id);