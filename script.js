document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Update active link (optional)
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for section entrance animations
    const sections = document.querySelectorAll('.content-section');
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Active nav link highlighting on scroll (more advanced)
    const mainSections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        let current = '';
        mainSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust the offset based on your sticky nav height if needed
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        // Handle case when scrolled to the top
        if (pageYOffset < sections[0].offsetTop - window.innerHeight / 2) {
             navLinks.forEach(link => link.classList.remove('active'));
             const homeLink = document.querySelector('.main-nav a[href="#about"]'); // Or your first section
             if(homeLink) homeLink.classList.add('active');
        }
    });

    // Placeholder for potential future interactive elements
    console.log('Portfolio script loaded.');

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    // Cursor interaction
    document.querySelectorAll('a, button, .project-card, .skills-list li').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Particle Background (simple, lightweight)
    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particle-bg';
    particleCanvas.style.position = 'fixed';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100vw';
    particleCanvas.style.height = '100vh';
    particleCanvas.style.zIndex = '-2';
    particleCanvas.style.pointerEvents = 'none';
    document.body.prepend(particleCanvas);
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function createParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                color: Math.random() > 0.5 ? 'rgba(0,255,255,0.5)' : 'rgba(0,255,0,0.5)'
            });
        }
    }
    createParticles();
    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > particleCanvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > particleCanvas.height) p.dy *= -1;
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    // Project Modal
    // Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    // Add hover effect for HD images
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-image');
        if (img) {
            // Generate AI image placeholder if no image exists
            if (!img.src) {
                img.src = `https://source.unsplash.com/random/600x400/?tech,${this.dataset.projectType || 'project'}`;
                img.alt = 'AI Generated Project Preview';
            }
            img.classList.add('hover-active');
        }
    });

    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.project-image');
        if (img) {
            img.classList.remove('hover-active');
        }
    });

    // Original click handler for modal
    card.addEventListener('click', function() {
        let modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `<div class='modal-content'><span class='close'>&times;</span>${card.innerHTML}</div>`;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        modal.querySelector('.close').onclick = () => {
            modal.remove();
                document.body.style.overflow = '';
            };
            modal.addEventListener('click', e => {
                if (e.target === modal) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });

    // Skill Visualization (pulse on hover)
    document.querySelectorAll('.skills-list li').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.classList.add('pulse');
        });
        skill.addEventListener('mouseleave', () => {
            skill.classList.remove('pulse');
        });
    });
});