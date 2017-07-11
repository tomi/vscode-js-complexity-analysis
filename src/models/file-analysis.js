"use strict";

const utils = require("./../utils");

/**
 * Analysis data for single file
 */
function FileAnalysis(path, analysis) {
    this.path = path;

    this.dependencies = analysis.dependencies;

    // Scale to between 0 and 100
    this.maintainability = Math.max(0, analysis.maintainability * 100 / 171);
    this.sloc            = analysis.methodAggregate.sloc.logical;
    this.cyclomatic      = {
        avg: analysis.methodAverage.cyclomatic,
        max: analysis.methodAggregate.cyclomatic
    };
    this.difficulty = analysis.methodAggregate.halstead.difficulty
    this.bugs       = analysis.methodAggregate.halstead.bugs;

    this.functions = analysis.methods.map(f => ({
        name:       f.name,
        line:       f.lineStart,
        params:     f.params,
        sloc:       f.sloc.logical,
        cyclomatic: f.cyclomatic,
        difficulty: f.halstead.difficulty,
        bugs:       f.halstead.bugs
    }));

    Object.freeze(this);
}

module.exports = FileAnalysis;
