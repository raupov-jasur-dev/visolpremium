# VisolPremium — Google Authentication

This version uses the same direct Google OAuth architecture as the working VisolPremium project.
It does **not** use xAI/Grok as the website's user-login provider.

## Vercel environment variables

Set these in the Vercel project before deploying:

- `VITE_AUTH_ENABLED=true`
- `BETTER_AUTH_URL=https://visolpremium.vercel.app`
- `BETTER_AUTH_SECRET=<long random secret>`
- `GOOGLE_CLIENT_ID=<Google OAuth client ID>`
- `GOOGLE_CLIENT_SECRET=<Google OAuth client secret>`
- `DATABASE_URL=<the PostgreSQL/Neon connection string used by this project>`

Do not put real secrets into the repository or `.env.example`.

## Google OAuth

Use the Google OAuth Web Application credentials associated with the working VisolPremium authentication setup.

The production callback should be the Better Auth Google callback on the production origin:

`https://visolpremium.vercel.app/api/auth/callback/google`

If the Google Cloud project already has the old VisolPremium OAuth client configured, reuse that client rather than creating a second unrelated login system.

## Important

The NEW project keeps its newer invitation/template/QR/meeting features. Only the user-authentication implementation was switched back to the direct Google OAuth approach.

Before production deployment, verify the Vercel environment variables and Google OAuth redirect configuration in the external dashboards, because those values cannot safely be embedded in source code.
