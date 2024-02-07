// ==UserScript==
// @name         YouTube Rat
// @version      1.2
// @description  Replaces the buffering circle with rotating rat on YouTube
// @author       Trainmaster2
// @match        *://*.youtube.com/*
// @icon         https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        [...document.getElementsByClassName("ytp-spinner-container")].filter((buffer) => buffer.tagName !== "IMG").forEach((buffer) => {
            const rat = document.createElement("img");
            rat.src = "https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif";
            rat.classList.add("ytp-spinner-container");

            buffer.parentElement.replaceChild(rat, buffer);
        })
    }, 100)
})();