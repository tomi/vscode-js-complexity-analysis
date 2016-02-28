"use strict";

function buildHeader(headers, aligns) {
    const buildCells = () =>
        headers.map((cell, i) => `<td bgcolor="#fafafa" align="${ aligns[i] || "left" }"><b>${ cell }</b></td>`).join("");

    return `<thead><tr>${ buildCells() }</tr></thead>`;
}

function buildRows(rows, aligns) {
    const buildCells = cells =>
        cells.map((cell, i) => `<td align="${ aligns[i] || "left" }">${ cell }</td>`);
    const buildRow = row => `<tr>${ buildCells(row).join("") }</tr>`;

    return `<tbody>${ rows.map(buildRow).join("") }</tbody>`;
}

class HtmlTable {
    constructor(options) {
        this.headers   = options.head || [];
        this.colAligns = options.colAligns || [];
        this.rows = options.rows;
    }

    toString() {
        return `
        <table id="table">
        ${ buildHeader(this.headers, this.colAligns) }
        ${ buildRows(this.rows, this.colAligns) }
        </table>
`;
    }
}

module.exports = HtmlTable;
