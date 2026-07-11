import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright & Usage — Shubhranshu Sudeepta Panda",
  description: "Copyright and permitted-use terms for the portfolio of Shubhranshu Sudeepta Panda.",
};

export default function CopyrightPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="monogram" href="/" aria-label="Return to portfolio">S<span>P</span></a>
        <a className="legal-back" href="/">Back to portfolio ↗</a>
      </header>

      <article className="legal-content">
        <p className="section-index">Copyright / Usage</p>
        <h1>Original work.<br /><em>All rights reserved.</em></h1>
        <p className="legal-intro">This portfolio is the personal work of Shubhranshu Sudeepta Panda. Its original design, written content, photographs, graphics, and presentation are protected and may not be copied or republished without permission.</p>

        <div className="legal-grid">
          <section>
            <span>01</span>
            <h2>Ownership</h2>
            <p>Unless otherwise identified, the original visual design, layout, copy, project descriptions, photographs, and branded graphics on this website belong to Shubhranshu Sudeepta Panda.</p>
          </section>
          <section>
            <span>02</span>
            <h2>Restricted use</h2>
            <p>You may not reproduce, adapt, distribute, sell, publish, or present substantial parts of this website as your own—including close recreations of its distinctive design and content—without prior written permission.</p>
          </section>
          <section>
            <span>03</span>
            <h2>Permitted use</h2>
            <p>You may link to this website, view it for personal or recruitment purposes, and quote brief excerpts with clear attribution and a link to the original page.</p>
          </section>
          <section>
            <span>04</span>
            <h2>Requests</h2>
            <p>For licensing, reuse, attribution, or copyright concerns, contact <a href="mailto:shubhranshusudeeptapanda@gmail.com">shubhranshusudeeptapanda@gmail.com</a>.</p>
          </section>
        </div>

        <footer className="legal-footer">
          <p>© 2026 Shubhranshu Sudeepta Panda. All rights reserved.</p>
          <p>Effective 11 July 2026</p>
        </footer>
      </article>
    </main>
  );
}
