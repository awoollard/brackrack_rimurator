const { Card, weight } = require('./Card');

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
        };
        for (var i = 0; i < this.cardsInPlay.length; ++i) {
            swap(this.cardsInPlay, i, Math.floor(Math.random() * this.cardsInPlay.length));
        }
    }
    toString() {
        const dict = {};
        this.cardsInPlay
            .forEach(card => (dict[card.suit] = dict[card.suit] || []).push(card.value));
        const cardComparitor = (cardA, cardB) => weight[cardA][0] - weight[cardB][0];
        Object.keys(dict)
            .forEach(suit => dict[suit] = dict[suit].sort(cardComparitor));
        return JSON.stringify(dict, null, 2);
    }
}

module.exports = { Shoe };