"use strict";

const fs       = require("fs");
const vscode   = require("vscode");
const minimatch= require("minimatch");
const analyser = require("./complexity-analyzer");
const reporter = require("./report-builder.js");
const config   = require("./config");
const Output   = require("./output-channel");
const utils    = require("./utils");

function findFiles(include, exclude) {
    return vscode.workspace.findFiles("**/*.js", "**/node_modules/**")
        .then(files => {
            return files.filter(file =>
                utils.none(exclude, pattern => minimatch(file.path, pattern)) &&
                utils.all(include, pattern => minimatch(file.path, pattern)));
        });
}

function buildReport(document) {
    const channel = new Output();

    const metrics = config.getMetrics();
    const legend = reporter.getLegend(metrics);
    channel.write(legend)

    const include = config.getInclude();
    const exclude = config.getExclude();

    return findFiles(include, exclude)
        .then(files => {
            const analysePromises = files.map(file => analyseSingleFile(file, channel, metrics));

            return Promise.all(analysePromises);
        }).then(analyses => {
            return createAggregateReport(analyses, channel, metrics);
        });
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, (error, data) => {
            if (error) {
                return reject(error);
            }

            return resolve(data);
        });
    });
}

function analyseSingleFile(file, channel, metrics) {
    const relativePath = vscode.workspace.asRelativePath(file);

    return readFile(file)
        .then(fileContents => {
            try {
                channel.write(relativePath);
                const analysis = analyser.analyse(fileContents);
                analysis.path = relativePath;
                const report = reporter.buildFileReport(analysis, metrics);
                channel.write(report);

                return analysis;
            } catch (e) {
                channel.write(`File ${ relativePath } analysis failed: ${ e }`);
                return undefined;
            }
        });
}

function createAggregateReport(analyses, channel, metrics) {
    channel.write("Entire project");
    const filtered = analyses.filter(analysis => analysis !== undefined);
    const aggregate = analyser.process(filtered);
    const report = reporter.buildAggregateReport(aggregate, metrics);
    channel.write(report);
}

function runAnalysis(editor) {
    try {
        buildReport(editor.document)
            .then(null, error => handleError(error));
    } catch (e) {
        vscode.window.showErrorMessage("Failed to analyse file. " + error);
        console.log(error);
    }
}

module.exports = {
    execute: runAnalysis
};
