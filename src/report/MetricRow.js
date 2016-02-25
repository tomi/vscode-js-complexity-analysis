"use strict";

const t = require("./template");
const MetricBox = require("./MetricBox")

const template = `
<div class="metric-row">{metrics}</div>
`;

function MetricRow(metrics) {
    const renderedMetrics = metrics.map(m => MetricBox(m)).join("");

    return t(template, {
        metrics: renderedMetrics
    });
}

module.exports = MetricRow;
