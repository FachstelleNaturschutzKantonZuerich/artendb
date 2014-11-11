// prüft, ob der Benutzer angemeldet ist
// ja: retourniert true
// nein: retourniert false und öffnet die Anmeldung
// welche anmeldung hängt ab, woher die Prüfung angefordert wurde
// darum erwartet die Funktion den parameter woher

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

module.exports = function (woher) {
    var zurueckZurAnmeldung = require('./zurueckZurAnmeldung');

    if (!localStorage.Email) {
        setTimeout(function () {
            zurueckZurAnmeldung(woher);
        }, 600);
        return false;
    }
    return true;
};