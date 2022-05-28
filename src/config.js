"use strict";

import { readFileAsync } from "fs";
import { join } from "path";
import { workspace as _workspace } from "vscode";
import { isEmpty } from "lodash";
const workspace = _workspace;

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

    if (!Array.isArray(include)) {
        throw new Error("complexityAnalysis.include needs to be an array")
    }

    if (!Array.isArray(exclude)) {
        throw new Error("complexityAnalysis.exclude needs to be an array")
    }

    return {
        include: isEmpty(include) ? [DEFAULT_INCLUDE] : include,
        exclude
    };
}

function _getJsConfigConfig(rootPath) {
    const jsconfigFilename = join(rootPath, "jsconfig.json");

    return readFileAsync(jsconfigFilename, "utf8")
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

export default {
    getIncludeExclude,
    options: {
        navigation
    }
};
