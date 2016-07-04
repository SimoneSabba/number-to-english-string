/*!
 * Number-To-Words util
 * @version v1.0.0
 * @link 
 * @author Simone Sabbatini
 * @contributors 
 * @license 
 */
(function () {
    'use strict';

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

    // ========== file: /src/isFinite.js ==========

function isFinite(value) {
    return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
}


// ========== file: /src/isNumber.js ==========

function isNumber(value) {
    return typeof value === 'number';
}


// ========== file: /src/isNegative.js ==========

function isNegative(value) {
    return value < 0;
}


// ========== file: /src/toWords.js ==========

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


// ========== file: /src/constants.js ==========

function getConstant() {
    return {
        TEN: 10,
        ONE_HUNDRED: 100,
        ONE_THOUSAND: 1000,
        ONE_MILLION: 1000000,
        ONE_BILLION: 1000000000,
        ONE_TRILLION: 1000000000000,
        ONE_QUADRILLION: 1000000000000000,
        MAX: 9007199254740992,
        TENTHS_LESS_THAN_HUNDRED: ['zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
        LESS_THAN_TWENTY:['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        HUNDRED_AND: 'hundred and',
        THOUSAND: 'thousand',
        MILLION: 'million',
        BILLION: 'billion',
        TRILLION: 'trillion',
        QUADRILLION: 'quadrillion'
    };
}


// ========== file: /src/errors.js ==========

function getErrorMessages() {
    return {
        NOT_A_NUMBER: 'Not a number: ',
        NEGATIVE_NUMBER: 'Negative number not allowed: ',
        NOT_FINITE_NUMBER: 'Not a finite number: '
    };
}



    var numberToWords = {
        toWords: toWords
    };

    if (typeof exports != 'undefined') {
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = toWords;
        }
        exports.numberToWords = toWords;
    } else {
        root.numberToWords = toWords;
    }

}());