'use strict';

var toWords = typeof require !== 'undefined' ? require('../src/toWords') : window.numberToWords.toWords;

describe('toWords', function () {

    it('should, if passed -1 return error', function () {
        expect(function(){toWords(-1)}).toThrowError();
    });

    it('should, if passed string return error', function () {
        expect(function(){toWords('string')}).toThrowError();
    });

    it('should, if passed 0 return zero', function () {
        expect(toWords(0)).toEqual('zero');
    });

    it('should, if passed 1 return one', function () {
        expect(toWords(1)).toEqual('one');
    });

    it('should, if passed 21 return twenty one', function () {
        expect(toWords(21)).toEqual('twenty one');
    });

    it('should, if passed 105 one return one hundred and five', function () {
        expect(toWords(105)).toEqual('one hundred and five');
    });

    it('should, if passed 1105 return one thousand one hundred and five', function () {
        expect(toWords(1105)).toEqual('one thousand one hundred and five');
    });

    it('should, if passed 56945781 return fifty six million nine hundred and forty five thousand seven hundred and eighty one', function () {
        expect(toWords(56945781)).toEqual('fifty six million nine hundred and forty five thousand seven hundred and eighty one');
    });

    it('should, if passed 999999999 return nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine', function () {
        expect(toWords(999999999)).toEqual('nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine');
    });

});



