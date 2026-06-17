# Tech Community

## Demo & login

| | |
|---|---|
| **Live app** | https://tech-community-mackaylarodriguezs-projects.vercel.app |
| **Demo video** | [Paste your video link here](https://) |
| **Demo email** | `demo@gmail.com` |
| **Demo password** | `Demo1234!` |

---

## Screenshots

Add 2–3 PNG screenshots to `docs/screenshots/` with these filenames, then they will show here automatically.

| Home — browse & filter | Opportunity detail modal | Add / edit (logged in) |
|:---:|:---:|:---:|
| ![Home page](docs/screenshots/home.png) | ![Detail modal](docs/screenshots/detail-modal.png) | ![Add opportunity form](docs/screenshots/add-form.png) |

**Suggested captures:**
1. **home.png** — main page with the opportunity grid and category filter  
2. **detail-modal.png** — card popup with full description and location  
3. **add-form.png** — add/edit modal or logged-in navbar  

---

## Project description

**Tech Community** is a full-stack resource board where people in tech can browse, share, and manage opportunities—internships, programs, events, learning resources, and more.

**Theme:** Community resource board for the Web Developer Apprenticeship (718 Digital Labs / The Knowledge House). Users can discover opportunities by category, see organization and location details, and (when logged in) add their own listings. Only the person who created a resource can edit or delete it.

**What you can do:**
- Browse all opportunities (no login required)
- Filter by category (Software Engineering, Web Development, Cybersecurity, etc.)
- Register / log in to add opportunities
- Click a card to open full details in a popup
- Edit or delete only your own posts

---

## Tech stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (React), CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | bcrypt + JWT (custom, not Supabase Auth) |
| **Deployment** | Vercel (client), Render (server), Supabase (DB) |

The frontend talks **only** to the Express API via `fetch()`. It never connects to Supabase directly.

---

## Bonus features included

### Authentication (user login/accounts)
- Email/password registration and login
- Passwords hashed with **bcrypt** before storage
- **JWT** tokens for session management
- Protected routes: create, update, and delete require a valid token
- **Resource ownership:** only the creator can edit/delete their posts
- Public read: anyone can view the list without logging in

**Why:** Keeps auth logic on the Express server alongside the rest of the API, avoids vendor lock-in to Supabase Auth, and demonstrates core security concepts (hashing, tokens, middleware, authorization).

### Responsive / mobile design
- 4-column grid on laptop, 2 on tablet, 1 on phone
- Navbar auth controls adapt for small screens
- Modals for details and add/edit forms work on mobile

**Why:** Opportunities are often browsed on a phone; the layout uses CSS Grid and media queries so the app stays usable at any screen size.

---

## How to run locally

**Easiest:** open the **Live app** link at the top. Nothing to install.

To run the **frontend** on your computer (optional):

```bash
git clone https://github.com/mackaylarodriguez/tech-community.git
cd tech-community/client
npm install
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**.

That's it — no backend, database, or Supabase setup. The local frontend uses the deployed API on Render.

---

## Project structure

```
tech-community/
├── client/          # Next.js frontend
│   ├── app/         # Pages and global styles
│   ├── components/  # UI components
│   └── lib/         # API helpers, auth, constants
├── server/          # Express backend
│   ├── controllers/
│   ├── middleware/  # JWT auth middleware
│   ├── routes/
│   └── db/
└── README.md
```

---

## API overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/resources` | No | List all opportunities |
| POST | `/api/resources` | Yes | Create opportunity |
| PUT | `/api/resources/:id` | Yes | Update (owner only) |
| DELETE | `/api/resources/:id` | Yes | Delete (owner only) |
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Log in, receive JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/health` | No | Server + DB health check |

---

## Known bugs & limitations

- **Render free tier cold starts:** The API may take 30–60 seconds to respond if it has been idle.
- **Legacy resources:** Posts created before auth may have no `user_id` or `location`; any logged-in user can edit/delete those until they are updated.
- **JWT in localStorage:** Tokens are stored in the browser's localStorage (simple for learning; httpOnly cookies would be more secure in production).
- **No password reset:** Users cannot recover a forgotten password yet.
- **No automated tests:** The app was tested manually via the UI and Thunder Client.

---

## What I'd do differently / add with more time

- **Automated tests** — Jest + supertest for API routes (register, login, protected CRUD)
- **Password reset** — email flow for forgotten passwords
- **Filter by location** — e.g. Remote, NYC, etc.
- **httpOnly cookie auth** — more secure than localStorage for JWTs
- **Toast notifications** — replace browser `alert()` for errors and success messages
- **Skeleton loading states** — placeholder cards while data loads
- **Architecture diagram** — visual auth flow for documentation

---

## Author

Mackayla Rodriguez — Web Developer Apprenticeship, The Knowledge House / 718 Digital Labs
