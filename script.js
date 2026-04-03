// ==============================
//  SHOPTALK BLOG — SCRIPT.JS
// ==============================

// --- MOBILE MENU ---
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (menu && hamburger && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// --- POSTS: CATEGORY FILTER ---
function filterPosts(cat, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide cards
  document.querySelectorAll('#postsGrid .card').forEach(card => {
    const cardCat = card.getAttribute('data-cat');
    if (cat === 'all' || cardCat === cat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  checkNoResults();
}

// --- POSTS: SEARCH ---
function searchPosts() {
  const query = document.getElementById('searchInput').value.toLowerCase();

  document.querySelectorAll('#postsGrid .card').forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  checkNoResults();
}

function checkNoResults() {
  const noResults = document.getElementById('noResults');
  if (!noResults) return;
  const visible = document.querySelectorAll('#postsGrid .card:not(.hidden)').length;
  noResults.style.display = visible === 0 ? 'block' : 'none';
}

// --- CONTACT FORM VALIDATION ---
function submitForm() {
  let valid = true;

  const fields = [
    { id: 'name',    errId: 'nameErr',    msg: 'Name is required.' },
    { id: 'email',   errId: 'emailErr',   msg: 'Email is required.' },
    { id: 'subject', errId: 'subjectErr', msg: 'Subject is required.' },
    { id: 'message', errId: 'messageErr', msg: 'Message is required.' },
  ];

  fields.forEach(({ id, errId, msg }) => {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!el || !err) return;
    el.classList.remove('error');
    err.textContent = '';

    if (!el.value.trim()) {
      el.classList.add('error');
      err.textContent = msg;
      valid = false;
    }
  });

  // Email format check
  const emailEl = document.getElementById('email');
  const emailErr = document.getElementById('emailErr');
  if (emailEl && emailErr && emailEl.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEl.value.trim())) {
      emailEl.classList.add('error');
      emailErr.textContent = 'Please enter a valid email.';
      valid = false;
    }
  }

  if (!valid) return;

  // Success: show message, hide form
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('contactForm').style.opacity = '0.4';
  document.getElementById('contactForm').style.pointerEvents = 'none';
}

// --- FAQ ACCORDION ---
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const span = btn.querySelector('span');
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q span').forEach(s => s.textContent = '+');

  if (!isOpen) {
    answer.classList.add('open');
    span.textContent = '−';
  }
}

// --- SCROLL REVEAL ---
function revealOnScroll() {
  const cards = document.querySelectorAll('.card, .value-card, .team-card, .info-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.5s ease both';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', revealOnScroll);
