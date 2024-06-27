document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        const digit1 = document.getElementById('digit-1');
        const digit2 = document.getElementById('digit-2');
        const digit3 = document.getElementById('digit-3');
        let counter;

        // Clear previous interval if exists
        if (digit1.dataset.intervalId) {
            clearInterval(digit1.dataset.intervalId);
        }

        // Function to update digits
        function updateDigits(number) {
            const paddedNumber = number.toString().padStart(3, '0');
            digit1.textContent = paddedNumber[0];
            digit2.textContent = paddedNumber[1];
            digit3.textContent = paddedNumber[2];

            digit1.className = 'digit' + (number >= 100 ? '' : ' grey');
            digit2.className = 'digit' + (number >= 10 ? '' : ' grey');
            digit3.className = 'digit';
        }

        // Start fast random counter
        counter = setInterval(function () {
            const randomCounterNumber = Math.floor(Math.random() * 101) + 1;
            updateDigits(randomCounterNumber);
        }, 100);

        // Store interval ID in dataset
        digit1.dataset.intervalId = counter;

        // Stop the fast counter and start slow counter after 2 seconds
        setTimeout(function () {
            clearInterval(counter);

            counter = setInterval(function () {
                const randomCounterNumber = Math.floor(Math.random() * 100) + 1;
                updateDigits(randomCounterNumber);
            }, 300);

            // Store new interval ID
            digit1.dataset.intervalId = counter;

            // Stop the slow counter and set final random number after another 2 seconds
            setTimeout(function () {
                clearInterval(counter);
                const randomNumber = Math.floor(Math.random() * 100) + 1;
                updateDigits(randomNumber);

                // Trigger confetti multiple times to fill the space
                const duration = 2 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                const interval = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 200 * (timeLeft / duration);
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);

            }, 2000);

        }, 2000);
    }
});
