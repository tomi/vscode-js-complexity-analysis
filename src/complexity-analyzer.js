"use strict";

const esprima   = require("esprima");
const walker    = require("escomplex-ast-moz");
const escomplex = require("escomplex");

function analyse(js) {
    try {
        const ast = esprima.parse(js, { loc: true });
        const result = escomplex.analyse(ast, walker);

        return result;
    } catch (e) {
        throw new Error("Could not analyze file. Is it a syntactically valid JS file?");
    }
}

function process(analyses) {
    return escomplex.processResults({
        reports: analyses
    }, false);
}

module.exports = {
    analyse,
    process
};
