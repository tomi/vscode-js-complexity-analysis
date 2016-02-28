"use strict";

const MetricRow = require("./MetricRow");
const Table = require("./Table");
const ReportStyle = require("./ReportStyle");

const Metrics = {
    maintainability:
    {
        title: "Maintainability",
        description: "Value between 0 and 100. Represents the relative ease of maintaining the code. A high value means better maintainability.",
        errorRange: [0, 10],
        warningRange: [10, 20],
        infoUrl: "https://blogs.msdn.microsoft.com/zainnab/2011/05/26/code-metrics-maintainability-index/"
    },
    loc:
    {
        title: "Lines of code",
        description: "Logical number of source lines of code.",
        infoUrl: "https://en.wikipedia.org/wiki/Source_lines_of_code"
    },
    difficulty:
    {
        title: "Difficulty",
        description: "How difficult it is to write or understand the program.",
        errorRange: [60, 9999],
        warningRange: [30, 60],
        infoUrl: "https://en.wikipedia.org/wiki/Halstead_complexity_measures"
    },
    bugs:
    {
        title: "Estimated # of Bugs",
        description: "Estimate for the number of errors in the implementation.",
        errorRange: [60, 9999],
        warningRange: [30, 60],
        infoUrl: "https://en.wikipedia.org/wiki/Halstead_complexity_measures"
    },
};

function buildBody(analysis) {
    const metrics = [
        { metric: Metrics.maintainability, value: analysis.maintainability },
        { metric: Metrics.loc,             value: analysis.sloc },
        { metric: Metrics.difficulty,      value: analysis.difficulty },
        { metric: Metrics.bugs,            value: analysis.bugs },
    ];

    const summary = MetricRow(metrics);
    const table   = new Table({
        head: [ "Function", "Line", "Complexity" ],
        colAligns: [ "left", "right", "right" ],
        rows: analysis.functions.map(f => [f.name, f.line, f.cyclomatic])
    });

    return `<body>${ summary } ${ table }</body>`;
}

function FileReport(analysis) {
    function toHtml() {
        const head = `<head><style>${ ReportStyle }</style></head>`;

        const body = buildBody(analysis);

        return `<html>${ head }${ body }</html>`;
    }

    this.toHtml = toHtml;
}

module.exports = FileReport;
