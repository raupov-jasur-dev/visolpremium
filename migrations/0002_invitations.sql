CREATE TABLE IF NOT EXISTS invitations (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  user_id text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  template_id text NOT NULL,
  title text NOT NULL,
  data jsonb NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS invitations_user_id_idx ON invitations (user_id);
CREATE INDEX IF NOT EXISTS invitations_updated_at_idx ON invitations (updated_at DESC);
CREATE TABLE IF NOT EXISTS rsvps (
  id text PRIMARY KEY,
  invitation_id text NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  attending boolean NOT NULL,
  guests_count integer NOT NULL DEFAULT 1,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rsvps_invitation_id_idx ON rsvps (invitation_id);
CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON rsvps (created_at DESC);
