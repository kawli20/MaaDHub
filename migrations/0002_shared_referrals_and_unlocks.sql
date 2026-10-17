ALTER TABLE users ADD COLUMN referred_by TEXT REFERENCES users(clerk_user_id);

CREATE TABLE IF NOT EXISTS account_point_costs (
  account_id INTEGER PRIMARY KEY,
  points_cost INTEGER NOT NULL CHECK (points_cost > 0)
);

INSERT OR REPLACE INTO account_point_costs (account_id, points_cost) VALUES
  (93, 15),
  (95, 20);

CREATE TABLE IF NOT EXISTS account_unlocks (
  user_id TEXT NOT NULL REFERENCES users(clerk_user_id),
  account_id INTEGER NOT NULL,
  points_cost INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, account_id)
);

CREATE TRIGGER IF NOT EXISTS users_welcome_points
AFTER INSERT ON users
BEGIN
  INSERT INTO point_transactions (id, user_id, points_delta, reason)
  VALUES (lower(hex(randomblob(16))), NEW.clerk_user_id, 50, 'welcome');
END;

CREATE TRIGGER IF NOT EXISTS users_referral_rewards
AFTER INSERT ON users
WHEN NEW.referred_by IS NOT NULL
BEGIN
  UPDATE users SET points = points + 10 WHERE clerk_user_id = NEW.clerk_user_id;
  UPDATE users SET points = points + 10 WHERE clerk_user_id = NEW.referred_by;
  INSERT INTO referrals (invitee_user_id, inviter_user_id)
  VALUES (NEW.clerk_user_id, NEW.referred_by);
  INSERT INTO point_transactions (id, user_id, points_delta, reason)
  VALUES (lower(hex(randomblob(16))), NEW.clerk_user_id, 10, 'referral_bonus');
  INSERT INTO point_transactions (id, user_id, points_delta, reason)
  VALUES (lower(hex(randomblob(16))), NEW.referred_by, 10, 'referral_reward');
END;

CREATE TRIGGER IF NOT EXISTS account_unlock_balance_guard
BEFORE INSERT ON account_unlocks
BEGIN
  SELECT CASE
    WHEN NOT EXISTS (
      SELECT 1 FROM users
      WHERE clerk_user_id = NEW.user_id AND points >= NEW.points_cost
    ) THEN RAISE(ABORT, 'insufficient_points')
  END;
END;

CREATE TRIGGER IF NOT EXISTS account_unlock_deduct_points
AFTER INSERT ON account_unlocks
BEGIN
  UPDATE users SET points = points - NEW.points_cost WHERE clerk_user_id = NEW.user_id;
  INSERT INTO point_transactions (id, user_id, points_delta, reason)
  VALUES (lower(hex(randomblob(16))), NEW.user_id, -NEW.points_cost, 'unlock:' || NEW.account_id);
END;