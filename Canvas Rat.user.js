// ==UserScript==
// @name         Canvas Rat
// @version      1.2
// @description  Replaces the buffering circle with rotating rat on Canvas
// @author       Trainmaster2
// @match        *://*.instructuremedia.com/*
// @icon         https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        [...document.getElementsByClassName("css-1pisf2f-view-spinner")].filter((buffer) => buffer.tagName !== "IMG").forEach((buffer) => {
            const rat = document.createElement("img");
            rat.src = "https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif";
            rat.classList.add("css-1pisf2f-view-spinner");

            buffer.parentElement.replaceChild(rat, buffer);
        })
    }, 100)
})();