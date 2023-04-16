// ==UserScript==
// @name         Resi-Verband-Infos
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  shows more information for rettungssimulator.online
// @author       QuCla
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/QuCla/resi-association-information/raw/master/association.infos.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==
'use strict';

var associationTrue = 0
var anchor = 'darkMode';

var VName = 'Grundwert';
var VAnzahl = 0;
var VSharedBuildings = 0;
var VWert = 0;
var VBank = 0;
var VOnline = 0;
var VID = 0;
var drawer = document.createElement('div');

function decideAnchor(){
    let setanchor = 'darkMode';

    if (document.getElementById('scriptManager') != null) {
        setanchor = 'scriptManager';
    }

    return setanchor;
}

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

function editDropdown(){

    anchor = decideAnchor();

    $.ajax({
        url: "/api/association/",
        dataType: "json",
        type : "GET",
        success : function(r) {

            //get values from API
            VName = r.associationName.toLocaleString();
            VAnzahl = r.associationUsers.length;
            VWert = r.associationMuenzenTotal.toLocaleString();
            VSharedBuildings = r.associationSharedBuildings.length;
            VBank = r.associationMuenzenBank.toLocaleString();
            VID = r.associationID.toLocaleString();

            //place association name in header
            let brand = document.getElementsByClassName('brand')[0].lastChild;
            let check = brand.textContent;
            check = check.trim();
            if (check == 'Rettungssimulator'){
                brand.textContent = '';
                }

            let brands = document.getElementsByClassName('brand')[0];
            
            brands.setAttribute('data-tooltip', 'Klicke um zur Verbandsseite zu gelangen.')
            brands.setAttribute('class', 'frame-opener');
            brands.setAttribute('frame', '1/1/4/5');
            brands.setAttribute('frame-url', 'association/'+ VID);
            
            let BrandText = document.createElement('div');
            let BrandLinkLogo = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';

            BrandText.setAttribute('class', 'brand');
            BrandText.innerHTML = VName + "\f" + BrandLinkLogo;

            brands.appendChild(BrandText);

            //Container Verbandsmünzen
            let muenzen = document.createElement('li');
            let I_muenzen = '<i class="fa-solid fa-square-up-right"></i>';
            muenzen.innerHTML = VWert  + ' Münzen' + ' ' /*+ I_muenzen*/;
            muenzen.setAttribute('data-tooltip', 'Anzahl aller Münzen, die Mitglieder verdient haben während sie in diesem Verband waren.')

            //Container Verbandsgebäude
            let gebaude = document.createElement('li');
            let I_gebaude = '<i class="fa-solid fa-building-user"></i>';
            gebaude.innerHTML = VSharedBuildings + ' Gebäude' + ' ' + I_gebaude;
            gebaude.setAttribute('data-tooltip', 'Anzahl der freigegebenen Gebäude im Verband.')
            gebaude.setAttribute('class', 'frame-opener');
            gebaude.setAttribute('frame', '1/1/4/5');
            gebaude.setAttribute('frame-url', 'association/'+ VID +'#sharedBuildings');

            //Container Mitgliederanzahl
            let member = document.createElement('li');
            let I_member = '<i class="fa-solid fa-people-group"></i>';
            member.innerHTML = VAnzahl + ' Mitglieder' + ' ' + I_member;
            member.setAttribute('data-tooltip', 'Die Anzahl an Verbandsmitgliedern.')
            member.setAttribute('class', 'frame-opener');
            member.setAttribute('frame', '1/1/4/5');
            member.setAttribute('frame-url', 'association/'+ VID +'#associationMembers');

            //Container Bank -- Implementierung abwarten --
            /*
            let bank = document.createElement('li');
            let I_bank = '<i class="fa-solid fa-piggy-bank"></i>';
            bank.innerHTML = VBank  + ' Guthaben' + ' ' + I_bank;
            bank.setAttribute('data-tooltip', 'Guthaben welches dem Verband aktuell zur Verfügung steht.')
            */

            //Einschub erstellen in Dropdown-Liste
            drawer.setAttribute('id', 'moreAssociation')
            let pos = document.getElementById(anchor);
            pos.after(drawer);

            //Linie zur Begrenzung
            let line = document.createElement('li');
            line.innerHTML = '<hr>';

            //Kinder anhängen
            drawer.appendChild(line);
            drawer.appendChild(member);
            drawer.appendChild(gebaude);
            //drawer.appendChild(bank);
            drawer.appendChild(muenzen);
        }
    });
}

associationTrue = associationMember();

if (associationTrue == 1){
    setTimeout(editDropdown, 50); // Verzögerung damit Script nach ScriptManager und Codebase läuft
    }
else {

    anchor = decideAnchor();

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
