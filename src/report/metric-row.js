"use strict";

const dot = require("dot");
const metricBox = require("./metric-box")

const template = dot.template(`
<div class="metric-row">{{= it.metrics }}</div>
`);

function MetricRow(metrics) {
    const renderedMetrics = metrics.map(m => metricBox(m)).join("");

    return template({
        metrics: renderedMetrics
    });
}

module.exports = MetricRow;
