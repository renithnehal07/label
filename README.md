# LABEL

A fashion collab platform with three workflows:

- **Business** — post brand deals, review applicants + portfolios, choose a
  creator, chat, and pay (with Label's platform fee shown in the breakdown).
- **Creator** — get verified, link Instagram + upload a resume, browse and
  apply to brand deals with a pitch + portfolio, track application status.
- **Community** (skill-swap only) — anyone (including creators and brands)
  can post "I offer X, I want Y" and trade skills directly, no payment.

Also included: a verification-flow prototype (business reg. number / creator
Instagram + resume -> instant demo approval), a Support tab with a
keyword-matched FAQ bot and a Report-a-Scam form, and sample seed data so the
app is demoable immediately on first load.

## Honest limits of this prototype (say this at your hackathon demo)

- **Verification** is a UI flow only — it approves instantly for the demo.
  A real version needs a third-party ID/business verification provider
  (e.g. Stripe Identity, Persona) checked server-side.
- **Payments** are simulated — no real money moves. A real version needs a
  payment processor (e.g. Stripe Connect) and a backend.
- **Nothing persists** — all data (deals, applications, chats, reports)
  lives in memory and resets on refresh. There's no backend or database yet,
  so there's nothing to "secure" in a real sense — that's the next build
  step, not something a frontend-only prototype can claim.
- The **FAQ bot** is simple keyword matching against a small local FAQ list,
  not a real AI model.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173).

## Project structure

- `src/App.jsx` — the whole app (all screens & roles)
- `src/aesthetic.css` — black/cream style reference sheet
- `src/index.css` — Tailwind imports
- `src/main.jsx` — React entry point

## Pushing to GitHub

```bash
git init
git add .
git commit -m "LABEL prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## Deploying a live demo link (optional)

Sign in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
with GitHub, import this repo, leave defaults, deploy.
