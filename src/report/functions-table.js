"use strict";

const Table = require("./table");
const utils = require("../utils");
const icons = require("./icons");
const link  = require("./link.js").fileLineLink;

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

function formatName(filePath, name, line) {
    const encodedName = name
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    return link(encodedName, filePath, line);
}

function FunctionsTable(analysis) {
    const filePath = analysis.path;

    const rows = analysis.functions.map(f => [
        formatName(filePath, f.name, f.line),
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
