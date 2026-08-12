'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioData, hasSupabaseEnv } from '../lib/portfolio';
import { fallbackPortfolio } from '../lib/fallback-data';

const navItems = [
  { href: '#projects', label: 'Projets' },
  { href: '#tech', label: 'Technos' },
  { href: '#about', label: 'Profil' },
  { href: '#contact', label: 'Contact' },
];

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [loading, setLoading] = useState(hasSupabaseEnv);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('#about');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    if (!hasSupabaseEnv) {
      setLoading(false);
      return undefined;
    }

    async function loadPortfolio() {
      setLoading(true);
      const result = await fetchPortfolioData();

      if (!isMounted) {
        return;
      }

      if (result.error) {
        setError(result.error);
        setPortfolio(fallbackPortfolio);
      } else if (result.data) {
        setPortfolio(result.data);
      }

      setLoading(false);
    }

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedProjectIndex > portfolio.projects.length - 1) {
      setSelectedProjectIndex(0);
    }
  }, [portfolio.projects.length, selectedProjectIndex]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const statusText = (() => {
    if (loading) {
      return 'Chargement du contenu Supabase...';
    }

    if (error) {
      return 'Mode local actif: impossible de charger Supabase pour le moment.';
    }

    if (!hasSupabaseEnv) {
      return 'Mode local actif: ajoute tes credentials Supabase dans .env.';
    }

    return 'Contenu alimente par Supabase.';
  })();

  const selectedProject = portfolio.projects[selectedProjectIndex] ?? portfolio.projects[0];

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top">
          MJ
        </a>

        <nav className="site-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href ? 'is-active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <p className="eyebrow">Recherche d'alternance</p>
            <h1>
              {portfolio.profile.first_name}
              <br />
              {portfolio.profile.last_name}
            </h1>
            <p className="hero-lead">{portfolio.profile.headline}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Me contacter
              </a>
              <a className="button button-secondary" href="#projects">
                Voir les projets
              </a>
            </div>
          </div>

          <aside className="hero-card">
            <div className="hero-photo" aria-hidden="true">
              {portfolio.profile.photo_url ? <img src={portfolio.profile.photo_url} alt="" /> : <span>MJ</span>}
            </div>

            <div className="hero-meta">
              <p className="meta-label">Positionnement</p>
              <p className="meta-value">{portfolio.profile.positioning}</p>
            </div>
            <div className="hero-meta">
              <p className="meta-label">Tech favorites</p>
              <p className="meta-value">{portfolio.profile.favorite_stack}</p>
            </div>
            <div className="hero-meta">
              <p className="meta-label">Base</p>
              <p className="meta-value">{portfolio.profile.location}</p>
            </div>
          </aside>
        </section>

        <section className="status-banner" aria-live="polite">
          <span className="status-dot" />
          <p>{statusText}</p>
        </section>

        <section className="highlight-row">
          {portfolio.highlights.map((highlight, index) => (
            <article key={highlight}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{highlight}</p>
            </article>
          ))}
        </section>

        <section className="content-grid" id="about">
          <div className="section-heading">
            <p className="eyebrow">Profil</p>
            <h2>{portfolio.about.title}</h2>
          </div>
          <div className="text-panel">
            {portfolio.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="content-grid" id="tech">
          <div className="section-heading">
            <p className="eyebrow">Technos</p>
            <h2>Les technos que j utilise vraiment sur mes projets.</h2>
          </div>

          <div className="stats-grid tech-grid">
            {portfolio.skills.map((skill) => (
              <article key={skill.label}>
                <p className="stat-value">{skill.label}</p>
                <p className="stat-label">{skill.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-grid" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Selection</p>
            <h2>{portfolio.projectsTitle}</h2>
          </div>

          <div className="project-explorer">
            <div className="project-list" role="tablist" aria-label="Liste des projets">
              {portfolio.projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  className={`project-card project-button ${selectedProjectIndex === index ? 'is-selected' : ''}`}
                  onClick={() => setSelectedProjectIndex(index)}
                >
                  <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h3>{project.title}</h3>
                    {project.stack ? <p className="project-stack">{project.stack}</p> : null}
                  </div>
                </button>
              ))}
            </div>

            {selectedProject ? (
              <article className="project-detail">
                <p className="eyebrow">Projet selectionne</p>
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                {selectedProject.stack ? <p className="project-stack">{selectedProject.stack}</p> : null}
                {selectedProject.url && selectedProject.link_label ? (
                  <a href={selectedProject.url} target="_blank" rel="noreferrer">
                    {selectedProject.link_label}
                  </a>
                ) : null}
              </article>
            ) : null}
          </div>
        </section>

        <section className="content-grid contact-grid" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>{portfolio.contact.title}</h2>
          </div>

          <div className="contact-panel">
            <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
            <a href={`tel:${portfolio.contact.phone_link}`}>{portfolio.contact.phone_display}</a>
            <a href={portfolio.contact.github_url} target="_blank" rel="noreferrer">
              {portfolio.contact.github_label}
            </a>
            <a href={portfolio.contact.legacy_portfolio_url} target="_blank" rel="noreferrer">
              Ancien portfolio
            </a>
            <p className="contact-note">{portfolio.contact.note}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
