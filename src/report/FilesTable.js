"use strict";

const Table = require("./Table");
const utils = require("../utils");
const icons = require("./Icons");

const columns = [
    { title: "Name",       align: "left"  },
    { title: "SLOC",       align: "right" },
    { title: "Complexity", align: "right" }
];

function formatFile(filePath) {
    return `<a href="jsComplexityAnalysis://complexity-analysis${ filePath }">${ filePath }</a>`;
}

function formatCyclomaticComplexity(cyclomaticComplexity) {
    const rounded = utils.roundToTwo(cyclomaticComplexity);

    if (cyclomaticComplexity > 10) {
        return rounded + " " + icons.error_small;
    } else if (cyclomaticComplexity > 6) {
        return rounded + " " + icons.warning_small;
    } else {
        return rounded;
    }
}

function FilesTable(analysis) {
    const rows = analysis.fileAnalyses.map(f => [
        formatFile(f.path),
        f.sloc,
        formatCyclomaticComplexity(f.cyclomatic)
    ]);

    const filesTable = new Table({
        columns: columns,
        rows: rows
    });

    return filesTable.toHtml();
}

module.exports = FilesTable;
