import { fallbackPortfolio } from './fallback-data';
import { hasSupabaseEnv, supabase } from './supabase';

function sortByOrder(items) {
  return [...items].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}

export async function fetchPortfolioData() {
  if (!hasSupabaseEnv || !supabase) {
    return { data: fallbackPortfolio, error: '' };
  }

  try {
    const [profileResult, aboutResult, experiencesResult, projectsResult, skillsResult, highlightsResult] =
      await Promise.all([
        supabase.from('portfolio_profile').select('*').limit(1).maybeSingle(),
        supabase.from('portfolio_about').select('*').limit(1).maybeSingle(),
        supabase.from('portfolio_experiences').select('*'),
        supabase.from('portfolio_projects').select('*'),
        supabase.from('portfolio_skills').select('*'),
        supabase.from('portfolio_highlights').select('*'),
      ]);

    const errors = [
      profileResult.error,
      aboutResult.error,
      experiencesResult.error,
      projectsResult.error,
      skillsResult.error,
      highlightsResult.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      return { data: fallbackPortfolio, error: errors[0].message };
    }

    return {
      data: {
        profile: profileResult.data ?? fallbackPortfolio.profile,
        highlights:
          sortByOrder(highlightsResult.data ?? []).map((item) => item.text).filter(Boolean) ||
          fallbackPortfolio.highlights,
        about: aboutResult.data
          ? {
              title: aboutResult.data.title,
              paragraphs: aboutResult.data.paragraphs ?? fallbackPortfolio.about.paragraphs,
            }
          : fallbackPortfolio.about,
        experienceTitle: 'Formation et experiences qui montrent une progression continue.',
        experiences: sortByOrder(experiencesResult.data ?? []).length
          ? sortByOrder(experiencesResult.data ?? []).map((item) => ({
              period: item.period,
              title: item.title,
              description: item.description,
            }))
          : fallbackPortfolio.experiences,
        projectsTitle: 'Des projets qui couvrent backend, frontend et logique metier.',
        projects: sortByOrder(projectsResult.data ?? []).length
          ? sortByOrder(projectsResult.data ?? []).map((item) => ({
              title: item.title,
              description: item.description,
              stack: item.stack ?? '',
              url: item.url,
              link_label: item.link_label,
            }))
          : fallbackPortfolio.projects,
        skills: sortByOrder(skillsResult.data ?? []).length
          ? sortByOrder(skillsResult.data ?? []).map((item) => ({
              label: item.label,
              description: item.description,
            }))
          : fallbackPortfolio.skills,
        contact: {
          title: 'Disponible pour echanger sur une alternance et des projets web ambitieux.',
          email: profileResult.data?.email ?? fallbackPortfolio.contact.email,
          phone_link: profileResult.data?.phone_link ?? fallbackPortfolio.contact.phone_link,
          phone_display: profileResult.data?.phone_display ?? fallbackPortfolio.contact.phone_display,
          github_url: profileResult.data?.github_url ?? fallbackPortfolio.contact.github_url,
          github_label: profileResult.data?.github_label ?? fallbackPortfolio.contact.github_label,
          legacy_portfolio_url:
            profileResult.data?.legacy_portfolio_url ?? fallbackPortfolio.contact.legacy_portfolio_url,
          note: profileResult.data?.contact_note ?? fallbackPortfolio.contact.note,
        },
      },
      error: '',
    };
  } catch (error) {
    return {
      data: fallbackPortfolio,
      error: error instanceof Error ? error.message : 'Erreur inconnue lors du chargement Supabase.',
    };
  }
}

export { hasSupabaseEnv };
