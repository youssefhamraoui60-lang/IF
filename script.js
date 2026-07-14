/* ===== IFPE Conseil – Main Script ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Éléments communs à toutes les pages ---------- */
  const domainMenu = document.getElementById('menu-domaines');

  if (domainMenu) {
    const domainMenuColumns = domainMenu.querySelectorAll(':scope > .grid > div');
    const domainMenuIntro = domainMenuColumns[0];
    const domainMenuList = domainMenuColumns[1];
    const domainMenuVisual = domainMenuColumns[2];

    if (domainMenuIntro && !domainMenuIntro.querySelector('.domain-overview-link')) {
      const overviewLink = document.createElement('a');
      overviewLink.href = 'domaines.html';
      overviewLink.className = 'domain-overview-link mt-7 inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-navy';
      overviewLink.innerHTML = `Voir tous les domaines
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>`;
      domainMenuIntro.appendChild(overviewLink);
    }

    domainMenuList?.classList.add('domain-menu-list');

    if (domainMenuVisual) {
      domainMenuVisual.innerHTML = `
        <div id="domain-menu-preview" class="domain-menu-preview relative h-[330px] w-full overflow-hidden rounded-2xl bg-navy">
          <img id="domain-menu-preview-image" src="assets/images/menu-domain-organisation.jpg" alt="Développement organisationnel" class="protected-image h-full w-full object-cover" draggable="false" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#173A63]/95 via-[#173A63]/45 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-6 text-white">
            <p class="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">IFPE Conseil</p>
            <h4 id="domain-menu-preview-title" class="text-xl font-bold leading-snug">Développement organisationnel</h4>
            <p id="domain-menu-preview-text" class="mt-2 text-xs leading-5 text-white/85">Améliorer durablement l’organisation, les processus et la performance.</p>
            <span class="mt-4 inline-flex items-center gap-2 text-xs font-bold">En savoir plus
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
            </span>
          </div>
        </div>`;
    }
  }

  /* ---------- Simplification des méga-menus partagés ---------- */
  const aboutMenu = document.getElementById('menu-qui');
  if (aboutMenu) {
    const aboutColumns = aboutMenu.querySelectorAll(':scope > .grid > div');
    const aboutIntro = aboutColumns[0];
    const aboutActions = aboutColumns[1];

    const aboutBadge = aboutIntro?.querySelector(':scope > span:first-child');
    aboutBadge?.remove();

    if (aboutActions) {
      aboutActions.classList.add('about-menu-actions');
      aboutActions.querySelectorAll(':scope > a').forEach(link => {
        const icon = link.querySelector(':scope > span:first-child');
        if (icon?.querySelector('svg')) icon.remove();
      });
    }
  }

  document.querySelectorAll('#menu-valeur a[href="valeur-ajoutee.html"]').forEach(link => {
    link.classList.add('value-menu-button');
  });

  /* Retrait des petits libellés décoratifs des méga-menus. */
  [
    '#menu-domaines > .grid > div:first-child > span:first-child',
    '#menu-services > div > div:first-child > span:first-child',
    '#menu-valeur > .grid > div:first-child > span:first-child'
  ].forEach(selector => document.querySelector(selector)?.remove());

  let backToTop = document.getElementById('back-to-top');

  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.type = 'button';
    backToTop.setAttribute('aria-label', 'Retour en haut de la page');
    backToTop.innerHTML = `
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="m5 12 7-7 7 7M12 5v14" />
      </svg>`;
    document.body.appendChild(backToTop);
  }

  let whatsappButton = document.getElementById('floating-whatsapp');

  if (!whatsappButton) {
    whatsappButton = document.createElement('a');
    whatsappButton.id = 'floating-whatsapp';
    whatsappButton.href = 'https://wa.me/212600000000';
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.setAttribute('aria-label', 'Contacter IFPE Conseil sur WhatsApp');
    whatsappButton.innerHTML = `
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2a9.82 9.82 0 0 0-8.5 14.74L2 22l5.4-1.42A9.99 9.99 0 0 0 12.04 22 9.96 9.96 0 0 0 12.04 2Zm0 18.18a8.14 8.14 0 0 1-4.14-1.13l-.3-.18-3.2.84.86-3.11-.2-.32a8 8 0 1 1 6.98 3.9Zm4.47-6.08c-.25-.12-1.45-.71-1.67-.8-.23-.08-.39-.12-.55.13-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.25-.12-1.03-.38-1.97-1.22a7.4 7.4 0 0 1-1.36-1.69c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.4-.55-.41h-.47c-.16 0-.43.06-.65.3-.22.25-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.72 2.62 4.16 3.67.58.25 1.04.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z"/>
      </svg>`;
    document.body.appendChild(whatsappButton);
  }

  /* ---------- Header scroll effect ---------- */
  const siteHeader = document.getElementById('site-header');
  const headerPill = document.querySelector('.header-pill');
  let lastScrollY = window.scrollY;

  function updateHeaderOnScroll() {
    const currentScrollY = window.scrollY;
    const scrollingUp = currentScrollY < lastScrollY;

    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
      headerPill.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
      headerPill.classList.remove('scrolled');
    }

    if (currentScrollY <= 120 || scrollingUp) {
      siteHeader.classList.remove('header-hidden');
    } else {
      siteHeader.classList.add('header-hidden');
    }

    backToTop?.classList.toggle('is-visible', window.scrollY > 420);
    lastScrollY = Math.max(currentScrollY, 0);
  }

  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Bouton lecture de la vidéo ---------- */
  const presentationVideo = document.getElementById('presentation-video');
  const presentationPlay = document.getElementById('presentation-play');
  const videoFocusOverlay = document.getElementById('video-focus-overlay');
  const presentationCard = presentationVideo?.closest('.presentation-video-card');

  if (presentationVideo && presentationPlay && presentationCard && videoFocusOverlay) {
    const openVideoFocus = () => {
      presentationCard.classList.add('is-focused');
      videoFocusOverlay.classList.add('is-active');
      videoFocusOverlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('video-focus-active');
    };

    const closeVideoFocus = () => {
      presentationCard.classList.remove('is-focused');
      videoFocusOverlay.classList.remove('is-active');
      videoFocusOverlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('video-focus-active');
    };

    presentationPlay.addEventListener('click', () => {
      presentationVideo.play();
    });

    presentationVideo.addEventListener('play', () => {
      presentationPlay.classList.add('is-hidden');
      openVideoFocus();
    });

    presentationVideo.addEventListener('pause', () => {
      if (!presentationVideo.ended) presentationPlay.classList.remove('is-hidden');
      closeVideoFocus();
    });

    presentationVideo.addEventListener('ended', () => {
      presentationPlay.classList.remove('is-hidden');
      closeVideoFocus();
    });

    videoFocusOverlay.addEventListener('click', () => {
      presentationVideo.pause();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && presentationCard.classList.contains('is-focused')) {
        presentationVideo.pause();
      }
    });
  }


  /* ---------- Mega menus ---------- */
  const navItems  = document.querySelectorAll('.nav-item');
  const megaMenus = document.querySelectorAll('.mega-menu');
  let activeMenu  = null;
  let closeTimer  = null;

  function openMenu(menuId, btn) {
    clearTimeout(closeTimer);
    if (activeMenu === menuId) return;
    closeAllMenus();
    const panel = document.getElementById('menu-' + menuId);
    if (!panel) return;
    panel.classList.remove('hidden');
    btn.classList.add('active');
    activeMenu = menuId;
  }

  function scheduleClose() {
    closeTimer = setTimeout(closeAllMenus, 120);
  }

  function closeAllMenus() {
    megaMenus.forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    activeMenu = null;
  }

  navItems.forEach(item => {
    const menuId = item.dataset.menu;
    const btn    = item.querySelector('.nav-btn');

    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (activeMenu === menuId) {
        closeAllMenus();
      } else {
        openMenu(menuId, btn);
      }
    });

    item.addEventListener('mouseenter', () => openMenu(menuId, btn));
    item.addEventListener('mouseleave', scheduleClose);
  });

  megaMenus.forEach(panel => {
    panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    panel.addEventListener('mouseleave', scheduleClose);
  });

  /* ---------- Aperçu au survol : menu Domaines ---------- */
  const domainMenuLinks = [...document.querySelectorAll('#menu-domaines .domain-menu-list a')];
  const domainPreview = document.getElementById('domain-menu-preview');
  const domainPreviewImage = document.getElementById('domain-menu-preview-image');
  const domainPreviewTitle = document.getElementById('domain-menu-preview-title');
  const domainPreviewText = document.getElementById('domain-menu-preview-text');

  const domainPreviewData = [
    ['assets/images/menu-domain-organisation.jpg', 'Développement organisationnel', 'Améliorer durablement l’organisation, les processus et la performance.'],
    ['assets/images/menu-domain-rh.png', 'Ressources humaines', 'Structurer les compétences, les parcours et la performance des équipes.'],
    ['assets/images/menu-domain-formation.png', 'Formation professionnelle', 'Développer les compétences grâce à des dispositifs pédagogiques adaptés.'],
    ['assets/images/menu-domain-etudes.png', 'Études et référentiels', 'Concevoir des études, référentiels métiers et outils d’aide à la décision.'],
    ['assets/images/transformation-numerique-ia.jpg', 'Transformation numérique et IA', 'Digitaliser les processus et intégrer l’intelligence artificielle avec méthode.'],
    ['assets/images/menu-domain-strategie.jpg', 'Planification stratégique', 'Transformer la vision en feuilles de route concrètes et mobilisatrices.'],
    ['assets/images/coaching-professionnel.jpg', 'Coaching professionnel', 'Renforcer le leadership, la cohésion et la mobilisation des équipes.']
  ];
  const domainPageTargets = ['organisation', 'rh', 'formation', 'referentiels', 'digital', 'strategie', 'coaching'];
  let domainPreviewTimer = null;

  domainMenuLinks.forEach((link, index) => {
    link.href = `domaine-detail.html?d=${domainPageTargets[index]}`;
  });

  const updateDomainPreview = (index) => {
    if (!domainPreview || !domainPreviewImage || !domainPreviewTitle || !domainPreviewText) return;
    const [image, title, description] = domainPreviewData[index];

    domainMenuLinks.forEach((link, linkIndex) => link.classList.toggle('is-active', linkIndex === index));
    domainPreview.classList.add('is-changing');
    window.clearTimeout(domainPreviewTimer);

    domainPreviewTimer = window.setTimeout(() => {
      domainPreviewImage.src = image;
      domainPreviewImage.alt = title;
      domainPreviewTitle.textContent = title;
      domainPreviewText.textContent = description;
      domainPreview.classList.remove('is-changing');
    }, 140);
  };

  domainMenuLinks.forEach((link, index) => {
    link.addEventListener('mouseenter', () => updateDomainPreview(index));
    link.addEventListener('focus', () => updateDomainPreview(index));
  });

  if (domainMenuLinks.length) domainMenuLinks[0].classList.add('is-active');

  document.addEventListener('click', e => {
    if (!e.target.closest('#site-header')) closeAllMenus();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllMenus();
  });

  /* ---------- Language switch ---------- */
  const languageSwitch = document.querySelector('.language-switch');
  const languageToggle = document.querySelector('.language-toggle');
  const languageMenu   = document.querySelector('.language-menu');
  const languageLabel  = languageToggle ? languageToggle.querySelector('span') : null;

  function normalizeKey(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[’‘]/g, "'")
      .replace(/[·•]/g, '.')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const translations = {
    en: {
      'Recherche ...': 'Search ...',
      'Changer la langue': 'Change language',
      'Qui sommes-nous ?': 'About us',
      "Domaines d'intervention": 'Areas of expertise',
      'Nos services': 'Services',
      'Notre valeur ajoutée': 'Our added value',
      'Contact': 'Contact',
      'Nous contacter': 'Contact us',
      'Ingénierie · Conseil · Formation · Performance': 'Engineering · Consulting · Training · Performance',
      'Votre partenaire stratégique pour la performance': 'Your strategic partner for performance',
      "IFPE Conseil accompagne les entreprises, les institutions de formation, les administrations publiques et les organisations dans le renforcement de leurs performances, le développement de leurs ressources humaines et la réussite de leurs transformations.": 'IFPE Conseil supports companies, training institutions, public administrations and organizations in strengthening performance, developing human resources and succeeding in their transformations.',
      'Découvrir nos domaines': 'Explore our areas',
      "ans d'expérience": 'years of experience',
      'domaines clés': 'key areas',
      'accompagnement': 'support',
      'À propos': 'About',
      'Un partenaire stratégique pour votre performance': 'A strategic partner for your performance',
      "IFPE Conseil repose sur une combinaison d'expertise terrain, d'approche systémique, d'approche par compétences et d'innovation. Son équipe est composée d'experts pluridisciplinaires et multisectoriels cumulant plus de 30 ans d'expérience dans l'entreprise, la gestion des ressources humaines, la formation professionnelle, le développement organisationnel et l'amélioration de la performance.": 'IFPE Conseil combines field expertise, systemic thinking, competency-based methods and innovation. Its team brings together multidisciplinary and multisector experts with more than 30 years of experience in business, human resources, vocational training, organizational development and performance improvement.',
      'Expertise terrain': 'Field expertise',
      'Approche par compétences': 'Competency-based approach',
      'Innovation': 'Innovation',
      'Solutions sur mesure': 'Tailored solutions',
      'Pourquoi choisir IFPE Conseil ?': 'Why choose IFPE Conseil?',
      'Nos domaines d’intervention': 'Our areas of expertise',
      'Nos domaines d\'intervention': 'Our areas of expertise',
      'Des solutions intégrées pour accompagner la performance, la transformation et le développement durable des organisations.': 'Integrated solutions to support performance, transformation and sustainable organizational development.',
      'Développement org.': 'Org. development',
      'Ressources humaines': 'Human resources',
      'Formation': 'Training',
      'Études & référentiels': 'Studies & frameworks',
      'Numérique & IA': 'Digital & AI',
      'Planification strat.': 'Strategic planning',
      'Coaching': 'Coaching',
      'Une offre complète de prestations conçues pour répondre aux défis actuels des organisations.': 'A complete service offering designed to meet today’s organizational challenges.',
      'Notre valeur ajoutée': 'Our added value',
      'Une expertise éprouvée': 'Proven expertise',
      'Une approche intégrée': 'An integrated approach',
      'Des solutions sur mesure': 'Tailored solutions',
      'Parlons de votre projet': 'Let’s talk about your project',
      'Notre équipe d\'experts est à votre disposition pour analyser vos besoins et vous proposer les solutions les plus adaptées.': 'Our expert team is ready to analyze your needs and propose the most suitable solutions.',
      'Nom complet *': 'Full name *',
      'Email *': 'Email *',
      'Téléphone': 'Phone',
      'Organisation': 'Organization',
      'Message *': 'Message *',
      'Envoyer le message': 'Send message',
      'Rechercher sur IFPE Conseil...': 'Search IFPE Conseil...',
      'Aucun résultat trouvé.': 'No result found.',
      'Résultat trouvé': 'Result found'
    }
  };

  const translationsByKey = {
    en: {
      'recherche ...': 'Search ...',
      'changer la langue': 'Change language',
      'qui sommes-nous ?': 'About us',
      "domaines d'intervention": 'Areas of expertise',
      'nos services': 'Services',
      'notre valeur ajoutee': 'Our added value',
      'contact': 'Contact',
      'nous contacter': 'Contact us',
      'ingenierie . conseil . formation . performance': 'Engineering . Consulting . Training . Performance',
      'votre partenaire strategique pour la performance': 'Your strategic partner for performance',
      "ifpe conseil accompagne les entreprises, les institutions de formation, les administrations publiques et les organisations dans le renforcement de leurs performances, le developpement de leurs ressources humaines et la reussite de leurs transformations.": 'IFPE Conseil supports companies, training institutions, public administrations and organizations in strengthening performance, developing human resources and succeeding in their transformations.',
      'decouvrir nos domaines': 'Explore our areas',
      "ans d'experience": 'years of experience',
      'domaines cles': 'key areas',
      'accompagnement': 'support',
      'a propos': 'About',
      'un partenaire strategique pour votre performance': 'A strategic partner for your performance',
      "ifpe conseil repose sur une combinaison d'expertise terrain, d'approche systemique, d'approche par competences et d'innovation. son equipe est composee d'experts pluridisciplinaires et multisectoriels cumulant plus de 30 ans d'experience dans l'entreprise, la gestion des ressources humaines, la formation professionnelle, le developpement organisationnel et l'amelioration de la performance.": 'IFPE Conseil combines field expertise, systemic thinking, competency-based methods and innovation. Its team brings together multidisciplinary and multisector experts with more than 30 years of experience in business, human resources, vocational training, organizational development and performance improvement.',
      'expertise terrain': 'Field expertise',
      'une connaissance profonde des realites operationnelles des organisations.': 'A deep understanding of organizations and their operational realities.',
      'approche par competences': 'Competency-based approach',
      'des methodes rigoureuses centrees sur le developpement des talents et savoir-faire.': 'Rigorous methods focused on developing talent and know-how.',
      'innovation': 'Innovation',
      'integration des dernieres avancees numeriques et pedagogiques.': 'Integration of the latest digital and educational advances.',
      'solutions sur mesure': 'Tailored solutions',
      'chaque intervention est concue selon vos realites et vos objectifs specifiques.': 'Each intervention is designed around your realities and specific objectives.',
      'pourquoi choisir ifpe conseil ?': 'Why choose IFPE Conseil?',
      'un cabinet de reference alliant rigueur methodologique, expertise sectorielle et engagement pour des resultats concrets.': 'A trusted consulting firm combining methodological rigor, sector expertise and commitment to concrete results.',
      'structurer et moderniser le fonctionnement': 'Structure and modernize operations',
      'developper les competences des equipes': 'Develop team skills',
      'ameliorer la productivite et la qualite': 'Improve productivity and quality',
      'renforcer la competitivite': 'Strengthen competitiveness',
      'reussir la transformation numerique': 'Succeed in digital transformation',
      'un projet a construire ensemble ?': 'A project to build together?',
      'contactez nos experts pour un diagnostic gratuit de vos besoins.': 'Contact our experts for a free assessment of your needs.',
      'nos domaines d’intervention': 'Our areas of expertise',
      "nos domaines d'intervention": 'Our areas of expertise',
      'des solutions integrees pour accompagner la performance, la transformation et le developpement durable des organisations.': 'Integrated solutions to support performance, transformation and sustainable organizational development.',
      'developpement org.': 'Org. development',
      'ressources humaines': 'Human resources',
      'formation': 'Training',
      'etudes & referentiels': 'Studies & frameworks',
      'numerique & ia': 'Digital & AI',
      'planification strat.': 'Strategic planning',
      'coaching': 'Coaching',
      'developpement organisationnel et amelioration de la performance': 'Organizational development and performance improvement',
      'gestion strategique des ressources humaines': 'Strategic human resources management',
      'formation professionnelle et developpement des competences': 'Professional training and skills development',
      'etudes, ingenierie et referentiels': 'Studies, engineering and frameworks',
      'transformation numerique et intelligence artificielle': 'Digital transformation and artificial intelligence',
      'planification strategique et accompagnement du changement': 'Strategic planning and change support',
      'coaching professionnel et mobilisation des equipes': 'Professional coaching and team mobilization',
      'une offre complete de prestations concues pour repondre aux defis actuels des organisations.': 'A complete service offering designed to meet today’s organizational challenges.',
      'diagnostic organisationnel': 'Organizational diagnosis',
      'optimisation des processus': 'Process optimization',
      'ingenierie de formation': 'Training engineering',
      'referentiels metiers et competences': 'Job and skills frameworks',
      'digitalisation des processus': 'Process digitalization',
      'coaching des dirigeants et managers': 'Executive and manager coaching',
      'notre valeur ajoutee': 'Our added value',
      'une expertise eprouvee': 'Proven expertise',
      'une approche integree': 'An integrated approach',
      'des solutions sur mesure': 'Tailored solutions',
      'parlons de votre projet': 'Let’s talk about your project',
      "notre equipe d'experts est a votre disposition pour analyser vos besoins et vous proposer les solutions les plus adaptees.": 'Our expert team is ready to analyze your needs and propose the most suitable solutions.',
      'nom complet *': 'Full name *',
      'email *': 'Email *',
      'telephone': 'Phone',
      'organisation': 'Organization',
      'message *': 'Message *',
      'envoyer le message': 'Send message',
      'rechercher sur ifpe conseil...': 'Search IFPE Conseil...',
      'aucun resultat trouve.': 'No result found.',
      'expertise, conseil et formation': 'Expertise, consulting and training',
      'accompagner les organisations dans leur transformation et leur montee en performance.': 'Supporting organizations in their transformation and performance improvement.',
      'decouvrir ifpe conseil': 'Discover IFPE Conseil',
      'notre mission': 'Our mission',
      'notre approche': 'Our approach',
      'nos experts': 'Our experts',
      "30+ ans d'experience": '30+ years of experience',
      'notre vision': 'Our vision',
      'ce qui nous distingue': 'What sets us apart',
      "trois piliers fondamentaux qui font d'ifpe conseil un partenaire de confiance pour votre performance durable.": 'Three core pillars that make IFPE Conseil a trusted partner for sustainable performance.',
      "plus de 30 ans d'experience dans l'entreprise, l'industrie, les services et la formation.": 'More than 30 years of experience in business, industry, services and training.',
      'intervention sur les dimensions humaine, technique, organisationnelle, strategique et numerique.': 'Work across human, technical, organizational, strategic and digital dimensions.',
      "chaque mission est adaptee aux realites, au secteur d'activite et aux objectifs du client.": 'Each mission is adapted to the client’s realities, sector and objectives.',
      'demander un accompagnement': 'Request support',
      'reorganisation des services': 'Service reorganization',
      'optimisation des processus de travail': 'Work process optimization',
      'systemes de management de la performance': 'Performance management systems',
      "culture d'excellence": 'Culture of excellence',
      'resultat : une organisation plus efficace, plus agile et davantage orientee resultats.': 'Outcome: a more efficient, agile and results-oriented organization.',
      'analyse et description des emplois': 'Job analysis and description',
      'fiches de poste et gpec': 'Job descriptions and workforce planning',
      'recrutement, integration et evaluation des performances': 'Recruitment, onboarding and performance evaluation',
      'plans de carriere, succession et reconnaissance': 'Career plans, succession and recognition',
      "resultat : des equipes competentes, motivees et alignees sur les objectifs de l'organisation.": 'Outcome: skilled, motivated teams aligned with organizational goals.',
      'plans de formation continue': 'Continuing training plans',
      'perfectionnement technique': 'Technical development',
      'leadership et capacites manageriales': 'Leadership and managerial skills',
      'formation des formateurs et approche par competences (apc)': 'Trainer training and competency-based approach',
      'resultat : une montee en competence rapide et durable des collaborateurs.': 'Outcome: fast and sustainable skills development for employees.',
      'etudes sectorielles': 'Sector studies',
      'analyses de besoins en competences': 'Skills needs analysis',
      'referentiels metiers, competences et formation': 'Job, skills and training frameworks',
      'cartographie des emplois': 'Job mapping',
      'analyse des processus de travail': 'Work process analysis',
      'resultat : des outils fiables pour piloter efficacement les ressources humaines et les formations.': 'Outcome: reliable tools to effectively manage human resources and training.',
      'informatisation des services': 'Service computerization',
      'integration de solutions numeriques': 'Integration of digital solutions',
      "utilisation de l'intelligence artificielle dans les operations": 'Use of artificial intelligence in operations',
      'automatisation des taches administratives et competences numeriques': 'Automation of administrative tasks and digital skills',
      'resultat : davantage de productivite, de rapidite et de competitivite.': 'Outcome: greater productivity, speed and competitiveness.',
      'elaboration de la vision strategique': 'Development of the strategic vision',
      'definition des objectifs de developpement': 'Definition of development objectives',
      "plans d'action operationnels": 'Operational action plans',
      'conduite des changements organisationnels': 'Organizational change management',
      'pilotage des projets de transformation': 'Transformation project management',
      'resultat : une croissance maitrisee et une meilleure prise de decision.': 'Outcome: controlled growth and better decision-making.',
      'coaching des dirigeants et des managers': 'Executive and manager coaching',
      'communication interne': 'Internal communication',
      'leadership et motivation du personnel': 'Leadership and staff motivation',
      'gestion des conflits': 'Conflict management',
      "travail d'equipe": 'Teamwork',
      'resultat : un climat de travail positif et des equipes engagees.': 'Outcome: a positive work climate and engaged teams.',
      'adresse': 'Address',
      'maroc': 'Morocco',
      'suivez-nous': 'Follow us',
      'reponse rapide': 'Quick response',
      'nous vous repondons sous 24h ouvrees.': 'We reply within 24 business hours.',
      "cabinet d'expertise, de conseil, d'ingenierie de la formation et de developpement organisationnel.": 'A consulting firm specializing in expertise, advisory, training engineering and organizational development.',
      'liens rapides': 'Quick links',
      'nos domaines': 'Our areas',
      'developpement organisationnel': 'Organizational development',
      'formation professionnelle': 'Professional training',
      'etudes et referentiels': 'Studies and frameworks',
      'transformation numerique': 'Digital transformation',
      'coaching professionnel': 'Professional coaching',
      '© 2026 ifpe conseil. tous droits reserves.': '© 2026 IFPE Conseil. All rights reserved.',
      'tous droits reserves.': 'All rights reserved.'
    }
  };

  function translateNodeText(root, lang) {
    root.querySelectorAll('h1, h2, h3, h4, p, a, button, span, label, li').forEach(el => {
      el.childNodes.forEach(node => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        const text = node.textContent.trim();
        if (!text) return;
        if (!node._originalText) node._originalText = node.textContent;
        const cleanOriginal = node._originalText.trim();
        if (lang === 'fr') {
          node.textContent = node._originalText;
          return;
        }
        const translated =
          translationsByKey[lang][normalizeKey(cleanOriginal)] ||
          translationsByKey[lang][normalizeKey(text)] ||
          translations[lang][cleanOriginal] ||
          translations[lang][text];
        if (translated) {
          node.textContent = node._originalText.replace(cleanOriginal, translated);
        }
      });
    });

    root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      if (!el.dataset.originalPlaceholder) el.dataset.originalPlaceholder = el.placeholder;
      if (lang === 'fr') {
        el.placeholder = el.dataset.originalPlaceholder;
        return;
      }
      el.placeholder =
        translationsByKey[lang][normalizeKey(el.dataset.originalPlaceholder)] ||
        translations[lang][el.dataset.originalPlaceholder] ||
        el.dataset.originalPlaceholder;
    });
  }

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('ifpe-lang', lang);
    translateNodeText(document.body, lang);
    if (languageLabel && languageMenu) {
      languageLabel.textContent = lang.toUpperCase();
      languageMenu.textContent = lang === 'fr' ? 'EN' : 'FR';
      languageMenu.dataset.lang = lang === 'fr' ? 'en' : 'fr';
    }
  }

  if (languageToggle && languageMenu) {
    languageToggle.addEventListener('click', e => {
      e.stopPropagation();
      closeAllMenus();
      languageMenu.classList.toggle('hidden');
      languageToggle.setAttribute('aria-expanded', String(!languageMenu.classList.contains('hidden')));
    });

    languageMenu.addEventListener('click', e => {
      e.stopPropagation();
      setLanguage(languageMenu.dataset.lang || 'en');
      languageMenu.classList.add('hidden');
      languageToggle.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', e => {
      if (!languageSwitch.contains(e.target)) {
        languageMenu.classList.add('hidden');
        languageToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        languageMenu.classList.add('hidden');
        languageToggle.setAttribute('aria-expanded', 'false');
      }
    });

    setLanguage(localStorage.getItem('ifpe-lang') || 'fr');
  }


  /* ---------- Mobile menu ---------- */
  const burger        = document.getElementById('burger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose   = document.getElementById('mobile-close');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  /* ---------- Search toggle ---------- */
  const searchToggle = document.getElementById('search-toggle');
  const searchBar    = document.getElementById('search-bar');
  const searchClose  = document.getElementById('search-close');
  const searchForms  = document.querySelectorAll('.site-search');

  function runSearch(query) {
    const term = query.trim();
    if (!term) return;
    window.location.href = `recherche.html?q=${encodeURIComponent(term)}`;
  }

  searchForms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      runSearch(form.querySelector('input').value);
    });
  });

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', e => {
      e.stopPropagation();
      closeAllMenus();
      searchBar.classList.toggle('hidden');
      if (!searchBar.classList.contains('hidden')) {
        searchBar.querySelector('input').focus();
      }
    });
  }

  if (searchClose && searchBar) {
    searchClose.addEventListener('click', () => searchBar.classList.add('hidden'));
  }

  if (searchBar) {
    const searchBarInput = searchBar.querySelector('input');
    searchBarInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        runSearch(searchBarInput.value);
      }
    });
  }

  document.addEventListener('click', e => {
    if (searchBar && !e.target.closest('#site-header')) {
      searchBar.classList.add('hidden');
    }
  });


  /* ---------- Domain tabs ---------- */
  const tabBtns     = document.querySelectorAll('.domain-tab');
  const tabContents = document.querySelectorAll('.domain-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(c => c.classList.add('hidden'));
      const target = document.getElementById('tab-' + tabId);
      if (target) {
        target.classList.remove('hidden');
        target.style.animation = 'none';
        target.offsetHeight;
        target.style.animation = '';
      }
    });
  });


  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(
    '.value-card, .why-card, .why-card-cta, .domain-content, section > .max-w-7xl > .text-center, .service-card'
  );
  const textRevealEls = document.querySelectorAll(
    'main section h2, main section h3, main section p, main section li'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  textRevealEls.forEach((el, index) => {
    if (el.closest('.hero-left')) return;
    el.classList.add('text-reveal');
    el.style.transitionDelay = `${Math.min(index % 5, 4) * 45}ms`;
    observer.observe(el);
  });


  /* ---------- Contact form ---------- */
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const requiredFields = [...form.querySelectorAll('[required]')];
      const civilityGroup = form.querySelector('.contact-radio-group');
      const civilitySelected = Boolean(form.querySelector('input[name="civility"]:checked'));

      requiredFields.forEach(field => {
        if (field.type !== 'radio') {
          field.style.borderColor = field.checkValidity() ? '' : '#ef4444';
        }
      });
      civilityGroup?.classList.toggle('is-invalid', !civilitySelected);

      if (!form.checkValidity() || !civilitySelected) {
        form.reportValidity();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalButtonContent = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<svg class="w-4 h-4 animate-spin inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Envoi en cours...';

      setTimeout(() => {
        form.reset();
        requiredFields.forEach(field => { field.style.borderColor = ''; });
        civilityGroup?.classList.remove('is-invalid');
        btn.disabled = false;
        btn.innerHTML = originalButtonContent;
        success.classList.remove('hidden');
        setTimeout(() => success.classList.add('hidden'), 5000);
      }, 1200);
    });

    form.querySelectorAll('[required]').forEach(field => {
      const eventName = field.type === 'radio' ? 'change' : 'input';
      field.addEventListener(eventName, () => {
        if (field.type === 'radio') {
          form.querySelector('.contact-radio-group')?.classList.remove('is-invalid');
        } else if (field.checkValidity()) {
          field.style.borderColor = '';
        }
      });
    });
  }


  /* ---------- Smooth anchor scroll with header offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});

// Accordéon des domaines d'intervention de la page d'accueil.
(() => {
  const section = document.querySelector('#domaines.ifpe-domains');
  if (!section) return;

  const descriptions = [
    "Diagnostic organisationnel, optimisation des processus et mise en place de systèmes de management pour construire une organisation plus efficace, agile et orientée résultats.",
    "Référentiels métiers et compétences, GPEC, recrutement, évaluation et accompagnement des parcours pour des équipes engagées et alignées sur la stratégie.",
    "Ingénierie de formation, plans de développement des compétences, perfectionnement technique, leadership et formation des formateurs.",
    "Études sectorielles, analyses des besoins, ingénierie des dispositifs et conception de référentiels métiers, compétences et formation.",
    "Digitalisation des processus, gouvernance des données et intégration responsable de l’intelligence artificielle au service de la performance.",
    "Élaboration de stratégies, feuilles de route, dispositifs de pilotage et accompagnement humain des transformations.",
    "Coaching individuel et collectif, développement du leadership, cohésion et mobilisation durable des équipes."
  ];

  const images = [
    "assets/images/domain-organisation-performance.gif",
    "assets/images/domain-rh-strategique.gif",
    "assets/images/domain-formation-competences.gif",
    "assets/images/domain-etudes-referentiels.gif",
    "assets/images/domain-transformation-numerique-ia.gif",
    "assets/images/domain-strategie-changement.gif",
    "assets/images/domain-coaching-equipes.gif"
  ];

  const items = [...section.querySelectorAll('ol > li')];
  items.forEach((item, index) => {
    const trigger = item.querySelector('a');
    const iconTrigger = item.querySelector(':scope > span');
    if (!trigger) return;

    const panelId = `domain-panel-${index + 1}`;
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', panelId);
    iconTrigger?.setAttribute('role', 'button');
    iconTrigger?.setAttribute('tabindex', '0');
    iconTrigger?.setAttribute('aria-label', `Afficher ${trigger.textContent.trim()}`);
    iconTrigger?.setAttribute('aria-expanded', 'false');
    iconTrigger?.setAttribute('aria-controls', panelId);

    const panel = document.createElement('div');
    panel.id = panelId;
    panel.className = 'domain-accordion-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div>
        <div class="domain-accordion-content">
          <img class="protected-image domain-icon" src="${images[index]}" alt="" loading="lazy" draggable="false" />
          <p>${descriptions[index]}</p>
        </div>
      </div>`;
    item.appendChild(panel);

    const toggleDomain = (event) => {
      event?.preventDefault();
      const willOpen = !item.classList.contains('is-open');

      items.forEach((otherItem) => {
        otherItem.classList.remove('is-open');
        const otherTrigger = otherItem.querySelector('a');
        const otherIconTrigger = otherItem.querySelector(':scope > span');
        const otherPanel = otherItem.querySelector('.domain-accordion-panel');
        otherTrigger?.setAttribute('aria-expanded', 'false');
        otherIconTrigger?.setAttribute('aria-expanded', 'false');
        otherPanel?.setAttribute('aria-hidden', 'true');
      });

      if (willOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        iconTrigger?.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
      }
    };

    trigger.addEventListener('click', toggleDomain);
    iconTrigger?.addEventListener('click', toggleDomain);
    iconTrigger?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') toggleDomain(event);
    });
  });

  // Tous les domaines restent fermés au chargement afin que la section
  // complète tienne dans un seul écran, comme sur la référence.
})();

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach(function (image) {
    image.setAttribute("draggable", "false");
    image.classList.add("protected-image");
  });

  document.addEventListener("dragstart", function (event) {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  });

  document.addEventListener("contextmenu", function (event) {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  });
});

/* ---------- Fil d'Ariane global ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const main = Array.from(document.querySelectorAll('main')).find(element => {
    return element.getAttribute('aria-hidden') !== 'true' && getComputedStyle(element).display !== 'none';
  });

  if (!main || document.querySelector('.site-breadcrumb')) return;

  const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const domainLabels = {
    organisation: 'Développement organisationnel',
    rh: 'Gestion stratégique des ressources humaines',
    formation: 'Formation professionnelle et développement des compétences',
    referentiels: 'Études, ingénierie et référentiels',
    digital: 'Digitalisation et transformation numérique',
    strategie: 'Planification stratégique et accompagnement du changement',
    coaching: 'Coaching professionnel et mobilisation des équipes'
  };

  const pageTrails = {
    'index.html': [{ label: 'Accueil' }],
    'contact.html': [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Nous contacter' }
    ],
    'domaines.html': [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Nos domaines' }
    ],
    'services.html': [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Nos services' }
    ],
    'valeur-ajoutee.html': [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Notre valeur ajoutée' }
    ],
    'recherche.html': [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Recherche' }
    ]
  };

  const getDomainTrail = () => {
    const key = new URLSearchParams(window.location.search).get('d');
    return [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Nos domaines', href: 'domaines.html' },
      { label: domainLabels[key] || domainLabels.organisation }
    ];
  };

  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'site-breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Fil d’Ariane');
  breadcrumb.innerHTML = '<div class="site-breadcrumb__inner"></div>';
  main.before(breadcrumb);
  document.body.classList.add('has-site-breadcrumb');

  const homeIcon = `
    <svg class="site-breadcrumb__home" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9" d="M3 10.8 12 3l9 7.8M5.5 9.5V21h13V9.5M9.5 21v-6.5h5V21" />
    </svg>`;
  const chevron = `
    <svg class="site-breadcrumb__chevron" aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m7.5 4.5 5 5.5-5 5.5" />
    </svg>`;

  const renderBreadcrumb = () => {
    const items = pageName === 'domaine-detail.html'
      ? getDomainTrail()
      : (pageTrails[pageName] || [{ label: document.title.split(/[|–-]/)[0].trim() || 'Page' }]);
    const inner = breadcrumb.querySelector('.site-breadcrumb__inner');
    inner.replaceChildren();

    items.forEach((item, index) => {
      if (index > 0) inner.insertAdjacentHTML('beforeend', chevron);

      const isCurrent = index === items.length - 1;
      const element = item.href && !isCurrent
        ? document.createElement('a')
        : document.createElement('span');

      if (item.href && !isCurrent) element.href = item.href;
      element.className = isCurrent
        ? 'site-breadcrumb__current'
        : 'site-breadcrumb__link';
      if (isCurrent) element.setAttribute('aria-current', 'page');
      if (index === 0) element.insertAdjacentHTML('afterbegin', homeIcon);

      const label = document.createElement('span');
      label.textContent = item.label;
      element.appendChild(label);
      inner.appendChild(element);
    });
  };

  renderBreadcrumb();

  if (pageName === 'domaine-detail.html') {
    window.addEventListener('popstate', renderBreadcrumb);
    const detailTitle = document.getElementById('detail-title');
    if (detailTitle) {
      new MutationObserver(renderBreadcrumb).observe(detailTitle, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }
});
