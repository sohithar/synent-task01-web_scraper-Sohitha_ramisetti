// ==================== DOM CONTENT LOADED ==================== 
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

// ==================== INITIALIZATION ==================== 
function initializeWebsite() {
    setupNavigation();
    setupCountdownTimer();
    setupFormValidation();
    setupSmoothScroll();
    setupHamburgerMenu();
    animateOnScroll();
}

// ==================== NAVIGATION SETUP ==================== 
function setupNavigation() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                closeHamburgerMenu();
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

// ==================== HAMBURGER MENU ==================== 
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function closeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// ==================== COUNTDOWN TIMER ==================== 
function setupCountdownTimer() {
    // Set the webinar date: May 25, 2026, 2:00 PM IST
    const webinarDate = new Date('May 25, 2026 14:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = webinarDate - now;
        
        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            // Update the timer display
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            // Timer finished
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            const countdownSection = document.getElementById('countdownTimer');
            if (countdownSection) {
                countdownSection.innerHTML = '<p style="text-align: center; color: var(--primary-color); font-size: 1.5rem; font-weight: 700;">🎉 Webinar is LIVE! 🎉</p>';
            }
            clearInterval(countdownInterval);
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// ==================== FORM VALIDATION ==================== 
function setupFormValidation() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    }
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (!errorElement) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (fieldValue.length < 3) {
                isValid = false;
                errorMessage = 'Name must be at least 3 characters';
            }
            break;
            
        case 'email':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(fieldValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Phone number is required';
            } else if (!isValidPhone(fieldValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number (10+ digits)';
            }
            break;
            
        case 'experience':
            if (fieldValue === '') {
                isValid = false;
                errorMessage = 'Please select your experience level';
            }
            break;
            
        case 'terms':
            if (!field.checked) {
                isValid = false;
                errorMessage = 'You must agree to continue';
            }
            break;
    }
    
    if (isValid) {
        errorElement.textContent = '';
        field.style.borderColor = 'rgba(0, 212, 255, 0.3)';
    } else {
        errorElement.textContent = errorMessage;
        field.style.borderColor = '#ff6b6b';
    }
    
    return isValid;
}

function validateForm() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\d{10,}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(digitsOnly);
}

function submitForm() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('formSuccess');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        experience: document.getElementById('experience').value,
        registeredAt: new Date().toLocaleString()
    };
    
    // Display success message
    successMessage.textContent = '✅ Registration successful! Check your email for confirmation.';
    successMessage.style.display = 'block';
    
    // Log form data (In real scenario, this would be sent to a server)
    console.log('Form Data:', formData);
    
    // Store in localStorage
    const registrations = JSON.parse(localStorage.getItem('webinarRegistrations')) || [];
    registrations.push(formData);
    localStorage.setItem('webinarRegistrations', JSON.stringify(registrations));
    
    // Reset form
    setTimeout(() => {
        form.reset();
        successMessage.style.display = 'none';
    }, 3000);
}

// ==================== SMOOTH SCROLL ==================== 
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
            }
        });
    });
}

// ==================== ANIMATIONS ON SCROLL ==================== 
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.learn-card, .feature-item, .contact-item').forEach(element => {
        observer.observe(element);
    });
}

// ==================== SCROLL TO TOP BUTTON ==================== 
function addScrollToTopButton() {
    // Create scroll to top button
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
    
    // Show button when scrolled down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
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

// Call after page load
window.addEventListener('load', () => {
    addScrollToTopButton();
});

// ==================== PARTICLE ANIMATION ==================== 
function createParticles() {
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
    document.addEventListener('mousemove', (e) => {
        // Create occasional particles (every 3rd mouse move)
        if (Math.random() > 0.7) {
            createParticle(e.clientX, e.clientY);
        }
    });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    const size = Math.random() * 5 + 2;
    const duration = Math.random() * 1 + 1;
    
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
        animation: particleFloat ${duration}s ease-out forwards;
    `;
    
    const container = document.getElementById('particleContainer');
    if (container) {
        container.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
    }
}

// Add particle animation keyframes
function addParticleStyles() {
    if (!document.getElementById('particleStyles')) {
        const style = document.createElement('style');
        style.id = 'particleStyles';
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

// Initialize particles
addParticleStyles();
createParticles();

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
        
        if (!document.getElementById('rippleStyles')) {
            const style = document.createElement('style');
            style.id = 'rippleStyles';
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

// ==================== LOG REGISTRATIONS ==================== 
function logRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('webinarRegistrations')) || [];
    console.log('Total Registrations:', registrations.length);
    console.table(registrations);
}

// Make it accessible from console
window.logRegistrations = logRegistrations;

// ==================== KEYBOARD SHORTCUTS ==================== 
document.addEventListener('keydown', (e) => {
    // Press 'h' to go home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'r' to go to registration
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== EASTER EGG ==================== 
let easterEggSequence = '';
const easterEggCode = 'ai';

document.addEventListener('keydown', (e) => {
    easterEggSequence += e.key.toLowerCase();
    
    if (easterEggSequence.includes(easterEggCode)) {
        triggerEasterEgg();
        easterEggSequence = '';
    }
    
    if (easterEggSequence.length > 10) {
        easterEggSequence = easterEggSequence.slice(-10);
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
        padding: 30px 60px;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 9999;
        text-align: center;
        box-shadow: 0 0 40px rgba(0, 212, 255, 0.5);
        animation: bounceIn 0.5s ease-out;
    `;
    
    easterEggMessage.textContent = '🤖 You found the AI Easter Egg! 🚀';
    document.body.appendChild(easterEggMessage);
    
    setTimeout(() => {
        easterEggMessage.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => easterEggMessage.remove(), 500);
    }, 2000);
    
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
                    transform: translate(-50%, -50%) scale(0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== CONSOLE WELCOME MESSAGE ==================== 
console.log(
    '%c🚀 Welcome to AI Full Stack Development Webinar! 🚀',
    'font-size: 20px; color: #00d4ff; font-weight: bold;'
);
console.log(
    '%cTip: Type logRegistrations() to see all registrations!',
    'font-size: 14px; color: #ffbe0b;'
);
console.log(
    '%cEaster Egg: Press "a" then "i" keys quickly!',
    'font-size: 14px; color: #ff006e;'
);
