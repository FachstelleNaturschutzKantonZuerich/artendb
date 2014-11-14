// wenn .konto_erstellen_btn geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery');

module.exports = function (that) {
    var bsDs = that.id.substring(that.id.length - 2);

    if (bsDs === "rt") {
        bsDs = "art";
    }
    $(".signup").show();
    $(".anmelden_btn").hide();
    $(".abmelden_btn").hide();
    $(".konto_erstellen_btn").hide();
    $(".konto_speichern_btn").show();
    $(".importieren_anmelden_fehler").hide();
    setTimeout(function () {
        $("#Email_" + bsDs).focus();
    }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
};