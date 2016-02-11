"use strict";

const esprima   = require("esprima");
const walker    = require("escomplex-ast-moz");
const escomplex = require("escomplex");
const utils     = require("./utils");

function analyse(js) {
    const ast = esprima.parse(js, { loc: true });
    const result = escomplex.analyse(ast, walker);

    return result;
}

function process(analyses) {
    const summary = escomplex.processResults({
        reports: analyses
    }, false);

    summary.totalLOC = utils.sum(summary.reports.map(report =>
        report.aggregate.sloc.logical));

    return summary;
}

module.exports = {
    analyse,
    process
};
