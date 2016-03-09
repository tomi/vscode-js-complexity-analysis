"use strict";

const vscode = require("vscode");
const workspace = vscode.workspace;

const CONFIG_BLOCK_NAME = "complexityAnalysis";

const navigation = {
    scheme:    "jsComplexityAnalysis",
    authority: "complexity-analysis"
};

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
    getInclude,
    getExclude,
    options: {
        navigation
    }
};
