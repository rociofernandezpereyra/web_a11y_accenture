// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance slider every 2 seconds
setInterval(nextSlide, 2000);

// Manual slide control via indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe course cards
document.querySelectorAll('.course-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Función de validación del formulario CON errores de accesibilidad
function handleSubmitWithErrors() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const curso = document.getElementById('curso');
    const privacy = document.getElementById('privacy');
    const emailError = document.getElementById('email-error');
    
    // Limpiar errores previos
    nombre.classList.remove('error');
    email.classList.remove('error');
    telefono.classList.remove('error');
    curso.classList.remove('error');
    emailError.classList.remove('show');
    
    let hasErrors = false;
    
    // Validar nombre
    if (!nombre.value.trim()) {
        nombre.classList.add('error');
        hasErrors = true;
    }
    
    // Validar email
    if (!email.value.trim()) {
        email.classList.add('error');
        emailError.classList.add('show');
        hasErrors = true;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('error');
            emailError.classList.add('show');
            hasErrors = true;
        }
    }
    
    // Validar teléfono
    if (!telefono.value.trim()) {
        telefono.classList.add('error');
        hasErrors = true;
    }
    
    // Validar curso
    if (!curso.value) {
        curso.classList.add('error');
        hasErrors = true;
    }
    
    // Validar checkbox de privacidad
    if (!privacy.checked) {
        hasErrors = true;
        // NO hay indicador visual del error en el checkbox
    }
    
    if (hasErrors) {
        // NO hay mensaje de error global ni anuncio para lectores de pantalla
        return;
    }
    
    // Éxito
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    
    // Limpiar formulario
    nombre.value = '';
    email.value = '';
    telefono.value = '';
    curso.value = '';
    privacy.checked = false;
}

// Definir handleSubmit como alias de handleSubmitWithErrors
function handleSubmit() {
    handleSubmitWithErrors();
}

// Add enter key support for form
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT') {
            handleSubmit();
        }
    }
});