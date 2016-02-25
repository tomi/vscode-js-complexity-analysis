"use strict";

const vscode  = require("vscode");

const scheme = "jsComplexityAnalysis";

function HtmlReportProvider(reportFactory) {
    this.scheme = scheme;

    this.provideTextDocumentContent = function(uri) {
        const path = uri.path;

        const report = reportFactory.getReport(path);
        if (report) {
            const html = report.toHtml();
            console.log(html);
            return html;
        }

        return `Invalid uri ${ uri }`;
    };

    this.register = function() {
        return vscode.workspace.registerTextDocumentContentProvider(scheme, this);
    }

    this.showDocument = function(path) {
        const uri = vscode.Uri.parse(`${ scheme }://virtual${ path }`);

        return vscode.commands.executeCommand("vscode.previewMarkdown", uri);
    }

}

module.exports = HtmlReportProvider;
