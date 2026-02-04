/**
 * ADVANCED ANIMATIONS & INTERACTIONS
 * Enhanced JavaScript for superior user experience
 */

// ============================================
// 1. SCROLL PROGRESS INDICATOR
// ============================================
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
};

// ============================================
// 2. SMOOTH SCROLL SNAP
// ============================================
const smoothScrollSnap = () => {
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    
    const scrollToSection = (section) => {
        isScrolling = true;
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => { isScrolling = false; }, 1000);
    };
};

// ============================================
// 3. PARALLAX SCROLLING EFFECT
// ============================================
const parallelScrollEffect = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = el.offsetTop;
            const distance = scrollPosition - elementOffset;
            const speed = el.getAttribute('data-parallax') || 0.5;
            
            el.style.transform = `translateY(${distance * speed}px)`;
        });
    });
};

// ============================================
// 4. STAGGER ANIMATION ON SCROLL
// ============================================
const staggerAnimationOnScroll = () => {
    const staggerElements = document.querySelectorAll('[data-stagger]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('[data-stagger-item]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('stagger-visible');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    staggerElements.forEach(el => observer.observe(el));
};

// ============================================
// 5. FLOATING ACTION BUTTON (FAB)
// ============================================
const createFAB = () => {
    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = '📞';
    fab.title = 'Contact Us';
    fab.onclick = () => {
        alert('Opening contact form...');
        document.querySelector('.newsletter-form input').focus();
    };
    document.body.appendChild(fab);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fab.classList.add('show');
        } else {
            fab.classList.remove('show');
        }
    });
};

// ============================================
// 6. TEXT REVEAL ANIMATION
// ============================================
const textRevealAnimation = () => {
    const revealElements = document.querySelectorAll('[data-text-reveal]');
    
    revealElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        element.style.minHeight = '1.2em';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let index = 0;
                    const interval = setInterval(() => {
                        element.textContent = text.substring(0, index);
                        index++;
                        if (index > text.length) clearInterval(interval);
                    }, 30);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
};

// ============================================
// 7. ANIMATED BACKGROUND GRADIENT
// ============================================
const animatedBackgroundGradient = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .animated-gradient-bg {
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
        }
    `;
    document.head.appendChild(style);
};

// ============================================
// 8. CONFETTI ANIMATION
// ============================================
const createConfetti = () => {
    const confetti = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return;
        
        element.addEventListener('click', () => {
            for (let i = 0; i < 50; i++) {
                const confettiPiece = document.createElement('div');
                confettiPiece.className = 'confetti';
                confettiPiece.style.left = Math.random() * 100 + '%';
                confettiPiece.style.backgroundColor = [
                    '#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'
                ][Math.floor(Math.random() * 5)];
                confettiPiece.style.animation = `fall ${2 + Math.random()}s linear forwards`;
                document.body.appendChild(confettiPiece);
                
                setTimeout(() => confettiPiece.remove(), 2500);
            }
        });
    };
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        }
    `;
    document.head.appendChild(style);
    
    return confetti;
};

// ============================================
// 9. BACK TO TOP BUTTON WITH SMOOTH SCROLL
// ============================================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '⬆️';
    button.title = 'Back to Top';
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// ============================================
// 10. LAZY LOAD IMAGES WITH FADE-IN
// ============================================
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-lazy]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(img => observer.observe(img));
};

// ============================================
// 11. ANIMATED NUMBERS WITH FORMATTERS
// ============================================
const animateNumbers = () => {
    const numbers = document.querySelectorAll('[data-animate-number]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseFloat(entry.target.getAttribute('data-animate-number'));
                const duration = 2000;
                const start = 0;
                const startTime = Date.now();
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = start + (target - start) * progress;
                    
                    entry.target.textContent = Math.floor(value).toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                animate();
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    numbers.forEach(num => observer.observe(num));
};

// ============================================
// 12. MAGNETIC CURSOR EFFECT
// ============================================
const magneticCursor = () => {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
};

// ============================================
// 13. PAGE TRANSITION ANIMATION
// ============================================
const pageTransition = () => {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only for external links
            if (link.target === '_blank') return;
            
            const overlay = document.createElement('div');
            overlay.className = 'page-transition';
            document.body.appendChild(overlay);
            
            setTimeout(() => overlay.remove(), 500);
        });
    });
};

// ============================================
// 14. SCROLL-TRIGGERED TEXT EFFECTS
// ============================================
const scrollTextEffect = () => {
    const textElements = document.querySelectorAll('[data-scroll-text]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-animated');
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => observer.observe(el));
};

// ============================================
// 15. KEYBOARD NAVIGATION
// ============================================
const keyboardNavigation = () => {
    const sections = document.querySelectorAll('section');
    let currentSection = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentSection = Math.min(currentSection + 1, sections.length - 1);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentSection = Math.max(currentSection - 1, 0);
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        }
    });
};

// ============================================
// 16. HOVER SOUND EFFECTS (Optional)
// ============================================
const hoverSoundEffect = () => {
    const buttons = document.querySelectorAll('button, a.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Optional: Add sound effect
            // playSound('hover.mp3');
        });
    });
};

// ============================================
// 17. FORM INPUT ANIMATIONS
// ============================================
const formInputAnimations = () => {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
};

// ============================================
// 18. SCROLL VELOCITY-BASED ANIMATION
// ============================================
let lastScrollTop = 0;
const scrollVelocityAnimation = () => {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const velocity = Math.abs(scrollTop - lastScrollTop);
        
        if (velocity > 50) {
            document.body.classList.add('scrolling-fast');
        } else {
            document.body.classList.remove('scrolling-fast');
        }
        
        lastScrollTop = scrollTop;
    });
};

// ============================================
// 19. BREADCRUMB ANIMATION
// ============================================
const breadcrumbAnimation = () => {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    
    const items = breadcrumb.querySelectorAll('li');
    items.forEach((item, index) => {
        item.style.animation = `slideInLeft ${0.3 + index * 0.1}s ease`;
    });
};

// ============================================
// 20. HEADER BLUR ON SCROLL
// ============================================
const headerBlurEffect = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
        } else {
            navbar.style.backdropFilter = 'blur(0px)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
};

// ============================================
// MASTER INITIALIZATION
// ============================================
const initAdvancedAnimations = () => {
    createScrollProgress();
    parallelScrollEffect();
    staggerAnimationOnScroll();
    createFAB();
    textRevealAnimation();
    animatedBackgroundGradient();
    createBackToTopButton();
    lazyLoadImages();
    animateNumbers();
    magneticCursor();
    pageTransition();
    scrollTextEffect();
    keyboardNavigation();
    formInputAnimations();
    scrollVelocityAnimation();
    headerBlurEffect();
    
    console.log('✨ Advanced animations initialized!');
};

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedAnimations);
} else {
    initAdvancedAnimations();
}

// Original animations from animations.js
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

const navbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', () => {
    scrollReveal();
    navbarScroll();
});
