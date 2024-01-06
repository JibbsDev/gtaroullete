class RouletteBetting {

    constructor() {
        this.houseBalance = 0;
        this.bets = [];
        this.playerWinningsLosses = 0;
        this.players = {}; // Track players and their balances
    }

    setHouseBalance() {
        const houseBalance = parseInt(document.getElementById('houseBalanceInput').value);
        this.houseBalance = houseBalance;
        this.updateDisplays();
    }

    placeBet(name, option, betAmount) {
        let numbers;

        switch (option) {
            case 'red':
                numbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
                break;
            case 'black':
                numbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
                break;
            case 'green':
                numbers = [0];
                break;
            case '1st':
                numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                break;
            case '2nd':
                numbers = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
                break;
            case '3rd':
                numbers = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
                break;
            case 'odd':
                numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
                break;
            case 'even':
                numbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
                break;
            default:
                // Assuming direct number input
                numbers = option.split(',').map(num => parseInt(num, 10));
                break;
        }

        betAmount = parseInt(betAmount, 10);
        this.bets.push({ name, numbers, betAmount });
        this.updateCurrentBetsDisplay();

        if (!this.players[name]) {
            this.players[name] = { balance: 0, total: 0 };
        }

        this.players[name].balance -= betAmount; // Deduct from player's balance
    }

    calculateWinnings(winningNumber) {
        winningNumber = parseInt(winningNumber, 10);

        // Adjust for the method that returns 37 instead of 0
        if (winningNumber === 37) {
            winningNumber = 0;
        }

        let totalPayout = 0;
        const winners = [];

        this.bets.forEach(bet => {
            const { name, numbers, betAmount } = bet;
            if (numbers.includes(winningNumber)) {
                const payoutRatio = this.getPayoutRatio(numbers.length);
                const winnings = betAmount * payoutRatio + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            }

            for (const winner of winners) {
                this.players[winner.name].balance += winner.winnings; // Add winnings to player's balance
                this.players[winner.name].total += winner.winnings; // Update player's total winnings
            }
            this.playerWinningsLosses += totalPayout - this.totalBetAmount(); // Update aggregate player winnings/losses
        });

        this.houseBalance += (this.totalBetAmount() - totalPayout);
        this.bets = []; // Clear current bets
        this.updateWinningBetsDisplay(winners);
        this.updateHouseBalanceDisplay();
        this.updatePlayerBalancesDisplay(); // Display updated player balances
        this.updateCurrentBetsDisplay(); // Clear display of current bets
    }

    getPayoutRatio(numNumbers) {
        switch (numNumbers) {
            case 1:
                return 35;
            case 2:
                return 17;
            case 3:
                return 11;
            case 4:
                return 8;
            default:
                return 0;
        }
    }

    totalBetAmount() {
        return this.bets.reduce((acc, bet) => acc + bet.betAmount, 0);
    }

    updateCurrentBetsDisplay() {
        const display = document.getElementById('currentBets');
        display.innerHTML = this.bets.map(bet => `${bet.name}: ${bet.numbers.join(', ')} - $${bet.betAmount}`).join('<br>');
    }

    updateWinningBetsDisplay(winners) {
        const display = document.getElementById('winningBets');
        display.innerHTML = winners.map(winner => `${winner.name} wins $${winner.winnings}`).join('<br>');
    }

    updateHouseBalanceDisplay() {
        const houseBalanceDisplay = document.getElementById('houseBalanceDisplay');
        houseBalanceDisplay.textContent = this.houseBalance;
    }

    resetTable() {
        this.houseBalance = 0;
        this.bets = [];
        this.playerWinningsLosses = 0;
        this.players = {};
        this.updateDisplays();
    }

    updateDisplays() {
        this.updatePlayerBalancesDisplay();
        this.updateHouseBalanceDisplay();
    }

    updatePlayerBalancesDisplay() {
        const playerBalancesDisplay = document.getElementById('playerBalances');
        playerBalancesDisplay.innerHTML = ''; // Clear previous content
        for (const playerName in this.players) {
            const playerBalance = this.players[playerName].balance;
            const playerTotal = this.players[playerName].total;
            playerBalancesDisplay.innerHTML += `${playerName}: $${playerBalance} (Total: $${playerTotal})<br>`;
        }
    }
}

const roulette = new RouletteBetting();

function placeBet() {
    const betInputValue = document.getElementById('betInput').value;
    const [name, numbers, betAmount] = betInputValue.split(/\s+/);
    roulette.placeBet(name, numbers, betAmount);
    document.getElementById('betInput').value = ''; // Clear input field
}

function calculateWinnings() {
    const winningNumber = document.getElementById('winInput').value;
    roulette.calculateWinnings(winningNumber);
    document.getElementById('winInput').value = ''; // Clear input field
}

function clearBets() {
    roulette.bets = [];
    roulette.updateCurrentBetsDisplay();
}

function resetTable() {
    roulette.resetTable();
}

// Additional function to be called when needed
function setHouseBalance() {
    roulette.setHouseBalance();
}
