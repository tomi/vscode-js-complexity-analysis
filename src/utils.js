function all(array, cb) {
    return array.reduce((prevVal, currVal) => prevVal && cb(currVal), true);
}

function none(array, cb) {
    return !all(array, cb);
}

function sum(array) {
    return array.reduce((prevVal, currVal) => prevVal + currVal, 0);
}

module.exports = {
    all,
    none,
    sum
};
