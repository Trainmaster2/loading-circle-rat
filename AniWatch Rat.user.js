// ==UserScript==
// @name         AniWatch Rat
// @version      1.2
// @description  Replaces the buffering circle with rotating rat on AniWatch
// @author       Trainmaster2
// @match        *://*.megacloud.tv/*
// @icon         https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        [...document.getElementsByClassName("jw-svg-icon-buffer")].filter((buffer) => buffer.tagName !== "IMG").forEach((buffer) => {
            const rat = document.createElement("img");
            rat.src = "https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif";
            rat.classList.add("jw-svg-icon");
            rat.classList.add("jw-svg-icon-buffer");

            buffer.parentElement.replaceChild(rat, buffer);
        })
    }, 100)
})();