"use strict";

import Table from "./table";
import metricFormatter from "./metric-formatter";
import link from "./link.js";

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

    return link.fileLineLink(encodedName, filePath, line);
}

function FunctionsTable(filePath, functions) {
    const rows = functions.map(f => [
        formatName(filePath, f.name, f.line),
        f.sloc,
        f.params,
        metricFormatter.formatMetric(f.cyclomatic, 6, 10),
        metricFormatter.formatMetric(f.difficulty),
        metricFormatter.formatMetric(f.bugs)
    ]);

    const functionsTable = new Table({
        columns: columns,
        rows: rows
    });

    return functionsTable.toHtml();
}

export default FunctionsTable;
