/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require("lists/lib/underscore");

module.exports = function (beziehungspartner, filterwert, vergleichsoperator) {
    // Wenn Feldname = Beziehungspartner, durch die Partner loopen und nur hinzufügen,
    // wessen Name die Bedingung erfüllt
    var bezPartner = [],
        beurteileFilterkriterien = require('lists/lib/beurteileFilterkriterien');

    if (beziehungspartner && beziehungspartner.length > 0) {
        _.each(beziehungspartner, function (partner) {
            var feldwert = partner.Name.toLowerCase();

            if (beurteileFilterkriterien(feldwert, filterwert, vergleichsoperator)) {
                bezPartner.push(partner);
            }
        });
    }
    return bezPartner;
};