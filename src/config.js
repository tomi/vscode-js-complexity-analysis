"use strict";

const fsAsync = require("./utils/fs-async");
const path = require("path");
const vscode = require("vscode");
const _ = require("lodash");
const workspace = vscode.workspace;

const CONFIG_BLOCK_NAME = "complexityAnalysis";

const DEFAULT_INCLUDE = "**/*.js";

const navigation = {
    scheme:    "jsComplexityAnalysis",
    authority: "complexity-analysis"
};

/**
 * Returns configured include and exclude patterns
 */
function getIncludeExclude() {
    const extensionConfig = workspace.getConfiguration(CONFIG_BLOCK_NAME);

    const workspaceConfig = _getWorkspaceConfig(extensionConfig);
    if (workspaceConfig) {
        return Promise.resolve(workspaceConfig);
    }

    return _getJsConfigConfig(workspace.rootPath)
        .then(jsconfig => {
            if (jsconfig) {
                return jsconfig;
            }

            return {
                include: [],
                exclude: []
            };
        });
}

function _getWorkspaceConfig(extensionConfig) {
    const hasConfig = extensionConfig.has("include") || extensionConfig.has("exclude");

    if (!hasConfig) {
        return null;
    }

    const include = extensionConfig.get("include");
    const exclude = extensionConfig.get("exclude");

    return {
        include: _.isEmpty(include) ? [DEFAULT_INCLUDE] : include,
        exclude
    };
}

function _getJsConfigConfig(rootPath) {
    const jsconfigFilename = path.join(rootPath, "jsconfig.json");

    return fsAsync.readfile(jsconfigFilename, "utf8")
        .then(fileContents => {
            const jsconfig = JSON.parse(fileContents);
            if (!jsconfig.include && !jsconfig.exclude) {
                return null;
            }

            return {
                include: jsconfig.include || DEFAULT_INCLUDE,
                exclude: jsconfig.exclude || []
            };
        })
        .catch(() => undefined);
}

module.exports = {
    getIncludeExclude,
    options: {
        navigation
    }
};
