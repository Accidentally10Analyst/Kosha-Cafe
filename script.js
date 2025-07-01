// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Page navigation
function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        const fadeElements = selectedPage.querySelectorAll('.fade-in');
        fadeElements.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.1}s`;
        });
    }

    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');

    navMenu.classList.remove('active');
    hamburger.classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add click events to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        showPage(pageId);
    });
});

// CTA button functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button')) {
        e.preventDefault();
        const pageId = e.target.getAttribute('data-page');
        if (pageId) {
            showPage(pageId);
        }
    }
});

// Add to Cart functionality for Events
function addToCart(eventName, price) {
    const message = price === 0 || price === 'Free Entry'
        ? `You have successfully registered for "${eventName}". Enjoy the event! 🎉`
        : `"${eventName}" has been added to your cart for ₹${price}. ✅`;

    alert(message);
}

// Form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
        contactForm.reset();
    });
}

// Prevent default for internal "#" links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50
        ? 'rgba(255, 255, 255, 0.98)'
        : 'rgba(255, 255, 255, 0.95)';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');

    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
    }, 100);
});

// Gallery animation
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        }, 150);
    });
});

// Hover effects for menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = 'var(--light-color)';
        item.style.transform = 'translateX(5px)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'transparent';
        item.style.transform = 'translateX(0)';
    });
});

// Dynamic text animation in hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.05}s`;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.animation = 'fadeInUp 0.6s ease forwards';
        heroTitle.appendChild(span);
    });
}
