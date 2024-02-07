// ==UserScript==
// @name         Rooster Teeth Rat
// @version      1.1
// @description  Replaces the buffering circle with rotating rat on Rooster Teeth
// @author       Trainmaster2
// @match        *://*.roosterteeth.com/*
// @icon         https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const doRat = () => {
        const rat = document.createElement("img");
        rat.src = "https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif";
        rat.classList.add("vjs-loading-spinner")

        const buffer = document.getElementsByClassName("vjs-loading-spinner")[0];
        if (buffer) {
            if (buffer.tagName !== "IMG") {
                buffer.parentElement.replaceChild(rat, buffer);
                while (buffer.childNodes.length > 0) {
                    rat.appendChild(buffer.childNodes[0]);
                }
            }
            setTimeout(doRat, 5000);
        } else {
            setTimeout(doRat, 100);
        }
    }

    doRat();
})();