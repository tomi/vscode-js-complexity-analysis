"use strict";

const config = require("./../config.js").options.navigation;
const workspace = require("vscode").workspace;
const path = require("path");

const BASE_URL = `${ config.scheme }://${ config.authority }`;

function localLink(localUrl, name) {
    const url = BASE_URL + localUrl;
    const href = encodeURI(`command:vscode.previewHtml?${ JSON.stringify(url) }`);

    return `<a href="${ href }">${ name }</a>`;
}

function fileLineLink(name, file, line) {
    const rootPath = workspace.rootPath;
    const href = `file:///${ path.join(rootPath, file) }#L${ line }`;

    return `<a href="${ href }">${ name }</a>`;
}

module.exports = {
    localLink,
    fileLineLink
};
