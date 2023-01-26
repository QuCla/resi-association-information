// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      0.0.6
// @description  shows more information for rettungssimulator.online
// @author       QuCla
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @downloadURL  https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    let VName = 'Grundwert';
    let Einschub = document.createElement('a');

    document.getElementsByClassName('brand')[0].after(Einschub);

    $.ajax({
        url: "/api/association/",
        dataType: "json",
        type : "GET",
        success : function(r) {
            VName = r.associationName.toLocaleString();
            Einschub.innerHTML = VName;
            }
        });
})
();