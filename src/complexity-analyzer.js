"use strict";

const esprima   = require("esprima");
const walker    = require("escomplex-ast-moz");
const escomplex = require("escomplex");

const LF = "\n";

function analyse(js) {
    const ast = esprima.parse(js, { loc: true });
    const result = escomplex.analyse(ast, walker);

    return result;
}

function buildReport(result, channel) {
    addAggregateStats(result);
    result.functions.forEach(addFunctionStats);

    function addAggregateStats(stats) {
        addStats("", result.aggregate);
        channel.appendLine("");
    }

    function addFunctionStats(functionStats) {
        channel.appendLine(`function ${ functionStats.name } : line ${ functionStats.line }`);
        addStats("  ", functionStats);
        channel.appendLine("");
    }

    function addStats(indent, stats) {
        const subIndent = indent + "   ";

        addStat(indent, "Physical LOC:   ", stats.sloc.physical);
        addStat(indent, "Logical LOC:    ", stats.sloc.logical);
        addStat(indent, "Parameters:     ", stats.params);
        if (stats.maintainability) {
            addStat("", "Maintainability:", stats.maintainability);
        }
        addTitle(indent, "Cyclomatic");
        addStat(subIndent, "Complexity:  ", stats.cyclomatic);
        addStat(subIndent, "Density:     ", stats.cyclomaticDensity);
        addTitle(indent, "Halstead");
        addStat(subIndent, "Difficulty:  ", stats.halstead.difficulty);
        addStat(subIndent, "Volume:      ", stats.halstead.volume);
        addStat(subIndent, "Effort:      ", stats.halstead.effort);
    }

    function round(value, decimals) {
        decimals = decimals || 0;
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    function addTitle(indent, title) {
        channel.appendLine(`${ indent }* ${ title }`);
    }

    function addStat(indent, name, value) {
        const rounded = isFinite(value) ? round(value, 2) : "-";

        channel.appendLine(`${ indent }* ${ name } ${ rounded }`);
    }
}

module.exports = {
    analyse,
    buildReport
};
