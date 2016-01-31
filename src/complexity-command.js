"use strict";

const vscode   = require("vscode");
const analyser = require("./complexity-analyzer");

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

function openChannel(name) {
    const channel = vscode.window.createOutputChannel(name);
    channel.clear();

    const viewColumn = getTargetColumn();
    channel.show(viewColumn);

    return channel;
}

function buildReport(document) {
    const fileUri = document.fileName;
    const fileContents = document.getText();
    const result = analyser.analyse(fileContents);

    const channel = openChannel(CHANNEL_NAME);

    channel.appendLine(fileUri);
    channel.appendLine("");
    analyser.buildReport(result, channel);

}

function runAnalysis(editor) {
    try {
        buildReport(editor.document);
    } catch (e) {
        vscode.window.showErrorMessage("Failed to analyse file. Make sure you are analysing a JS file.");
    }
}

module.exports = {
    execute: runAnalysis
};
