"use strict";

const Table = require("./Table");
const utils = require("../utils");
const icons = require("./Icons");

const columns = [
    { title: "Function",   align: "left"  },
    { title: "Line",       align: "right" },
    { title: "SLOC",       align: "right" },
    { title: "# params",   align: "right" },
    { title: "Complexity", align: "right" }
];

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

function formatName(name) {
    return name
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function FunctionsTable(analysis) {
    const rows = analysis.functions.map(f => [
        formatName(f.name),
        f.line,
        f.sloc,
        f.params,
        formatCyclomaticComplexity(f.cyclomatic)
    ]);

    const functionsTable = new Table({
        columns: columns,
        rows: rows
    });

    return functionsTable.toHtml();
}

module.exports = FunctionsTable;
