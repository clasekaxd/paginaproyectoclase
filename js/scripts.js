document.addEventListener('DOMContentLoaded', function() {
    // Modo claro/oscuro con icono
    const themeBtn = document.getElementById('toggle-theme');
    const body = document.body;
    let isLight = false;
    if (themeBtn) {
        // Iconos Unicode: ☀️ (sol), 🌙 (luna)
        themeBtn.textContent = '☀️';
        themeBtn.title = 'Cambiar a modo claro';
        themeBtn.addEventListener('click', function() {
            isLight = !isLight;
            body.classList.toggle('light-mode', isLight);
            if (isLight) {
                themeBtn.textContent = '🌙';
                themeBtn.title = 'Cambiar a modo oscuro';
            } else {
                themeBtn.textContent = '☀️';
                themeBtn.title = 'Cambiar a modo claro';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 58, // Adjusted for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });


    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('mensaje').value.trim();

        if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'Por favor, complete todos los campos.';
            return;
        }
        
        // Simulate form submission
        formMessage.textContent = '¡Gracias por su mensaje! Nos pondremos en contacto pronto.';
        contactForm.reset();

        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });

});
