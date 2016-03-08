"use strict";

const vscode  = require("vscode");
const Controller = require("./controller");

function activate(context) {
    const controller = new Controller(context);

    context.subscriptions.push(controller);
    controller.activate();
}

exports.activate = activate;
