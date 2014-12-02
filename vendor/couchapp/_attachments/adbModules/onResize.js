// wenn Fenstergrösse verändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $                    = require('jquery'),
    setzeTreehoehe       = require('./jstree/setzeTreehoehe'),
    fitTextareaToContent = require('./fitTextareaToContent');

module.exports = function () {
    setzeTreehoehe();

    // Höhe der sichtbaren Textareas korrigieren
    $('#forms').find('textarea').each(function () {
        if ($(this).is(':visible')) {
            fitTextareaToContent(this.id);
        }
    });
};