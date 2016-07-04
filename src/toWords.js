'use strict';

var isFinite = require('./isFinite');
var isNegative = require('./isNegative');
var isNumber = require('./isNumber');
var getConstant = require('./constants');
var getErrorMessages = require('./errors');
var
    CONSTANTS = getConstant(),
    ERRORS = getErrorMessages();

function toWords(number) {
    var
        words,
        num;

    if (!isNumber(number)) throw new TypeError(ERRORS.NOT_A_NUMBER + number );

    num = parseInt(number, 10);

    if (isNegative(num)) throw new TypeError(ERRORS.NEGATIVE_NUMBER + number );
    if (!isFinite(num)) throw new TypeError(ERRORS.NOT_FINITE_NUMBER + number + ' (' + typeof number + ')');

    return generateWords(num);
}

function generateWords(number) {
    var
        carryOn,
        word,
        words = arguments[1];

    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }

    if (number < 20) {
        carryOn = 0;
        word = CONSTANTS.LESS_THAN_TWENTY[number];

    } else if (number < CONSTANTS.ONE_HUNDRED) {
        carryOn = number % CONSTANTS.TEN;
        word = CONSTANTS.TENTHS_LESS_THAN_HUNDRED[Math.floor(number / CONSTANTS.TEN)];

        if (carryOn) {
            word += ' ' + CONSTANTS.LESS_THAN_TWENTY[carryOn];
            carryOn = 0;
        }

    } else if (number < CONSTANTS.ONE_THOUSAND) {
        carryOn = number % CONSTANTS.ONE_HUNDRED;
        word = generateWords(Math.floor(number / CONSTANTS.ONE_HUNDRED)) + ' ' + CONSTANTS.HUNDRED_AND;

    } else if (number < CONSTANTS.ONE_MILLION) {
        carryOn = number % CONSTANTS.ONE_THOUSAND;
        word = generateWords(Math.floor(number / CONSTANTS.ONE_THOUSAND)) + ' ' + CONSTANTS.THOUSAND;

    } else if (number < CONSTANTS.ONE_BILLION) {
        carryOn = number % CONSTANTS.ONE_MILLION;
        word = generateWords(Math.floor(number / CONSTANTS.ONE_MILLION)) + ' ' + CONSTANTS.MILLION;

    } else if (number < CONSTANTS.ONE_TRILLION) {
        carryOn = number % CONSTANTS.ONE_BILLION;
        word = generateWords(Math.floor(number / CONSTANTS.ONE_BILLION)) + ' ' + CONSTANTS.BILLION;

    } else if (number < CONSTANTS.ONE_QUADRILLION) {
        carryOn = number % CONSTANTS.ONE_TRILLION;
        word = generateWords(Math.floor(number / CONSTANTS.ONE_TRILLION)) + ' ' + CONSTANTS.TRILLION;

    } else if (number <= CONSTANTS.MAX) {
        carryOn = number % CONSTANTS.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / CONSTANTS.ONE_QUADRILLION)) + ' '+CONSTANTS.QUADRILLION;
    }

    words.push(word);
    return generateWords(carryOn, words);
}

module.exports = toWords;
