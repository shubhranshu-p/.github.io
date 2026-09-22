"use client";

import { FormEvent, useEffect, useState } from "react";

const RESUME_VIEW =
  "https://drive.google.com/file/d/1hy_lUuQK2epuYE9-V7tBLvkokLrhNtJC/view?usp=sharing";
const RESUME_DOWNLOAD = "/Shubhranshu_Sudeepta_Panda_Resume.pdf";
const EMAIL = "shubhranshusudeeptapanda@gmail.com";

const skills = [
  { title: "Languages", items: "Java · SQL" },
  {
    title: "Backend",
    items: "Spring Boot · Spring Security · REST APIs · Spring Data JPA",
  },
  {
    title: "Data & tools",
    items: "MySQL · Git · GitHub · Maven · Postman · IntelliJ IDEA",
  },
  {
    title: "Foundations",
    items: "DSA · OOP · DBMS · Operating Systems · Computer Networks",
  },
];

const projects = [
  {
    number: "01",
    title: "IncidentFlow",
    category: "Incident management",
    description:
      "A planned backend for routing support tickets from the first report to resolution.",
    points: [
      "Ticket assignments, priorities & status workflows",
      "Role-based access, comments & SLA tracking",
    ],
    stack: ["Java", "Spring Boot", "MySQL"],
    icon: "incident",
  },
  {
    number: "02",
    title: "EventHub",
    category: "Event booking & ticketing",
    description:
      "A planned booking system focused on reliable reservations and consistent seat availability.",
    points: [
      "Event schedules, bookings & cancellations",
      "Secure roles & transactional seat reservations",
    ],
    stack: ["Java", "Spring Security", "Spring Data JPA"],
    icon: "event",
  },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4" />
      </>
    ),
    location: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    moon: <path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z" />,
    incident: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h5M8 17h3" />
      </>
    ),
    event: (
      <>
        <path d="M8 3v4m8-4v4M4 10h16" />
        <rect x="4" y="5" width="16" height="16" rx="3" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    let initial: "light" | "dark" = "light";
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") initial = stored;
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        initial = "dark";
    } catch {
      /* Use the default when storage is unavailable. */
    }
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* The toggle still works without persistence. */
    }
  }

  function sendMail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="Shubhranshu home">
            <span className="monogram">
              sp<span>.</span>
            </span>
            <span className="brand-name">Shubhranshu Panda</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#projects">Projects</a>
            <a href="#about">About & skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <button
              className="theme-button"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              <Icon name={theme === "light" ? "moon" : "sun"} />
            </button>
            <a
              className="header-resume"
              href={RESUME_VIEW}
              target="_blank"
              rel="noreferrer"
            >
              Resume <Icon name="arrow" size={17} />
            </a>
          </div>
        </div>
      </header>

      <main id="main" className="container">
        <section className="hero" id="home" aria-labelledby="intro-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> Java backend developer
            </p>
            <h1 id="intro-title">
              Shubhranshu
              <br />
              <span>Sudeepta Panda.</span>
            </h1>
            <p className="intro">
              Computer Science graduate focused on Java, Spring Boot, and the
              systems behind thoughtful software.
            </p>
            <p className="location">
              <Icon name="location" size={17} /> Umerkote, Odisha, India
            </p>
            <div className="hero-actions">
              <a className="button primary" href={RESUME_DOWNLOAD} download>
                Download resume <Icon name="download" size={18} />
              </a>
              <a className="button secondary" href="#contact">
                Let’s connect <Icon name="arrow" size={18} />
              </a>
            </div>
          </div>
          <div className="profile">
            <div className="portrait-frame">
              <img
                src="/profile.jpg"
                alt="Shubhranshu Sudeepta Panda"
                width="1024"
                height="1024"
                fetchPriority="high"
              />
            </div>
            <div className="profile-caption">
              <span>VIT–AP University</span>
              <span>B.Tech CSE · 2026</span>
            </div>
          </div>
        </section>

        <section
          className="projects section"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / What’s next</p>
              <h2 id="projects-title">
                Projects on the horizon<span>.</span>
              </h2>
            </div>
            <p>Two backend systems I’m planning to build.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-top">
                  <span className="project-icon">
                    <Icon name={project.icon} size={24} />
                  </span>
                  <span className="project-number">{project.number}</span>
                </div>
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-scope">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="project-bottom">
                  <div className="tags">
                    {project.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="code-note">Code to follow</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="about section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / A little about me</p>
              <h2 id="about-title">
                Curiosity, with a technical foundation<span>.</span>
              </h2>
            </div>
          </div>
          <div className="about-grid">
            <div className="skills-column">
              <p className="about-intro">
                I’m interested in how good backend design makes software
                dependable: clear APIs, well-structured data, and careful
                handling of the details.
              </p>
              <div className="skill-list">
                {skills.map((skill) => (
                  <div className="skill-row" key={skill.title}>
                    <h3>{skill.title}</h3>
                    <p>{skill.items}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="credentials">
              <article className="education" id="education">
                <p className="mini-label">
                  Education <span>2022–2026</span>
                </p>
                <h3>Vellore Institute of Technology, AP</h3>
                <p>B.Tech in Computer Science & Engineering</p>
                <p className="education-meta">
                  Amaravati, India{" "}
                  <span>
                    CGPA <strong>8.02 / 10</strong>
                  </span>
                </p>
              </article>
              <article className="achievement">
                <span className="rank">
                  67<span>th</span>
                </span>
                <div>
                  <h3>PromptWars × Global Prompt Challenge</h3>
                  <p>Top 80 · Score 89.31 / 100</p>
                  <p className="achievement-host">
                    DEVENGERS · Hack2Skill · Google for Developers
                  </p>
                </div>
              </article>
              <div className="certifications">
                <p className="mini-label">Certifications</p>
                <p>Microsoft Certified: Azure AI Fundamentals</p>
                <p>Oracle Cloud Infrastructure 2025 Foundations Associate</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="contact section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-row">
            <div>
              <p className="eyebrow">03 / Get in touch</p>
              <h2 id="contact-title">
                Let’s start a conversation<span>.</span>
              </h2>
              <a className="email-link" href={`mailto:${EMAIL}`}>
                {EMAIL} <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="socials">
              <a
                href="https://github.com/shubhranshu-p"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Icon name="arrow" size={17} />
              </a>
              <a
                href="https://linkedin.com/in/shubhranshupanda"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <Icon name="arrow" size={17} />
              </a>
            </div>
          </div>
          <details className="contact-form">
            <summary>
              Prefer to write a message here? <span aria-hidden="true">+</span>
            </summary>
            <form onSubmit={sendMail}>
              <div className="form-fields">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell me about the role, idea, or collaboration…"
                  rows={3}
                  required
                />
              </label>
              <div className="form-bottom">
                <p>Opens a draft in your email app.</p>
                <button className="button primary" type="submit">
                  Open email draft <Icon name="mail" size={18} />
                </button>
              </div>
            </form>
          </details>
        </section>
      </main>
      <footer className="site-footer container">
        <p>© {new Date().getFullYear()} Shubhranshu Sudeepta Panda</p>
        <div>
          <a href="/copyright/">Copyright & usage</a>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
