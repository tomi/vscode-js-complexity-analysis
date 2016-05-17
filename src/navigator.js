"use strict";

const vscode = require("vscode");

function Navigator(options, reportProvider) {
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
        const uri = vscode.Uri.parse(`${ options.scheme }://${ options.authority }${ path }`);

        const viewColumn = getTargetColumn();

        vscode.commands.executeCommand("vscode.previewHtml", uri, viewColumn)
            .then(() => {}, e => vscode.window.showErrorMessage(e));
        reportProvider.update(uri);
    }

    this.navigate = navigate;
}

module.exports = Navigator;
