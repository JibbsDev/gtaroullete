class RouletteBetting {
    constructor() {
        this.bets = [];
        this.houseProfit = 0;
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
    }

    // ... (rest of the code remains unchanged)
}
