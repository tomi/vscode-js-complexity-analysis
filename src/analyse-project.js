"use strict";

const fs       = require("fs");
const vscode   = require("vscode");
const minimatch= require("minimatch");
const analyser = require("./complexity-analyzer");
const reporter = require("./report-builder.js");
const config   = require("./config");
const Output   = require("./output-channel");
const utils    = require("./utils");
const FileAnalysis = require("./models/FileAnalysis.js");
const ProjectAnalysis = require("./models/ProjectAnalysis.js");
const FileReport = require("./report/FileReport.js");
const ProjectReport = require("./report/ProjectReport.js");
const Navigator = require("./navigator");

function AnalyseProject(reportFactory) {
    function findFiles(include, exclude) {
        return vscode.workspace.findFiles("**/*.js", "**/node_modules/**")
            .then(files => {
                return files.filter(file =>
                    utils.none(exclude, pattern => minimatch(file.path, pattern)) &&
                    utils.all(include, pattern => minimatch(file.path, pattern)));
            });
    }

    function buildReport(document) {
        // const metrics = config.getMetrics();
        // const legend = reporter.getLegend(metrics);
        // channel.write(legend)
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
                    // project.add(analysis);

                    const report = new FileReport(analysis);
                    reportFactory.addReport(relativePath, report);
                    // const report = reporter.buildFileReport(analysis, metrics);
                    // channel.write(report);

                    return analysis;
                } catch (e) {
                    console.error(`File ${ relativePath } analysis failed: ${ e }`);
                    return undefined;
                }
            });
    }

    function createAggregateReport(analyses, channel, metrics) {
        const projectAnalysis = new ProjectAnalysis();

        analyses.filter(analysis => analysis !== undefined)
            .forEach(x => projectAnalysis.add(x));
        const aggregate = projectAnalysis.getSummary();

        const report = new ProjectReport(aggregate);
        reportFactory.addReport("/.", report);

        Navigator.navigate(".");
        // channel.write(report);
    }

    function handleError(error) {
        vscode.window.showErrorMessage("Failed to analyse file. " + error);
        console.log(error);
    }

    function runAnalysis(editor) {
        try {
            buildReport(editor.document)
                .then(null, handleError);
        } catch (error) {
            handleError(error);
        }
    }

    return {
        execute: runAnalysis
    };
}

module.exports = AnalyseProject;
