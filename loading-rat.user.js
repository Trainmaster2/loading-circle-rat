// ==UserScript==
// @name         Loading Rat
// @version      2.1
// @description  Replaces the loading circle with rotating rat on various websites
// @author       Trainmaster2
// @match        *://*.youtube.com/*
// @match        *://*.instructuremedia.com/*
// @match        *://*.canvadocs.instructure.com/*
// @match        *://*.roosterteeth.com/*
// @match        *://*.megacloud.tv/*
// @icon         https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ratURL = "https://i.kym-cdn.com/photos/images/original/002/422/229/cd5.gif";

    const isYouTube      = /^(.*\.)*youtube\.com$/.test(location.hostname);
    const isCanvasVideo  = /^(.*\.)*instructuremedia\.com$/.test(location.hostname);
    const isCanvasDoc    = /^(.*\.)*canvadocs\.instructure\.com$/.test(location.hostname);
    const isRoosterTeeth = /^(.*\.)*roosterteeth\.com$/.test(location.hostname);
    const isAniWatch     = /^(.*\.)*megacloud\.tv$/.test(location.hostname);

    let targetClass, ratClasses, doKidnap, stealClasses = false;
    if (isYouTube) {
        targetClass = "ytp-spinner-container";
        ratClasses = ["ytp-spinner-container"];
    } else if (isCanvasVideo) {
        targetClass = "css-1pisf2f-view-spinner";
        ratClasses = ["css-1pisf2f-view-spinner"];
    } else if (isCanvasDoc) {
        targetClass = "InstUISpinner";
        stealClasses = true;
    } else if (isRoosterTeeth) {
        targetClass = "vjs-loading-spinner";
        ratClasses = ["vjs-loading-spinner"];
        doKidnap = true;
    } else if (isAniWatch) {
        targetClass = "jw-svg-icon-buffer";
        ratClasses = ["jw-svg-icon", "jw-svg-icon-buffer"];
    } else {
        return;
    }

    setInterval(() => {
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
    }, 100)
})();
