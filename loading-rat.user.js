// ==UserScript==
// @name         Loading Rat
// @version      4.2
// @description  Replaces the loading circle with rotating rat on various websites
// @author       Trainmaster2
// @icon         https://github.com/Trainmaster2/loading-circle-rat/raw/master/rat.gif
// @downloadURL  https://github.com/Trainmaster2/loading-circle-rat/raw/master/loading-rat.user.js
// @updateURL    https://github.com/Trainmaster2/loading-circle-rat/raw/master/loading-rat.user.js
// @match        *://*.youtube.com/*
// @match        *://*.instructuremedia.com/*
// @match        *://*.canvadocs.instructure.com/*
// @match        *://*.roosterteeth.com/*
// @match        *://*.megacloud.tv/*
// @match        *://*.static.crunchyroll.com/*
// @run-at       document-start
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
    const isCrunchyroll  = /^(.*\.)*static\.crunchyroll\.com$/.test(location.hostname);

    let bufferSearch = () => []
    let ratClasses   = [];
    let ratStyle     = {};
    let stealClasses = true;
    let doKidnap     = false;
    if (isYouTube) {
        bufferSearch = () => [...document.getElementsByClassName("ytp-spinner-container")]
    } else if (isCanvasVideo) {
        bufferSearch = () => [...document.getElementsByClassName("css-1pisf2f-view-spinner")]
    } else if (isCanvasDoc) {
        bufferSearch = () => [...document.getElementsByClassName("InstUISpinner")]
    } else if (isRoosterTeeth) {
        bufferSearch = () => [...document.getElementsByClassName("vjs-loading-spinner")]
        doKidnap = true;
    } else if (isAniWatch) {
        bufferSearch = () => [...document.getElementsByClassName("jw-svg-icon-buffer")]
    } else if (isCrunchyroll) {
        bufferSearch = () => [...document.getElementsByTagName("div")].filter(x => x.getAttribute("data-testid") === "vilos-loading").map(x => x.lastElementChild)
        ratStyle = {width: "64px", height: "64px"}
    } else {
        return;
    }

    const observer = new MutationObserver(function(mrs) {
        bufferSearch().filter((buffer) => buffer.tagName !== "IMG").forEach((buffer) => {
            const rat = document.createElement("img");
            rat.src = ratURL;
            rat.classList.add(...(stealClasses ? buffer.classList : ratClasses));
            for (let prop in ratStyle) {rat.style.setProperty(prop, ratStyle[prop]);}

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
