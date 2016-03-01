"use strict";

const vscode = require("vscode");
const workspace = vscode.workspace;

const CONFIG_BLOCK_NAME = "complexityAnalysis";

const navigation = {
    scheme: "jsComplexityAnalysis",
    authority: "complexity-analysis"
};

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
    const config = workspace.getConfiguration(CONFIG_BLOCK_NAME);

    let metrics = config.get("metrics", DEFAULT_METRICS);
    metrics = Array.isArray(metrics) ? metrics : DEFAULT_METRICS;

    return metrics.filter(m => METRICS.has(m))
        .map(m => METRICS.get(m));
}

/**
 * Returns configured exclude patterns
 */
function getExclude() {
    const extensionConfig = workspace.getConfiguration(CONFIG_BLOCK_NAME);
    const nativeConfig = workspace.getConfiguration("search").get("exclude");

    let exclude = extensionConfig.get("exclude", nativeConfig) || {};

    return objToArray(exclude);
}

/**
 * Returns configured include patterns
 */
function getInclude() {
    const extensionConfig = workspace.getConfiguration(CONFIG_BLOCK_NAME);

    let include = extensionConfig.get("include", {});

    return objToArray(include);
}

function objToArray(obj) {
    let array = [];

    for (let prop in obj) {
        if (obj[prop]) {
            array.push(prop);
        }
    }

    return array;
}

module.exports = {
    getMetrics,
    getInclude,
    getExclude,
    options: {
        navigation
    }
};
