# IdeaVault 💡

A platform where visionaries share innovative ideas, get community feedback, and connect with investors.

🔗 **Live Demo:** [idea-vault-delta.vercel.app](https://idea-vault-delta.vercel.app)

---

## Screenshots

> Homepage with trending ideas, how it works section, and testimonials.

---

## Features

- 🔐 Email & Google OAuth sign in (Better Auth)
- 💡 Browse all ideas with search & category filter
- 📄 Paginated idea listing (6 per page)
- 🔥 Trending ideas section on homepage
- ➕ Submit your own idea with image, budget, tags & more
- ✏️ Edit and delete your own ideas
- 💬 Comment on ideas
- 📋 View your comment history in My Interactions
- 👤 User profile page
- 📱 Fully responsive design

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Banner, Trending Ideas, How It Works, Testimonials |
| `/ideas` | Browse all ideas with search & category filter |
| `/ideas/[id]` | Idea details with full breakdown and comments |
| `/myidea` | Your own ideas with edit/delete (protected) |
| `/myinteractions` | Your comment history (protected) |
| `/addidea` | Submit a new idea (protected) |
| `/profile` | User profile page |
| `/signin` | Sign in with email or Google |
| `/signup` | Create a new account |
| `/forgot-password` | Password reset |

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | Better Auth v1.6 |
| UI Components | HeroUI |
| Icons | React Icons |
| Notifications | React Toastify |
| Database (Auth) | MongoDB |
| Deployment | Vercel |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fatematz/idea-vault.git
cd idea-vault
```

### 2. Install dependencies

```bash
npm install
```
