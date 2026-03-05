// ─────────────────────────────────────────────────────────────
//  REPOLORE BACKEND — Node.js + Express
//  Author: Keshav Purohit (TechMunda)
//  Email : Techmunda21@gmail.com
//  GitHub: https://github.com/Kpurohit007
// ─────────────────────────────────────────────────────────────

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// ─── MIDDLEWARE ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

// Rate limiter — 100 req per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Too many requests. Please try again later." },
});
app.use("/api/", limiter);

// Stricter limiter for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, error: "Too many contact submissions. Please wait an hour." },
});

// ─── IN-MEMORY STORE (replace with MongoDB/PostgreSQL in prod) ─
const messages = [];
const subscribers = new Set();

// ─── VALIDATION HELPERS ──────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str = "") {
  return str.trim().replace(/<[^>]*>/g, "").slice(0, 2000);
}

// ─── ROUTES ──────────────────────────────────────────────────

// GET /api/health
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ONLINE",
    version: "2.0.0",
    author: "Keshav Purohit (TechMunda)",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/stats — public repo stats
app.get("/api/stats", async (req, res) => {
  try {
    // Fetch live stats from GitHub public API
    const response = await fetch("https://api.github.com/users/Kpurohit007", {
      headers: {
        "User-Agent": "Repolore-Backend/2.0",
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });

    if (!response.ok) throw new Error("GitHub API error");
    const data = await response.json();

    res.json({
      success: true,
      data: {
        username: data.login,
        name: data.name,
        bio: data.bio,
        location: data.location,
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        avatarUrl: data.avatar_url,
        profileUrl: data.html_url,
        company: data.company,
        blog: data.blog,
        createdAt: data.created_at,
      },
    });
  } catch (err) {
    // Fallback static data
    res.json({
      success: true,
      data: {
        username: "Kpurohit007",
        name: "Keshav Purohit",
        bio: "Full Stack Developer | MCA Student at MIT WPU Pune",
        location: "Maharashtra, India",
        publicRepos: 32,
        followers: 4,
        following: 35,
        avatarUrl: "https://avatars.githubusercontent.com/u/122084995?v=4",
        profileUrl: "https://github.com/Kpurohit007",
        company: "TechMunda",
        blog: "https://techmundaportfolio.netlify.app/",
      },
      source: "cache",
    });
  }
});

// GET /api/repos — fetch top repos
app.get("/api/repos", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.github.com/users/Kpurohit007/repos?sort=stars&per_page=10&type=public",
      {
        headers: {
          "User-Agent": "Repolore-Backend/2.0",
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
        },
      }
    );

    if (!response.ok) throw new Error("GitHub API error");
    const repos = await response.json();

    const formatted = repos.map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      homepage: r.homepage,
      topics: r.topics,
      updatedAt: r.updated_at,
      isForked: r.fork,
    }));

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch repositories." });
  }
});

// POST /api/contact — submit a message
app.post("/api/contact", contactLimiter, (req, res) => {
  const { name, email, message } = req.body;

  // Validate
  const errors = [];
  if (!name || sanitize(name).length < 2) errors.push("Name must be at least 2 characters.");
  if (!email || !isValidEmail(email)) errors.push("A valid email is required.");
  if (!message || sanitize(message).length < 10) errors.push("Message must be at least 10 characters.");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const entry = {
    id: `msg_${Date.now()}`,
    name: sanitize(name),
    email: sanitize(email),
    message: sanitize(message),
    ip: req.ip,
    receivedAt: new Date().toISOString(),
  };

  messages.push(entry);

  console.log(`[CONTACT] New message from ${entry.name} <${entry.email}> at ${entry.receivedAt}`);

  // In production: send email via nodemailer / SendGrid here
  // await sendEmail({ to: "Techmunda21@gmail.com", subject: `New message from ${entry.name}`, text: entry.message });

  res.json({
    success: true,
    message: "Your message has been received! Keshav will get back to you soon.",
    id: entry.id,
  });
});

// POST /api/subscribe — newsletter
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ success: false, error: "Valid email required." });
  }
  const clean = email.toLowerCase().trim();
  if (subscribers.has(clean)) {
    return res.json({ success: true, message: "Already subscribed!" });
  }
  subscribers.add(clean);
  console.log(`[SUBSCRIBE] New subscriber: ${clean}`);
  res.json({ success: true, message: "Subscribed successfully!", count: subscribers.size });
});

// GET /api/generate — simulate SEO content generation
app.get("/api/generate", (req, res) => {
  const { repo = "myproject" } = req.query;

  const steps = [
    { step: 1, status: "fetching", message: `Fetching commits from ${repo}...` },
    { step: 2, status: "analyzing", message: "Analyzing PRs since last release..." },
    { step: 3, status: "extracting", message: "Extracting feature highlights..." },
    { step: 4, status: "generating", message: "Applying SEO_SKILLS_V2.0..." },
    {
      step: 5, status: "done",
      outputs: {
        "blog-post.md": { words: Math.floor(Math.random() * 800) + 800, status: "ready" },
        "changelog.md": { status: "ready" },
        "linkedin-post.txt": { status: "ready" },
      },
      duration: `${(Math.random() * 2 + 2).toFixed(1)}s`,
    },
  ];

  res.json({ success: true, repo, pipeline: steps });
});

// GET /api/messages — admin only (add auth in production!)
app.get("/api/messages", (req, res) => {
  const key = req.headers["x-admin-key"];
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, error: "Unauthorized." });
  }
  res.json({ success: true, count: messages.length, data: messages });
});

// ─── 404 ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.path} not found.` });
});

// ─── ERROR HANDLER ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({ success: false, error: "Internal server error." });
});

// ─── START ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║      REPOLORE BACKEND — v2.0.0           ║
  ║      Author: Keshav Purohit (TechMunda)  ║
  ║      Server: http://localhost:${PORT}        ║
  ╚══════════════════════════════════════════╝
  `);
});

module.exports = app;
