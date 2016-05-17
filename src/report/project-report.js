"use strict";

const HtmlBuilder = require("./html-builder");
const metricRow   = require("./metric-row");
const reportStyle = require("./report-style");
const header      = require("./header");
const filesTable  = require("./files-table");

const overviewMetrics = {
    maintainability:
    {
        title: "Average Maintainability",
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
    }
};

function getErrors(errors) {
    return errors.join("<br/>");
}

function buildProjectSummary(htmlBuilder, analysis, errors) {
    const metrics = [
        { metric: overviewMetrics.maintainability, value: analysis.avgMaintainability },
        { metric: overviewMetrics.loc,             value: analysis.totalSloc }
    ];

    htmlBuilder
        .appendBody(header("Summary"))
        .appendBody(metricRow(metrics))
        .appendBody(header("Files"))
        .appendBody(filesTable(analysis));

    if (errors.length > 0) {
        htmlBuilder
            .appendBody(header("Errors"))
            .appendBody(getErrors(errors));
    }
}

function ProjectReport(analysis, errors) {
    function toHtml() {
        const htmlBuilder = new HtmlBuilder();

        htmlBuilder.appendStyle(reportStyle);

        buildProjectSummary(htmlBuilder, analysis, errors);

        return htmlBuilder.toHtml();
    }

    this.toHtml = toHtml;
}

module.exports = ProjectReport;
