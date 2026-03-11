// Interactive dot grid background
const canvas = document.getElementById('dotGrid');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Dot grid settings
const dotSpacing = 23;
const dotRadius = 1;
let dotColor = getComputedStyle(document.documentElement).getPropertyValue('--dot-color').trim() || '#333333';
const maxDistance = 123;
const maxDisplacement = 30;

// Allow theme toggle to update dot color
window.updateDotColor = function () {
    dotColor = getComputedStyle(document.documentElement).getPropertyValue('--dot-color').trim() || '#333333';
};

// Mouse position
let mouse = {
    x: -1000,
    y: -1000
};

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Create dot grid
function createDots() {
    const dots = [];
    for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
            dots.push({
                baseX: x,
                baseY: y,
                x: x,
                y: y
            });
        }
    }
    return dots;
}

let dots = createDots();

// Animate dots
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    dots.forEach(dot => {
        // Calculate distance from mouse
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply gravity-like displacement
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const displacement = force * maxDisplacement;
            
            // Move dot away from mouse (repulsion)
            const angle = Math.atan2(dy, dx);
            dot.x = dot.baseX - Math.cos(angle) * displacement;
            dot.y = dot.baseY - Math.sin(angle) * displacement;
        } else {
            // Return to base position
            dot.x += (dot.baseX - dot.x) * 0.01;
            dot.y += (dot.baseY - dot.y) * 0.01;
        }
        
        // Draw dot
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Recreate dots on resize
window.addEventListener('resize', () => {
    dots = createDots();
});

// Fallback reveal for pages without async data scripts
window.addEventListener('load', function () {
    document.body.classList.add('ready');
});
