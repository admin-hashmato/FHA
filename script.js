const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const ctx = wheel.getContext('2d');


// REMOVE NAME OF ITEM IF STOCK FINISHED
const segments = [
   '2','1','2','1','3',
   '2','1','2','1','3',
   '2','1','2','1','JACKPOT!',
   '2','2','1',
   '2','2','1',
   '2','2','1',
];
// nets 6
// ball 9
// hygeine 6
// umbrella 2
// jp 1
const segmentColors = [
    /**'#005CE5','#346bc2','#4280e3','#346bc2','#2e78f0','#346bc2',
    '#005CE5','#346bc2','#4280e3','#346bc2','#2e78f0','#346bc2',
    '#005CE5','#346bc2','#4280e3','#346bc2','#000000','#346bc2',
    '#005CE5','#346bc2','#4280e3','#346bc2','#2e78f0','#346bc2',
**/
    '#005CE5','#346bc2','#4280e3','#346bc2','#2e78f0',
    '#005CE5','#346bc2','#4280e3','#346bc2','#2e78f0',
    '#005CE5','#346bc2','#4280e3','#346bc2','#000000',
    '#005CE5','#346bc2','#4280e3',
    '#005CE5','#346bc2','#4280e3',
    '#005CE5','#346bc2','#4280e3',

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
    //session to key in prize won
    sessionStorage.setItem('wonPrize', prize);
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
