"use strict";

import { readFileAsync } from "fs";
import { window } from "vscode";
import { analyse } from "../complexity-analyzer";
import { getWorkspaceFiles } from "../utils/workspace";

import FileAnalysis from "../models/file-analysis.js";
import ProjectAnalysis from "../models/project-analysis.js";
import FileReport from "../report/file-report.js";
import ProjectReport from "../report/project-report.js";

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
        return getWorkspaceFiles()
            .then(files => {
                const analysePromises = files.map(analyseSingleFile);

                return Promise.all(analysePromises);
            })
            .then(createAggregateReport);
    }

    function analyseSingleFile({ fsPath, relativePath }) {
        return readFileAsync(fsPath, "utf8")
            .then(fileContents => {
                try {
                    const rawAnalysis = analyse(fileContents);
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
        window.showErrorMessage("Failed to analyse file. " + error);
        console.log(error);
    }

    this.execute = runAnalysis;
}

export default AnalyseProject;
