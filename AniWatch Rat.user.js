// ==UserScript==
// @name         AniWatch Rat
// @version      1.1
// @description  Replaces the buffering circle with rotating rat on AniWatch
// @author       Trainmaster2
// @match        *://*.megacloud.tv/*
// @icon         https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const doRat = () => {
        const rat = document.createElement("img");
        rat.src = "https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif";
        rat.classList.add("jw-svg-icon");
        rat.classList.add("jw-svg-icon-buffer");

        const buffer = document.getElementsByClassName("jw-svg-icon-buffer")[0];
        if (buffer) {
            if (buffer.tagName !== "IMG") {
                buffer.parentElement.replaceChild(rat, buffer);
            }
            setTimeout(doRat, 5000);
        } else {
            setTimeout(doRat, 100);
        }
    }

    doRat();
})();