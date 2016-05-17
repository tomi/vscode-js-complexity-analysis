"use strict";

function calculateAverages(analyses) {
    const result = {};
    const sum = {
        sloc: 0,
        cyclomatic: 0,
        maintainability: 0
    };
    const metrics = Object.keys(sum);
    const divisor = analyses.length || 1;

    analyses.forEach(analysis => {
        metrics.forEach(metric => {
            sum[metric] += analysis[metric];
        });
    });

    metrics.forEach(metric => {
        result[metric] = sum[metric] / divisor;
    });

    return result;
}

function calculateTotalSloc(analyses) {
    return analyses.reduce((sum, analysis) => sum + analysis.sloc, 0);
}

function ProjectAnalysis() {
    const analyses = [];

    this.add = function(analysis) {
        analyses.push(analysis);
    }

    this.getSummary = function() {
        const totalSloc = calculateTotalSloc(analyses);
        const averages  = calculateAverages(analyses);

        return {
            totalSloc:          totalSloc,
            avgSloc:            averages.sloc,
            avgMaintainability: averages.maintainability,
            avgCyclomatic:      averages.cyclomatic,
            fileAnalyses:       analyses
        };
    }
}

module.exports = ProjectAnalysis;
