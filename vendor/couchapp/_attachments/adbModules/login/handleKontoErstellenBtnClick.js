// wenn .kontoErstellenBtn geklickt wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                     = require('jquery'),
    capitaliseFirstLetter = require('../capitaliseFirstLetter');

module.exports = function (that) {
    var bsDs = that.id.substring(that.id.length - 2);

    if (bsDs === "rt") {
        bsDs = "art";
    }
    $(".signup").show();
    $(".anmeldenBtn").hide();
    $(".abmeldenBtn").hide();
    $(".kontoErstellenBtn").hide();
    $(".kontoSpeichernBtn").show();
    $(".importieren_anmelden_fehler").hide();
    setTimeout(function () {
        $("#email" + capitaliseFirstLetter(bsDs)).focus();
    }, 50);  // need to use a timer so that .blur() can finish before you do .focus()
};