const colors = ['red', 'green', 'blue'];
const sizes = ['big', 'small'];
let timer = 30;
let bettingEnabled = true;
let predictions = {};
let money = 100;
let gameHistory = [];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function makePrediction(prediction) {
    if (!bettingEnabled) {
        alert('Betting is closed! Wait for the next round.');
        return;
    }

    const betAmount = parseInt(document.getElementById('bet-amount').value, 10);
    if (betAmount > money) {
        alert('You do not have enough money to place this bet.');
        return;
    }

    if (colors.includes(prediction)) {
        predictions.color = { prediction, betAmount };
    } else if (sizes.includes(prediction)) {
        predictions.size = { prediction, betAmount };
    }

    document.getElementById('result-text').innerText = `You predicted ${prediction} with a bet of $${betAmount}. Waiting for the result...`;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timer--;

    if (timer <= 5) {
        bettingEnabled = false;
        document.querySelectorAll('.bet-button').forEach(button => button.disabled = true);
    } else {
        bettingEnabled = true;
        document.querySelectorAll('.bet-button').forEach(button => button.disabled = false);
    }

    if (timer <= 0) {
        showResult();
        timer = 30;
        predictions = {}; // Clear predictions for the next round
    }

    timerElement.innerText = timer;
}

function showResult() {
    const actualColor = getRandomElement(colors);
    const actualSize = getRandomElement(sizes);
    let resultText = `Actual color is ${actualColor}. Actual size is ${actualSize}. `;

    if (predictions.color) {
        resultText += `You predicted color ${predictions.color.prediction} with a bet of $${predictions.color.betAmount}. `;
        if (predictions.color.prediction === actualColor) {
            resultText += 'You win!';
            money += predictions.color.betAmount;
        } else {
            resultText += 'You lose!';
            money -= predictions.color.betAmount;
        }
    }

    if (predictions.size) {
        resultText += `You predicted size ${predictions.size.prediction} with a bet of $${predictions.size.betAmount}. `;
        if (predictions.size.prediction === actualSize) {
            resultText += 'You win!';
            money += predictions.size.betAmount;
        } else {
            resultText += 'You lose!';
            money -= predictions.size.betAmount;
        }
    }

    document.getElementById('modal-result-text').innerText = resultText;
    document.getElementById('money').innerText = money;
    updateHistory(resultText);
    openModal();
}

function updateHistory(resultText) {
    gameHistory.push(resultText);
    if (gameHistory.length > 10) {
        gameHistory.shift(); // Remove the oldest bet if we have more than 10
    }
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    gameHistory.forEach(history => {
        const listItem = document.createElement('li');
        listItem.innerText = history;
        historyList.appendChild(listItem);
    });
}

function toggleHistory() {
    const historyElement = document.getElementById('history');
    if (historyElement.style.display === 'none' || historyElement.style.display === '') {
        historyElement.style.display = 'block';
    } else {
        historyElement.style.display = 'none';
    }
}

function openModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'none';
}

setInterval(updateTimer, 1000);

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('resultModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
function makePrediction(prediction) {
    if (!bettingEnabled) {
        alert('Betting is closed! Wait for the next round.');
        return;
    }

    const betAmount = parseInt(document.getElementById('bet-amount').value, 10);
    if (betAmount > money) {
        alert('You do not have enough money to place this bet.');
        return;
    }

    if (colors.includes(prediction)) {
        predictions.color = { prediction, betAmount };
    } else if (sizes.includes(prediction)) {
        predictions.size = { prediction, betAmount };
    }

    document.getElementById('result-text').innerText = `You predicted ${prediction} with a bet of $${betAmount}. Waiting for the result...`;

    // Show popup notification for 3 seconds
    const notification = document.getElementById('bet-notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
function showBetConfirmationModal() {
    const modal = document.getElementById('betConfirmationModal');
    modal.style.display = 'block';
}

function closeBetConfirmationModal() {
    const modal = document.getElementById('betConfirmationModal');
    modal.style.display = 'none';
}

function confirmBet() {
    const prediction = document.querySelector('input[name="prediction"]:checked');
    if (!prediction) {
        alert('Please select a prediction.');
        return;
    }

    const betAmount = parseInt(document.getElementById('bet-amount').value, 10);
    if (betAmount > money) {
        alert('You do not have enough money to place this bet.');
        return;
    }

    const selectedPrediction = prediction.value;
    makePrediction(selectedPrediction);
    closeBetConfirmationModal();
}

// Rest of the JavaScript code remains unchanged
