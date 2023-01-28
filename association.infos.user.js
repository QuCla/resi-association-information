// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  shows more information for rettungssimulator.online
// @author       QuCla
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @downloadURL  https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==


'use strict';
//Todo
/*
    Auslesen von VWert fixen
    später einmal die werte in den Verbandsdropdown umziehen
    Verbandsname ersetzt rettungsimulator schriftzug
    Andere Aufhängung als sciptmanager, oder abfrage zuvor an welchem element

*/
var VName = 'Grundwert';
var VAnzahl = 0;
var VSharedBuildings = 0;
var VWert = 0;
var VBank = 0;
var Vlink = 'https://rettungssimulator.online/association/95';
var Einschub = document.createElement('div');
var Testen = document.createElement('a');


$.ajax({
    url: "/api/association/",
    dataType: "json",
    type : "GET",
    success : function(r) {
        //place association name in header
        VName = r.associationName.toLocaleString();
        document.getElementsByClassName('brand')[0].after(Einschub);
        Einschub.innerHTML = VName;

        //get values from API
        VAnzahl = r.associationUsers.length;
        //VWert = r.associationMuenzenTotal.loLocaleString();
        VSharedBuildings = r.associationSharedBuildings.length;
        VBank = r.associationMuenzenBank.toLocaleString();

        //place association bank amount
        let add4 = document.createElement('li');
        let position4 = document.getElementById('scriptManager');
        position4.after(add4);
        add4.innerHTML = VWert  + ' Verbandswert';

        //place association bank amount
        let add3 = document.createElement('li');
        let position3 = document.getElementById('scriptManager');
        position3.after(add3);
        add3.innerHTML = VBank  + ' Guthaben';

        //place association buildings
        let add2 = document.createElement('li');
        let position2 = document.getElementById('scriptManager');
        position2.after(add2);
        add2.innerHTML = VSharedBuildings + ' Gebäude';

        //place association member number
        let add1 = document.createElement('li');
        let position1 = document.getElementById('scriptManager');
        position1.after(add1);
        add1.innerHTML = VAnzahl + ' Verbandsmitglieder';

        //place new line
        let add0 = document.createElement('li');
        let position0 = document.getElementById('scriptManager');
        position0.after(add0);
        add0.innerHTML = '<hr>';
    }
});
