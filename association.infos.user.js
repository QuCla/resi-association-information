// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      0.8.3
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
var delayTime = 300 // Verzugszeit zum Start des Skriptes

var VName = 'Grundwert';
var VAnzahl = 0;
var VSharedBuildings = 0;
var VWert = 0;
var VBank = 0;
var VOnline = 0;
var VID = 0;
var Einschub = document.createElement('div');
var Testen = document.createElement('a');

function associationMember(){
    var answer = 3;
    var VTest = '';
    $.ajax({
        url: "/api/association/",
        dataType: "json",
        type : "GET",
        success : function(r) {
            VTest = r.status;
            }
        })
    if (VTest != 'error'){
        answer = 1;
    return answer;
    }
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
            VID = r.associationID.toLocaleString();

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
            add3.setAttribute('data-tooltip', 'Guthaben welches dem Verband aktuell zur Verfügung steht.')*/

            //place association buildings
            let add2 = document.createElement('li');
            let position2 = document.getElementById(anchor);
            let pic2='<i class="fa-solid fa-building-user"></i>';
            position2.after(add2);
            add2.innerHTML = VSharedBuildings + ' Gebäude' + ' ' + pic2;
            add2.setAttribute('data-tooltip', 'Anzahl der freigegebenen Gebäude im Verband.')
            add2.setAttribute('class', 'frame-opener');
            add2.setAttribute('frame', '1/1/4/5');
            add2.setAttribute('frame-url', 'association/'+ VID +'#sharedBuildings');

            //place association member number
            let add1 = document.createElement('li');
            let position1 = document.getElementById(anchor);
            let pic1='<i class="fa-solid fa-people-group"></i>';
            position1.after(add1);
            add1.innerHTML = VAnzahl + ' Mitglieder' + ' ' + pic1;
            add1.setAttribute('data-tooltip', 'Die Anzahl an Verbandsmitgliedern.')
            add1.setAttribute('class', 'frame-opener');
            add1.setAttribute('frame', '1/1/4/5');
            add1.setAttribute('frame-url', 'association/'+ VID +'#associationMembers');


            //place new line
            let add0 = document.createElement('li');
            let position0 = document.getElementById(anchor);
            position0.after(add0);
            add0.innerHTML = '<hr>';
        }
    });
}

associationTrue = associationMember();

if (associationTrue == 1){
    removeparts();
    setTimeout(editDropdown, delayTime);
    }
else {
    removeparts();

    if (document.getElementById('scriptManager') == null) {
        //alert("The element doesn't exists");
        anchor = 'darkMode';
    }
    else {
        //alert("The element does not exist");
        anchor = 'scriptManager';
    }

    //place association member number
    let add6 = document.createElement('li');
    let position6 = document.getElementById(anchor);
    let pic6='<i class="fa-solid fa-circle-xmark"></i>';
    position6.after(add6);
    add6.innerHTML = 'Kein Verband' + ' ' + pic6;
    add6.setAttribute('data-tooltip', 'Du bist noch keinem Verband beigetreten.')


    //place new line
    let add0 = document.createElement('li');
    let position0 = document.getElementById(anchor);
    position0.after(add0);
    add0.innerHTML = '<hr>';
    }
