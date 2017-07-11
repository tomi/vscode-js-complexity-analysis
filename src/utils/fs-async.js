const fs = require("fs");
// const path = require("path");
const promisify = require("es6-promisify");

const readfile = promisify(fs.readFile);

module.exports = {
    readfile
};
