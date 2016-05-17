"use strict";

const config = require("./../config.js").options.navigation;

const BASE_URL = `${ config.scheme }://${ config.authority }`;

function localLink(localUrl, name) {
    const url = BASE_URL + localUrl;
    const href = encodeURI(`command:vscode.previewHtml?${ JSON.stringify(url) }`);

    return `<a href="${ href }">${ name }</a>`;
}

module.exports = localLink;
