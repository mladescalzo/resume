const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link[data-scroll], .nav-link');
const nav = document.querySelector('.nav');

// Toggle mobile navigation
navToggle?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

// Close mobile nav after click
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = event.currentTarget.getAttribute('href');
    if (target && target.startsWith('#')) {
      nav?.classList.remove('open');
    }
  });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Animate skill progress bars when in view
const progressBars = document.querySelectorAll('.progress-inner');
const progressObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const bar = entry.target;
      const value = Number(bar.getAttribute('data-progress'));
      if (value) {
        bar.style.width = `${value}%`;
      }
      observer.unobserve(bar);
    });
  },
  { threshold: 0.3 }
);

progressBars.forEach((bar) => progressObserver.observe(bar));

// Highlight active nav link
const sections = document.querySelectorAll('section[id]');
const navLinkMap = new Map();

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    navLinkMap.set(href, link);
  }
});

const highlightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = `#${entry.target.id}`;
      const link = navLinkMap.get(id);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => highlightObserver.observe(section));

// Footer year update
const yearElement = document.getElementById('currentYear');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}