"use strict";

const Table = require("./table");
const formatter = require("./metric-formatter.js");
const link  = require("./link.js").fileLineLink;

const columns = [
    { title: "Function",   align: "left"  },
    { title: "SLOC",       align: "right" },
    { title: "# params",   align: "right" },
    { title: "Complexity", align: "right" },
    { title: "Difficulty", align: "right" },
    { title: "Est # bugs", align: "right" }
];

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
        f.sloc,
        f.params,
        formatter.formatMetric(f.cyclomatic, 6, 10),
        formatter.formatMetric(f.difficulty),
        formatter.formatMetric(f.bugs)
    ]);

    const functionsTable = new Table({
        columns: columns,
        rows: rows
    });

    return functionsTable.toHtml();
}

module.exports = FunctionsTable;
