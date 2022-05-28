"use strict";

import { max as _max, flatMap } from "lodash";

/**
 * Analysis data for single file
 */
function FileAnalysis(path, analysis) {
    this.path = path;

    this.dependencies = analysis.dependencies;

    // Scale to between 0 and 100
    this.maintainability = Math.max(0, analysis.maintainability * 100 / 171);
    this.sloc            = analysis.aggregate.sloc.logical;

    const functionsMax = _max(analysis.methods.map(m => m.cyclomatic)) || 0;
    const classMethodsMax = _max(
        flatMap(analysis.classes.map(c => c.methods.map(m => m.cyclomatic)))
    ) || 0;
    this.cyclomatic      = {
        avg: analysis.methodAverage.cyclomatic,
        max: _max([functionsMax, classMethodsMax])
    };
    this.difficulty = analysis.aggregate.halstead.difficulty
    this.bugs       = analysis.aggregate.halstead.bugs;

    this.functions = analysis.methods.map(f => ({
        name:       f.name,
        line:       f.lineStart,
        params:     f.paramCount,
        sloc:       f.sloc.logical,
        cyclomatic: f.cyclomatic,
        difficulty: f.halstead.difficulty,
        bugs:       f.halstead.bugs
    }));

    this.classes = analysis.classes.map(c => ({
        name:       c.name,
        line:       c.lineStart,
        sloc:       c.aggregate.sloc.logical,
        difficulty: c.aggregate.halstead.difficulty,
        bugs:       c.aggregate.halstead.bugs,
        methods:    c.methods.map(method => ({
            name:       method.name,
            line:       method.lineStart,
            params:     method.paramCount,
            sloc:       method.sloc.logical,
            cyclomatic: method.cyclomatic,
            difficulty: method.halstead.difficulty,
            bugs:       method.halstead.bugs
        }))
    }))

    Object.freeze(this);
}

export default FileAnalysis;
