import { DATA } from '../data.js';
(function () {
  const d = DATA;

  // ── Helpers ──
  const $ = id => document.getElementById(id);
  const iconMap = {
    football:    "\u26BD",
    cricket:     "\uD83C\uDFCF",
    tabletennis: "\uD83C\uDFD3",
    gaming:      "\uD83C\uDFAE",
    guitar:      "\uD83C\uDFB8",
    manga:       "\uD83D\uDCDA",
    hiking:      "\u26F0\uFE0F",
  };

  // ── Nav ──
  $('nav-logo').textContent = d.firstName || d.name.split(' ')[0];

  // ── Hero ──
  $('heroName').textContent = d.name;
  $('heroTagline').textContent = d.tagline;

  // Hero chips
  $('heroChips').innerHTML = `
    <span class="chip"><span class="chip-icon">\uD83D\uDCCD</span>${d.location}</span>
    <a class="chip" href="mailto:${d.email}"><span class="chip-icon">\u2709</span>${d.email}</a>
    <a class="chip" href="tel:${d.phone.replace(/\s/g,'')}"><span class="chip-icon">\uD83D\uDCDE</span>${d.phone}</a>
  `;

  // Typing effect
  const typed = $('heroTyped');
  let wordIdx = 0, charIdx = 0, deleting = false;
  function typeLoop() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typed.textContent = d.heroWords[0];
      return;
    }
    const word = d.heroWords[wordIdx];
    if (!deleting) {
      typed.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
      setTimeout(typeLoop, 90);
    } else {
      typed.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % d.heroWords.length; setTimeout(typeLoop, 400); return; }
      setTimeout(typeLoop, 45);
    }
  }
  typeLoop();

  // ── About ──
  const aboutParts = d.aboutStory.split('\n\n');
  $('aboutText').innerHTML =
    `<span class="lead">${d.aboutIntro}</span>` +
    aboutParts.map(p => `<p style="margin-bottom:.75rem">${p.trim()}</p>`).join('');

  $('aboutSidebar').innerHTML = d.aboutHighlights.map(h => `
    <div class="about-stat">
      <div class="about-stat-value">${h.icon}</div>
      <div class="about-stat-label">${h.label}</div>
    </div>
  `).join('');

  // ── Education ──
  $('eduTimeline').innerHTML = d.education.map(e => `
    <div class="tl-item">
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
  $('expTimeline').innerHTML = d.experience.map(e => `
    <div class="tl-item">
      <div class="tl-dot"></div>
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
  $('researchGrid').innerHTML = d.research.map(r => `
    <div class="card research-card">
      <p class="research-type">${r.type}</p>
      <h3 class="research-title">${r.title}</h3>
      <p class="research-desc">${r.description}</p>
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
      <div class="beyond-icon">${iconMap[b.icon] || '\u2728'}</div>
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
      <span class="chip-icon">\u2709\uFE0F</span>
      <p class="contact-label">Personal Email</p>
      <a class="contact-value" href="mailto:${d.email}">${d.email}</a>
    </div>
    <div class="card contact-card">
      <span class="chip-icon">\uD83C\uDFEB</span>
      <p class="contact-label">Academic Email</p>
      <a class="contact-value" href="mailto:${d.academicEmail}">${d.academicEmail}</a>
    </div>
    <div class="card contact-card">
      <span class="chip-icon">\uD83D\uDCDE</span>
      <p class="contact-label">Phone</p>
      <a class="contact-value" href="tel:${d.phone.replace(/\s/g,'')}">${d.phone}</a>
    </div>
    <div class="card contact-card">
      <span class="chip-icon">\uD83D\uDCCD</span>
      <p class="contact-label">Location</p>
      <p class="contact-value">${d.location}</p>
    </div>
    ${d.social.linkedin ? `<div class="card contact-card"><span class="chip-icon">\uD83D\uDD17</span><p class="contact-label">LinkedIn</p><a class="contact-value" href="${d.social.linkedin}" target="_blank">View Profile</a></div>` : ''}
    ${d.social.github ? `<div class="card contact-card"><span class="chip-icon">\uD83D\uDCBB</span><p class="contact-label">GitHub</p><a class="contact-value" href="${d.social.github}" target="_blank">View Profile</a></div>` : ''}
  `;

  // ── Footer ──
  $('footer').innerHTML = `
    <p class="footer-quote">"${d.footerQuote}"</p>
    <p class="footer-copy">&copy; ${new Date().getFullYear()} ${d.name}. Built with curiosity and code.</p>
  `;

  // ── Mobile Nav ──
  $('navToggle').addEventListener('click', () => $('navLinks').classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => $('navLinks').classList.remove('open'))
  );

  // ── Scroll: nav shadow + reveal ──
  const nav = $('nav');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Scroll: nav shadow + Nepal photo transitions ──
  const bg = document.querySelector('.nepal-photo-bg');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // Smooth photo background transitions based on scroll position
    const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    // Himalaya: full at top, fades out by 35%
    const himalaya = Math.max(0, 1 - scrollPct * 3.5);
    // Hills: fades in from 15%, peaks at 50%, fades out by 75%
    const hills = Math.max(0, scrollPct < 0.15 ? 0 : scrollPct < 0.5 ? (scrollPct - 0.15) * 2.85 : 1 - (scrollPct - 0.5) * 3);
    // Terai: fades in from 55%, full by 80%
    const terai = Math.max(0, Math.min(1, (scrollPct - 0.55) * 4));

    bg.style.setProperty('--himalaya-opacity', himalaya);
    bg.style.setProperty('--hills-opacity', hills);
    bg.style.setProperty('--terai-opacity', terai);
  }, { passive: true });

  // ── Floating green particles ──
  const particleBox = $('particles');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*12+10}s;
      animation-delay:${Math.random()*10}s;
      opacity:${Math.random()*.3+.1};
    `;
    particleBox.appendChild(p);
  }

})();
