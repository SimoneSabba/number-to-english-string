'use strict';

function getConstant(value) {
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

module.exports = getConstant;
