const { CardHelper } = require('./CardHelper');

class Statistics {
    constructor() {
        this.playerWon = false;
        this.playerBusted = false;
        this.dealerWon = false;
        this.dealerBusted = false;
        this.standOff = false;
    }

    calculateWinner (playersHand, dealersHand) {
        // Has player busted?
        if(CardHelper.hasBusted(playersHand)) {
            this.playerBusted = true;
            this.dealerWon = true;
            return;
        }

        // Has dealer busted?
        if(CardHelper.hasBusted(dealersHand)) {
            this.dealerBusted = true;
            this.playerWon = true;
            return;
        }

        // Because a hand can have an ace, we refer to their hand as the "best playable hand"
        const playersBestHand = CardHelper.highestPlayableHand(playersHand);
        const dealersBestHand = CardHelper.highestPlayableHand(dealersHand);
        if(playersBestHand > dealersBestHand) {
            this.playerWon = true;
        } else if(playersBestHand === dealersBestHand) {
            this.standOff = true;
        } else {
            this.dealerWon = true;
        }

        this.dealerWon = !this.playerWon;
    }
    
    toString() {
        return JSON.stringify(this, null, 2);
    }
}

module.exports = { Statistics };