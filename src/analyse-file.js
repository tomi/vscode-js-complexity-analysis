"use strict";

const vscode   = require("vscode");
const analyser = require("./complexity-analyzer");
const reporter = require("./report-builder.js");
const config   = require("./config");
const Output   = require("./output-channel");

function buildReport(document) {
    const channel = new Output();
    const filePath = vscode.workspace.asRelativePath(document.fileName);

    try {
        channel.write(filePath);

        const metrics = config.getMetrics();
        const legend = reporter.getLegend(metrics);
        channel.write(legend)

        const fileContents = document.getText();
        const analysis = analyser.analyse(fileContents);
        const report = reporter.buildFileReport(analysis, metrics);
        channel.write(report);
    } catch (error) {
        channel.write(`File ${ filePath } analysis failed: ${ error }`);
    }
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
