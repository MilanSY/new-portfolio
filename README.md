# Milan Juino Portfolio

Portfolio Next.js connecte a Supabase pour gerer le contenu du site.

## Stack

- Next.js 14
- React 18
- Supabase

## Installation

```bash
npm install
```

## Variables d'environnement

Le projet utilise un fichier `.env` local avec :

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Un exemple minimal est disponible dans `.env.example`.

## Lancer le projet

```bash
npm run dev
```

Application disponible ensuite sur `http://localhost:3000`.

## Build production

```bash
npm run build
npm run start
```

## Docker

Build local Docker :

```bash
docker build -t new-portfolio .
```

L'image applicative utilise Node 22.

## Redeploy VPS

Sur le VPS, le redeploy applicatif peut se faire avec :

```bash
sh /home/milan/apps/new-portfolio/scripts/redeploy.sh
```

Ce script :

- fait un `git pull --ff-only`
- rebuild le conteneur `portfolio-app`
- relance le service via Docker Compose

## Schema Supabase

Le schema SQL du portfolio est documente dans `supabase-schema.sql`.

Tables utilisees par le front :

- `portfolio_profile`
- `portfolio_about`
- `portfolio_highlights`
- `portfolio_experiences`
- `portfolio_projects`
- `portfolio_skills`

Le front lit ces tables avec la cle publique Supabase. Les policies RLS doivent donc autoriser `SELECT` pour `anon`.

## Mode fallback

Si Supabase n'est pas configure ou si une requete echoue, l'application bascule sur les donnees locales definies dans `src/lib/fallback-data.js`.

## Arborescence utile

- `app/`: entrypoint Next.js
- `src/components/PortfolioPage.jsx`: page principale
- `src/lib/portfolio.js`: chargement des donnees Supabase
- `src/lib/fallback-data.js`: contenu local de secours
- `supabase-schema.sql`: schema de reference
