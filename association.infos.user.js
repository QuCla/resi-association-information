// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      0.0.1
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
    //var ausgabe = document.createElement("div");
    var div = document.createElement('div');
    div.className = 'TEST';
    var text = document.createTextNode('TEST');
    div.appendChild(text);
    document.header.appendChil(div);
    //document.getElementsByClassName("muenzen_marken")[0].after(ausgabe);

    $.ajax({
        url: "/api/association/",
        dataType: "json",
        type : "GET",
        success : function(r) {
            var VName = r.associationName.toLocaleString();
            ausgabe.innerHTML= "Verband: " + VName;
            }
        });
})
();