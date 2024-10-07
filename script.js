<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Prize</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            background-color: #f3f3f3;
        }

        .prize-container {
            text-align: center;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .prize-container h1 {
            font-size: 2em;
            color: #333;
        }

        .prize-container p {
            font-size: 1.5em;
            color: #666;
        }

        .rainbow-animate {
            font-size: 60px;
            font-weight: bold;
            background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
            -webkit-background-clip: text;
            color: transparent;
            animation: rainbow-animation 3s infinite;
        }

        @keyframes rainbow-animation {
            0% {
                background-position: 0% 50%;
            }

            100% {
                background-position: 100% 50%;
            }
        }
    </style>
</head>
<style>
    #spin-btn {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 50%);
        padding: 10px 10px;
        font-size: 20px;
        color: white;
        background-color: blue;
        border: blue;
        border-radius: 5%;

    }
</style>

<body>

    <div class="prize-container" id="result">
        <h1>Congratulations!</h1>
        <p id="prize-display">
        <div id="prize-con">

        </div>
        <div id="result-message"></div>
        </p>
        <button id="return">Click to return to form page</button>
    </div>


    </div>
    <script>
        document.getElementById('return').addEventListener('click', function (event) {
            sessionStorage.clear();
            window.location.href = 'index.html';

        });


    </script>
    <script>

        sessionStorage.setItem('formCompleted', 'false');
        // Extract the prize from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const prize = urlParams.get('prize');
        document.getElementById('prize').textContent = prize || "Nothing";

        // Push an extra state into the history stack
        window.history.pushState(null, null, window.location.href);

        // Flag to detect whether user interaction has occurred
        let hasInteracted = false;

        // Detect any click or keydown to mark interaction
        document.addEventListener('click', () => {
            hasInteracted = true;
        });
        document.addEventListener('keydown', () => {
            hasInteracted = true;
        });

        // Detect when the user clicks the back button or uses navigation
        window.addEventListener('popstate', function (event) {
            if (!hasInteracted) {
                // If no interaction happened, set focus and return
                document.body.focus();
                return;
            }

            const userConfirmed = confirm('Are you sure you want to go back?');
            if (userConfirmed) {
                window.history.go(-2); // Go back two steps to skip the pushed state
            } else {
                // Re-push the current state to avoid going back
                window.history.pushState(null, null, window.location.href);
            }
        });

        // Detect before the page is closed or refreshed
        window.addEventListener('beforeunload', function (e) {
            const confirmationMessage = 'Are you sure you want to leave this page?';
            e.returnValue = confirmationMessage; // Standard for most browsers
            return confirmationMessage; // For older browsers
        });
    </script>



    <script>
        // Get the prize from sessionStorage
        const wonPrize = sessionStorage.getItem('wonPrize');

        if (!wonPrize) {
            alert('You cannot access this page without spinning the wheel.');
            window.location.href = 'index.html';
        } else {
            // Display the prize name
            //document.getElementById('prize').textContent = wonPrize;
            ////////////////////


            // Get the prize from sessionStorage
            const prize = sessionStorage.getItem('wonPrize');

            // Get the result message element
            const resultMessage = document.getElementById('result-message');

            // Function to handle different outcomes based on the prize
            function showPrizeOutcome(prize) {
                if (prize === '1') {
                    //resultMessage.textContent = "Congratulations! You won a NETS Card!";
                    // Add an image or custom behavior for NETS Card
                    showPrizeImage('You get 1 Tomato attempt!');

                } else if (prize === '2') {
                    //resultMessage.textContent = "Awesome! You won a Tomato Stress Ball!";
                    // Custom action for Tomato Stress Ball
                    showPrizeImage('You get 2 Tomatoes attempts!');


                } else if (prize === '3') {
                    //resultMessage.textContent = "Great! You won a Hygiene Kit!";
                    // Custom action for Hygiene Kit
                    showPrizeImage('You get 3 Tomatoes attempts!');

                } else if (prize === '4') {
                    //resultMessage.textContent = "Nice! You won an Umbrella!";
                    // Custom action for Umbrella
                    showPrizeImage('You get 4 Tomatoes attempts!');

                } else if (prize === '5') {
                    //resultMessage.textContent = "Nice! You won an Umbrella!";
                    // Custom action for Umbrella
                    showPrizeImage('You get 5 Tomatoes attempts!');

                } else if (prize === 'JACKPOT!') {
                    //resultMessage.textContent = "Jackpot!!! You won the grand prize!";
                    // Special effect or action for Jackpot
                    const prizeDiv = document.getElementById('prize-con')
                    prizeDiv.innerHTML += `<div class="rainbow-animate">JACKPOT!</div>`;

                } else {
                    resultMessage.textContent = "Error: Unknown prize!";
                }
            }
            showPrizeOutcome(prize);
        }

        function showPrizeImage(imageSrc) {
            const prizeDiv = document.getElementById('prize-con')
            prizeDiv.innerHTML += `<h1 style="color: red; font-size:40px">${imageSrc}<h1>`;
        }


    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


</body>

</html>
