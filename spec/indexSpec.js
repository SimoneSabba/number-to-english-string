'use strict';

var index = typeof require !== 'undefined' ? require('../src') : window.numberToWords;

describe('index', function () {
    it('should expose a toWords method', function () {
        expect(index.toWords).toEqual(jasmine.any(Function));
    });
});
