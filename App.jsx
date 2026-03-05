import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────
const REPOS = [
  {
    name: "AIML-Crop-Yield-Forecasting",
    desc: "Predictive system using AI/ML to forecast crop yields and analyse market demand-supply trends.",
    lang: "HTML",
    stars: 2,
    tags: ["AI/ML", "Python", "Agriculture"],
    url: "https://github.com/Kpurohit007/AIML-Driven-Crop-Yield-and-Market-Demand-Supply-Forecasting",
  },
  {
    name: "weatherForcast",
    desc: "Real-time weather forecast website showing current conditions with live credentials.",
    lang: "CSS",
    stars: 1,
    tags: ["Weather", "API", "CSS"],
    url: "https://github.com/Kpurohit007/weatherForcast",
  },
  {
    name: "Resume",
    desc: "Dynamic resume generator with email co-ordination built in.",
    lang: "HTML",
    stars: 1,
    tags: ["Resume", "HTML", "Email"],
    url: "https://github.com/Kpurohit007/Resume",
  },
  {
    name: "coming-soon-",
    desc: "A sleek coming soon landing page template for product launches.",
    lang: "JavaScript",
    stars: 1,
    tags: ["Landing Page", "JS"],
    url: "https://github.com/Kpurohit007/coming-soon-",
  },
  {
    name: "ChaosWeb",
    desc: "Build something crazy — a creative chaos-driven web experiment playground.",
    lang: "JavaScript",
    stars: 1,
    tags: ["Creative", "JavaScript"],
    url: "https://github.com/Kpurohit007/ChaosWeb",
  },
  {
    name: "code-alpha-",
    desc: "Internship project — exploring core web technologies and frontend patterns.",
    lang: "HTML",
    stars: 1,
    tags: ["Internship", "HTML"],
    url: "https://github.com/Kpurohit007/code-alpha-",
  },
];

const SKILLS = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟩" },
  { name: "Python", icon: "🐍" },
  { name: "MongoDB", icon: "🍃" },
  { name: "MySQL", icon: "🐬" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "AWS", icon: "☁️" },
  { name: "Java", icon: "☕" },
  { name: "JavaScript", icon: "🟨" },
  { name: "PHP", icon: "🔵" },
  { name: "Linux", icon: "🐧" },
  { name: "Figma", icon: "🎨" },
  { name: "GenAI", icon: "🤖" },
  { name: "Hadoop", icon: "🐘" },
];

const TICKER_ITEMS = [
  "FULL_STACK_DEV", "MCA_STUDENT", "MIT_WPU_PUNE", "REACT_DEVELOPER",
  "NODE_JS", "AI_ML", "AWS_LEARNER", "GENAI", "OPEN_SOURCE",
  "SEO_CONTENT_FOR_AGENTS", "TECHMUNDA", "KESHAV_PUROHIT",
  "FULL_STACK_DEV", "MCA_STUDENT", "MIT_WPU_PUNE", "REACT_DEVELOPER",
  "NODE_JS", "AI_ML", "AWS_LEARNER", "GENAI", "OPEN_SOURCE",
  "SEO_CONTENT_FOR_AGENTS", "TECHMUNDA", "KESHAV_PUROHIT",
];

// ─── HOOKS ──────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, visible, suffix = "+") {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const step = target / 60;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [visible, target]);
  return val >= target ? target + suffix : val;
}

// ─── COMPONENTS ─────────────────────────────────────────────

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["#home", "#about", "#repos", "#skills", "#contact"];
  const labels = ["HOME", "ABOUT", "REPOS", "SKILLS", "CONTACT"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 40px",
      background: scrolled ? "rgba(6,10,15,0.96)" : "rgba(6,10,15,0.7)",
      backdropFilter: "blur(14px)",
      borderBottom: scrolled ? "1px solid rgba(0,255,136,0.2)" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <span style={{ width: 9, height: 9, background: "#00ff88", borderRadius: "50%", boxShadow: "0 0 10px #00ff88", animation: "pulse 2s infinite", display: "inline-block" }} />
        <span style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "1rem", color: "#e8f4ff" }}>REPOLORE</span>
      </a>
      {/* Desktop */}
      <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="nav-desktop">
        {links.map((l, i) => (
          <li key={l}>
            <a href={l} style={{
              fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem",
              color: active === l ? "#00ff88" : "#b0c4d8",
              textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#00ff88"}
              onMouseLeave={e => e.target.style.color = active === l ? "#00ff88" : "#b0c4d8"}
            >{labels[i]}</a>
          </li>
        ))}
      </ul>
      <a href="https://github.com/Kpurohit007" target="_blank" rel="noreferrer" style={{
        fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", padding: "8px 18px",
        border: "1px solid #00ff88", color: "#00ff88", textDecoration: "none",
        letterSpacing: "0.1em", transition: "all 0.2s", background: "transparent",
      }}
        onMouseEnter={e => { e.target.style.background = "#00ff88"; e.target.style.color = "#060a0f"; }}
        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#00ff88"; }}
      >// GITHUB</a>
    </nav>
  );
}

function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Open-source SEO content generation skills for AI agents. Transform PRs and commits into compelling blog posts, changelogs, and social content.";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, []);

  const [ref, visible] = useInView(0.1);
  const stars = useCounter(2400, visible, "+");
  const contributors = useCounter(180, visible, "+");
  const uptime = useCounter(99, visible, "%");

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px 40px 80px", textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,255,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px", animation: "gridshift 20s linear infinite",
      }} />
      <div style={{
        position: "absolute", width: 900, height: 900,
        background: "radial-gradient(ellipse,rgba(0,255,136,0.07) 0%,transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      <div style={{
        fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem",
        color: "#00ff88", border: "1px solid rgba(0,255,136,0.2)", padding: "6px 16px",
        letterSpacing: "0.2em", marginBottom: 40, animation: "fadeInDown 0.8s ease both", position: "relative",
      }}>
        ● &gt; OPEN_SOURCE // SEO_SKILLS_V2.0
      </div>

      <h1 style={{ position: "relative", animation: "fadeInUp 0.8s 0.2s ease both" }}>
        <span style={{
          display: "block",
          fontFamily: "'Orbitron',monospace", fontWeight: 900,
          fontSize: "clamp(2.5rem,8vw,6rem)", color: "#e8f4ff", lineHeight: 1, letterSpacing: "-0.02em",
        }}>SEO_CONTENT</span>
        <span style={{
          display: "block",
          fontFamily: "'Orbitron',monospace", fontWeight: 900,
          fontSize: "clamp(2.5rem,8vw,6rem)", color: "#00ff88", lineHeight: 1, letterSpacing: "-0.02em",
          textShadow: "0 0 40px rgba(0,255,136,0.4),0 0 80px rgba(0,255,136,0.2)",
        }}>FOR_AGENTS</span>
      </h1>

      <p style={{
        fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(0.78rem,1.8vw,0.95rem)",
        color: "#b0c4d8", maxWidth: 600, lineHeight: 1.9, margin: "32px auto 48px",
        animation: "fadeInUp 0.8s 0.4s ease both", position: "relative", minHeight: 80,
      }}>
        <span style={{ color: "#00ff88" }}>&gt; </span>
        {typedText}<span style={{ borderLeft: "2px solid #00ff88", animation: "blink 1s step-end infinite", marginLeft: 2 }} />
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", animation: "fadeInUp 0.8s 0.6s ease both", position: "relative" }}>
        <a href="https://github.com/Kpurohit007" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 36px", background: "#00ff88", color: "#060a0f", border: "none", cursor: "pointer", fontWeight: "bold", textDecoration: "none", transition: "all 0.2s", display: "inline-block" }}
          onMouseEnter={e => { e.target.style.boxShadow = "0 0 30px rgba(0,255,136,0.4)"; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.target.style.boxShadow = "none"; e.target.style.transform = "none"; }}
        >VIEW_ON_GITHUB</a>
        <a href="#repos"
          style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 36px", background: "transparent", color: "#c84bff", border: "1px solid #c84bff", cursor: "pointer", textDecoration: "none", transition: "all 0.2s", display: "inline-block" }}
          onMouseEnter={e => { e.target.style.background = "rgba(200,75,255,0.12)"; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.transform = "none"; }}
        >VIEW_REPOS</a>
      </div>

      <div ref={ref} style={{
        display: "flex", gap: 48, marginTop: 80, paddingTop: 40,
        borderTop: "1px solid rgba(0,255,136,0.18)", animation: "fadeInUp 0.8s 0.8s ease both", position: "relative",
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {[
          { val: stars, label: "GitHub Stars" },
          { val: contributors, label: "Commits+" },
          { val: uptime, label: "Uptime %" },
          { val: "∞", label: "Free Forever" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontFamily: "'Orbitron',monospace", fontSize: "2rem", fontWeight: 900, color: "#00ff88" }}>{s.val}</span>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#b0c4d8", textTransform: "uppercase", display: "block", marginTop: 4 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div style={{ background: "#0a0f16", borderTop: "1px solid rgba(0,255,136,0.15)", borderBottom: "1px solid rgba(0,255,136,0.15)", padding: "11px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", gap: 64, animation: "ticker 35s linear infinite", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#00cc6a", letterSpacing: "0.1em" }}>
        {TICKER_ITEMS.map((t, i) => (
          <span key={i}><span style={{ color: "#00ff88" }}>&gt; </span>{t}</span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const [ref, visible] = useInView();
  return (
    <section id="about" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: "all 0.7s ease" }}>
        <div>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#00ff88", letterSpacing: "0.25em", marginBottom: 14 }}>// ABOUT_ME</div>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#e8f4ff", lineHeight: 1.15, marginBottom: 20 }}>
            HI, I'M <span style={{ color: "#00ff88" }}>KESHAV PUROHIT</span>
          </h2>
          <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.05rem", color: "#b0c4d8", lineHeight: 1.8, marginBottom: 20 }}>
            Full Stack Developer and MCA Student at <strong style={{ color: "#e8f4ff" }}>MIT WPU Pune</strong>. Passionate about building end-to-end solutions and crafting seamless user experiences.
          </p>
          <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.05rem", color: "#b0c4d8", lineHeight: 1.8, marginBottom: 32 }}>
            Currently working on <strong style={{ color: "#00ff88" }}>MAA Kiradu Die Cutting Android App</strong> and actively learning <strong style={{ color: "#c84bff" }}>LLM, AWS, GenAI & Pipelines</strong>. Founder of TechMunda.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="https://techmundaportfolio.netlify.app/" target="_blank" rel="noreferrer"
              style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem", padding: "10px 22px", background: "#00ff88", color: "#060a0f", textDecoration: "none", fontWeight: "bold", letterSpacing: "0.12em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.boxShadow = "0 0 20px rgba(0,255,136,0.4)"; }}
              onMouseLeave={e => { e.target.style.boxShadow = "none"; }}
            >PORTFOLIO_SITE</a>
            <a href="https://www.linkedin.com/in/keshav-purohit-a2a36525b/" target="_blank" rel="noreferrer"
              style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem", padding: "10px 22px", border: "1px solid rgba(0,255,136,0.35)", color: "#00ff88", textDecoration: "none", letterSpacing: "0.12em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "rgba(0,255,136,0.08)"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; }}
            >LINKEDIN</a>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {[
            { label: "UNIVERSITY", val: "MIT WPU Pune" },
            { label: "DEGREE", val: "MCA" },
            { label: "LOCATION", val: "Maharashtra, IN" },
            { label: "ROLE", val: "Full Stack Dev" },
            { label: "FOCUS", val: "LLM / GenAI" },
            { label: "BRAND", val: "TechMunda" },
          ].map(item => (
            <div key={item.label} style={{
              background: "#0a0f16", border: "1px solid rgba(0,255,136,0.1)", padding: "20px 18px",
              transition: "border-color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,255,136,0.1)"}
            >
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#00ff88", letterSpacing: "0.2em", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "#e8f4ff" }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RepoCard({ repo, index }) {
  const [ref, visible] = useInView(0.1);
  return (
    <a href={repo.url} target="_blank" rel="noreferrer" ref={ref} style={{
      textDecoration: "none",
      background: "#0f1520", border: "1px solid rgba(0,255,136,0.12)", padding: "28px",
      display: "block", position: "relative", overflow: "hidden",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
      transition: `opacity 0.6s ${index * 0.08}s ease, transform 0.6s ${index * 0.08}s ease, border-color 0.3s`,
      cursor: "pointer",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.45)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.12)"; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#00ff88,transparent)", opacity: 0 }} className="top-line" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", color: "#e8f4ff", letterSpacing: "0.06em" }}>{repo.name}</span>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: "#00ff88" }}>★ {repo.stars}</span>
      </div>
      <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", color: "#b0c4d8", lineHeight: 1.6, marginBottom: 16 }}>{repo.desc}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {repo.tags.map(t => (
          <span key={t} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", padding: "3px 10px", border: "1px solid rgba(200,75,255,0.3)", color: "#c84bff", letterSpacing: "0.1em" }}>{t}</span>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.63rem", color: "#4a5568" }}>{repo.lang}</span>
      </div>
    </a>
  );
}

function Repos() {
  const [ref, visible] = useInView();
  return (
    <section id="repos" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto", background: "#060a0f" }}>
      <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.6s ease" }}>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#00ff88", letterSpacing: "0.25em", marginBottom: 14 }}>// REPOSITORIES</div>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#e8f4ff", marginBottom: 14 }}>
          POPULAR <span style={{ color: "#00ff88" }}>PROJECTS</span>
        </h2>
        <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.05rem", color: "#b0c4d8", maxWidth: 560, marginBottom: 56, lineHeight: 1.7 }}>
          A selection of open-source repositories crafted by Keshav Purohit — spanning AI/ML, web dev, and tooling.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 20 }}>
        {REPOS.map((r, i) => <RepoCard key={r.name} repo={r} index={i} />)}
      </div>
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <a href="https://github.com/Kpurohit007?tab=repositories" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.78rem", padding: "12px 32px", border: "1px solid rgba(0,255,136,0.35)", color: "#00ff88", textDecoration: "none", letterSpacing: "0.12em", transition: "all 0.2s", display: "inline-block" }}
          onMouseEnter={e => { e.target.style.background = "rgba(0,255,136,0.08)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
        >VIEW_ALL_32_REPOS →</a>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, visible] = useInView();
  return (
    <section id="skills" style={{ padding: "100px 40px", background: "#0a0f16", borderTop: "1px solid rgba(0,255,136,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.6s ease", marginBottom: 56 }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#00ff88", letterSpacing: "0.25em", marginBottom: 14 }}>// LANGUAGES_AND_TOOLS</div>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#e8f4ff" }}>
            TECH <span style={{ color: "#00ff88" }}>STACK</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12 }}>
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, delay }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0f1520" : "#060a0f",
        border: `1px solid ${hovered ? "rgba(0,255,136,0.5)" : "rgba(0,255,136,0.12)"}`,
        padding: "20px 16px", textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ${delay}s, transform 0.5s ${delay}s, all 0.25s`,
        cursor: "default",
      }}>
      <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{skill.icon}</div>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: hovered ? "#00ff88" : "#b0c4d8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{skill.name}</div>
    </div>
  );
}

function Terminal() {
  const lines = [
    { type: "prompt", text: "~/repolore $ npx repolore generate --repo AIML-Crop" },
    { type: "output", text: "⠸ Fetching commits from main branch..." },
    { type: "output", text: "⠸ Analyzing PRs since last release..." },
    { type: "success", text: "✓ Extracted 12 feature highlights" },
    { type: "success", text: "✓ Generated keyword clusters" },
    { type: "success", text: "✓ Applied SEO_SKILLS_V2.0" },
    { type: "blank", text: "" },
    { type: "label", text: "OUTPUT" },
    { type: "output", text: "→ blog-post.md         1,240 words" },
    { type: "output", text: "→ changelog.md         ready" },
    { type: "output", text: "→ linkedin-post.txt    ready" },
    { type: "blank", text: "" },
    { type: "done", text: "✓ Done in 3.2s" },
  ];
  const [shown, setShown] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), shown === 0 ? 300 : 220);
    return () => clearTimeout(t);
  }, [visible, shown]);

  const color = { prompt: "#e8f4ff", output: "#b0c4d8", success: "#00ff88", blank: "", label: "#00ff88", done: "#00ff88" };
  return (
    <div ref={ref} style={{ background: "#000", border: "1px solid rgba(0,255,136,0.2)", boxShadow: "0 0 60px rgba(0,255,136,0.08)" }}>
      <div style={{ background: "#0f1520", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(0,255,136,0.15)" }}>
        {[{ c: "#ff5f57" }, { c: "#febc2e" }, { c: "#28c840" }].map(d => (
          <div key={d.c} style={{ width: 10, height: 10, borderRadius: "50%", background: d.c }} />
        ))}
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: "#4a5568", margin: "0 auto" }}>terminal — repolore</span>
      </div>
      <div style={{ padding: 24, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", lineHeight: 2.1, minHeight: 300 }}>
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} style={{ color: color[l.type] || "#b0c4d8" }}>
            {l.type === "prompt" && <><span style={{ color: "#00ff88" }}>~/repolore </span>{l.text.replace("~/repolore ", "")}</>}
            {l.type === "label" && <><span style={{ color: "#00ff88" }}>OUTPUT</span></>}
            {!["prompt", "label"].includes(l.type) && l.text}
          </div>
        ))}
        {shown > 0 && shown < lines.length && <span style={{ borderLeft: "2px solid #00ff88", animation: "blink 1s step-end infinite", marginLeft: 2 }} />}
        {shown >= lines.length && <span style={{ borderLeft: "2px solid #00ff88", animation: "blink 1s step-end infinite", marginLeft: 2 }} />}
      </div>
    </div>
  );
}

function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("MESSAGE_SENT ✓");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("ERROR — try again.");
      }
    } catch {
      setStatus("BACKEND_OFFLINE — message noted locally.");
    }
    setLoading(false);
    setTimeout(() => setStatus(""), 4000);
  };

  const inputStyle = {
    background: "#0a0f16", border: "1px solid rgba(0,255,136,0.2)",
    padding: "12px 16px", color: "#e8f4ff", fontFamily: "'Share Tech Mono',monospace",
    fontSize: "0.78rem", outline: "none", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "100px 40px", background: "#060a0f", borderTop: "1px solid rgba(0,255,136,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#00ff88", letterSpacing: "0.25em", marginBottom: 14 }}>// CONTACT</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: "#e8f4ff", marginBottom: 16 }}>
              GET IN <span style={{ color: "#00ff88" }}>TOUCH</span>
            </h2>
            <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.05rem", color: "#b0c4d8", lineHeight: 1.8, marginBottom: 36 }}>
              Building something amazing? Want to collaborate? Feel free to reach out directly.
            </p>
            <Terminal />
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "EMAIL", val: "Techmunda21@gmail.com", href: "mailto:Techmunda21@gmail.com" },
                { label: "LINKEDIN", val: "keshav-purohit-a2a36525b", href: "https://www.linkedin.com/in/keshav-purohit-a2a36525b/" },
                { label: "GITHUB", val: "Kpurohit007", href: "https://github.com/Kpurohit007" },
                { label: "PORTFOLIO", val: "techmundaportfolio.netlify.app", href: "https://techmundaportfolio.netlify.app/" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", gap: 16, alignItems: "center", textDecoration: "none", fontFamily: "'Share Tech Mono',monospace", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <span style={{ fontSize: "0.6rem", color: "#00ff88", letterSpacing: "0.2em", minWidth: 80 }}>{c.label}</span>
                  <span style={{ fontSize: "0.75rem", color: "#b0c4d8" }}>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#00ff88", letterSpacing: "0.2em", marginBottom: 8 }}>// SEND_MESSAGE</div>
            {[
              { id: "name", label: "NAME", placeholder: "Your name", type: "text" },
              { id: "email", label: "EMAIL", placeholder: "your@email.com", type: "email" },
            ].map(f => (
              <div key={f.id}>
                <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#00ff88", letterSpacing: "0.18em", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} required value={form[f.id]} placeholder={f.placeholder}
                  onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#00ff88"}
                  onBlur={e => e.target.style.borderColor = "rgba(0,255,136,0.2)"}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#00ff88", letterSpacing: "0.18em", display: "block", marginBottom: 6 }}>MESSAGE</label>
              <textarea required rows={5} value={form.message} placeholder="Your message..."
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "#00ff88"}
                onBlur={e => e.target.style.borderColor = "rgba(0,255,136,0.2)"}
              />
            </div>
            <button type="submit" disabled={loading}
              style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px", background: loading ? "#00cc6a" : "#00ff88", color: "#060a0f", border: "none", cursor: loading ? "wait" : "pointer", fontWeight: "bold", transition: "all 0.2s" }}
              onMouseEnter={e => { if (!loading) e.target.style.boxShadow = "0 0 25px rgba(0,255,136,0.4)"; }}
              onMouseLeave={e => e.target.style.boxShadow = "none"}
            >
              {loading ? "SENDING..." : "SEND_MESSAGE →"}
            </button>
            {status && <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem", color: status.includes("✓") ? "#00ff88" : "#ffa500", letterSpacing: "0.1em" }}>{status}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0a0f16", borderTop: "1px solid rgba(0,255,136,0.15)", padding: "48px 40px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, paddingBottom: 36, borderBottom: "1px solid rgba(0,255,136,0.12)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, background: "#00ff88", borderRadius: "50%", boxShadow: "0 0 8px #00ff88" }} />
              <span style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "1.05rem", color: "#e8f4ff" }}>REPOLORE</span>
            </div>
            <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", color: "#b0c4d8", lineHeight: 1.7, marginBottom: 18, maxWidth: 340 }}>
              Open-source SEO content generation skills for AI agents. Built by Keshav Purohit — TechMunda.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["100%_OPEN_SOURCE", "FREE_FOREVER", "MIT_LICENSE"].map((b, i) => (
                <span key={b} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", padding: "3px 10px", border: `1px solid ${i === 1 ? "rgba(200,75,255,0.3)" : "rgba(0,255,136,0.25)"}`, color: i === 1 ? "#c84bff" : "#00cc6a", letterSpacing: "0.08em" }}>{b}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "#00ff88", letterSpacing: "0.2em", marginBottom: 18 }}>PRODUCT</div>
            {["Features", "How It Works", "Repos", "Pricing"].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <a href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", color: "#b0c4d8", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#00ff88"}
                  onMouseLeave={e => e.target.style.color = "#b0c4d8"}
                >{l}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "#00ff88", letterSpacing: "0.2em", marginBottom: 18 }}>COMMUNITY</div>
            {[
              { label: "GitHub", href: "https://github.com/Kpurohit007" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/keshav-purohit-a2a36525b/" },
              { label: "Portfolio", href: "https://techmundaportfolio.netlify.app/" },
              { label: "Contact", href: "#contact" },
            ].map(l => (
              <div key={l.label} style={{ marginBottom: 10 }}>
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : ""} rel="noreferrer"
                  style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", color: "#b0c4d8", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#00ff88"}
                  onMouseLeave={e => e.target.style.color = "#b0c4d8"}
                >{l.label}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "#4a5568" }}>
            © 2026 REPOLORE // MADE WITH ❤ BY <span style={{ color: "#00ff88" }}>KESHAV PUROHIT (TECHMUNDA)</span>
          </span>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "#4a5568" }}>
            MAHARASHTRA, INDIA
          </span>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href="#home" style={{
      position: "fixed", bottom: 32, right: 32, width: 44, height: 44,
      background: "#0a0f16", border: "1px solid rgba(0,255,136,0.25)",
      color: "#00ff88", display: "flex", alignItems: "center", justifyContent: "center",
      textDecoration: "none", zIndex: 500, fontSize: "1.1rem",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)",
      transition: "all 0.3s", pointerEvents: visible ? "auto" : "none",
    }}
      onMouseEnter={e => { e.target.style.background = "#00ff88"; e.target.style.color = "#060a0f"; }}
      onMouseLeave={e => { e.target.style.background = "#0a0f16"; e.target.style.color = "#00ff88"; }}
    >↑</a>
  );
}

// ─── APP ────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#060a0f;color:#b0c4d8;overflow-x:hidden;font-family:'Rajdhani',sans-serif;}
        html{scroll-behavior:smooth;}
        body::before{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.035) 2px,rgba(0,0,0,0.035) 4px);pointer-events:none;z-index:9999;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#060a0f;}
        ::-webkit-scrollbar-thumb{background:#00cc6a;border-radius:3px;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.8);}}
        @keyframes gridshift{0%{transform:translateY(0);}100%{transform:translateY(60px);}}
        @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes fadeInDown{from{opacity:0;transform:translateY(-20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @media(max-width:768px){
          .nav-desktop{display:none!important;}
          section{padding:60px 20px!important;}
          #about .grid-2,#contact .grid-2{grid-template-columns:1fr!important;}
        }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Repos />
      <Skills />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
