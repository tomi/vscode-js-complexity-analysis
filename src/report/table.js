"use strict";

const dot = require("dot");

const tableTemplate = dot.template(`
<table>
    <thead>{{= it.header }}</thead>
    <tbody>{{= it.body }}</tbody>
</table>
`);

const rowTemplate = dot.template(`<tr>{{= it.cells }}</tr>`);

const cellTemplate = dot.template(`<td align="{{= it.align }}">{{= it.value }}</td>`);

function getAlign(column) {
    return column.align || "left";
}

function getCell(align, value) {
    return cellTemplate({ align, value });
}

function buildHeader(columns) {
    const buildCells = () =>
        columns.map((col, i) => getCell(getAlign(col), col.title)).join("");

    return rowTemplate({ cells: buildCells() });
}

function buildRows(rows, columns) {
    const buildCells = cells =>
        cells.map((cell, i) => getCell(getAlign(columns[i]), cell));
    const buildRow = row => rowTemplate({ cells: buildCells(row).join("") });

    return rows.map(buildRow).join("");
}

class HtmlTable {
    constructor(options) {
        this.columns = options.columns;
        this.rows    = options.rows;
    }

    toHtml() {
        return tableTemplate({
            header: buildHeader(this.columns),
            body:   buildRows(this.rows, this.columns)
        });
    }
}

module.exports = HtmlTable;
