"use strict";

/**
 * Analysis data for single file
 */
function FileAnalysis(path, analysis) {
    this.path = path;

    this.maintainability = analysis.maintainability;
    this.sloc            = analysis.aggregate.sloc.logical;
    this.cyclomatic      = analysis.aggregate.cyclomatic;
    this.difficulty      = analysis.aggregate.halstead.difficulty
    this.bugs            = analysis.aggregate.halstead.bugs;

    this.functions = analysis.functions.map(f => ({
        name:       f.name,
        params:     f.params,
        sloc:       f.sloc.logical,
        cyclomatic: f.cyclomatic,
        difficulty: f.halstead.difficulty,
        bugs:       f.halstead.bugs
    }));

    Object.freeze(this);
}

module.exports = FileAnalysis;
