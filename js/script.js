// Mobile navigation toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close mobile menu when a nav link is clicked
navLinkItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  if (!navLinks.classList.contains('open')) return;
  const clickedInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
  if (!clickedInside) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  const scrollY = window.scrollY;
  let currentId = 'home';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentId = section.getAttribute('id');
    }
  });

  navLinkItems.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// Contact form validation
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formStatus = document.getElementById('formStatus');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearError(input, errorEl) {
  input.classList.remove('input-error');
  errorEl.textContent = '';
}

function showError(input, errorEl, message) {
  input.classList.add('input-error');
  errorEl.textContent = message;
}

function validateField(input, errorEl) {
  const value = input.value.trim();

  if (input === nameInput) {
    if (!value) return showError(input, errorEl, 'Name is required.'), false;
    if (value.length < 2) return showError(input, errorEl, 'Name must be at least 2 characters.'), false;
  }

  if (input === emailInput) {
    if (!value) return showError(input, errorEl, 'Email is required.'), false;
    if (!isValidEmail(value)) return showError(input, errorEl, 'Please enter a valid email address.'), false;
  }

  if (input === messageInput) {
    if (!value) return showError(input, errorEl, 'Message is required.'), false;
    if (value.length < 10) return showError(input, errorEl, 'Message must be at least 10 characters.'), false;
  }

  clearError(input, errorEl);
  return true;
}

[nameInput, emailInput, messageInput].forEach((input) => {
  const errorEl = document.getElementById(`${input.id}Error`);
  input.addEventListener('input', () => {
    validateField(input, errorEl);
    formStatus.textContent = '';
  });
  input.addEventListener('blur', () => validateField(input, errorEl));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';

  const isNameValid = validateField(nameInput, nameError);
  const isEmailValid = validateField(emailInput, emailError);
  const isMessageValid = validateField(messageInput, messageError);

  if (isNameValid && isEmailValid && isMessageValid) {
    formStatus.textContent = 'Thank you! Your message has been received (demo form).';
    form.reset();
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.classList.remove('input-error');
    });
    nameInput.focus();
  } else {
    formStatus.style.color = '#c24141';
    formStatus.textContent = 'Please fix the errors above and try again.';
    // Reset color for next successful submit
    setTimeout(() => { formStatus.style.color = ''; }, 0);
  }
});
