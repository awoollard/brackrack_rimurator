const { CardHelper } = require('./CardHelper');
const { GameActions } = require('./GameActions');

class Player {
    constructor() {
        this.hand = [];
    }
    
    drawInitialHand (shoe) {
        this.hand = [
            shoe.draw(),
            shoe.draw()
        ];
    } 

    makeDecision () {
        if (CardHelper.returnPossibleCardValues(this.hand)[0] < 17) {
            return GameActions.HIT
        }
        return GameActions.STAND;
    }
}

module.exports = { Player };