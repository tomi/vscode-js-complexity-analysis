"use strict";

import { workspace, window } from "vscode";
import Analyzer from "../complexity-analyzer";
import FileAnalysis from "../models/file-analysis.js";
import FileReport from "../report/file-report.js";

function AnalyseFile(reportFactory, navigator) {

    function buildReport(document) {
        const filePath = workspace.asRelativePath(document.fileName);

        const fileContents = document.getText();
        const rawAnalysis = Analyzer.analyse(fileContents);
        const analysis = new FileAnalysis(filePath, rawAnalysis);

        const report = new FileReport(analysis, false);
        reportFactory.addReport(filePath, report);

        navigator.navigate(`/${ filePath }`);
    }

    function runAnalysis(editor) {
        try {
            buildReport(editor.document);
        } catch (e) {
            console.log(e);
            window.showErrorMessage("Failed to analyse file. " + e);
        }
    }

    this.execute = runAnalysis;
}

export default AnalyseFile;
