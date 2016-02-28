"use strict";

const vscode   = require("vscode");
const analyser = require("./complexity-analyzer");
const reporter = require("./report-builder.js");
const config   = require("./config");
const Output   = require("./output-channel");
const docPresenter = require("./document-presenter");
const FileAnalysis = require("./models/FileAnalysis.js");
const FileReport = require("./report/FileReport.js");

function AnalyseFile(reportFactory) {

    function buildReport(document) {
        const channel = new Output();
        const filePath = vscode.workspace.asRelativePath(document.fileName);

        try {
            channel.write(filePath);

            // const metrics = config.getMetrics();
            // const legend = reporter.getLegend(metrics);
            // channel.write(legend)

            const fileContents = document.getText();
            const analysis = analyser.analyse(fileContents);
            const anal = new FileAnalysis(filePath, analysis);

            // const report = reporter.buildFileReport(analysis, metrics);
            // channel.write(report);

            const report = new FileReport(anal);
            reportFactory.addReport(filePath, report);
        const uri = vscode.Uri.parse(`jsComplexityAnalysis://virtual/${ filePath }`);

        return vscode.commands.executeCommand("vscode.previewHtml", uri, vscode.ViewColumn.Two);
            // docPresenter.showDocument("Complexity analysis of " + filePath, report);
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

    return {
        execute: runAnalysis
    };
}

module.exports = AnalyseFile;
