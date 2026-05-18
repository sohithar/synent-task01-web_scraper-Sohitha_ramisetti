// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

// ==================== INITIALIZATION ====================
function initializeWebsite() {
    setupNavigation();
    setupHeroTyping();
    setupScrollReveal();
    setupSmoothScroll();
    setupHamburgerMenu();
    setupParticles();
    setupButtonHandlers();
}

// ==================== HIDE LOADER ====================
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 2000);
});

// ==================== NAVIGATION SETUP ====================
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        }
    });
}

// ==================== BUTTON HANDLERS ====================
function setupButtonHandlers() {
    // Explore Project button - scroll to features
    const exploreBtn = document.querySelector('.hero-buttons .btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Learn More button - scroll to about
    const learnMoreBtn = document.querySelector('.hero-buttons .btn-secondary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // All CTA buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// ==================== HERO TYPING ANIMATION ====================
function setupHeroTyping() {
    const typingText = document.getElementById('typingText');
    const text = 'WEB SCRAPER PROJECT';
    let index = 0;
    
    function typeCharacter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 100);
        }
    }
    
    // Start typing after page loads
    setTimeout(typeCharacter, 500);
}

// ==================== SCROLL REVEAL ANIMATION ====================
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and elements
    document.querySelectorAll(
        '.about-card, .tech-card, .feature-card, .info-item, ' +
        '.stat-card, .output-box, .social-icon'
    ).forEach(element => {
        observer.observe(element);
    });
}

// ==================== SMOOTH SCROLL ====================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== HAMBURGER MENU ====================
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// ==================== PARTICLES ANIMATION ====================
function setupParticles() {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particleContainer';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.appendChild(particleContainer);
    
    // Create particles on mouse move
    let particles = [];
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {
            createParticle(e.clientX, e.clientY);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 1.5 + 1;
        const vx = (Math.random() - 0.5) * 4;
        const vy = (Math.random() - 0.5) * 4;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #00d4ff, #ff006e);
            border-radius: 50%;
            opacity: 0.7;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            animation: particleFloat ${duration}s ease-out forwards;
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.style.animation = 'none';
            particle.remove();
        }, duration * 1000);
    }
    
    // Add particle animation keyframes if not exists
    if (!document.getElementById('particleKeyframes')) {
        const style = document.createElement('style');
        style.id = 'particleKeyframes';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.7;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 + 50}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== BUTTON RIPPLE EFFECT ====================
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
        const button = e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple keyframes if not exists
        if (!document.getElementById('rippleKeyframes')) {
            const style = document.createElement('style');
            style.id = 'rippleKeyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// ==================== SCROLL TO TOP BUTTON ====================
function addScrollToTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #ff006e);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-size: 1.2rem;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollTopBtn.addEventListener('mouseover', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseout', () => {
        scrollTopBtn.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
window.addEventListener('load', addScrollToTopButton);

// ==================== LAZY LOAD IMAGES ====================
function setupLazyLoad() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Press 'h' to go home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 't' to go to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ==================== EASTER EGG ====================
let easterEggSequence = '';
const easterEggCode = 'scraper';

document.addEventListener('keydown', (e) => {
    easterEggSequence += e.key.toLowerCase();
    
    if (easterEggSequence.includes(easterEggCode)) {
        triggerEasterEgg();
        easterEggSequence = '';
    }
    
    if (easterEggSequence.length > 20) {
        easterEggSequence = easterEggSequence.slice(-20);
    }
});

function triggerEasterEgg() {
    const easterEggMessage = document.createElement('div');
    easterEggMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00d4ff, #ff006e);
        color: white;
        padding: 40px 60px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 9999;
        text-align: center;
        box-shadow: 0 0 50px rgba(0, 212, 255, 0.5);
        animation: bounceIn 0.5s ease-out;
    `;
    
    easterEggMessage.textContent = '🕷️ You found the Web Scraper Easter Egg! 🌐';
    document.body.appendChild(easterEggMessage);
    
    setTimeout(() => {
        easterEggMessage.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => easterEggMessage.remove(), 500);
    }, 2500);
    
    // Add animations if not exists
    if (!document.getElementById('easterEggStyles')) {
        const style = document.createElement('style');
        style.id = 'easterEggStyles';
        style.textContent = `
            @keyframes bounceIn {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1);
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== CONSOLE MESSAGES ====================
console.log(
    '%c🕷️ Welcome to Web Scraper Project! 🕷️',
    'font-size: 20px; color: #00d4ff; font-weight: bold;'
);
console.log(
    '%cTip: Press "H" to go home, "T" to go to top!',
    'font-size: 14px; color: #ffbe0b;'
);
console.log(
    '%cEaster Egg: Type "scraper" quickly!',
    'font-size: 14px; color: #ff006e;'
);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== FEATURE CARDS COUNTER ANIMATION ====================
function animateCounters() {
    const statCards = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent;
                let currentValue = 0;
                
                // Extract the numeric part
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                const increment = numericValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        element.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        element.textContent = Math.floor(currentValue) + (finalValue.includes('K') ? 'K' : finalValue.includes('%') ? '%' : '');
                    }
                }, 30);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    statCards.forEach(card => {
        observer.observe(card);
    });
}

// Call counter animation
window.addEventListener('load', animateCounters);

// ==================== MOBILE MENU RESPONSIVE ====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// ==================== ACCESSIBILITY - FOCUS VISIBLE ====================
// Add focus visible styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    :focus-visible {
        outline: 2px solid #00d4ff;
        outline-offset: 2px;
    }
    
    button:focus-visible,
    a:focus-visible {
        outline: 2px solid #00d4ff;
        outline-offset: 4px;
    }
`;
document.head.appendChild(style);

// ==================== PAGE VISIBILITY API ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});
