"use strict";

const vscode = require("vscode");
const options = require("../config").options.navigation;

function HtmlReportProvider(reportFactory) {
    this.provideTextDocumentContent = function(uri) {
        const path = uri.path;

        const report = reportFactory.getReport(path);
        if (report) {
            const html = report.toHtml();
            return html;
        }

        return `Invalid uri ${ uri }`;
    };

    this.register = function() {
        return vscode.workspace.registerTextDocumentContentProvider(options.scheme, this);
    };
}

module.exports = HtmlReportProvider;
