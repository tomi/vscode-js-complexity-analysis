"use strict";

const fs        = require("fs");
const vscode    = require("vscode");
const minimatch = require("minimatch");
const analyser  = require("../complexity-analyzer");
const config    = require("../config");
const utils     = require("../utils");

const FileAnalysis    = require("../models/file-analysis.js");
const ProjectAnalysis = require("../models/project-analysis.js");
const FileReport      = require("../report/file-report.js");
const ProjectReport   = require("../report/project-report.js");

function AnalyseProject(reportFactory, navigator) {
    function findFiles(includePatterns, excludePatterns) {
        return vscode.workspace.findFiles("**/*.js", "**/node_modules/**")
            .then(files => {
                const hasIncludePatterns = includePatterns.length > 0;
                const hasExcludePatterns = excludePatterns.length > 0;

                return files.filter(file => {
                    const include = !hasIncludePatterns ||
                        utils.any(includePatterns, pattern => minimatch(file.path, pattern));
                    const exclude = hasExcludePatterns &&
                        utils.any(excludePatterns, pattern => minimatch(file.path, pattern));

                    return include && !exclude;
                });
            });
    }

    function buildReport() {
        const project = new ProjectAnalysis();

        const include = config.getInclude();
        const exclude = config.getExclude();

        return findFiles(include, exclude)
            .then(files => {
                const analysePromises = files.map(file => analyseSingleFile(file, project));

                return Promise.all(analysePromises);
            }).then(analyses => {
                return createAggregateReport(analyses);
            });
    }

    function readFile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file.fsPath, (error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        });
    }

    function analyseSingleFile(file, project) {
        const relativePath = vscode.workspace.asRelativePath(file);

        return readFile(file)
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
            });
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

    function runAnalysis() {
        try {
            buildReport()
                .then(null, handleError);
        } catch (error) {
            handleError(error);
        }
    }

    this.execute = runAnalysis;
}

module.exports = AnalyseProject;
