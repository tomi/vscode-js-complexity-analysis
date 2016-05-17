"use strict";

const Table = require("./table");
const formatter = require("./metric-formatter");
const link  = require("./link").localLink;

const columns = [
    { title: "Name",               align: "left"  },
    { title: "SLOC",               align: "right" },
    { title: "Avg<br/>Complexity", align: "right" },
    { title: "Max<br/>Complexity", align: "right" },
    { title: "Est errors",         align: "right" }
];

function formatFile(filePath) {
    return link(filePath, filePath);
}

function FilesTable(analysis) {
    const rows = analysis.fileAnalyses.map(f => [
        formatFile(f.path),
        f.sloc,
        formatter.formatMetric(f.cyclomatic.avg, 6, 10),
        formatter.formatMetric(f.cyclomatic.max, 6, 10),
        formatter.formatMetric(f.bugs)
    ]);

    const filesTable = new Table({
        columns: columns,
        rows: rows
    });

    return filesTable.toHtml();
}

module.exports = FilesTable;
