const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const ctx = wheel.getContext('2d');

const segments = [
    'Raif', 'Sky', 'Feivel', 'Si Xue', 'Phyline',
    'Prize 6', 'Prize 7', 'Prize 8', 'Prize 9', 'Prize 10',
    'Prize 11', 'Prize 12', 'Prize 13', 'Prize 14', 'Prize 15','Prize 16'
];
const segmentColors = [
    '#2362fb','#f39b2d','#2362fb','#f39b2d',
    '#2362fb','#f39b2d','#2362fb','#f39b2d',
    '#2362fb','#f39b2d','#2362fb','#f39b2d',
    '#2362fb','#f39b2d','#2362fb','#f39b2d'
];
const numSegments = segments.length;
let anglePerSegment;
let currentAngle = 0;

function resizeCanvas() {
    const container = wheel.parentElement;
    const size = Math.min(container.offsetWidth, container.offsetHeight);

    // Set canvas size
    wheel.width = size;
    wheel.height = size;

    // Center the drawing origin
    ctx.translate(size / 2, size / 2);

    // Calculate angle per segment
    anglePerSegment = (2 * Math.PI) / numSegments;

    // Redraw the wheel
    drawWheel();
}

function drawWheel() {
    ctx.clearRect(-wheel.width / 2, -wheel.height / 2, wheel.width, wheel.height);

    for (let i = 0; i < numSegments; i++) {
        const startAngle = currentAngle + i * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;

        ctx.beginPath();
        ctx.arc(0, 0, wheel.width / 2, startAngle, endAngle);
        ctx.lineTo(0, 0);
        ctx.fillStyle = segmentColors[i];
        ctx.fill();

        ctx.save();
        ctx.rotate((startAngle + endAngle) / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = `${Math.min(wheel.width / 20, 24)}px Arial`;
        ctx.fillText(segments[i], wheel.width / 2 - 10, 10);
        ctx.restore();
    }

    drawIndicator();
}

function drawIndicator() {
    ctx.beginPath();
    ctx.moveTo(wheel.width / 2 * 0, -wheel.height / 2 * -0.8);
    ctx.lineTo(wheel.width / 2 * 2, -wheel.height / 2 * -5);
    ctx.lineTo(wheel.width / 2 * -2, -wheel.height / 2 * -5);
    ctx.closePath();
    ctx.fillStyle = "#000";
    ctx.fill();
}

function spinWheel() {
    const spinAngle = Math.random() * 360 + 360 * 5;
    const spinDuration = 3000 + Math.random() * 2000;

    const startTime = Date.now();

    function animateSpin() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        const easing = easeOut(progress);

        currentAngle = spinAngle * easing;
        ctx.clearRect(-wheel.width / 2, -wheel.height / 2, wheel.width, wheel.height);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            showPrize();
        }
    }

    requestAnimationFrame(animateSpin);
}

function easeOut(t) {
    return (--t) * t * t + 1;
}

function showPrize() {
    const winningAngle = (2 * Math.PI - (currentAngle % (2 * Math.PI))) + Math.PI / 2;
    const segmentIndex = Math.floor(winningAngle / anglePerSegment) % numSegments;
    const prize = segments[segmentIndex];

    //alert("You won " + prize);

    setTimeout(() => {
        // Replace the current page with the result page
        window.location.replace(`result.html?prize=${encodeURIComponent(prize)}`);
    }, 2000); // 2000 milliseconds = 2 seconds delay
}


// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas);

// Initial canvas setup
resizeCanvas();

// Add spin button event listener
spinBtn.addEventListener('click', spinWheel);
