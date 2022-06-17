"use strict";

import { commands, workspace } from "vscode";

import config from "./config";
import Navigator from "./navigator";
import ReportFactory from "./report-factory";
import HtmlReportProvider from "./html-report-provider";
import AnalyseFileCommand from "./commands/analyse-file";
import AnalyseProjectCommand from "./commands/analyse-project";

const AnalyseFileCmdName    = "complexityAnalysis.analyseFile";
const AnalyseProjectCmdName = "complexityAnalysis.analyseProject";

function Controller(context) {
    const reportFactory     = new ReportFactory();
    const reportProvider    = new HtmlReportProvider(reportFactory, config.options.navigation);
    const navigator         = new Navigator(config.options.navigation, reportProvider);
    const cmdAnalyseFile    = new AnalyseFileCommand(reportFactory, navigator);
    const cmdAnalyseProject = new AnalyseProjectCommand(reportFactory, navigator);

    function activate() {
        context.subscriptions.push(
            commands.registerTextEditorCommand(
                AnalyseFileCmdName, cmdAnalyseFile.execute));

        context.subscriptions.push(
            commands.registerCommand(
                AnalyseProjectCmdName, cmdAnalyseProject.execute));

        context.subscriptions.push(
            workspace.registerTextDocumentContentProvider(
                config.options.navigation.scheme, reportProvider));
    }

    function dispose() {
    }

    this.activate = activate;
    this.dispose = dispose;
}

export default Controller;
