'use strict';

function isFinite(value) {
    return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
}

module.exports = isFinite;
