"use strict";

const vscode = require("vscode");

/**
 *
 */
function HtmlReportProvider(reportFactory, options) {
    const eventEmitter = new vscode.EventEmitter();
    this.scheme = options.scheme;

    function getHtml(path) {
        const report = reportFactory.getReport(path);
        if (report) {
            const html = report.toHtml();
            return html;
        }

        return `Invalid uri ${ uri }`;
    }

    this.provideTextDocumentContent = function(uri) {
        console.log("Html for", uri.path);
        const path = uri.path;

        return getHtml(path);
    };

    this.onDidChange = eventEmitter.event;

    this.update = function(uri) {
        eventEmitter.fire(uri);
    };
}

module.exports = HtmlReportProvider;