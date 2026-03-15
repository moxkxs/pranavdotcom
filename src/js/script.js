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
var animating = false;
var needsDraw = true;
var resizeTimer;
var idleFrames = 0;

function getDotColor() {
    return getComputedStyle(document.documentElement)
        .getPropertyValue('--dot-color').trim() || '#333333';
}
dotColor = getDotColor();

window.updateDotColor = function () {
    dotColor = getDotColor();
    needsDraw = true;
    startLoop();
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

function startLoop() {
    if (animating) return;
    animating = true;
    idleFrames = 0;
    animate();
}

function animate() {
    if (!animating) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var settled = true;
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
            settled = false;
        } else {
            dot.x += (dot.baseX - dot.x) * 0.05;
            dot.y += (dot.baseY - dot.y) * 0.05;
            if (Math.abs(dot.x - dot.baseX) > 0.1 || Math.abs(dot.y - dot.baseY) > 0.1) {
                settled = false;
            }
        }

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    if (settled) {
        idleFrames++;
        if (idleFrames > 10) {
            animating = false;
            return;
        }
    } else {
        idleFrames = 0;
    }

    requestAnimationFrame(animate);
}

resizeCanvas();
createDots();
// Draw once then stop
needsDraw = false;
animating = true;
idleFrames = 0;
animate();

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        startLoop();
    });

    document.addEventListener('mouseleave', function () {
        mouse.x = -1000;
        mouse.y = -1000;
        startLoop();
    });
}

window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        resizeCanvas();
        createDots();
        startLoop();
    }, 150);
});

document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !animating) {
        startLoop();
    }
});

// Auto-fit hero heading on resize
(function () {
    var h2 = document.querySelector('.hero-section h2');
    if (!h2) return;
    window.addEventListener('resize', function () {
        clearTimeout(h2._ft);
        h2._ft = setTimeout(function () {
            var s = 67;
            h2.style.fontSize = s + 'px';
            while (h2.scrollWidth > h2.clientWidth && s > 24) h2.style.fontSize = --s + 'px';
        }, 150);
    });
})();

// Reading progress bar
(function () {
    var bar = document.getElementById('progressBar');
    if (!bar) return;
    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrollTop / docHeight * 100) + '%';
    });
})();

// Back to top button
(function () {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
