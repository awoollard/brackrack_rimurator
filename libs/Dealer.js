const { CardHelper } = require('./CardHelper');
const { GameActions } = require('./GameActions');

class Dealer {
    constructor() {
        this.hand = [];
    }
    
    drawUpCard (shoe) { 
        this.hand = [shoe.draw()];
    }

    makeDecision () {
        if (CardHelper.returnPossibleCardValues(this.hand)[0] < 17) {
            return GameActions.HIT
        }
        return GameActions.HIT;
    }
}

module.exports = { Dealer };