# REPOLORE — SEO_CONTENT FOR_AGENTS

> Open-source SEO content generation skills for AI agents.  
> **Built by Keshav Purohit (TechMunda)**  
> GitHub: https://github.com/Kpurohit007  
> Portfolio: https://techmundaportfolio.netlify.app/

---

## 🗂 Project Structure

```
repolore/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── App.jsx    # Full single-file React app
│   │   └── main.jsx   # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/           # Node.js + Express API
│   ├── server.js      # Main backend server
│   ├── .env.example   # Environment variables template
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # Edit .env with your values
npm run dev            # Starts on http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev            # Starts on http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description                         |
|--------|-------------------|-------------------------------------|
| GET    | /api/health       | Server health check                 |
| GET    | /api/stats        | Live GitHub profile stats           |
| GET    | /api/repos        | Top public repositories             |
| POST   | /api/contact      | Submit a contact message            |
| POST   | /api/subscribe    | Newsletter subscription             |
| GET    | /api/generate     | SEO content generation simulation   |
| GET    | /api/messages     | Admin: view all messages (auth req) |

### Example: Contact Form

```bash
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello Keshav!"}'
```

### Example: GitHub Stats

```bash
curl http://localhost:4000/api/stats
```

---

## 🔧 Environment Variables (backend/.env)

| Variable      | Description                              | Default                |
|---------------|------------------------------------------|------------------------|
| PORT          | Server port                              | 4000                   |
| CLIENT_URL    | React app URL for CORS                   | http://localhost:5173  |
| GITHUB_TOKEN  | GitHub PAT (boosts rate limits)          | optional               |
| ADMIN_KEY     | Secret key for /api/messages endpoint    | required               |

---

## 🧱 Tech Stack

**Frontend**: React 18, Vite, CSS-in-JS (inline styles), Orbitron + Share Tech Mono fonts  
**Backend**: Node.js, Express 4, Helmet, CORS, express-rate-limit, Morgan  
**API**: GitHub REST API v3  

---

## 📦 Production Deployment

### Frontend → Vercel / Netlify
```bash
cd frontend && npm run build
# Deploy the /dist folder
```

### Backend → Railway / Render / VPS
```bash
cd backend
# Set NODE_ENV=production and all env vars
npm start
```

---

## 📄 License

MIT — Free Forever  
© 2026 REPOLORE by **Keshav Purohit (TechMunda)**
