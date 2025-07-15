// Create falling coins and paws
const background = document.getElementById('background-elements');

function createFallingElement(type) {
    const element = document.createElement('div');
    element.classList.add(type);
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    element.style.left = `${posX}px`;
    element.style.top = '-50px';
    
    // Random size
    const size = 15 + Math.random() * 20;
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    
    // Random animation duration
    const duration = 3 + Math.random() * 7;
    element.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    element.style.animationDelay = `${Math.random() * 5}s`;
    
    background.appendChild(element);
    
    // Remove element after it falls
    setTimeout(() => {
        element.remove();
    }, duration * 1000);
}

// Generate falling elements continuously
setInterval(() => {
    createFallingElement(Math.random() > 0.3 ? 'coin' : 'paw');
}, 300);

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    }
});
