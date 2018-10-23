const _ = require('lodash');

const suits = ['hearts', 'spade', 'clubs', 'diamond'];
const values = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];

const weight = {
    'ace': [1, 11],
    'two': [2],
    'three': [3],
    'four': [4],
    'five': [5],
    'six': [6],
    'seven': [7],
    'eight': [8],
    'nine': [9],
    'ten': [10],
    'jack': [10],
    'queen': [10],
    'king': [10],
};

class Card {
    constructor(number) {
        this.suit = suits[number % suits.length];
        this.value = values[number % values.length];
        this.weight = weight[this.value]; 
    }

    toString() {
        return `${this.suit} of ${this.value}`;
    }
}

class Shoe {
    constructor(decks) {
        this.cardsInPlay = [];
        this.cardsUsed = [];

        for (var i = 0; i < (52 * decks); ++i) {
            this.cardsInPlay.push(new Card(i));
        }
    }

    draw() {
        const card = this.cardsInPlay.pop();
        this.cardsUsed.push(card);
        return card;
    }

    shuffle() { 
        const swap = (array, indexFrom, indexTo) => {
            const temp = array[indexTo];
            array[indexTo] = array[indexFrom];
            array[indexFrom] = temp;
        }

        for (var i = 0; i < this.cardsInPlay.length; ++i) {
            swap(this.cardsInPlay, i, Math.floor(Math.random() * this.cardsInPlay.length));
        }
    }

    toString() {
        const dict = {}

        this.cardsInPlay
            .forEach(card => (dict[card.suit] = dict[card.suit] || []).push(card.value))

        const cardComparitor = (cardA, cardB) =>
            weight[cardA][0] - weight[cardB][0]

        Object.keys(dict)
            .forEach(suit => dict[suit] = dict[suit].sort(cardComparitor));

        return JSON.stringify(dict, null, 2);
    }
}

class CardHelper {
    static returnPossibleCardValues (cards) {
        const permutateCards = (currentCollection, remainingArray) =>
            remainingArray[0]
                ? remainingArray[0].map(card => permutateCards(currentCollection.concat(card), remainingArray.slice(1)))
                : currentCollection
    
        return _(cards)
            .map('weight')
            .thru(cards => permutateCards([], cards))
            .flattenDepth(cards.length - 1)
            .map(cardValuesArray => cardValuesArray.reduce((acc, value) => acc + value, 0))
            .sort((a, b) => a - b)
            .value();
    };

    static doesBust (orderedCardValues) {
        return orderedCardValues[0] > 21;
    }
}

var timesBusted = 0;
for(i = 0; i < 1000000; i++) {
    const shoe = new Shoe(8);

    shoe.shuffle();
    
    const playingCards = [
        shoe.draw(),
        shoe.draw(),
        shoe.draw(),
        shoe.draw(),
    ];
    
    const possibleCardValues = CardHelper
        .returnPossibleCardValues(playingCards);
    
    const doesBust = CardHelper
        .doesBust(possibleCardValues);

    if(doesBust)
        timesBusted++;
}
console.log(timesBusted / 1000000);
//console.log(JSON.stringify({ playingCards, possibleCardValues, doesBust }, null, 2));