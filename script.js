// Updated script.js
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const ctx = wheel.getContext('2d');
const segments = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6','Raif',"Feivel","Si Xue","Sky"];
const segmentColors = ["#2362fb","#FFFFFF","#2362fb","#FFFFFF","#2362fb","#FFFFFF","#2362fb","#FFFFFF","#2362fb","#FFFFFF"];
const numSegments = segments.length;
const anglePerSegment = (2 * Math.PI) / numSegments;
let currentAngle = 0;

function drawWheel() {
    for (let i = 0; i < numSegments; i++) {
        const startAngle = currentAngle + i * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;
        
        // Draw the segments
        ctx.beginPath();
        ctx.arc(250, 250, 250, startAngle, endAngle);
        ctx.lineTo(250, 250);
        ctx.fillStyle = segmentColors[i];
        ctx.fill();

        // Draw the text
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate((startAngle + endAngle) / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(segments[i], 200, 10);
        ctx.restore();
    }

    // Draw the indicator (triangle)
    drawIndicator();
}

function drawIndicator() {
    ctx.beginPath();
    ctx.moveTo(250, 470); // Right side of the wheel (center of canvas)
    ctx.lineTo(280, 500); // Top left of the triangle
    ctx.lineTo(220, 500);
    ctx.closePath();
    ctx.fillStyle = "#000000"; // Black color for the indicator
    ctx.fill();
}

function spinWheel() {
    const spinAngle = Math.random() * 360 + 360 * 3; // Random spin angle + 3 full rotations
    const spinDuration = 5000; // Spin duration in milliseconds
    
    const startTime = Date.now();

    function animateSpin() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        const easing = easeOut(progress);

        currentAngle = spinAngle * easing;
        ctx.clearRect(0, 0, wheel.width, wheel.height);
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
    const winningAngle = (2 * Math.PI - (currentAngle % (2 * Math.PI))) + Math.PI / 2; // Adjust angle so 0 is at the top
    const segmentIndex = Math.floor(winningAngle / anglePerSegment) % numSegments;
    alert("You won " + segments[segmentIndex]);
}

spinBtn.addEventListener('click', spinWheel);

drawWheel();
