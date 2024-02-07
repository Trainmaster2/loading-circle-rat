// ==UserScript==
// @name         Rooster Teeth Rat
// @version      1.2
// @description  Replaces the buffering circle with rotating rat on Rooster Teeth
// @author       Trainmaster2
// @match        *://*.roosterteeth.com/*
// @icon         https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        [...document.getElementsByClassName("vjs-loading-spinner")].filter((buffer) => buffer.tagName !== "IMG").forEach((buffer) => {
            const rat = document.createElement("img");
            rat.src = "https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif";
            rat.classList.add("vjs-loading-spinner");

            buffer.parentElement.replaceChild(rat, buffer);
            while (buffer.childNodes.length > 0) {
                rat.appendChild(buffer.childNodes[0]);
            }
        })
    }, 100)
})();