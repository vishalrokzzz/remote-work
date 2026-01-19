# SprintHack 🚀  
**Async-first engineering updates with AI-powered context awareness**

🔗 **Deployed Link:** https://sprinthack-remote.vercel.app/

## 🎥 Demo Video:

A short walkthrough demonstrating the core workflow, AI-assisted insights, and system design decisions.

▶️ Watch here: https://www.loom.com/share/afa304e81eaa4b17bc650d9aa7df35f4



---

## 📌 Overview

SprintHack is an **async engineering status board** designed for modern, remote-first teams.  
Instead of constant standups, pings, and interruptions, SprintHack enables engineers to share daily updates asynchronously while intelligently surfacing **who can help when blockers arise**.

The system emphasizes:
- clear ownership
- async collaboration
- production-ready engineering practices

Built as a **solo project** during the *Sprintfour Innovation Hackathon 2025*, SprintHack won **1st place** for its scope, system design, and execution.

---

## 🎯 Problem Statement

Remote teams struggle with:
- constant context switching
- unclear ownership of blockers
- inefficient help discovery (“Who worked on this before?”)

Traditional status tools collect updates but fail to provide **actionable context**.

---

## 💡 Solution

SprintHack combines **structured async updates** with **context-aware insights**:

### Core capabilities
- Daily async status updates (focus, blockers, help needed)
- AI-assisted blocker classification
- Context matching to suggest teammates who recently worked on similar issues
- Clear visibility without disrupting workflows

---

## ✨ Features

### 📝 Daily Status Updates
- Focus
- Blockers
- Help-needed flag

### 🤖 AI-Powered Insights
- Classifies blockers (infra, API, tooling, etc.)
- Estimates severity
- Suggests teammates with recent relevant context
- Falls back to deterministic matching when AI is unavailable

### 👥 Team Feed
- Real-time async team updates
- Clear visibility into who needs help

### 📊 Personal History
- View your own recent status updates
- Track patterns over time

### 🔐 Secure by Default
- Row Level Security (RLS) enforced at database layer
- Users can only access permitted data

---

## 🧠 System Design

### Frontend
- **Next.js (App Router)** + **TypeScript**
- Server Actions for mutations and reads
- Clean separation of client and server concerns

### Authentication & Sessions
- **Clerk**
  - Authentication
  - Session management
  - User identity propagation into backend

### Database & Backend
- **Supabase (Postgres)**
  - Normalized schema
  - Foreign keys & indexes
  - Unique constraints (1 status per user per day)
  - Row Level Security (RLS) policies

### AI Layer
- AI-assisted blocker classification
- Context matching layered on **real team activity**, not just static LLM output
- Graceful degradation to keyword-based matching

### Observability
- **Sentry**
  - Runtime error tracking
  - Production-grade observability
  - Fail-fast error handling

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Auth:** Clerk
- **Database:** Supabase (Postgres)
- **AI:** Context-aware analysis (LLM + deterministic fallback)
- **Observability:** Sentry
- **Deployment:** Vercel

---

## 🏆 Hackathon Context

- **Event:** Sprintfour Innovation Hackathon 2025
- **Format:** Solo hackathon (9 AM – 4 PM)
- **Evaluation Criteria:**
  - Problem clarity
  - System design
  - Clean Git history
  - Production mindset
  - Working prototype

SprintHack secured **🥇 1st place** among all submissions.

---

## 📚 Key Learnings

- Async-first workflows scale better than synchronous status checks
- Database-enforced security (RLS) simplifies application logic
- AI is most effective when paired with real system context
- Clean commits and architecture matter as much as features

---

## 🚀 Getting Started (Local)

```bash
git clone https://github.com/vishalrokzzz/remote-work.git
cd remote-work
npm install
npm run dev
