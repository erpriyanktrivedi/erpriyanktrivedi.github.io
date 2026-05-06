document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const homeLink = document.querySelector('[data-home-link]');
    
    const sections = document.querySelectorAll('section, header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scrollspy logic
        let current = '';
        const navbarHeight = navbar.offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;

        // Check if we are at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            current = sections[sections.length - 1].getAttribute('id');
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollPosition >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load

    if (homeLink) {
        homeLink.addEventListener('click', function (e) {
            e.preventDefault();

            navLinks.forEach(link => link.classList.remove('active'));
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/') + window.location.search;
            window.history.replaceState(null, '', cleanPath || '/');
        });
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Immediate active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add subtle fade-in animation for elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation initial state to elements
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-domain, .cert-badge, .contact-card, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
