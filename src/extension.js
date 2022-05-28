"use strict";

import Controller from "./controller";

function activate(context) {
    const controller = new Controller(context);

    context.subscriptions.push(controller);
    controller.activate();
}

const _activate = activate;
export { _activate as activate };
