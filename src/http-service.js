"use strict";

const http = require("http");

function HttpService(router) {
    const server = http.createServer(requestHandler);

    function requestHandler(req, res) {
        console.log("Request for", req.url);
        res.end("Navigating to " + req.url);

        router.navigate(req.url);
    }

    function start() {
        this.port = server.listen(0).address().port;
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