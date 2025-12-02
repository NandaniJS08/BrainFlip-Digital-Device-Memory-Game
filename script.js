
        document.addEventListener('DOMContentLoaded', () => {

            const firstScreen = document.getElementById('firstScreen');
            const secondScreen = document.getElementById('secondScreen');
            const startButton = document.getElementById('startButton');
            const gameBoard = document.getElementById('gameBoard');
            const movesCount = document.getElementById('movesCount');
            const matchesCount = document.getElementById('matchesCount');
            const timerDisplay = document.getElementById('timer');
            const gameOverPopup = document.getElementById('gameOverPopup');
            const playAgainButton = document.getElementById('playAgainButton');
            const finalMoves = document.getElementById('finalMoves');
            const finalTime = document.getElementById('finalTime');

            let moves = 0, matches = 0, flippedCards = [], canFlip = true;
            let timeElapsed = 0, timerInterval;

            const devicePairs = [
                { device: 'Smartphone', use: 'Calling and Apps' },
                { device: 'Laptop', use: 'Work and Productivity' },
                { device: 'Tablet', use: 'Entertainment and Reading' },
                { device: 'Camera', use: 'Photography' },
                { device: 'Headphones', use: 'Listening to Audio' },
                { device: 'Printer', use: 'Printing Documents' },
                { device: 'Router', use: 'Internet Connectivity' },
                { device: 'Smart Watch', use: 'Fitness Tracking' }
            ];

            startButton.addEventListener('click', startGame);
            playAgainButton.addEventListener('click', startGame);

            function startGame() {
                secondScreen.style.display = 'flex';
                moves = 0;
                matches = 0;
                flippedCards = [];
                canFlip = true;
                timeElapsed = 0;
                movesCount.textContent = moves;
                matchesCount.textContent = `${matches}/8`;
                timerDisplay.textContent = '0s';

                firstScreen.style.display = 'none';
                secondScreen.style.display = 'block';
                gameOverPopup.style.display = 'none';

                clearInterval(timerInterval);
                timerInterval = setInterval(() => {
                    timeElapsed++;
                    timerDisplay.textContent = `${timeElapsed}s`;
                }, 1000);

                createGameBoard();
            }

            function createGameBoard() {
                gameBoard.innerHTML = '';
                let cards = [];
                devicePairs.forEach(pair => {
                    cards.push({ type: 'device', content: pair.device, pairId: pair.device });
                    cards.push({ type: 'use', content: pair.use, pairId: pair.device });
                });
                shuffleArray(cards);

                cards.forEach(card => {
                    const cardEl = document.createElement('div');
                    cardEl.className = 'card';
                    cardEl.dataset.pairId = card.pairId;
                    cardEl.dataset.type = card.type;
                    cardEl.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"><div class="card-text">${card.content}</div></div>
                    <div class="card-back">?</div>
                </div>`;
                    cardEl.addEventListener('click', () => flipCard(cardEl));
                    gameBoard.appendChild(cardEl);
                });
            }

            function flipCard(card) {
                if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;
                card.classList.add('flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    canFlip = false;
                    moves++;
                    movesCount.textContent = moves;

                    const [card1, card2] = flippedCards;

                    if (card1.dataset.pairId === card2.dataset.pairId &&
                        card1.dataset.type !== card2.dataset.type) {

                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        matches++;
                        matchesCount.textContent = `${matches}/8`;
                        flippedCards = [];
                        canFlip = true;

                       // ✅ Fun facts + more detailed info
const deviceInfo = {
    Smartphone: {
        fact: "The first smartphone was introduced in 1992!",
        details: "Smartphones are handheld devices that combine a phone with computing power. They allow calling, internet access, apps, and more.",
        history: "The IBM Simon, released in 1992, is considered the first smartphone. It combined a phone with calendar, calculator, and email features.",
        uses: "Used for communication, education apps, online learning, and research.",
        impact: "Smartphones make learning resources available anywhere and connect students globally."
    },
    Laptop: {
        fact: "The first portable computer weighed over 11 kg!",
        details: "Laptops are portable computers used for work, study, and entertainment.",
        history: "The Osborne 1, introduced in 1981, was the first commercial portable computer.",
        uses: "Programming, research, online classes, creative work, and gaming.",
        impact: "Laptops made computing accessible for students, enabling digital learning anywhere."
    },
    Tablet: {
        fact: "The iPad popularized tablets in 2010.",
        details: "Tablets are touchscreen devices used for reading, games, drawing, and multimedia.",
        history: "The GRiDPad, released in 1989, was the first commercially sold tablet computer.",
        uses: "E-books, interactive STEM apps, drawing, and online study.",
        impact: "Tablets make education interactive and fun, especially for younger students."
    },
    Camera: {
        fact: "The first digital camera was invented in 1975.",
        details: "Cameras capture photos and videos. Today, digital cameras are often built into smartphones.",
        history: "Invented by Steven Sasson at Kodak, the first digital camera stored images on a cassette tape.",
        uses: "Used in science experiments, recording lectures, and creating projects.",
        impact: "Visual learning is enhanced by cameras, helping students document and share discoveries."
    },
    Headphones: {
        fact: "Headphones were invented in 1910 by Nathaniel Baldwin.",
        details: "They allow private listening to music, calls, or audio without disturbing others.",
        history: "Originally designed for telephone operators, headphones are now used worldwide.",
        uses: "Listening to online lectures, language learning, and music.",
        impact: "Headphones provide focused learning and accessibility for students with special needs."
    },
    Printer: {
        fact: "The first computer printer was invented in 1953.",
        details: "Printers transfer digital text/images onto paper. Many modern printers are wireless and multifunctional.",
        history: "The first high-speed printer was developed by Remington-Rand for the Univac computer.",
        uses: "Printing assignments, study notes, charts, and diagrams.",
        impact: "Printers help convert digital work into tangible resources for offline study."
    },
    Router: {
        fact: "Routers are the backbone of the internet!",
        details: "Routers connect devices to the internet and allow multiple devices to share one connection.",
        history: "The first true IP router was developed at Stanford University in the late 1970s.",
        uses: "Providing Wi-Fi for homes, schools, and libraries.",
        impact: "Routers make the internet accessible, enabling online education and research."
    },
    "Smart Watch": {
        fact: "The first digital watch was made in 1972.",
        details: "Smartwatches track fitness, show notifications, and can even make calls.",
        history: "The Pulsar Time Computer, launched in 1972, was the first digital watch.",
        uses: "Tracking exercise, receiving reminders, and learning time management.",
        impact: "Smartwatches encourage healthy habits and keep students organized."
    }
};


                        // Set popup content
                        const deviceName = card1.dataset.pairId;
                        document.getElementById("matchInfo").textContent = `💡 ${deviceInfo[deviceName].fact}`;
                        document.getElementById("extraInfo").textContent = deviceInfo[deviceName].details;
                        document.getElementById("history").textContent = `📜 History: ${deviceInfo[deviceName].history}`;
                        document.getElementById("uses").textContent = `🔧 Uses: ${deviceInfo[deviceName].uses}`;
                        document.getElementById("impact").textContent = `🌍 Impact: ${deviceInfo[deviceName].impact}`;
                        document.getElementById("matchPopup").style.display = "flex";

                        // Show popup
                        document.getElementById("matchPopup").style.display = "flex";

                        canFlip = false; // stop flipping
                        if (matches === 8) endGame();
                    } else {
                        setTimeout(() => {
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                            card1.style.animation = 'shake 0.5s';
                            card2.style.animation = 'shake 0.5s';
                            setTimeout(() => { card1.style.animation = ''; card2.style.animation = ''; }, 500);
                            flippedCards = [];
                            canFlip = true;
                        }, 1000);
                    }
                }
            }
            document.getElementById("closeMatchPopup").addEventListener("click", () => {
                document.getElementById("matchPopup").style.display = "none";
                canFlip = true; // resume flipping
            });

            function endGame() {
                clearInterval(timerInterval);
                finalMoves.textContent = moves;
                finalTime.textContent = `${timeElapsed}s`;
                gameOverPopup.style.display = 'flex';
                // Optional: Add confetti animation here
            }

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

        });
    