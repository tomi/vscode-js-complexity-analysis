"use strict";

function getAlign(column) {
    return column.align || "left";
}

function buildHeader(columns) {
    const getCell = (cell, align) => `<td align="${ align }"><b>${ cell }</b></td>`;
    const buildCells = () =>
        columns.map((col, i) => getCell(col.title, getAlign(col))).join("");

    return `<thead><tr>${ buildCells() }</tr></thead>`;
}

function buildRows(rows, columns) {
    const buildCells = cells =>
        cells.map((cell, i) => `<td align="${ getAlign(columns[i]) }">${ cell }</td>`);
    const buildRow = row => `<tr>${ buildCells(row).join("") }</tr>`;

    return `<tbody>${ rows.map(buildRow).join("") }</tbody>`;
}

class HtmlTable {
    constructor(options) {
        this.columns = options.columns;
        this.rows    = options.rows;
    }

    toHtml() {
        return `
<table id="table">
        ${ buildHeader(this.columns) }
        ${ buildRows(this.rows, this.columns) }
</table>
`;
    }
}

module.exports = HtmlTable;
