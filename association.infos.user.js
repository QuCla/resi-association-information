// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      0.0.2
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
    let neuText = 'Teeeest';
    let Einschub = document.createElement('a');

    document.getElementsByClassName('brand').after(Einschub);

    Einschub.innerHTML = neuText;


    /*let ausgabe = document.createElement("div");
    document.getElementsByClassName("muenzen_marken")[0].after(ausgabe);

    Länge abfragen mit var x = var.length


    $.ajax({
        url: "/api/association/",
        dataType: "json",
        type : "GET",
        success : function(r) {
            var VName = r.associationName.toLocaleString();
            ausgabe.innerHTML= "Verband: " + VName;
            }
        });*/
})
();