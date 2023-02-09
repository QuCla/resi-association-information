// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  shows more information for rettungssimulator.online
// @author       QuCla
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @downloadURL  https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==
'use strict';

var anchor = 'darkMode'

var VName = 'Grundwert';
var VAnzahl = 0;
var VSharedBuildings = 0;
var VWert = 0;
var VBank = 0;
var VOnline = 0;
var Vlink = 'https://rettungssimulator.online/association/95';
var Einschub = document.createElement('div');
var Testen = document.createElement('a');


function readAssociation(){

    if (document.getElementById('scriptManager') == null) {
        //alert("The element doesn't exists");
        anchor = 'darkMode';
    }
    else {
        //alert("The element does not exist");
        anchor = 'scriptManager';
    }

    $.ajax({
        url: "/api/association/",
        dataType: "json",
        type : "GET",
        success : function(r) {
            //place association name in header
            VName = r.associationName.toLocaleString();
            //document.getElementsByClassName('brand')[0].after(Einschub);
            //Einschub.innerHTML = VName;
            let brand = document.getElementsByClassName('brand')[0];
            brand.innerText = VName;

            //get values from API
            VAnzahl = r.associationUsers.length;
            VWert = r.associationMuenzenTotal.toLocaleString();
            VSharedBuildings = r.associationSharedBuildings.length;
            VBank = r.associationMuenzenBank.toLocaleString();

            //place association credits earned
            let add4 = document.createElement('li');
            let position4 = document.getElementById(anchor);
            let pic4='<i class="fa-solid fa-square-up-right"></i>';
            position4.after(add4);
            add4.innerHTML = VWert  + ' Münzen' + ' ' + pic4;
            add4.setAttribute('data-tooltip', 'Anzahl aller Münzen, die Mitglieder selbst verdient haben während sie in diesem Verband waren.')

            //place association bank amount
            /*let add3 = document.createElement('li');
            let position3 = document.getElementById(anchor);
            let pic3='<i class="fa-solid fa-piggy-bank"></i>';
            position3.after(add3);
            add3.innerHTML = VBank  + ' Guthaben' + ' ' + pic3;
            add3.setAttribute('data-tooltip', 'Guthaben welches dem Verband zur Verfügung steht.')*/

            //place association buildings
            let add2 = document.createElement('li');
            let position2 = document.getElementById(anchor);
            let pic2='<i class="fa-solid fa-building-user"></i>';
            position2.after(add2);
            add2.innerHTML = VSharedBuildings + ' Gebäude' + ' ' + pic2;
            add2.setAttribute('data-tooltip', 'Anzahl der freigegebenen Gebäude im Verband.')
            add2.setAttribute('class', 'frame-opener');
            add2.setAttribute('frame', '1/1/4/5');
            add2.setAttribute('frame-url', 'association/95#sharedBuildings');

            /*
            //Klappt nicht, die Kachel muss dafür aufgerufen werden, im Standard HTML nicht enthalten
            //Zyklsiche Abfrage einführen, wenn klappt
            VOnline = document.getElementsByClassName('element-card-image element-card-image-text bg-success').innerText;
            let add5 = document.createElement('li');
            let position5 = document.getElementById(anchor);
            let pic5='<i class="fa-solid fa-signal"></i>';
            position0.after(add5);
            add5.innerHTML = VOnline + ' Online' + ' ' + pic5;
            add1.setAttribute('data-tooltip', 'So viele Verbandsmitgliedern sind gerade online.')*/


            //place association member number
            let add1 = document.createElement('li');
            let position1 = document.getElementById(anchor);
            let pic1='<i class="fa-solid fa-people-group"></i>';
            position1.after(add1);
            add1.innerHTML = VAnzahl + ' Mitglieder' + ' ' + pic1;
            add1.setAttribute('data-tooltip', 'Die Anzahl an Verbandsmitgliedern.')
            add1.setAttribute('class', 'frame-opener');
            add1.setAttribute('frame', '1/1/4/5');
            add1.setAttribute('frame-url', 'association/95#associationMembers');


            //place new line
            let add0 = document.createElement('li');
            let position0 = document.getElementById(anchor);
            position0.after(add0);
            add0.innerHTML = '<hr>';
        }
    });
}


setTimeout(readAssociation, 2000);