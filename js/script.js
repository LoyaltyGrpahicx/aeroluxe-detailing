
// Counter animation function
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

// Initialize counters when in view
function initCounters() {
    const statsSection = document.querySelector('.stats-container');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = Array.from(document.querySelectorAll('.counter'));
                const values = [15, 36, 99, 24];
                const suffixes = ['+', '+', '%', '/7'];
                
                counters.forEach((counter, index) => {
                    if (counter && !counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter, values[index], suffixes[index]);
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    
    // Show preloader for at least 1.5 seconds
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        
        // Remove preloader after fade out
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.mobile-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuBtn = document.getElementById('menu-btn');
            if (mobileMenu && menuBtn) {
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Initialize counters
    initCounters();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Initial setup
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Show success message
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                successMessage.classList.remove('hidden');
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form
                this.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
        });
    }

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle the answer
            answer.classList.toggle('hidden');
            
            // Toggle the icon
            question.classList.toggle('active');
            icon.classList.toggle('transform');
            icon.classList.toggle('rotate-180');
            
            // Close other open answers
            faqQuestions.forEach(item => {
                if (item !== question) {
                    item.nextElementSibling.classList.add('hidden');
                    item.classList.remove('active');
                    const itemIcon = item.querySelector('i');
                    itemIcon.classList.remove('rotate-180');
                }
            });
        });
    });

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
            card.style.boxShadow = `${-angleY}px ${angleX}px 30px rgba(0, 0, 0, 0.2)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Add active class to current nav link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Add animation to elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const animateElement = (element) => {
        const animation = element.getAttribute('data-animate');
        element.classList.add(animation);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn, .btn-gold, .btn-outline-gold');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.pageX - button.offsetLeft;
            const y = e.pageY - button.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add loading state to form submit button
    const formSubmitBtn = document.querySelector('form button[type="submit"]');
    if (formSubmitBtn) {
        formSubmitBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            this.disabled = true;
            
            // Revert button state after 3 seconds (simulating form submission)
            setTimeout(() => {
                this.innerHTML = 'Send Message';
                this.disabled = false;
            }, 3000);
        });
    }

    // Add animation to service icons on hover
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'bounce 0.5s ease';
        });
        
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });

    // Add keyframe animation for bounce
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
