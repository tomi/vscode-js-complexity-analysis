"use strict";

const vscode   = require("vscode");
const analyser = require("./complexity-analyzer");
const FileAnalysis = require("./models/FileAnalysis.js");
const FileReport = require("./report/FileReport.js");
const Navigator = require("./navigator");

function AnalyseFile(reportFactory) {

    function buildReport(document) {
        const filePath = vscode.workspace.asRelativePath(document.fileName);

        const fileContents = document.getText();
        const rawAnalysis = analyser.analyse(fileContents);
        const analysis = new FileAnalysis(filePath, rawAnalysis);

        const report = new FileReport(analysis);
        reportFactory.addReport(filePath, report);

        Navigator.navigate(filePath);
    }

    function runAnalysis(editor) {
        try {
            buildReport(editor.document);
        } catch (e) {
            console.log(e);
            vscode.window.showErrorMessage("Failed to analyse file. " + e);
        }
    }

    return {
        execute: runAnalysis
    };
}

module.exports = AnalyseFile;
