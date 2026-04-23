
// AOS INITIALIZATION

AOS.init({
  offset: 120,
  delay: 0,
  duration: 1200,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom'
});



// SMOOTH SCROLL FOR NAV LINKS

document.querySelectorAll('.nav-link, .back-to-top').forEach(link => {
  link.addEventListener('click', function (e) {

    const href = this.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }

      // Close mobile navbar after click
      const navbarCollapse = document.querySelector('.navbar-collapse');

      if (navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse).hide();
      }
    }
  });
});



// ACTIVE NAV LINK ON SCROLL

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 250;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');

    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

});



// NAVBAR GLASS ENHANCEMENT

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(15, 23, 42, 0.88)';
    navbar.style.backdropFilter = 'blur(18px)';
    navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.35)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.6)';
    navbar.style.boxShadow = 'none';
  }

});



// SCROLL REVEAL FOR CARDS

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('show-card');
    }

  });

}, {
  threshold: 0.15
});

document.querySelectorAll('.card-custom, .skill-box, .about-card, .contact-info-card').forEach(el => {
  observer.observe(el);
});



// CONTACT FORM SUCCESS MESSAGE

const contactForm = document.querySelector('.contact-form-card form');

if (contactForm) {

  const successMessage = document.createElement('div');

  successMessage.style.marginTop = '18px';
  successMessage.style.padding = '14px';
  successMessage.style.borderRadius = '12px';
  successMessage.style.display = 'none';
  successMessage.style.background = 'rgba(255,154,31,0.12)';
  successMessage.style.border = '1px solid rgba(255,154,31,0.2)';
  successMessage.style.color = '#fff';
  successMessage.style.fontWeight = '500';

  successMessage.innerHTML = 'Message sent successfully ✔';

  contactForm.appendChild(successMessage);

  contactForm.addEventListener('submit', () => {

    setTimeout(() => {
      successMessage.style.display = 'block';

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 4000);

    }, 500);

  });

}



// BUTTON RIPPLE EFFECT

const buttons = document.querySelectorAll('.btn-hover, .btn-submit, .about-btn');

buttons.forEach(button => {

  button.addEventListener('click', function (e) {

    const ripple = document.createElement('span');

    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;

    ripple.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.background = 'rgba(255,255,255,0.4)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';

    const existingRipple = this.querySelector('.ripple');

    if (existingRipple) {
      existingRipple.remove();
    }

    ripple.classList.add('ripple');

    this.appendChild(ripple);

  });

});



// PAGE FADE-IN EFFECT

window.addEventListener('load', () => {

  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.8s ease';

});



// BACK TO TOP VISIBILITY

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {

  if (window.scrollY > 600) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
  }

});

// ROTATING ROLE TEXT

const roles = [
  "Analyst",
  "Scientist"
];

const typingElement = document.getElementById("typing-role");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1200);
      return;
    }

  } else {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 45 : 90;
  setTimeout(typeRole, speed);
}

typeRole();