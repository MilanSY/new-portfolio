'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioData, hasSupabaseEnv } from '../lib/portfolio';
import { fallbackPortfolio } from '../lib/fallback-data';

const navItems = [
  { href: '#profile', label: 'Profil' },
  { href: '#projects', label: 'Projets' },
  { href: '#tech', label: 'Technos' },
  { href: '#contact', label: 'Contact' },
];

const profileLinks = [
  { href: 'https://github.com/MilanSY', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/milan-juino-376636286/', label: 'LinkedIn' },
  { href: 'https://mjuino.lyceestvincent.fr/docs/CVMilanJUINO.pdf', label: 'CV' },
];

const projectImageFallbacks = {
  Sistr: '/projects/sistr.webp',
  Sitex: '/projects/sitex.webp',
  "Je Reve d'une Maison": '/projects/jrvm.webp',
  Cindra: '/projects/cindra.webp',
  'Gestion festival de theatre': '/projects/theatre.png',
  'Conge Facile': '/projects/congefacile.png',
  MathIndex: '/projects/mathindex.png',
  'Stage chez Nodevo': '/projects/nodevo.png',
};

function getProjectTags(stack) {
  return (stack || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [loading, setLoading] = useState(hasSupabaseEnv);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('#profile');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [hasProjectImageError, setHasProjectImageError] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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

  useEffect(() => {
    if (!isMobileNavOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileNavOpen]);

  const statusText = (() => {
    if (loading) {
      return 'Chargement du contenu Supabase...';
    }

    if (error) {
      return 'Mode local actif: impossible de charger Supabase pour le moment.';
    }

    if (!hasSupabaseEnv) {
      return '';
    }

    return 'Contenu alimente par Supabase.';
  })();

  const selectedProject = portfolio.projects[selectedProjectIndex] ?? portfolio.projects[0];
  const selectedProjectImage = selectedProject
    ? selectedProject.image || projectImageFallbacks[selectedProject.title] || ''
    : '';
  const hasMultipleProjects = portfolio.projects.length > 1;

  useEffect(() => {
    setHasProjectImageError(false);
  }, [selectedProject?.title, selectedProjectImage]);

  useEffect(() => {
    if (!isProjectModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsProjectModalOpen(false);
        return;
      }

      if (event.key === 'ArrowRight' && portfolio.projects.length > 1) {
        setSelectedProjectIndex((value) => (value + 1) % portfolio.projects.length);
        return;
      }

      if (event.key === 'ArrowLeft' && portfolio.projects.length > 1) {
        setSelectedProjectIndex((value) => (value - 1 + portfolio.projects.length) % portfolio.projects.length);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProjectModalOpen, portfolio.projects.length]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded={isMobileNavOpen}
          onClick={() => setIsMobileNavOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

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

        {isMobileNavOpen ? (
          <div className="mobile-nav-panel">
            <nav className="mobile-nav-links" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={activeSection === item.href ? 'is-active' : ''}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="hero section-grid" id="profile">
          <div className="hero-copy">
            <p className="eyebrow">Profil</p>
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
              {profileLinks.map((link) => (
                <a key={link.href} className="button button-secondary" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
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

        {statusText ? (
          <section className="status-banner" aria-live="polite">
            <span className="status-dot" />
            <p>{statusText}</p>
          </section>
        ) : null}

        <section className="highlight-row">
          {portfolio.highlights.map((highlight, index) => (
            <article key={highlight}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{highlight}</p>
            </article>
          ))}
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
                  onClick={() => {
                    setSelectedProjectIndex(index);
                    setIsProjectModalOpen(true);
                  }}
                >
                  <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h3>{project.title}</h3>
                    {project.stack ? (
                      <div className="project-tags" aria-label="Technologies du projet">
                        {getProjectTags(project.stack).map((tag) => (
                          <span key={`${project.title}-${tag}`} className="project-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {isProjectModalOpen && selectedProject ? (
          <div className="project-modal-backdrop" onClick={() => setIsProjectModalOpen(false)}>
            {hasMultipleProjects ? (
              <>
                <button
                  type="button"
                  className="project-modal-side-nav project-modal-side-nav-prev"
                  aria-label="Projet precedent"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedProjectIndex((value) => (value - 1 + portfolio.projects.length) % portfolio.projects.length);
                  }}
                >
                  &lt;
                </button>
                <button
                  type="button"
                  className="project-modal-side-nav project-modal-side-nav-next"
                  aria-label="Projet suivant"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedProjectIndex((value) => (value + 1) % portfolio.projects.length);
                  }}
                >
                  &gt;
                </button>
              </>
            ) : null}
            <div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="project-modal-close"
                aria-label="Fermer"
                onClick={() => setIsProjectModalOpen(false)}
              >
                x
              </button>

              {selectedProjectImage && !hasProjectImageError ? (
                <div className="project-modal-image-wrap">
                  <img
                    key={selectedProjectImage}
                    className="project-modal-image"
                    src={selectedProjectImage}
                    alt={selectedProject.title}
                    onError={() => setHasProjectImageError(true)}
                  />
                </div>
              ) : null}

              <div className="project-modal-body">
                <p className="eyebrow">Projet</p>
                <h3 id="project-modal-title">{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                {selectedProject.stack ? (
                  <div className="project-tags" aria-label="Technologies du projet">
                    {getProjectTags(selectedProject.stack).map((tag) => (
                      <span key={`${selectedProject.title}-${tag}`} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                {selectedProject.docs?.length ? (
                  <div className="project-docs">
                    <p className="project-docs-title">Docs et maquettes</p>
                    <div className="project-doc-links">
                      {selectedProject.docs.map((doc) => (
                        <a key={`${selectedProject.title}-${doc.label}`} href={doc.url} target="_blank" rel="noreferrer">
                          {doc.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
                {selectedProject.url && selectedProject.link_label ? (
                  <a href={selectedProject.url} target="_blank" rel="noreferrer">
                    {selectedProject.link_label}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

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
            {portfolio.contact.note ? <p className="contact-note">{portfolio.contact.note}</p> : null}
          </div>
        </section>
      </main>
    </div>
  );
}
