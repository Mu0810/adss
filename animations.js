// Enhanced Animations and Interactions

// Scroll Reveal Animation
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.scroll-reveal, .article-card, .category-card, .testimonial-card');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

// Navbar Scroll Effect
const navbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Smooth Scroll for Anchor Links
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Parallax Effect for Hero Section
const parallaxEffect = () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
};

// Card Tilt Effect (3D)
const cardTilt = () => {
    const cards = document.querySelectorAll('.article-card, .category-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
};

// Animated Counter
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// Initialize Counters on Scroll
const initCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const elementTop = counter.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounter(counter, target);
        }
    });
};

// Loading Animation
const pageLoad = () => {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    setTimeout(() => {
        const elements = document.querySelectorAll('.hero-content, .featured-articles, .categories');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
};

// Floating Elements Animation
const floatingElements = () => {
    const floaters = document.querySelectorAll('.float-animation');
    floaters.forEach((floater, index) => {
        floater.style.animationDelay = `${index * 0.2}s`;
    });
};

// Button Ripple Effect
const addRippleEffect = () => {
    const buttons = document.querySelectorAll('.cta-button, .newsletter-form button, .search-bar button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

// Typing Effect for Hero Text
const typingEffect = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Intersection Observer for Animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate counters if element has counter class
                if (entry.target.classList.contains('counter')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const elements = document.querySelectorAll('.scroll-reveal, .article-card, .category-card, .testimonial-card, .counter');
    elements.forEach(el => observer.observe(el));
};

// Mouse Trail Effect
let mouseTrail = [];
const createMouseTrail = () => {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        
        mouseTrail.push(trail);
        
        setTimeout(() => {
            trail.remove();
            mouseTrail.shift();
        }, 1000);
        
        if (mouseTrail.length > 20) {
            mouseTrail[0].remove();
            mouseTrail.shift();
        }
    });
};

// Add CSS for mouse trail
const addMouseTrailCSS = () => {
    const style = document.createElement('style');
    style.textContent = `
        .mouse-trail {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            pointer-events: none;
            opacity: 0.5;
            animation: trailFade 1s ease-out forwards;
            z-index: 9999;
        }
        
        @keyframes trailFade {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        body.loaded {
            animation: fadeIn 0.5s ease-in;
        }
    `;
    document.head.appendChild(style);
};

// Initialize all animations
const initAnimations = () => {
    addMouseTrailCSS();
    observeElements();
    smoothScroll();
    floatingElements();
    addRippleEffect();
    
    // Optional: Uncomment for mouse trail effect
    // createMouseTrail();
    
    // Optional: Uncomment for card tilt effect
    // cardTilt();
};

// Event Listeners
window.addEventListener('scroll', () => {
    scrollReveal();
    navbarScroll();
    initCounters();
    // parallaxEffect(); // Uncomment for parallax
});

window.addEventListener('load', () => {
    pageLoad();
    initAnimations();
});

// Dark Mode Toggle Enhancement
const enhancedDarkModeToggle = () => {
    const toggle = document.querySelector('.dark-mode-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.style.transition = 'all 0.5s ease';
        });
    }
};

enhancedDarkModeToggle();

// Search Bar Animation
const enhanceSearchBar = () => {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.transform = 'scale(1)';
        });
    }
};

enhanceSearchBar();
