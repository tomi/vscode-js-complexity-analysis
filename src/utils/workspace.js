"use strict";

import config from "../config";
import { workspace } from "vscode";

/**
 * Returns files in the workspace by taking include and
 * exclude pattern into consideration
 *
 * @returns {Uri}
 */
function getWorkspaceFiles() {
    return config.getIncludeExclude()
        .then(({ include, exclude }) => {
            const includePattern = _createGlob(include);
            const excludePattern = _createGlob(exclude);

            return workspace.findFiles(includePattern, excludePattern);
        })
        .then(files => files.map(fileUri => ({
            fsPath: fileUri.fsPath,
            relativePath: workspace.asRelativePath(fileUri)
        })));
}

function _createGlob(patterns) {
  switch (patterns.length) {
    case 0:
      return "";
    case 1:
      return patterns[0];
    default:
      return `{${ patterns.join(",") }}`;
  }
};

export default {
    getWorkspaceFiles
}