"use strict";

function getLink(url, name) {
    return `<a onclick="console.log('clicked');
    xhr = new XMLHttpRequest();
    xhr.open('GET', '${ url }', true);
    xhr.send();">${ name }</a>`;

}

module.exports = getLink;
