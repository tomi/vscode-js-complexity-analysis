"use strict";

const vscode = require("vscode");
const workspace = vscode.workspace;

const scheme = "jsComplexityAnalysis";

const router = (function SingleDocumentRouter() {
    let document = null;

    function register() {
        return workspace.registerTextDocumentContentProvider(scheme, this);
    }

    function provideTextDocumentContent(uri) {
        return document;
    }

    function showDocument(path, doc) {
        document = doc;
        const uri = vscode.Uri.parse(`${ scheme }://virtual/${ path }`);

        return vscode.commands.executeCommand("vscode.previewHtml", uri);
    }

    return {
        register,
        provideTextDocumentContent,
        showDocument
    };
})();

module.exports = router;
