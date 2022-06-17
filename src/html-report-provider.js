"use strict";

import { EventEmitter } from "vscode";

/**
 *
 */
function HtmlReportProvider(reportFactory, options) {
    const eventEmitter = new EventEmitter();
    this.scheme = options.scheme;

    function getHtml(path) {
        const report = reportFactory.getReport(path);
        if (report) {
            const html = report.toHtml();
            return html;
        }

        return `Invalid path ${ path }`;
    }

    this.provideTextDocumentContent = function(uri) {
        // Remove leading slash unless it's alone
        const path = uri.path.replace(/^\//, "") || "/";

        return getHtml(path);
    };

    this.onDidChange = function() {
        return eventEmitter.event;
    };

    this.update = function(uri) {
        eventEmitter.fire(uri);
    };
}

export default HtmlReportProvider;
