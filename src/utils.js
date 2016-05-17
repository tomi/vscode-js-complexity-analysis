"use strict";

function all(array, cb) {
    return array.reduce((prevVal, currVal) => prevVal && cb(currVal), true);
}

function none(array, cb) {
    return !all(array, cb);
}

function sum(array) {
    return array.reduce((prevVal, currVal) => prevVal + currVal, 0);
}

function average(array) {
    return sum(array) / array.length;
}

function max(array) {
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

    return (index && index == length && object !== undefined) ? object : defaultValue;
}

function round(num) {
    return +(Math.round(num + "e+1") + "e-1");
}

module.exports = {
    all,
    none,
    sum,
    average,
    max,
    round,
    get
};
