document.addEventListener('DOMContentLoaded', function() {

    // --- 1. NAVEGACIÓN CON SCROLL SUAVE ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- 2. RESALTADO DE ENLACE ACTIVO EN EL MENÚ ---
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Se activa cuando el 50% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 3. BOTÓN "VOLVER ARRIBA" ---
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.querySelector('#contacto form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Por favor, completa todos los campos del formulario.');
        } else {
            this.innerHTML = `<div class="alert alert-success" role="alert">¡Gracias por tu mensaje, ${name}! Te contactaremos pronto.</div>`;
        }
    });

    // --- 5. ANIMACIÓN DE ELEMENTOS AL HACER SCROLL ---
    const fadeElements = document.querySelectorAll('.fade-in-element');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // --- 6. INTERRUPTOR DE TEMA (MODO OSCURO) ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement;
    const themeIcon = document.querySelector('label[for="theme-switcher"] i');

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        if (theme === 'dark') {
            themeSwitcher.checked = true;
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeSwitcher.checked = false;
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeSwitcher.addEventListener('change', () => {
        const newTheme = themeSwitcher.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

});