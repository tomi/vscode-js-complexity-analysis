"use strict";

const _ = require("lodash");
const escomplex = require("typhonjs-escomplex");

function analyse(js) {
    return escomplex.analyzeModule(js);
}

function process(analyses) {
    const summary = escomplex.processProject(analyses);

    summary.totalLOC = _.sum(summary.reports.map(report =>
        report.aggregate.sloc.logical));

    return summary;
}

module.exports = {
    analyse,
    process
};
