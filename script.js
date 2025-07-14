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

// Initialize chart
const ctx = document.getElementById('priceChart').getContext('2d');

// Generate mock price data
let prices = [];
let currentPrice = 0.005;
let chartColor = '#00ff9d'; // Start with green

for (let i = 0; i < 100; i++) {
    // Simulate price movement
    const change = (Math.random() - 0.4) * 0.002;
    currentPrice += change;
    // Ensure price doesn't go below 0.001
    currentPrice = Math.max(0.001, currentPrice);
    prices.push(currentPrice);
}

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({length: 100}, (_, i) => i),
        datasets: [{
            label: '$ONYX Price',
            data: prices,
            borderColor: chartColor,
            backgroundColor: 'rgba(0, 255, 157, 0.1)',
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#cccccc',
                    callback: function(value) {
                        return '$' + value.toFixed(6);
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        }
    }
});

// Update chart with new data every second
setInterval(() => {
    const change = (Math.random() - 0.45) * 0.001;
    currentPrice += change;
    currentPrice = Math.max(0.001, currentPrice);
    
    // Update prices array
    prices.push(currentPrice);
    prices.shift();
    
    // Update chart color based on movement
    const prevPrice = prices[prices.length - 2];
    const currentPriceVal = prices[prices.length - 1];
    
    if (currentPriceVal >= prevPrice) {
        chartColor = '#00ff9d'; // Green for upward movement
        chart.data.datasets[0].backgroundColor = 'rgba(0, 255, 157, 0.1)';
    } else {
        chartColor = '#ff3232'; // Red for downward movement
        chart.data.datasets[0].backgroundColor = 'rgba(255, 50, 50, 0.1)';
    }
    
    // Update chart
    chart.data.datasets[0].data = prices;
    chart.data.datasets[0].borderColor = chartColor;
    chart.update();
}, 1000);

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
