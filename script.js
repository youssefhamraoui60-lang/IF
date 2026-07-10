/* ===== IFPE Conseil – Main Script ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll effect ---------- */
  const siteHeader = document.getElementById('site-header');
  const headerPill = document.querySelector('.header-pill');

  function updateHeaderOnScroll() {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
      headerPill.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
      headerPill.classList.remove('scrolled');
    }
  }

  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });


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

  function normalizeText(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function runSearch(query) {
    const term = normalizeText(query.trim());
    document.querySelectorAll('.search-hit').forEach(el => el.classList.remove('search-hit'));
    if (!term) return;

    const candidates = Array.from(document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main li'))
      .filter(el => el.offsetParent !== null && normalizeText(el.textContent).includes(term));

    if (!candidates.length) {
      alert((document.documentElement.lang === 'en' && translations.en['Aucun résultat trouvé.']) || 'Aucun résultat trouvé.');
      return;
    }

    const target = candidates[0];
    target.classList.add('search-hit');
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 135,
      behavior: 'smooth'
    });
    setTimeout(() => target.classList.remove('search-hit'), 2600);
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
      if (e.key === 'Enter') runSearch(searchBarInput.value);
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
      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        form.querySelectorAll('[required]').forEach(el => {
          if (!el.value.trim()) {
            el.style.borderColor = '#ef4444';
            el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
          }
        });
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<svg class="w-4 h-4 animate-spin inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Envoi en cours...';

      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerHTML = '<svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> Envoyer le message';
        success.classList.remove('hidden');
        setTimeout(() => success.classList.add('hidden'), 5000);
      }, 1200);
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
