"use strict";

import Table from "./table";
import { formatMetric } from "./metric-formatter";
import { localLink as link } from "./link";

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
        formatMetric(f.cyclomatic.avg, 6, 10),
        formatMetric(f.cyclomatic.max, 6, 10),
        formatMetric(f.bugs)
    ]);

    const filesTable = new Table({
        columns: columns,
        rows: rows
    });

    return filesTable.toHtml();
}

export default FilesTable;
