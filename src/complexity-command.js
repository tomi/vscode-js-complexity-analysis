"use strict";

const vscode   = require("vscode");
const analyser = require("./complexity-analyzer");
const reporter = require("./report-builder.js");
const config   = require("./config");
const Output   = require("./output-channel");

const CHANNEL_NAME = "Complexity Report";

function getFileRelativePath(document) {
    const fileUri = document.fileName;
    const projectPath = vscode.workspace.rootPath;

    return projectPath ? fileUri.replace(projectPath, "") : fileUri;
}

function buildReport(document) {
    const channel = new Output(CHANNEL_NAME);

    const filePath = getFileRelativePath(document);
    channel.write(filePath);

    const metrics = config.getMetrics();
    const legend = reporter.getLegend(metrics);
    channel.write(legend)

    const fileContents = document.getText();
    const analysis = analyser.analyse(fileContents);
    const report = reporter.buildFileReport(analysis, metrics);
    channel.write(report);
}

function runAnalysis(editor) {
    try {
        buildReport(editor.document);
    } catch (e) {
        vscode.window.showErrorMessage("Failed to analyse file. " + e);
        console.log(e);
    }
}

module.exports = {
    execute: runAnalysis
};
