"use strict";

const _ = require("lodash");
const icons = require("./icons.js");

function formatMetric(value, warningThreshold, errorThreshold) {
    const rounded = _.round(value, 1);

    if (value > errorThreshold) {
        return rounded + " " + icons.error_small;
    } else if (value > warningThreshold) {
        return rounded + " " + icons.warning_small;
    } else {
        return rounded;
    }
}

module.exports = {
    formatMetric
};
