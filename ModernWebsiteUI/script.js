/* ============================================
   MODERN WEBSITE UI - JAVASCRIPT
   ============================================
   
   This script provides:
   - Dark/light theme toggle
   - Smooth scrolling
   - Scroll animations
   - Form handling
   - Interactive effects
   
   ============================================ */

// ==================== INITIALIZATION ====================
// Run code when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTheme();
    initScrollAnimations();
    initFormHandler();
    initSmoothScroll();
    console.log('✅ Website initialized successfully!');
});

// ==================== THEME TOGGLE FUNCTIONALITY ====================
/**
 * Initializes the dark/light theme toggle functionality
 * Saves user preference to localStorage
 */
function initTheme() {
    // Get the theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or default to light mode
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        document.body.classList.add('light-mode');
    }
    
    // Add click event listener to theme toggle button
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });
}

/**
 * Toggles between dark and light themes
 */
function toggleTheme() {
    // Get the body element
    const body = document.body;
    
    // Check if dark mode is currently active
    if (body.classList.contains('dark-mode')) {
        // Switch to light mode
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
        console.log('🌞 Switched to Light Mode');
    } else {
        // Switch to dark mode
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        console.log('🌙 Switched to Dark Mode');
    }
    
    // Update the icon
    const theme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    updateThemeIcon(theme);
}

/**
 * Updates the theme toggle icon based on current theme
 * @param {string} theme - Current theme ('dark-mode' or 'light-mode')
 */
function updateThemeIcon(theme) {
    // Get the theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    
    // Get the icon element inside the button
    const icon = themeToggle.querySelector('i');
    
    // Update icon based on theme
    if (theme === 'dark-mode') {
        // Show sun icon in dark mode
        icon.className = 'fas fa-sun';
    } else {
        // Show moon icon in light mode
        icon.className = 'fas fa-moon';
    }
}

// ==================== SMOOTH SCROLLING ====================
/**
 * Enables smooth scrolling for internal links
 */
function initSmoothScroll() {
    // Get all navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add click handler to each link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element ID from the href
            const targetId = this.getAttribute('href');
            
            // Only prevent default if it's a valid section link
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                // Scroll to the target element smoothly
                const target = document.querySelector(targetId);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== SCROLL ANIMATIONS ====================
/**
 * Initializes scroll-triggered animations for elements
 * Elements appear with animations as they come into view
 */
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver(function(entries) {
        // Loop through each observed element
        entries.forEach(entry => {
            // Check if element is in view
            if (entry.isIntersecting) {
                // Add animation class to the element
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stop observing this element (animation only plays once)
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element is considered visible when it's 20% in the viewport
        threshold: 0.2
    });
    
    // Get all feature cards, service cards, and testimonial cards
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-card, .testimonial-card, .info-card'
    );
    
    // Observe each element
    animatedElements.forEach(element => {
        // Set initial state (invisible and moved down)
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing this element
        observer.observe(element);
    });
}

// ==================== FORM HANDLING ====================
/**
 * Initializes form submission handler
 */
function initFormHandler() {
    // Get the contact form
    const form = document.getElementById('contactForm');
    
    // Add submit event listener
    form.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form inputs
        if (!name || !email || !subject || !message) {
            showAlert('❌ Please fill in all fields!', 'error');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            showAlert('❌ Please enter a valid email address!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '📧 Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (in real application, send to server)
        setTimeout(function() {
            // Show success message
            showAlert('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            console.log('📨 Form Data:', {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toLocaleString()
            });
        }, 1500);
    });
}

// ==================== UTILITY FUNCTIONS ====================
/**
 * Validates email format using regex pattern
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
function isValidEmail(email) {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Shows alert message to user
 * @param {string} message - Message text to display
 * @param {string} type - Alert type ('success' or 'error')
 */
function showAlert(message, type = 'success') {
    // Create alert element
    const alertDiv = document.createElement('div');
    
    // Set alert styles
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;
    
    // Set alert text
    alertDiv.textContent = message;
    
    // Add alert to page
    document.body.appendChild(alertDiv);
    
    // Remove alert after 3 seconds
    setTimeout(function() {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

// ==================== ADDITIONAL ANIMATIONS (CSS-in-JS) ====================
/**
 * Add animation keyframes to the page dynamically
 */
function addAnimationStyles() {
    // Create style element
    const style = document.createElement('style');
    
    // Define animation styles
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    // Add styles to page
    document.head.appendChild(style);
}

// Add animation styles when page loads
addAnimationStyles();

// ==================== NAVBAR SCROLL EFFECT ====================
/**
 * Adds scroll effect to navbar (optional background change on scroll)
 */
window.addEventListener('scroll', function() {
    // Get navbar element
    const navbar = document.querySelector('.navbar');
    
    // Get current scroll position
    const scrollPosition = window.scrollY;
    
    // Add or remove class based on scroll position
    if (scrollPosition > 50) {
        // Add shadow when scrolled down
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        // Remove shadow at top of page
        navbar.style.boxShadow = 'none';
    }
});

// ==================== CONSOLE WELCOME MESSAGE ====================
/**
 * Display welcome message in browser console
 */
console.log('%c🌟 Welcome to Modern Design Studio! 🌟', 'font-size: 16px; color: #667eea; font-weight: bold;');
console.log('%cThis website uses modern design principles including:', 'font-size: 12px; color: #764ba2;');
console.log('%c✨ Glassmorphism effects', 'color: #667eea;');
console.log('%c🎨 Smooth animations', 'color: #f093fb;');
console.log('%c📱 Responsive design', 'color: #667eea;');
console.log('%c🌓 Dark/Light theme toggle', 'color: #f093fb;');
console.log('%cHappy exploring! 🚀', 'font-size: 12px; color: #667eea; font-weight: bold;');
