"use strict";

function getStyleDefinition(css) {
    return css ? `<style>${ css }</style>` : "";
}

function HtmlBuilder() {
    let styles = "";
    let body = "";

    function appendStyle(css) {
        styles += css;

        return this;
    }

    function appendBody(html) {
        body += html;

        return this;
    }

    function toHtml() {
        return `<html>
    <head>
        ${ getStyleDefinition(styles) }
    </head>
    <body>
        ${ body }
    </body>
</html>`;
    }

    this.appendStyle = appendStyle;
    this.appendBody = appendBody;
    this.toHtml = toHtml;
}

module.exports = HtmlBuilder;
