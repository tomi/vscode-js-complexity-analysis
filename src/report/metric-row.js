"use strict";

import { template as _template } from "dot";
import metricBox from "./metric-box";

const template = _template(`
<div class="metric-row">{{= it.metrics }}</div>
`);

function MetricRow(metrics) {
    const renderedMetrics = metrics.map(m => metricBox(m)).join("");

    return template({
        metrics: renderedMetrics
    });
}

export default MetricRow;
