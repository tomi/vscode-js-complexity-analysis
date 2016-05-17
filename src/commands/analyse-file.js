"use strict";

const vscode   = require("vscode");
const analyser = require("../complexity-analyzer");
const FileAnalysis = require("../models/file-analysis.js");
const FileReport = require("../report/file-report.js");

function AnalyseFile(reportFactory, navigator) {

    function buildReport(document) {
        const filePath = vscode.workspace.asRelativePath(document.fileName);

        const fileContents = document.getText();
        const rawAnalysis = analyser.analyse(fileContents);
        const analysis = new FileAnalysis(filePath, rawAnalysis);

        const report = new FileReport(analysis);
        reportFactory.addReport(filePath, report);

        navigator.navigate(filePath);
    }

    function runAnalysis(editor) {
        try {
            buildReport(editor.document);
        } catch (e) {
            console.log(e);
            vscode.window.showErrorMessage("Failed to analyse file. " + e);
        }
    }

    this.execute = runAnalysis;
}

module.exports = AnalyseFile;
