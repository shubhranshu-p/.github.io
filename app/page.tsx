"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const RESUME_VIEW = "https://drive.google.com/file/d/1gf6ShgwjFwXQIQp3Canz-3aY57gUEHQS/view?usp=sharing";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1gf6ShgwjFwXQIQp3Canz-3aY57gUEHQS";

const skills = [
  { n: "01", title: "Languages", items: ["Java", "SQL"] },
  { n: "02", title: "Backend", items: ["Spring Boot", "REST APIs", "Spring Data JPA", "Spring Scheduler"] },
  { n: "03", title: "Database", items: ["MySQL", "Relational Design", "CRUD Operations"] },
  { n: "04", title: "Tools", items: ["Git", "GitHub", "Maven", "Postman", "IntelliJ IDEA"] },
  { n: "05", title: "Core CS", items: ["DSA", "OOP", "DBMS", "Operating Systems", "Networks"] },
  { n: "06", title: "Practice", items: ["API Design", "Validation", "Exception Handling", "Structured Responses"] },
];

// Add project links here when ready — empty string shows a "coming soon" tag instead.
const projects = [
  {
    n: "01",
    date: "Sep 2025",
    title: "IncidentFlow",
    subtitle: "Smart Incident and Complaint Routing API",
    stack: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    points: [
      "Creates, assigns, tracks, and resolves tickets across departments with status and priority workflows.",
      "Models users, departments, incidents, comments, and assignments with validation and structured responses.",
      "Adds SLA tracking, flexible filtering, and dashboard analytics by status, priority, department, and deadline.",
    ],
    code: "",
    demo: "",
  },
  {
    n: "02",
    date: "Nov 2025",
    title: "WatchTower",
    subtitle: "Website and API Uptime Monitoring System",
    stack: ["Java", "Spring Boot", "MySQL", "Spring Scheduler"],
    points: [
      "Tracks availability, response time, status codes, and downtime history for websites and APIs.",
      "Runs scheduled background checks with Spring Scheduler and stores every monitoring result.",
      "Provides monitor, alert, downtime, analytics, and dashboard APIs with uptime and response-time metrics.",
    ],
    code: "",
    demo: "",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const resumeRef = useRef<HTMLDivElement>(null);
  const resumeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function closeResume(event: MouseEvent) {
      if (resumeRef.current && !resumeRef.current.contains(event.target as Node)) setResumeOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && resumeOpen) {
        setResumeOpen(false);
        resumeButtonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", closeResume);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeResume);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [resumeOpen]);

  function sendMail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:shubhranshusudeeptapanda@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <a className="monogram" href="#home" aria-label="Shubhranshu home">S<span>P</span></a>
        <p className="top-status"><i /> Available for opportunities</p>
        <div className="resume-control" ref={resumeRef}>
          <button ref={resumeButtonRef} type="button" aria-expanded={resumeOpen} aria-controls="resume-menu" onClick={() => setResumeOpen(!resumeOpen)}>Resume <span aria-hidden="true">{resumeOpen ? "−" : "+"}</span></button>
          <div className={`resume-menu ${resumeOpen ? "is-open" : ""}`} id="resume-menu" hidden={!resumeOpen}>
            <a href={RESUME_VIEW} target="_blank" rel="noreferrer">View resume <Arrow /></a>
            <a href={RESUME_DOWNLOAD}>Download PDF <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <button className="theme-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">
          {theme === "dark" ? "Light" : "Dark"} <span aria-hidden="true">◐</span>
        </button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="menu">Menu <b>{menuOpen ? "×" : "+"}</b></button>
      </header>

      <nav id="menu" className={`overlay-menu ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {["About", "Skills", "Education", "Projects", "Contact"].map((item, i) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}><small>0{i + 1}</small>{item}<Arrow /></a>
        ))}
        <div className="mobile-resume">
          <a href={RESUME_VIEW} target="_blank" rel="noreferrer">View resume <Arrow /></a>
          <a href={RESUME_DOWNLOAD}>Download PDF <span aria-hidden="true">↓</span></a>
        </div>
      </nav>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <p className="kicker">Java backend developer · Bhubaneswar, India</p>
          <h1><span>Shubhranshu</span><span>Sudeepta Panda</span></h1>
          <div className="hero-bottom">
            <p>I build dependable backend systems with thoughtful APIs, clean data models, and code that stays understandable.</p>
            <a className="round-link" href="#about" aria-label="Explore my portfolio">Explore <span>↓</span></a>
          </div>
          <div className="backend-orbit" aria-hidden="true">
            <div className="orbit-ring ring-outer"><i className="orbit-node node-api">API</i><i className="orbit-node node-db">DB</i></div>
            <div className="orbit-ring ring-middle"><i className="orbit-node node-rest">REST</i><span className="request-pulse pulse-one" /><span className="request-pulse pulse-two" /></div>
            <div className="orbit-ring ring-inner"><i className="orbit-node node-java">JAVA</i></div>
            <div className="orbit-core"><span>200</span><small>OK</small></div>
          </div>
        </section>

        <section className="marquee" aria-label="Specialities"><div>JAVA <i>✦</i> SPRING BOOT <i>✦</i> REST APIs <i>✦</i> MYSQL <i>✦</i> JAVA <i>✦</i> SPRING BOOT <i>✦</i></div></section>

        <section className="about section" id="about">
          <p className="section-index">01 / About</p>
          <div className="about-layout reveal">
            <div className="portrait-wrap">
              <div className="portrait-frame"><img src="/profile.jpg" alt="Shubhranshu Sudeepta Panda" width="1024" height="1024" loading="eager" /></div>
              <span className="portrait-note">B.Tech CSE · 2026</span>
            </div>
            <div className="about-copy">
              <h2>Engineering the parts users <em>don&apos;t</em> see.</h2>
              <p className="lead">I&apos;m a final-year Computer Science student at VIT Amaravati, focused on the quiet machinery behind good products.</p>
              <div className="split-copy"><p>My work centers on Java and Spring Boot: shaping REST endpoints, modeling relational data, handling validation, and keeping responses predictable.</p><p>I keep the fundamentals close—DSA, OOP, DBMS, operating systems, and networks—because strong systems begin beneath the framework.</p></div>
            </div>
          </div>
        </section>

        <section className="skills section" id="skills">
          <p className="section-index">02 / Capabilities</p>
          <div className="section-title-row reveal"><h2>A toolkit for<br />reliable systems.</h2><p>From request to response, database to deployment.</p></div>
          <div className="skill-list">
            {skills.map((skill) => <article className="skill-row" key={skill.n}><span>{skill.n}</span><h3>{skill.title}</h3><p>{skill.items.join(" · ")}</p><b aria-hidden="true">+</b></article>)}
          </div>
        </section>

        <section className="education section" id="education">
          <p className="section-index">03 / Education</p>
          <div className="education-grid reveal">
            <div className="edu-intro"><h2>Learning with<br /><em>intent.</em></h2><p>Building a technical foundation through coursework, certification, and hands-on practice.</p></div>
            <div className="timeline">
              <article><time>2022—2026</time><div><p>B.Tech · Computer Science & Engineering</p><h3>Vellore Institute of Technology, Amaravati</h3></div></article>
              <article><time>Certified</time><div><p>Cloud · AI · Analytics</p><h3>Professional Learning</h3><ul><li>Oracle Cloud Infrastructure Foundations</li><li>Microsoft Azure AI Fundamentals</li><li>Google Analytics Certification</li></ul></div></article>
            </div>
          </div>
        </section>

        <section className="projects section" id="projects">
          <p className="section-index">04 / Selected work</p>
          <div className="section-title-row reveal"><h2>Backend work,<br /><em>built with intent.</em></h2><p>Two systems designed around real operational workflows, reliable data, and useful APIs.</p></div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row reveal" key={project.n}>
                <div className="project-side">
                  <span className="project-num">{project.n}</span>
                  <span className="project-date">{project.date}</span>
                </div>
                <div className="project-main">
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <div className="project-tags">
                    {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <ul>
                    {project.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <div className="project-links">
                    {project.code
                      ? <a href={project.code} target="_blank" rel="noreferrer">View code <Arrow /></a>
                      : <span className="link-soon">Code — coming soon</span>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <Arrow /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <p className="section-index">05 / Contact</p>
          <div className="contact-head reveal"><p>Have a role, idea, or collaboration in mind?</p><h2>Let&apos;s make it<br /><em>work.</em></h2></div>
          <div className="contact-bottom">
            <form onSubmit={sendMail}>
              <label><span>01</span> What&apos;s your name?<input name="name" type="text" placeholder="Your name" required /></label>
              <label><span>02</span> Your email?<input name="email" type="email" placeholder="you@example.com" required /></label>
              <label><span>03</span> Tell me about it<textarea name="message" placeholder="A quick overview..." rows={2} required /></label>
              <button type="submit">Open email draft <Arrow /></button>
            </form>
            <div className="socials"><p>Elsewhere</p><a href="https://github.com/shubhranshu-p" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://linkedin.com/in/shubhranshupanda" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="mailto:shubhranshusudeeptapanda@gmail.com">Email <Arrow /></a></div>
          </div>
        </section>
      </main>

      <footer><a className="monogram" href="#home">S<span>P</span></a><p>Designed &amp; built for the next opportunity.</p><a href="#home">Back to top ↑</a><small>© {new Date().getFullYear()} Shubhranshu Sudeepta Panda. All rights reserved. <a href="/copyright">Copyright &amp; usage</a></small></footer>
    </>
  );
}
