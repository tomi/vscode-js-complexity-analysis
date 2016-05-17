"use strict";

const utils = require("../utils");
const icons = require("./icons.js");

function formatMetric(value, warningThreshold, errorThreshold) {
    const rounded = utils.round(value);

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
