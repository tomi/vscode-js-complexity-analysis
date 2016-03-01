"use strict";

function RowFactory() {
    // Key: report uri as string
    // Value: FileReport
    const reports = new Map();

    function addReport(path, report) {
        reports.set(path, report);
    }

    function getReport(uri) {
        return reports.get(uri);
    }

    this.addReport = addReport;
    this.getReport = getReport;
}

module.exports = RowFactory;
