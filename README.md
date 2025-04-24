```markdown
# ✨ AI Notes App

A powerful **AI-assisted note-taking web app** that helps users write, manage, and summarize their notes using AI! Built with **React (Vite)**, **TypeScript**, **Tailwind CSS**, and powered by **Supabase** for authentication and database management.

## 🌟 Features

- 📝 Create, edit, and delete notes.
- ⚡ AI-powered summary of notes using LLM (via Groq / OpenAI API).
- 🔒 User authentication (sign up, login, logout).
- 🔐 Supabase for backend DB & auth.
- 💨 Built with Vite for fast development.
- 🎨 Beautiful UI with TailwindCSS.
- ☁️ Deployed on Vercel.

## 🚀 Live Demo

👉 [Visit the live app](https://ai-notes-app-eosin.vercel.app/)

---

## 📸 Screenshots

![Dashboard View](https://github.com/manisaran30/AINotesAPP/assets/preview/dashboard.png)
> View all notes with summaries

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Supabase (Auth + Postgres)
- **Styling**: Tailwind CSS
- **AI**: Groq / Llama3 via API
- **Deployment**: Vercel

---

## 🧠 How It Works

1. User logs in using email/password (Supabase).
2. Can create new notes or update/delete existing ones.
3. Click "Summarize" to get an AI-generated summary using LLMs (like Llama3).
4. Summary is saved back into Supabase.

---

## 🔐 Environment Variables

Make sure to set up a `.env` file like below:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
VITE_AI_API_KEY=your-groq-api-key
VITE_AI_MODEL=llama3-70b-8192
```

---

## 🧪 Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/manisaran30/AINotesAPP
cd AINotesAPP

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
```

---

## 📦 Build

```bash
npm run build
npm run preview
```

---

## ⚡ Deployment

```bash
# Deploy with Vercel
vercel --prod
```

---

## 🙋‍♂️ Author

Made with ❤️ by [Manisaran](https://github.com/manisaran30)

---
