"use strict";

const vscode = require("vscode");

const CHANNEL_NAME = "Complexity Report";

function getTargetColumn() {
    const numOpenEditors = vscode.window.visibleTextEditors.length;

    switch (numOpenEditors) {
        case 0:  return vscode.ViewColumn.One;
        case 1:  return vscode.ViewColumn.Two;
        case 2:  return vscode.ViewColumn.Three;
        case 3:  return vscode.ViewColumn.Three;
        default: return vscode.ViewColumn.One;
    }
}

class OutputChannel {
    constructor() {
        const channel = vscode.window.createOutputChannel(CHANNEL_NAME);
        channel.clear();

        const viewColumn = getTargetColumn();
        channel.show(viewColumn);

        this.channel = channel;
    }

    write(data) {
        this.channel.appendLine(data);
        this.channel.appendLine("");
    }
}

module.exports = OutputChannel;
