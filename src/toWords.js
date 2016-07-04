'use strict';

var isFinite = require('./isFinite');
var isNegative = require('./isNegative');
var isNumber = require('./isNumber');

var TEN = 10;
var ONE_HUNDRED = 100;
var ONE_THOUSAND = 1000;
var ONE_MILLION = 1000000;
var ONE_BILLION = 1000000000;
var ONE_TRILLION = 1000000000000;
var ONE_QUADRILLION = 1000000000000000;
var MAX = 9007199254740992;

var LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

var TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

function toWords(number) {
    var
        words,
        num;

    if (!isNumber(number)) throw new TypeError('Not a number: ' + number );

    num = parseInt(number, 10);

    if (isNegative(num)) throw new TypeError('Negative number not allowed: ' + number );
    if (!isFinite(num)) throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');

    return generateWords(num);
}

function generateWords(number) {
    var
        remainder,
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
        remainder = 0;
        word = LESS_THAN_TWENTY[number];

    } else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];

        if (remainder) {
            word += ' ' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred and';

    } else if (number < ONE_MILLION) {
        remainder = number % ONE_THOUSAND;
        word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand';

    } else if (number < ONE_BILLION) {
        remainder = number % ONE_MILLION;
        word = generateWords(Math.floor(number / ONE_MILLION)) + ' million';

    } else if (number < ONE_TRILLION) {
        remainder = number % ONE_BILLION;
        word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion';

    } else if (number < ONE_QUADRILLION) {
        remainder = number % ONE_TRILLION;
        word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion';

    } else if (number <= MAX) {
        remainder = number % ONE_QUADRILLION;
        word = generateWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion';
    }

    words.push(word);
    return generateWords(remainder, words);
}

module.exports = toWords;
