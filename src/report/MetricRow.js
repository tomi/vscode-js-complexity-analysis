"use strict";

const dot = require("dot");
const MetricBox = require("./MetricBox")

const template = dot.template(`
<div class="metric-row">{{= it.metrics }}</div>
`);

function MetricRow(metrics) {
    const renderedMetrics = metrics.map(m => MetricBox(m)).join("");

    return template({
        metrics: renderedMetrics
    });
}

module.exports = MetricRow;
