// Interactive dot grid background
var canvas = document.getElementById('dotGrid');
var ctx = canvas.getContext('2d');

var dotSpacing = 23;
var dotRadius = 1;
var maxDistance = 123;
var maxDisplacement = 30;
var dots = [];
var dotColor = '';
var mouse = { x: -1000, y: -1000 };
var animating = true;
var resizeTimer;

function getDotColor() {
    return getComputedStyle(document.documentElement)
        .getPropertyValue('--dot-color').trim() || '#333333';
}
dotColor = getDotColor();

window.updateDotColor = function () {
    dotColor = getDotColor();
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createDots() {
    dots = [];
    for (var x = 0; x < canvas.width; x += dotSpacing) {
        for (var y = 0; y < canvas.height; y += dotSpacing) {
            dots.push({ baseX: x, baseY: y, x: x, y: y });
        }
    }
}

function animate() {
    if (!animating) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var dx = mouse.x - dot.baseX;
        var dy = mouse.y - dot.baseY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
            var force = (maxDistance - distance) / maxDistance;
            var displacement = force * maxDisplacement;
            var angle = Math.atan2(dy, dx);
            dot.x = dot.baseX - Math.cos(angle) * displacement;
            dot.y = dot.baseY - Math.sin(angle) * displacement;
        } else {
            dot.x += (dot.baseX - dot.x) * 0.01;
            dot.y += (dot.baseY - dot.y) * 0.01;
        }

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

resizeCanvas();
createDots();
animate();

document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        resizeCanvas();
        createDots();
    }, 150);
});

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        animating = false;
    } else {
        animating = true;
        animate();
    }
});
