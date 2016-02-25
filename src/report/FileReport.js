"use strict";

const MetricRow = require("./MetricRow");

const STYLE =
`* {
  font-family: Verdana;
}
.metric-row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.metric {
  margin: 20px;
  width: 260px;
  height: 100px;
  position: relative;
  border: 1px solid #000000;
}
.metric-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
.metric-title {
  font-size: 20px;
  text-align: center;
  line-height: 30px;
}
.metric-title a {
  font-size: 20px;
  color: inherit;
}
.metric-value {
  font-size: 40px;
  text-align: center;
  line-height: 60px;
}
`;

function FileReport(analysis) {
    function toHtml() {
        const metrics = [
            { title: "Maintainability", value: analysis.maintainability, icon: "ok", infoUrl: "https://blogs.msdn.microsoft.com/zainnab/2011/05/26/code-metrics-maintainability-index/" },
            { title: "Lines of code", value: analysis.sloc, icon: "error" },
            { title: "Difficulty", value: analysis.difficulty, icon: "warning" },
            { title: "Estimated # of Bugs", value: analysis.bugs },
        ]

        const head = `<head><link rel="stylesheet" href="https://raw.githubusercontent.com/Microsoft/vscode/0.10.8/src/vs/languages/markdown/common/markdown.css" type="text/css" media="screen"><style>${ STYLE }</style></head>`;
        const body = `<body>${ MetricRow(metrics) }</body>`;

        return `<html>${ head }${ body }</html>`;
    }

    this.toHtml = toHtml;
}

module.exports = FileReport;
