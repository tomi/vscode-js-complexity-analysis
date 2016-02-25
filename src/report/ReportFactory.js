"use strict";

function RowFactory() {
    // Key: report uri as string
    // Value: FileReport
    const reports = new Map();
    let r = null;

    function addReport(path, report) {
        r = report;
        reports.set(path, report);
    }

    function getReport(uri) {
        return r;
        return reports.get(uri);
    }

    this.addReport = addReport;
    this.getReport = getReport;
}

module.exports = RowFactory;
