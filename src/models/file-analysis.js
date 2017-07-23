"use strict";

const _ = require("lodash");

/**
 * Analysis data for single file
 */
function FileAnalysis(path, analysis) {
    this.path = path;

    this.dependencies = analysis.dependencies;

    // Scale to between 0 and 100
    this.maintainability = Math.max(0, analysis.maintainability * 100 / 171);
    this.sloc            = analysis.methodAggregate.sloc.logical;

    const functionsMax = _.max(analysis.methods.map(m => m.cyclomatic)) || 0;
    const classMethodsMax = _.max(
        _.flatMap(analysis.classes.map(c => c.methods.map(m => m.cyclomatic)))
    ) || 0;
    this.cyclomatic      = {
        avg: analysis.methodAverage.cyclomatic,
        max: _.max([functionsMax, classMethodsMax])
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

    this.classes = analysis.classes.map(c => ({
        name:       c.name,
        line:       c.lineStart,
        sloc:       c.methodAggregate.sloc.logical,
        difficulty: c.methodAggregate.halstead.difficulty,
        bugs:       c.methodAggregate.halstead.bugs,
        methods:    c.methods.map(method => ({
            name:       method.name,
            line:       method.lineStart,
            params:     method.params,
            sloc:       method.sloc.logical,
            cyclomatic: method.cyclomatic,
            difficulty: method.halstead.difficulty,
            bugs:       method.halstead.bugs
        }))
    }))

    Object.freeze(this);
}

module.exports = FileAnalysis;
