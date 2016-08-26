"use strict";

function any(array, cb) {
    return array.reduce((prevVal, currVal) => prevVal || cb(currVal), false);
}

function sum(array) {
    return array.reduce((prevVal, currVal) => prevVal + currVal, 0);
}

function average(array) {
    if (array.length === 0) {
        return 0;
    }

    return sum(array) / array.length;
}

function max(array) {
    if (array.length === 0) {
        return 0;
    }

    return Math.max.apply(null, array);
}

// Like in lodash
function get(object, path, defaultValue) {
    path = path.split(".");

    let index = 0;
    let length = path.length;

    while (object != null && index < length) {
        object = object[path[index++]];
    }

    return index && index == length && object !== undefined ? object : defaultValue;
}

function round(num) {
    return +(Math.round(num + "e+1") + "e-1");
}

module.exports = {
    any,
    sum,
    average,
    max,
    round,
    get
};
