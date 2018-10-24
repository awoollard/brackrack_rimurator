const { HIT, STAND } = require('./GameActions');
const { Dealer } = require('./Dealer');
const { Player } = require('./Player');
const { Shoe } = require('./Shoe');
const { Statistics } = require('./Statistics');

class Game {
    play() {
        const shoe = new Shoe(8);
        const dealer = new Dealer();
        const player = new Player();
        
        // Initial game actions
        player.drawInitialHand(shoe);
        dealer.drawUpCard(shoe);

        // Player's turn
        switch (player.makeDecision()) {
            case HIT:
                player.hand = [...player.hand, shoe.draw()];
            case STAND:
                ; // Dont do nuffin
        }

        // Dealer's turn
        switch (dealer.makeDecision()) {
            case HIT:
                dealer.hand = [...dealer.hand, shoe.draw()]
            case STAND:
                ; // Dont do nuffin
        }
        
        const statistics = new Statistics();
        statistics.calculateWinner(player.hand, dealer.hand);
        return statistics;
    };
}

module.exports = { Game };