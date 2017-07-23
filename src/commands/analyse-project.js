"use strict";

const fsAsync   = require("../utils/fs-async");
const vscode    = require("vscode");
const analyser  = require("../complexity-analyzer");
const workspace = require("../utils/workspace");

const FileAnalysis    = require("../models/file-analysis.js");
const ProjectAnalysis = require("../models/project-analysis.js");
const FileReport      = require("../report/file-report.js");
const ProjectReport   = require("../report/project-report.js");

function AnalyseProject(reportFactory, navigator) {
    function runAnalysis() {
        try {
            buildReport()
                .then(null, handleError);
        } catch (error) {
            handleError(error);
        }
    }

    function buildReport() {
        return workspace.getWorkspaceFiles()
            .then(files => {
                const analysePromises = files.map(analyseSingleFile);

                return Promise.all(analysePromises);
            })
            .then(createAggregateReport);
    }

    function analyseSingleFile({ fsPath, relativePath }) {
        return fsAsync.readfile(fsPath, "utf8")
            .then(fileContents => {
                try {
                    const rawAnalysis = analyser.analyse(fileContents);
                    const analysis = new FileAnalysis(relativePath, rawAnalysis);

                    const report = new FileReport(analysis);
                    reportFactory.addReport(relativePath, report);

                    return analysis;
                } catch (e) {
                    const errorMsg = `File ${ relativePath } analysis failed: ${ e }`;
                    console.error(errorMsg);
                    return errorMsg;
                }
            })
    }

    function createAggregateReport(analyses, channel, metrics) {
        const projectAnalysis = new ProjectAnalysis();
        const errors = [];

        analyses.forEach(analysis => {
            if (typeof analysis !== "string") {
                projectAnalysis.add(analysis);
            } else {
                errors.push(analysis);
            }
        });

        const aggregate = projectAnalysis.getSummary();

        const report = new ProjectReport(aggregate, errors);
        reportFactory.addReport("/", report);

        navigator.navigate("/");
    }

    function handleError(error) {
        vscode.window.showErrorMessage("Failed to analyse file. " + error);
        console.log(error);
    }

    this.execute = runAnalysis;
}

module.exports = AnalyseProject;
