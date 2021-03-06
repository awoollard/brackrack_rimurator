const { GameActions } = require('./GameActions');
const { Dealer } = require('./Dealer');
const { Player } = require('./Player');
const { Shoe } = require('./Shoe');
const { Statistics } = require('./Statistics');

class Game {
    play() {
        const shoe = new Shoe(8);
        shoe.shuffle()
        const dealer = new Dealer();
        const player = new Player();
        
        // Initial game actions
        player.drawInitialHand(shoe);
        dealer.drawUpCard(shoe);

        // Player's turn
        while (player.makeDecision() === GameActions.HIT) {
            player.hand = [...player.hand, shoe.draw()];
        }
        
        // Dealer's turn
        while (dealer.makeDecision() === GameActions.HIT) {
            dealer.hand = [...dealer.hand, shoe.draw()];
        }
        
        const statistics = new Statistics();
        statistics.calculateWinner(player.hand, dealer.hand);
        return statistics;
    };
}

module.exports = { Game };