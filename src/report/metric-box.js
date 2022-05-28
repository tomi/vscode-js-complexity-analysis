"use strict";

import { round } from "lodash";
import { template as _template } from "dot";
import { error, warning } from "./icons";

const template = _template(`
<div class="metric">
    <div class="metric-icon">{{= it.icon }}</div>
    <div class="metric-value">{{= it.value }}</div>
    <div class="metric-title">{{= it.title }}</div>
</div>
`);

function getTitle(metric) {
    const url         = metric.infoUrl;
    const title       = metric.title;
    const description = metric.description || "";

    return url ?
        `<a href="${ url }" target="_blank" title="${ description }">${ title }</a>` :
        `<span title="${ description }">${ title }</span>`;
}

function isInRange(range, value) {
    if (Array.isArray(range)) {
        return range[0] <= value && value < range[1];
    } else {
        return false;
    }
}

function getIcon(metric, value) {
    if (isInRange(metric.errorRange, value)) {
        return error;
    } else if (isInRange(metric.warningRange, value)) {
        return warning
    } else {
        return "";
    }
}

/**
 * @param  {any} options:
 * - metric: Metric to show
 *   - title
 *   - description (optional)
 *   - infoUrl (optional)
 *   - errorRange (optional)
 *   - warningRange (optional)
 * - value: Value of the metric
 */
function MetricBox(options) {
    const metric = options.metric;
    const value  = options.value;

    return template({
        icon:  getIcon(metric, value),
        value: round(value, 1),
        title: getTitle(metric)
    });
}

export default MetricBox;
