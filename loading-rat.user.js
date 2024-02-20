// ==UserScript==
// @name         Loading Rat
// @version      3.0
// @description  Replaces the loading circle with rotating rat on various websites
// @author       Trainmaster2
// @downloadURL  https://github.com/Trainmaster2/loading-circle-rat/raw/master/loading-rat.user.js
// @updateURL    https://github.com/Trainmaster2/loading-circle-rat/raw/master/loading-rat.user.js
// @match        *://*.youtube.com/*
// @match        *://*.instructuremedia.com/*
// @match        *://*.canvadocs.instructure.com/*
// @match        *://*.roosterteeth.com/*
// @match        *://*.megacloud.tv/*
// @icon         https://github.com/Trainmaster2/loading-circle-rat/raw/master/rat.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ratURL = "https://github.com/Trainmaster2/loading-circle-rat/raw/master/rat.gif";

    const isYouTube      = /^(.*\.)*youtube\.com$/.test(location.hostname);
    const isCanvasVideo  = /^(.*\.)*instructuremedia\.com$/.test(location.hostname);
    const isCanvasDoc    = /^(.*\.)*canvadocs\.instructure\.com$/.test(location.hostname);
    const isRoosterTeeth = /^(.*\.)*roosterteeth\.com$/.test(location.hostname);
    const isAniWatch     = /^(.*\.)*megacloud\.tv$/.test(location.hostname);

    let targetClass  = "";
    let ratClasses   = [];
    let doKidnap     = false;
    let stealClasses = true;
    if (isYouTube) {
        targetClass = "ytp-spinner-container";
    } else if (isCanvasVideo) {
        targetClass = "css-1pisf2f-view-spinner";
    } else if (isCanvasDoc) {
        targetClass = "InstUISpinner";
    } else if (isRoosterTeeth) {
        targetClass = "vjs-loading-spinner";
        doKidnap = true;
    } else if (isAniWatch) {
        targetClass = "jw-svg-icon-buffer";
    } else {
        return;
    }

    const observer = new MutationObserver(function(mrs) {
        [...document.getElementsByClassName(targetClass)].filter((buffer) => buffer.tagName !== "IMG").forEach((buffer) => {
            const rat = document.createElement("img");
            rat.src = ratURL;
            rat.classList.add(...(stealClasses ? buffer.classList : ratClasses));

            buffer.parentElement.replaceChild(rat, buffer);
            if (doKidnap) {
                while (buffer.childNodes.length > 0) {
                    rat.appendChild(buffer.childNodes[0]);
                }
            }
        })
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
