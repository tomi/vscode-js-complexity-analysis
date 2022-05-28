"use strict";

import config  from "../config";
import { workspace } from "vscode";
import { join } from "path";

const BASE_URL = `${ config.options.navigation.scheme }://${ config.options.navigation.authority }/`;

function localLink(localUrl, name) {
    const url = BASE_URL + localUrl;
    const href = encodeURI(`command:vscode.previewHtml?${ JSON.stringify(url) }`);

    return `<a href="${ href }">${ name }</a>`;
}

function fileLineLink(name, file, line) {
    const rootPath = workspace.rootPath;
    const href = `file://${ join(rootPath, file) }#L${ line }`;

    return `<a href="${ href }">${ name }</a>`;
}

export default {
    localLink,
    fileLineLink
};
