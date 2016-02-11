"use strict";

const esprima   = require("esprima");
const walker    = require("escomplex-ast-moz");
const escomplex = require("escomplex");

function analyse(js) {
    const ast = esprima.parse(js, { loc: true });
    const result = escomplex.analyse(ast, walker);

    return result;
}

function process(analyses) {
    const summary = escomplex.processResults({
        reports: analyses
    }, false);

    summary.totalLOC = sum(summary.reports.map(report =>
        report.aggregate.sloc.logical));

    return summary;
}

function sum(data) {
    return data.reduce((prevVal, currVal) => prevVal + currVal, 0);
}

module.exports = {
    analyse,
    process
};
