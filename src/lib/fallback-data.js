export const fallbackPortfolio = {
  profile: {
    first_name: 'Milan',
    last_name: 'Juino',
    headline:
      "Developpeur full stack, prochainement en M1 a l'ESGI. Je construis des applications web utiles, de l'interface React jusqu'aux bases SQL et APIs C# ou PHP.",
    positioning: 'Full stack avec une forte sensibilite produit et frontend.',
    favorite_stack: 'React, TypeScript, Symfony, PHP, C#, SQL, PostgreSQL',
    location: 'Paris · Hauts-de-France',
    photo_url: '/profile.jpg',
  },
  highlights: [
    'Des projets concrets realises en formation, en stage et en equipe avec documentation et soutenance.',
    "Une progression visible du HTML/CSS vers React, Symfony, TypeScript, C# et PostgreSQL.",
    'Un profil full stack avec pratique du front, du back, des bases de donnees et du travail en methode AGILE.',
  ],
  about: {
    title: 'Un developpeur qui aime autant la structure que le rendu final.',
    paragraphs: [
      "Je construis des applications web avec une approche pragmatique: une base technique propre, une interface lisible et une vraie attention a l'experience utilisateur.",
      "Mes projets couvrent des besoins varies: application de gestion en C#, projets Symfony, interfaces React et integrations front en HTML/CSS, avec souvent un vrai cadre d'equipe, de sprint et de documentation.",
      "Aujourd'hui, je cherche une alternance pour mon entree en M1 a l'ESGI afin de continuer a monter en niveau sur des projets concrets, en equipe, avec de vraies contraintes produit.",
    ],
  },
  experienceTitle: 'Formation et experiences qui montrent une progression continue.',
  experiences: [
    {
      period: '2026 - 2027',
      title: "M1 a l'ESGI",
      description: 'Entree en Master 1 avec l objectif de consolider mon profil full stack en alternance.',
    },
    {
      period: '2025 - 2026',
      title: 'Alternance chez Scroll',
      description: 'Developpement full stack sur un environnement React, Next.js, Vite et C#.',
    },
    {
      period: '2025',
      title: 'Veepee',
      description:
        'Stage sur le back office marketplace avec une equipe internationale. Mission autour de React, TypeScript, C#, PostgreSQL et migration de regles metier vers la base de donnees.',
    },
    {
      period: '2024',
      title: 'Nodevo',
      description:
        'Stage centre sur PHP et architecture type framework: routes, controleurs, modeles et back office autour d une application de gestion de guitares.',
    },
    {
      period: '2023 - 2025',
      title: 'BTS SIO SLAM',
      description: 'Specialisation developpement web au lycee Saint-Vincent de Senlis.',
    },
    {
      period: '2025 - maintenant',
      title: 'Bachelor Coordinateur de projets informatiques',
      description: 'Approche projet et professionnalisation avant l entree en M1.',
    },
  ],
  projectsTitle: 'Des projets qui montrent autant la pratique technique que la gestion de projet.',
  projects: [
    {
      title: 'Sistr',
      description:
        'Plateforme de ressources humaines connectee a WhatsApp pour gerer les disponibilites, documents, missions et matching entre agences d interim et interimaires. Travail sur une application metier moderne construite en Next.js, Supabase et n8n.',
      stack: 'Next.js, Supabase, n8n, WhatsApp, KYC, TypeScript',
      image: '/projects/sistr.webp',
      url: 'https://sistr.ai/',
      link_label: 'Voir le projet',
    },
    {
      title: 'Sitex',
      description:
        'Application metier de planification et de suivi temps reel pour les services de securite evenementielle. Le produit centralise plannings, agents, documents, incidents terrain et supervision operationnelle dans une interface unique.',
      stack: 'Next.js, Supabase, n8n, OVH, TypeScript',
      image: '/projects/sitex.webp',
      url: '',
      link_label: '',
    },
    {
      title: "Je Reve d'une Maison",
      description:
        'Application web sur mesure pour la chasse immobiliere: recherche de biens, qualification, alertes, suivi client et centralisation des echanges entre chasseurs et acquereurs dans une seule interface.',
      stack: 'Next.js, Supabase, TypeScript',
      image: '/projects/jrvm.webp',
      url: '',
      link_label: '',
    },
    {
      title: 'Cindra',
      description:
        'SaaS metier pour digitaliser l activite de groupes specialises dans l installation et la maintenance d equipements de securite incendie, avec gestion terrain, documents automatiques et donnees centralisees.',
      stack: 'Next.js, Supabase, n8n, OVH, DocuSeal',
      image: '/projects/cindra.webp',
      url: '',
      link_label: '',
    },
    {
      title: 'Hermes Agent',
      description:
        `Le contexte

L'agence voulait automatiser trois taches recurrentes sans multiplier les abonnements ni exposer ses donnees a des plateformes externes. Le choix s'est porte sur une solution auto-hebergee, pilotee depuis l'outil deja utilise quotidiennement par l'equipe.

Ce qui a ete livre

Trois agents en production, joignables dans leurs canaux Slack respectifs :

Comptabilite - surveille les factures recues et emises, extrait montants et echeances, detecte doublons et hausses tarifaires anormales
Marketing - veille quotidienne automatisee, livre chaque matin a 9h un brief de 3 a 5 angles d'articles sources
DevOps - diagnostique le serveur et ses 106 conteneurs de production, prepare de nouveaux projets

Une infrastructure resiliente : services systemd sous compte dedie, redemarrage automatique, survie au reboot, sans droits administrateur.

Une interface d'administration web en HTTPS derriere reverse proxy, protegee par authentification a empreinte scrypt.

Une documentation d'exploitation permettant a l'equipe de modifier elle-meme le comportement des agents sans intervention technique.

Points techniques notables

Securite par le moindre privilege. Les permissions Google demandees par defaut ont ete reduites de huit a une seule - lecture seule sur la messagerie. L'interdiction d'envoyer un mail n'est pas une consigne donnee a l'agent, c'est une impossibilite technique verifiee : l'API refuse toute ecriture.

Cloisonnement effectif. Chaque agent possede son repertoire personnel isole : aucun ne peut lire les identifiants ni la memoire d'un autre. Les acces sont restreints nominativement, agent par agent.

Compte de service dedie. Les agents ne tournent sous aucun compte personnel - ils survivent a un depart, et leurs droits se reglent independamment de ceux des humains.

Selection du modele par agent, avec chaines de repli automatiques : un modele haut de gamme pour la redaction, un modele leger pour l'extraction de donnees, un modele specialise code pour le DevOps. Optimisation du rapport cout/qualite sans degrader les taches sensibles.

Fiabilisation de la livraison automatique : identification et correction d'un echec silencieux ou les taches planifiees s'executaient correctement mais n'etaient jamais delivrees.`,
      stack: 'Hermes Agent, Ubuntu, systemd, Slack Socket Mode, OAuth2, Google Gmail API, Nginx Proxy Manager, Let\'s Encrypt, Docker',
      image: '',
      url: '',
      link_label: '',
    },
    {
      title: 'Gestion festival de theatre',
      description:
        'Application Windows Forms en C# realisee en equipe de 3 pour monitorer une base de donnees de festival de theatre. Projet mene en methode AGILE avec suivi hebdomadaire, SQL, Figma et documentation complete.',
      stack: 'C#, SQL, Figma, GitHub',
      image: '/projects/theatre.png',
      url: 'https://github.com/MilanSY/Projet_GestionTheatre',
      link_label: 'Voir le projet GitHub',
      docs: [
        { label: 'Maquette Figma', url: 'https://www.figma.com/design/tkoy8osjFUhqPnZoDoDa99/Gestion-Th%C3%A9%C3%A2tre?m=auto&t=yXO1BarZSLjzBH8t-6' },
      ],
    },
    {
      title: 'Conge Facile',
      description:
        'Projet de fin de deuxieme annee de BTS: application web Symfony pour la gestion des demandes de conges. Travail en autonomie d equipe autour du cahier de recette, des sprints, de la documentation et du site.',
      stack: 'Symfony, PHP, Twig, SQL, Figma, GitHub',
      image: '/projects/congefacile.png',
      url: 'https://github.com/Fnafgameur/CongeFacile',
      link_label: 'Voir le projet GitHub',
      docs: [
        { label: 'Maquette Figma', url: 'https://www.figma.com/design/asceKpDZb7Y8zscQkZRgLT/Cong%C3%A9Facile?node-id=0-1' },
      ],
    },
    {
      title: 'MathIndex',
      description:
        'Projet de fin de premiere annee de BTS realise en equipe de 3. Application PHP/JavaScript avec SCSS, maquette Figma, wiki utilisateur et livrables techniques pour capitaliser les acquis de gestion de projet.',
      stack: 'PHP, JavaScript, SCSS, Figma, GitHub',
      image: '/projects/mathindex.png',
      url: 'https://github.com/Fratgameur/MathIndex',
      link_label: 'Voir le projet GitHub',
      docs: [
        { label: 'Maquette Figma', url: 'https://www.figma.com/design/CZJbT3dqXWcXOtaBmhZZ5p/Projet-MathIndex---Ligh' },
        { label: 'Kit UI', url: 'https://www.figma.com/design/GxQFwirzwnmwipqtQgtrkd/KIT-UI-MATHINDEX?m=auto&t=yXO1BarZSLjzBH8t-6' },
        { label: 'Guide utilisateur', url: 'https://github.com/Fnafgameur/MathIndex/wiki' },
      ],
    },
    {
      title: 'Stage chez Nodevo',
      description:
        'Projet de stage consistant a reproduire le squelette d un framework type Symfony puis a construire une application dynamique de gestion de guitares avec authentification, CRUD et back office admin.',
      stack: 'PHP, SCSS, Figma',
      image: '/projects/nodevo.png',
      url: 'https://github.com/MilanSY/guitar-list.com',
      link_label: 'Voir le projet GitHub',
      docs: [],
    },
  ],
  skills: [
    { label: 'React', description: 'Interfaces modernes et composants front' },
    { label: 'TypeScript', description: 'Typage front et code plus robuste' },
    { label: 'PostgreSQL', description: 'Base relationnelle et requetes avancees' },
    { label: 'Tailwind CSS', description: 'UI rapide et systeme utilitaire' },
    { label: 'Twig', description: 'Templates serveur pour projets Symfony' },
    { label: 'JavaScript', description: 'Interactivite web et logique front' },
    { label: 'Python', description: 'Scripts, automatisation et experimentation' },
    { label: 'SCSS / Sass', description: 'Styles structures et maintenables' },
    { label: 'CSS', description: 'Mise en page, responsive et finition UI' },
    { label: 'Symfony', description: 'Architecture backend et logique metier' },
    { label: 'PHP', description: 'Applications web, MVC et rendu serveur' },
    { label: 'HTML', description: 'Structure semantique des interfaces web' },
    { label: 'C#', description: 'Applications metier et APIs backend' },
    { label: 'GitLab', description: 'Versionning et workflows de collaboration' },
    { label: 'SQL', description: 'Modelisation et exploitation de donnees' },
    { label: 'Figma', description: 'Maquettage, UI et travail de conception' },
    { label: 'Git', description: 'Versionning et travail en equipe' },
    { label: 'GitHub', description: 'Code review, partage et documentation' },
  ],
  contact: {
    title: 'Disponible pour echanger sur une alternance et des projets web ambitieux.',
    email: 'milanjuino@gmail.com',
    phone_link: '+33651282580',
    phone_display: '+33 6 51 28 25 80',
    github_url: 'https://github.com/MilanJSY',
    github_label: 'github.com/MilanJSY',
    legacy_portfolio_url: 'https://mjuino.lyceestvincent.fr/',
    note: '',
  },
};
