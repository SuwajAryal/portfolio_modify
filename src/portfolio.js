import { DATA } from '../data.js';
import { animate, inView } from 'motion';
import { createIcons, MapPin, Mail, Phone, ArrowUpRight, ArrowDown, Download,
  Waves, Zap, Globe, Wrench, Music, BookOpen, Mountain, Gamepad2, Trophy, GraduationCap, Link } from 'lucide';
(function () {
  const d = DATA;

  // ── Helpers ──
  const $ = id => document.getElementById(id);
  const iconMap = { football: 'trophy', cricket: 'trophy', tabletennis: 'trophy',
    gaming: 'gamepad-2', guitar: 'music', manga: 'book-open', hiking: 'mountain' };

  // ── Nav ──
  $('nav-logo').textContent = d.firstName || d.name.split(' ')[0];

  // ── Hero ──
  $('heroName').replaceChildren(...d.name.split(' ').map(word => {
    const span = document.createElement('span'); span.textContent = word; return span;
  }));
  $('heroTagline').textContent = d.tagline;
  $('researchFocus').textContent = d.researchProfile.focus;
  $('researchIntroduction').textContent = d.researchProfile.introduction;
  $('researchStatus').textContent = d.researchProfile.status;
  $('researchOpportunity').textContent = d.researchProfile.opportunity;
  $('researchEmail').href = `mailto:${d.academicEmail}`;
  $('researchThemes').innerHTML = d.researchProfile.themes.map((theme,index) => `
    <article class="research-theme">
      <span class="theme-number">0${index+1}</span>
      <h3>${theme.title}</h3><p>${theme.question}</p>
      <p class="theme-methods">${theme.methods}</p>
    </article>`).join('');

  // Hero chips
  $('heroChips').innerHTML = `
    <span class="chip"><i data-lucide="map-pin"></i> Kathmandu, Nepal</span>
  `;

  $('heroTyped').textContent = d.title;

  // ── About ──
  const aboutParts = d.aboutStory.split('\n\n');
  $('aboutText').innerHTML =
    `<span class="lead">${d.aboutIntro}</span>` +
    aboutParts.map(p => `<p style="margin-bottom:.75rem">${p.trim()}</p>`).join('');

  $('aboutSidebar').innerHTML = d.aboutHighlights.map((h, index) => `
    <div class="about-stat">
      <div class="about-stat-value"><i data-lucide="${['waves','zap','globe','wrench'][index] || 'globe'}"></i></div>
      <div class="about-stat-label">${h.label}</div>
    </div>
  `).join('');

  // ── Education ──
  // Read the education chapter chronologically: bachelor’s, then master’s.
  $('eduTimeline').innerHTML = d.education.map((entry, index) => ({ entry, index })).reverse().map(({ entry: e, index }) => `
    <div class="tl-item education-step" data-education-index="${index}">
      <div class="tl-dot"></div>
      <div class="card">
        <div class="card-top">
          <span class="card-title">${e.degree}</span>
          <span class="card-badge ${e.status.toLowerCase().includes('ongoing') ? 'badge-ongoing' : 'badge-completed'}">${e.status}</span>
        </div>
        <p class="card-institution">${e.institution}</p>
        <p class="card-period">${e.period}</p>
        <ul>${e.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      </div>
    </div>
  `).join('');

  // ── Experience ──
  // Sort a copy: editing the data file cannot accidentally scramble the timeline.
  $('expTimeline').innerHTML = [...d.experience].sort((a, b) => b.startYear - a.startYear).map(e => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <p class="experience-year">${e.startYear}</p>
      <div class="card">
        <div class="card-top">
          <span class="card-title">${e.role} — ${e.company}</span>
          <span class="card-badge badge-tag">${e.period}</span>
        </div>
        <p class="card-story">${e.story}</p>
        <ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
    </div>
  `).join('');

  // ── Research Interests ──
  $('interestsFlex').innerHTML = d.researchInterests.map(ri => `
    <span class="interest-pill">${ri}</span>
  `).join('');

  // ── Research Projects ──
  // Reuse the same readable card layout for the additional academic sections.
  function academicCard(entry) {
    return `<article class="card research-card">
      ${entry.type ? `<p class="research-type">${entry.type}</p>` : ''}
      <h3 class="research-title">${entry.title}</h3>
      <p class="research-desc">${entry.description}</p>
      ${entry.url ? `<a class="academic-link" href="${entry.url}" target="_blank" rel="noopener noreferrer">${entry.linkLabel} ↗</a>` : ''}
    </article>`;
  }
  $('publicationsGrid').innerHTML = d.publications.map(academicCard).join('');
  $('manuscriptList').innerHTML = d.manuscripts.map(title => `<li>${title}</li>`).join('');
  $('honorsGrid').innerHTML = d.honors.map(academicCard).join('');
  $('languagesGrid').innerHTML = d.languages.map(academicCard).join('');
  $('affiliationsGrid').innerHTML = d.affiliations.map(academicCard).join('');
  $('referencesNote').textContent = d.referencesNote;
  $('researchGrid').innerHTML = d.research.map(r => `
    <div class="card research-card">
      <p class="research-type">${r.type}</p>
      <h3 class="research-title">${r.title}</h3>
      <p class="research-desc">${r.description}</p>
      ${r.details ? `<ul class="research-details">${r.details.map(detail => `<li>${detail}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  // ── Skills ──
  $('skillsFlex').innerHTML = d.skills.map(s => `
    <div class="card skill-card">
      <p class="skill-cat">${s.category}</p>
      <div class="skill-pills">${s.items.map(i => `<span class="pill">${i}</span>`).join('')}</div>
    </div>
  `).join('');

  // ── Training ──
  $('trainingCards').innerHTML = d.training.map(t => `
    <div class="card">
      <div class="card-top">
        <span class="card-title">${t.name}</span>
        <span class="card-badge badge-tag">${t.duration}</span>
      </div>
      <div class="skill-pills" style="margin-top:.6rem">${t.items.map(i => `<span class="pill">${i}</span>`).join('')}</div>
    </div>
  `).join('');

  // ── Beyond Engineering ──
  $('beyondGrid').innerHTML = d.beyondEngineering.map(b => `
    <div class="card beyond-card">
      <div class="beyond-icon"><i data-lucide="${iconMap[b.icon] || 'globe'}"></i></div>
      <div>
        <p class="beyond-title">${b.title}</p>
        <p class="beyond-desc">${b.description}</p>
      </div>
    </div>
  `).join('');

  // ── Future ──
  $('futureBox').innerHTML = `
    <p>${d.futureGoals}</p>
    <a href="mailto:${d.email}" class="btn btn-primary" style="margin-top:1.5rem">Let's Talk</a>
  `;

  // ── Contact ──
  $('contactGrid').innerHTML = `
    <div class="card contact-card">
      <span class="chip-icon"><i data-lucide="mail"></i></span>
      <p class="contact-label">Personal Email</p>
      <a class="contact-value" href="mailto:${d.email}">${d.email}</a>
    </div>
    <div class="card contact-card">
      <span class="chip-icon"><i data-lucide="graduation-cap"></i></span>
      <p class="contact-label">Academic Email</p>
      <a class="contact-value" href="mailto:${d.academicEmail}">${d.academicEmail}</a>
    </div>
    <div class="card contact-card">
      <span class="chip-icon"><i data-lucide="phone"></i></span>
      <p class="contact-label">Phone</p>
      <a class="contact-value" href="tel:${d.phone.replace(/\s/g,'')}">${d.phone}</a>
    </div>
    <div class="card contact-card">
      <span class="chip-icon"><i data-lucide="map-pin"></i></span>
      <p class="contact-label">Location</p>
      <p class="contact-value">${d.location}</p>
    </div>
    ${d.social.linkedin ? `<div class="card contact-card"><span class="chip-icon"><i data-lucide="link"></i></span><p class="contact-label">LinkedIn</p><a class="contact-value" href="${d.social.linkedin}" target="_blank">View Profile</a></div>` : ''}
    ${d.social.github ? `<div class="card contact-card"><span class="chip-icon"><i data-lucide="globe"></i></span><p class="contact-label">GitHub</p><a class="contact-value" href="${d.social.github}" target="_blank">View Profile</a></div>` : ''}
  `;

  // ── Footer ──
  $('footer').innerHTML = `
    <p class="footer-quote">"${d.footerQuote}"</p>
    <p class="footer-copy">&copy; ${new Date().getFullYear()} ${d.name}. Built with curiosity and code.</p>
    <p class="source-credit"><a href="./sources.html">Community code & geographic data credits ↗</a></p>
  `;

  // ── Mobile Nav ──
  $('navToggle').addEventListener('click', () => {
    const open = $('navLinks').classList.toggle('open');
    $('navToggle').setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => {
      $('navLinks').classList.remove('open');
      $('navToggle').setAttribute('aria-expanded', 'false');
    })
  );

  // ── Scroll: nav shadow + reveal ──
  const nav = $('nav');
  // Motion's documented inView + animate pattern. Content remains visible if
  // animation is unavailable, and reduced-motion readers get a still layout.
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  inView('.reveal', element => {
    if (preference.matches) return;
    const animation = animate(element, { opacity: [0, 1], y: [18, 0] }, { duration: .55 });
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation));
  }, { amount: .08 });
  preference.addEventListener('change', () => {
    if (preference.matches) { animations.forEach(animation => animation.complete()); animations.clear(); }
  });
  createIcons({ icons: { MapPin, Mail, Phone, ArrowUpRight, ArrowDown, Download,
    Waves, Zap, Globe, Wrench, Music, BookOpen, Mountain, Gamepad2, Trophy, GraduationCap, Link },
    attrs: { 'aria-hidden': 'true' } });

  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
})();
