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

module.exports = { Card, suits, values, weight };