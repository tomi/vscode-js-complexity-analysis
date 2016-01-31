const vscode  = require("vscode");
const command = require("./complexity-command");

function activate(context) {
	const disposable = vscode.commands.registerTextEditorCommand("complexityAnalysis.analyseOne", command.execute);

	context.subscriptions.push(disposable);
}

exports.activate   = activate;
