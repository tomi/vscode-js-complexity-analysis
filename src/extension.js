"use strict";

const Controller = require("./controller");

function activate(context) {
    const controller = new Controller(context);

    context.subscriptions.push(controller);
    controller.activate();
}

exports.activate = activate;
