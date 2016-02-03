"use strict";

const fs       = require("fs");
const vscode   = require("vscode");
const minimatch= require("minimatch");
const analyser = require("./complexity-analyzer");
const reporter = require("./report-builder.js");
const config   = require("./config");
const Output   = require("./output-channel");

function all(array, cb) {
    return array.reduce((prevVal, currVal) => prevVal && cb(currVal), true);
}

function none(array, cb) {
    return !all(array, cb);
}

function findFiles(include, exclude) {
    return vscode.workspace.findFiles("**/*.js", "**/node_modules/**")
        .then(files => {
            return files.filter(file =>
                none(exclude, pattern => minimatch(file.path, pattern)) &&
                all(include, pattern => minimatch(file.path, pattern)));
        });
}

function buildReport(document) {
    const channel = new Output();

    const metrics = config.getMetrics();
    const legend = reporter.getLegend(metrics);
    channel.write(legend)

    const include = config.getInclude();
    const exclude = config.getExclude();

    findFiles(include, exclude)
        .then(files => {
            const analysePromises = files.map(file => analyseSingleFile(file, channel, metrics));

            return Promise.all(analysePromises)
        }).then(analyses => {
            // TODO: Create aggregate report
            //createAggregateReport(analyses, channel, metrics);
        }, error => {
            handleError(error);
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
    return readFile(file)
        .then(fileContents => {
            const relativePath = vscode.workspace.asRelativePath(file);
            channel.write(relativePath);
            const analysis = analyser.analyse(fileContents);
            analysis.path = relativePath;
            const report = reporter.buildFileReport(analysis, metrics);
            channel.write(report);

            return analysis;
        });
}

function createAggregateReport(analyses, channel, metrics) {
    const aggregate = analyser.process(analyses);
    const report = reporter.buildFileReport(aggregate, metrics);
    channel.write(report);
}

function runAnalysis(editor) {
    try {
        buildReport(editor.document);
    } catch (e) {
        handleError(e);
    }
}

function handleError(error) {
    vscode.window.showErrorMessage("Failed to analyse file. " + e);
    console.log(error);
}

module.exports = {
    execute: runAnalysis
};
