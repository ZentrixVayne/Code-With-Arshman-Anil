// Preloader - Universal fix for all pages
(function() {
    const preloader = document.querySelector('.preloader');
    
    // Function to hide preloader
    function hidePreloader() {
        if (preloader) {
            preloader.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    }
    
    // Multiple checks to ensure preloader hides
    function checkAndHidePreloader() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            hidePreloader();
        }
    }
    
    // Check immediately if page is already loaded
    checkAndHidePreloader();
    
    // Hide when DOM is ready
    document.addEventListener('DOMContentLoaded', hidePreloader);
    
    // Hide when all resources are loaded
    window.addEventListener('load', hidePreloader);
    
    // Fallback: Force hide after 1.5 seconds
    setTimeout(hidePreloader, 1500);
    
    // Additional fallback: Force hide after 3 seconds (emergency)
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.display = 'none';
        }
    }, 3000);
})();

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

// Highlight Active Page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Typing Animation - Only on home page
const typingText = document.getElementById('typing-text');
if (typingText) {
    const phrases = ['Developer', 'Creative Coder', 'Student'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation after a short delay
    setTimeout(typeText, 500);
}

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

if (revealElements.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    setTimeout(revealOnScroll, 100);
}

// Skills Animation - Only on about page
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill');
        if (skillLevel && bar.style.width === '') {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                bar.style.width = skillLevel + '%';
            }
        }
    });
}

if (skillBars.length > 0) {
    window.addEventListener('scroll', animateSkills);
    // Initial check
    setTimeout(animateSkills, 100);
}

// Stats Counter Animation - Only on home page
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                stat.textContent = target;
            }
        };
        
        // Check if element is in viewport
        const rect = stat.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 100 && !stat.classList.contains('counted')) {
            stat.classList.add('counted');
            updateCounter();
        }
    });
}

if (statNumbers.length > 0) {
    window.addEventListener('scroll', animateStats);
    // Initial check
    setTimeout(animateStats, 100);
}

// EmailJS Configuration - Only on contact page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the contact page
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm && typeof emailjs !== 'undefined') {
        // Initialize EmailJS
        emailjs.init("j3Rp7MZvbNjt1lyiM");

        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        
        // Contact Form Submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.textContent = '');
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                showError('subject', 'Please enter a subject');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, submit via EmailJS
            if (isValid) {
                // Disable button and change text
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Prepare template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message
                };
                
                // Send email using EmailJS
                emailjs.send('service_bxjlu3p', 'template_986i0r6', templateParams)
                    .then(function(response) {
                        // Show success message
                        showMessage('✅ Message Sent Successfully!', 'success');
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    }, function(error) {
                        // Show error message
                        showMessage('❌ Failed to send. Please try again.', 'error');
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    });
            }
        });
        
        // Helper Functions
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = field.nextElementSibling;
            if (errorElement) {
                errorElement.textContent = message;
                field.classList.add('error');
            }
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function showMessage(message, type) {
            if (formMessage) {
                formMessage.textContent = message;
                formMessage.className = 'form-message show';
                
                if (type === 'success') {
                    formMessage.classList.add('success-message');
                } else {
                    formMessage.classList.add('error-message-box');
                }
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.remove('show');
                }, 5000);
            }
        }
        
        // Remove error class on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = '';
                }
            });
        });
    }
});

// Smooth Scrolling
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Blog Card Hover Effect
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Button Ripple Effect
const buttons = document.querySelectorAll('.btn');
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