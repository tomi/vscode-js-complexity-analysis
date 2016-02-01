"use strict";

const vscode = require("vscode");

const CONFIG_BLOCK_NAME = "complexityAnalysis";

// Default metrics to use
const DEFAULT_METRICS = [
    "params",
    "cyclomatic",
    "logicalLOC"
];

// All supported metrics
const METRICS = new Map([
    [ "cyclomatic", {
        path: "cyclomatic",
        name: "CC",
        description: "Cyclomatic complexity"
    } ],
    [ "physicalLOC", {
        path: "sloc.physical",
        name: "PLOC",
        description: "Physical lines of code"
    } ],
    [ "logicalLOC", {
        path: "sloc.logical",
        name: "LLOC",
        description: "Logical lines of code"
    } ],
    [ "params", {
        path: "params",
        name: "Pa",
        description: "Number of parameters"
    } ],
    [ "cyclomaticDensity", {
        path: "cyclomaticDensity",
        name: "CD",
        description: "Cyclomatic density"
    } ],
    [ "halsteadDifficulty", {
        path: "halstead.difficulty",
        name: "HD",
        description: "Halstead difficulty"
    } ],
    [ "halsteadVolume", {
        path: "halstead.volume",
        name: "HV",
        description: "Halstead volume"
    } ],
    [ "halsteadEffort", {
        path: "halstead.effort",
        name: "HE",
        description: "Halstead effort"
    } ],
]);

/**
 * Returns configured metrics or default metrics if none configured
 */
function getMetrics() {
    const config = vscode.workspace.getConfiguration(CONFIG_BLOCK_NAME);

    let metrics = config.get("metrics", DEFAULT_METRICS);
    metrics = Array.isArray(metrics) ? metrics : DEFAULT_METRICS;

    return metrics.filter(m => METRICS.has(m))
        .map(m => METRICS.get(m));
}

module.exports = {
    getMetrics
};
