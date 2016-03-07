"use strict";

const http = require("http");
const url  = require("url");
const navigator = require("./navigator");

function Controller() {
    let server = http.createServer(function (req, res) {
        res.end("Navigating to " + req.url);

        navigator.navigate(req.url);
    });

    server.listen(9989);
}

module.exports = Controller;
