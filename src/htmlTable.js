"use strict";

const tableStyle =
`
table {
    border-collapse: collapse;
	margin:0px;
    padding:0px;
}
table td{
	border:1px solid #000000;
	padding:7px;
	font-weight:normal;
}
table thead td{
	font-weight:bold;
}
`

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
        this.rows = [];
    }

    push(row) {
        this.rows.push(row);
    }

    toString() {
        return `
        <html>
            <head><style>${ tableStyle }</style></head>
            <body>
        <table>
        ${ buildHeader(this.headers, this.colAligns) }
        ${ buildRows(this.rows, this.colAligns) }
        </table></body></html>`;
    }
}

module.exports = HtmlTable;
