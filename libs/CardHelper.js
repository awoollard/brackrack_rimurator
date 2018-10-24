const _ = require('lodash');

class CardHelper {
    static returnPossibleCardValues(cards) {
        const permutateCards = (currentCollection, remainingArray) => remainingArray[0]
            ? remainingArray[0].map(card => permutateCards(currentCollection.concat(card), remainingArray.slice(1)))
            : currentCollection;
        return _(cards)
            .map('weight')
            .thru(cards => permutateCards([], cards))
            .flattenDepth(cards.length - 1)
            .map(cardValuesArray => cardValuesArray.reduce((acc, value) => acc + value, 0))
            .sort((a, b) => a - b)
            .value();
    }
    
    static doesBust(orderedCardValues) {
        return orderedCardValues[0] > 21;
    }
    static highestPlayableHand(orderedCardValues) {
        return orderedCardValues
            .slice()
            .reverse()
            .find(value => value <= 21);
    }
    static hasBusted(hand) {
        return CardHelper.returnPossibleCardValues(hand)
            .filter(value => value <= 21)
            .length === 0;
    }
}

module.exports = { CardHelper };