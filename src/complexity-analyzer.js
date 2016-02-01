"use strict";

const esprima   = require("esprima");
const walker    = require("escomplex-ast-moz");
const escomplex = require("escomplex");

function analyse(js) {
    const ast = esprima.parse(js, { loc: true });
    const result = escomplex.analyse(ast, walker);

    return result;
}

module.exports = {
    analyse
};
