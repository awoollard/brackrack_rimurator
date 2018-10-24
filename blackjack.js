const { Card } = require('./libs/Card');
const { Shoe } = require('./libs/Shoe');
const { CardHelper } = require('./libs/CardHelper');
const { Dealer } = require('./libs/Dealer');
const { Player } = require('./libs/Player');
const { Game } = require('./libs/Game');

const ProgressBar = require('progress');

let stats = []
const games = 100000;

console.log('Simulating 100,000 games')

var bar = new ProgressBar('[:bar] :percent | :eta seconds to go', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: games
});

for(i = 0; i < games; i++) {
    const game = new Game();
    const statistics = game.play();
    bar.tick();
    stats = [...stats, statistics]
}

console.log("Player wins: " + stats.filter(s => s.playerWon).length)
console.log("Player busts: " + stats.filter(s => s.playerBusted).length)
console.log("Dealer wins: " + stats.filter(s => s.dealerWon).length)
console.log("Dealer busts: " + stats.filter(s => s.dealerBusted).length)
console.log("Standoffs: " + stats.filter(s => s.standOff).length)
console.log("\n")
console.log("Player win %: " + Math.round((stats.filter(s => s.playerWon).length / stats.filter(s => !s.standOff).length) * 100))
console.log("Dealer win %: " + Math.round((stats.filter(s => s.dealerWon).length / stats.filter(s => !s.standOff).length) * 100))

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