// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      0.7.6
// @description  shows more information for rettungssimulator.online
// @author       QuCla
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==
'use strict';

var anchor = 'darkMode'
var associationTrue = 0

var VName = 'Grundwert';
var VAnzahl = 0;
var VSharedBuildings = 0;
var VWert = 0;
var VBank = 0;
var VOnline = 0;
var Vlink = 'https://rettungssimulator.online/association/95';
var Einschub = document.createElement('div');
var Testen = document.createElement('a');

function associationMember(){
    $.ajax({
        url: "/api/association/",
        dataType: "json",
        type : "GET",
        success : function(r) {            
            VName = r.associationName.toLocaleString();
            if (VName != 'null'){
                associationTrue = 1
        }
    }})
}

function removeparts(){

    //remove mark container
    let marken = document.getElementsByClassName('marken-container frame-opener')[0];
    marken.remove();
    marken = document.getElementsByClassName('muenzen_marken')[0];
    marken = marken.firstChild;
    marken = marken.nextSibling;
    marken = marken.nextSibling;
    marken.remove();
}

function editDropdown(){

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
            let brand = document.getElementsByClassName('brand')[0].lastChild;
            let check = brand.textContent;
            check = check.trim();
            if (check == 'Rettungssimulator'){
                brand.textContent = VName;
                }

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
            add4.innerHTML = VWert  + ' Münzen' + ' ' /*+ pic4*/;
            add4.setAttribute('data-tooltip', 'Anzahl aller Münzen, die Mitglieder verdient haben während sie in diesem Verband waren.')

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

associationMember();
if (associationTrue == 1){
    removeparts();
    setTimeout(editDropdown, 200);
    }
else {
    //youre not association member
    let add6 = document.createElement('li');
    let position6 = document.getElementById(anchor);
    let pic6='<i class="fa-solid fa-circle-xmark"></i>';
    position6.after(add1);
    add6.innerHTML = 'Kein Verband' + ' ' + pic6;
    add6.setAttribute('data-tooltip', 'Du bist noch keinem Verband beigetreten.')


    //place new line
    let add0 = document.createElement('li');
    let position0 = document.getElementById(anchor);
    position0.after(add0);
    add0.innerHTML = '<hr>';
    }
