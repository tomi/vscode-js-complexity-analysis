"use strict";

const http = require("http");

let port;

function HttpService(router) {
    const server = http.createServer(requestHandler);

    function requestHandler(req, res) {
        console.log("Request for", req.url);
        res.end("Navigating to " + req.url);

        router.navigate(req.url);
    }

    function start() {
        port = server.listen(0).address().port;
        this.port = port;
    }

    function stop() {
        server.stop();
    }

    function getServiceUrl() {
        return `http://localhost:${ this.port }`;
    }

    this.start = start;
    this.stop  = stop;
    this.getServiceUrl = getServiceUrl;

}

module.exports = HttpService;
