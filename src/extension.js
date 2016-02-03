const vscode  = require("vscode");
const command = require("./analyse-file");

function activate(context) {
	const disposable = vscode.commands.registerTextEditorCommand(
        "complexityAnalysis.analyseFile", command.execute);

	context.subscriptions.push(disposable);
}

exports.activate = activate;
