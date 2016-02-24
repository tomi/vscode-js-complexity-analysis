"use strict";

const vscode  = require("vscode");
const analyseFile = require("./analyse-file");
const analyseProject = require("./analyse-project");
const docPresenter = require("./document-presenter");

const registerForEditor = vscode.commands.registerTextEditorCommand;
const register = vscode.commands.registerCommand;

function activate(context) {
	const commands = [
        registerForEditor("complexityAnalysis.analyseFile", analyseFile.execute),
        register("complexityAnalysis.analyseProject", analyseProject.execute)
    ];

    commands.forEach(cmd =>
	   context.subscriptions.push(cmd)
    );

    const registration = docPresenter.register();

    context.subscriptions.push(registration);
}

exports.activate = activate;
