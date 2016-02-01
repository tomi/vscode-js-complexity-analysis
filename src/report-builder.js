"use strict";

// ASCII Table
const Table = require("../libs/cli-table");

// Static columns that are always present
const STATIC_COLS = [
    { path: "name", name: "Function" },
    { path: "line", name: "Line" }
];

/**
 * Build report table for given data with given metrics
 */
function buildFileReport(data, metrics) {
    const staticAndMetrics = STATIC_COLS.concat(metrics);

    const headers = staticAndMetrics.map(item => item.name);
    const colAligns = [ "left", "right" ].concat(
        metrics.map(() => "right")
    );

    const table = new Table({
        head:      headers,
        colAligns: colAligns,
        compact: true
    });

    const entireFile = Object.assign({}, data.aggregate, {
        name: "Entire file",
        line: "-"
    });
    table.push(getItemData(entireFile, staticAndMetrics));

    data.functions.forEach(item => table.push(getItemData(item, staticAndMetrics)));

    return table.toString();
}

/**
 * Get legend for given metrics
 */
function getLegend(metrics) {
    return metrics
        .map(m => `${ m.name }: ${ m.description }`)
        .join("\n");
}

/**
 * Returns a row array for given item
 */
function getItemData(item, metrics) {
    return metrics.map(m => get(item, m.path, "-"));
}

// Like in lodash
function get(object, path, defaultValue) {
    path = path.split(".");

    let index = 0;
    let length = path.length;

    while (object != null && index < length) {
        object = object[path[index++]];
    }
    return (index && index == length && object !== undefined) ? object : defaultValue;
}

module.exports = {
    buildFileReport,
    getLegend
};
