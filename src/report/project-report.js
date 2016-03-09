"use strict";

const HtmlBuilder = require("./html-builder");
const metricRow   = require("./metric-row");
const reportStyle = require("./report-style");
const header      = require("./header");
const filesTable  = require("./files-table");

const overviewMetrics = {
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

function getErrors(errors) {
    return errors.join("<br/>");
}

function buildProjectSummary(htmlBuilder, analysis, errors, serviceUrl) {
    const metrics = [
        { metric: overviewMetrics.maintainability, value: analysis.avgMaintainability },
        { metric: overviewMetrics.loc,             value: analysis.totalSloc },
        { metric: overviewMetrics.difficulty,      value: analysis.difficulty },
        { metric: overviewMetrics.bugs,            value: analysis.bugs },
    ];

    htmlBuilder
        .appendBody(header("Summary"))
        .appendBody(metricRow(metrics))
        .appendBody(header("Files"))
        .appendBody(filesTable(analysis, serviceUrl));

    if (errors.length > 0) {
        htmlBuilder
            .appendBody(header("Errors"))
            .appendBody(getErrors(errors));
    }
}

function ProjectReport(analysis, errors, service) {
    function toHtml() {
        const htmlBuilder = new HtmlBuilder();
        const serviceUrl = service.getServiceUrl();

        htmlBuilder.appendStyle(reportStyle);

        buildProjectSummary(htmlBuilder, analysis, errors, serviceUrl);

        return htmlBuilder.toHtml();
    }

    this.toHtml = toHtml;
}

module.exports = ProjectReport;