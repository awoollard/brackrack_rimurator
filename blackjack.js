const { Card } = require('./libs/Card');
const { Shoe } = require('./libs/Shoe');
const { CardHelper } = require('./libs/CardHelper');
const { Dealer } = require('./libs/Dealer');
const { Player } = require('./libs/Player');
const { Game } = require('./libs/Game');

let stats = []
for(i = 0; i < 1000; i++) {
    const game = new Game();
    const statistics = game.play();
    //console.log(statistics.toString())
    stats = [...stats, statistics]
}
console.log(stats.filter(s => s.playerWon).length)

if(false) {
    var playerWon = 0;
    for(i = 0; i < 1000000; i++) {
        const shoe = new Shoe(8);
    
        shoe.shuffle();
        
        const playerCards = [
            shoe.draw(),
            shoe.draw()
        ];
        
        const dealerCards = [ shoe.draw() ];
        do {
            dealerCards.push(shoe.draw());
            if(CardHelper.returnPossibleCardValues(dealerCards)[0] > 21)
                break;
        } while (CardHelper.returnPossibleCardValues(dealerCards) < 17)
    
        // limitation - hard hands only
        if(CardHelper.returnPossibleCardValues(dealerCards)[0] > 21)
            playerWon++;
            continue;
    
        // limitation - hard hands only
        if(CardHelper.returnPossibleCardValues(playerCards)[0] == 21)
            playerWon++;
            continue;
    
        // limitation - hard hands only
        if(CardHelper.returnPossibleCardValues(dealerCards)[0] == 21)
            continue;
    
        const possibleCardValuesPlayer = CardHelper
            .returnPossibleCardValues(playerCards);
        const possibleCardValuesDealer = CardHelper
            .returnPossibleCardValues(dealerCards);
        
        // sanity check
        // limitation - hard hand for player only - assumption stand on two cards cannot > 21
        if(CardHelper.highestPlayableHand(possibleCardValuesPlayer) > 21)
            throw Exception();
            
        if(CardHelper.highestPlayableHand(possibleCardValuesDealer) > 21)
            throw Exception();
        
        if(CardHelper.highestPlayableHand(possibleCardValuesPlayer) > CardHelper.highestPlayableHand(possibleCardValuesDealer))
            playerWon++;
    
    }
    console.log(playerWon / 1000000);
    //console.log(JSON.stringify({ playingCards, possibleCardValues, doesBust }, null, 2));
}