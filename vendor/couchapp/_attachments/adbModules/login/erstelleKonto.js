/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (woher) {
    var passeUiFuerAngemeldetenUserAn = require('./passeUiFuerAngemeldetenUserAn'),
        bearbeiteLrTaxonomie          = require('../lr/bearbeiteLrTaxonomie');

    // User in _user eintragen
    $.couch.signup({
        name: $('#email' + capitaliseFirstLetter(woher)).val()
    }, $('#passwort' + capitaliseFirstLetter(woher)).val(), {
        success: function () {
            localStorage.Email = $('#email' + capitaliseFirstLetter(woher)).val();
            if (woher === "art") {
                bearbeiteLrTaxonomie();
            }
            passeUiFuerAngemeldetenUserAn(woher);
            // Werte aus Feldern entfernen
            $("#email" + capitaliseFirstLetter(woher)).val("");
            $("#passwort" + capitaliseFirstLetter(woher)).val("");
            $("#passwort2" + capitaliseFirstLetter(woher)).val("");
        },
        error: function () {
            var praefix = "importieren";
            if (woher === "art") {
                praefix = "";
            }
            $("#" + praefix + capitaliseFirstLetter(woher) + "AnmeldenFehlerText").html("Fehler: Das Konto wurde nicht erstellt");
            $("#" + praefix + capitaliseFirstLetter(woher) + "AnmeldenFehler")
                .alert()
                .show();
        }
    });
};