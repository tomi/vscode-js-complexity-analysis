"use strict";

import { sum } from "lodash";
import { analyzeModule, processProject } from "typhonjs-escomplex";

function analyse(js) {
    return analyzeModule(js);
}

function process(analyses) {
    const summary = processProject(analyses);

    summary.totalLOC = sum(summary.reports.map(report =>
        report.aggregate.sloc.logical));

    return summary;
}

export default {
    analyse,
    process
};
