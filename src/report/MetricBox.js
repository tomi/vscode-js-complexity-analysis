"use strict";

const t = require("./template");
const utils = require("./../utils.js")

const ICON_OK =
`<svg fill="#2ECC40" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
</svg>`;

const ICON_WARNING =
`<svg fill="#FFDC00" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
</svg>`;

const ICON_ERROR =
`<svg fill="#FF4136" height="24" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
</svg>`;

// const INFO =
// `<svg fill="#0074D9" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
//     <path d="M0 0h24v24H0z" fill="none"/>
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
// </svg>`;

const Icons = {
    ok:      ICON_OK,
    warning: ICON_WARNING,
    error:   ICON_ERROR
};

const template = `
<div class="metric">
    <div class="metric-icon">{icon}</div>
    <div class="metric-value">{value}</div>
    <div class="metric-title">{title}</div>
</div>
`;

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
        return ICON_ERROR;
    } else if (isInRange(metric.warningRange, value)) {
        return ICON_WARNING
    } else {
        return ICON_OK;
    }
}

function MetricBox(options) {
    const metric = options.metric;
    const value = options.value;

    return t(template, {
        icon: getIcon(metric, value),
        value: utils.roundToTwo(value),
        title: getTitle(metric)
    });
}

module.exports = MetricBox;
