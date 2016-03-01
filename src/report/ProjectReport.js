"use strict";

const HtmlBuilder    = require("./HtmlBuilder");
const MetricRow      = require("./MetricRow");
const ReportStyle    = require("./ReportStyle");
const Header         = require("./Header");
const FilesTable = require("./FilesTable");

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

function buildProjectSummary(htmlBuilder, analysis) {
    const metrics = [
        { metric: overviewMetrics.maintainability, value: analysis.avgMaintainability },
        { metric: overviewMetrics.loc,             value: analysis.totalSloc },
        { metric: overviewMetrics.difficulty,      value: analysis.difficulty },
        { metric: overviewMetrics.bugs,            value: analysis.bugs },
    ];

    htmlBuilder
        .appendBody(Header("Summary"))
        .appendBody(MetricRow(metrics))
        .appendBody(Header("Files"))
        .appendBody(FilesTable(analysis));
}

function ProjectReport(analysis) {
    function toHtml() {
        const htmlBuilder = HtmlBuilder();

        htmlBuilder.appendStyle(ReportStyle);

        buildProjectSummary(htmlBuilder, analysis);

        return htmlBuilder.toHtml();
    }

    this.toHtml = toHtml;
}

module.exports = ProjectReport;
