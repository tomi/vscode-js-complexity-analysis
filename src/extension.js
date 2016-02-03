const vscode  = require("vscode");
const analyseFile = require("./analyse-file");
const analyseProject = require("./analyse-project");

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
}

exports.activate = activate;
