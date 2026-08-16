document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 });
  }

  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    if (!preloader) return;
    preloader.classList.add('fade-out');
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 500);
  });

  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function () {
    if (navbar) navbar.classList.toggle('shadow-lg', window.scrollY > 40);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 320);
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const menuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  function setMenuOpen(open) {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.toggle('open', open);
    mobileMenu.classList.toggle('hidden', !open);
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !open);
      icon.classList.toggle('fa-times', open);
    }
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenuOpen(!mobileMenu.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenuOpen(false); });
    });
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenuOpen(false);
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setMenuOpen(false);
    });
  }

  const statsSection = document.querySelector('.stats-container');
  if (statsSection) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.counter').forEach(function (el) {
          if (el.classList.contains('animated')) return;
          el.classList.add('animated');
          const target = Number(el.dataset.target || 0);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = target / 120;
          function tick() {
            current += step;
            if (current < target) {
              el.textContent = Math.ceil(current) + suffix;
              requestAnimationFrame(tick);
            } else {
              el.textContent = target + suffix;
            }
          }
          tick();
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
  }

  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      const opening = answer.classList.contains('hidden');
      document.querySelectorAll('.faq-answer').forEach(function (item) {
        item.classList.add('hidden');
      });
      document.querySelectorAll('.faq-question i').forEach(function (item) {
        item.classList.remove('rotate-180');
      });
      if (opening) {
        answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  document.querySelectorAll('[data-lightbox]').forEach(function (img) {
    img.addEventListener('click', function () {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('open');
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const original = submitBtn ? submitBtn.innerHTML : '';
      const success = document.getElementById('formSuccess');
      const errorBox = document.getElementById('formError');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      const body = new URLSearchParams(new FormData(contactForm)).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      }).then(function (res) {
        if (!res.ok) throw new Error('Form request failed');
        contactForm.reset();
        if (success) {
          success.classList.remove('hidden');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (errorBox) errorBox.classList.add('hidden');
      }).catch(function () {
        if (errorBox) {
          errorBox.classList.remove('hidden');
          errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }).finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        }
      });
    });
  }
});
