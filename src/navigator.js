"use strict";

const vscode = require("vscode");
const options = require("./config").options.navigation;

const CHANNEL_NAME = "Complexity Report";

function getTargetColumn() {
    const numOpenEditors = vscode.window.visibleTextEditors.length;

    switch (numOpenEditors) {
        case 0:  return vscode.ViewColumn.One;
        case 1:  return vscode.ViewColumn.Two;
        case 2:  return vscode.ViewColumn.Three;
        case 3:  return vscode.ViewColumn.Three;
        default: return vscode.ViewColumn.One;
    }
}

function navigate(path) {
    if (path.startsWith("/")) {
        path = path.substring(1);
    }

    const uri = vscode.Uri.parse(`${ options.scheme }://${ options.authority }/${ path }`);

    const viewColumn = getTargetColumn();

    return vscode.commands.executeCommand("vscode.previewHtml", uri, viewColumn);
}

module.exports = {
    navigate
};
