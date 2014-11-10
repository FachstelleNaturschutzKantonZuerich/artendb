// baut im Formular "export" die Liste aller Eigenschaften auf
// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt die Namen der Gruppen
// formular ist im Standard export, wenn anders (z.B. export_alt), übergeben

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var _ = require('underscore'),
    $ = require('jquery');

// braucht $ wegen .alert
var returnFunction = function (export_gruppen, formular) {

    var gruppen = [],
        $exportieren_objekte_waehlen_gruppen_hinweis_text   = $("#exportieren_objekte_waehlen_gruppen_hinweis_text"),
        $exportieren_nur_objekte_mit_eigenschaften_checkbox = $("#exportieren_nur_objekte_mit_eigenschaften_checkbox"),
        $exportieren_nur_objekte_mit_eigenschaften          = $("#exportieren_nur_objekte_mit_eigenschaften"),
        $exportieren_exportieren_collapse                   = $("#exportieren_exportieren_collapse"),
        $exportieren_felder_waehlen_collapse                = $("#exportieren_felder_waehlen_collapse"),
        $exportieren_objekte_waehlen_ds_collapse            = $("#exportieren_objekte_waehlen_ds_collapse"),
        erstelleListeFuerFeldwahl2                          = require('./erstelleListeFuerFeldwahl2');

    // falls noch offen: folgende Bereiche schliessen
    if ($exportieren_exportieren_collapse.is(':visible')) {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    if ($exportieren_felder_waehlen_collapse.is(':visible')) {
        $exportieren_felder_waehlen_collapse.collapse('hide');
    }
    if ($exportieren_objekte_waehlen_ds_collapse.is(':visible')) {
        $exportieren_objekte_waehlen_ds_collapse.collapse('hide');
    }

    if (!formular || formular === 'export') {
        // Beschäftigung melden
        $exportieren_objekte_waehlen_gruppen_hinweis_text
            .alert()
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show()
            .html("Eigenschaften werden ermittelt...");
        // scrollen, damit Hinweis sicher ganz sichtbar ist
        $('html, body').animate({
            scrollTop: $exportieren_objekte_waehlen_gruppen_hinweis_text.offset().top
        }, 2000);
    } else {
        // für alt
        // Beschäftigung melden
        $('#exportieren_alt_felder_waehlen_hinweis_text')
            .alert()
            .show();
    }

    // gewählte Gruppen ermitteln
    // globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
    // globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
    var export_felder_arrays = [];
    /*if (export_gruppen.length > 1) {
        // wenn mehrere Gruppen gewählt werden
        // Option exportieren_nur_objekte_mit_eigenschaften ausblenden
        // und false setzen
        // sonst kommen nur die DS einer Gruppe
        $exportieren_nur_objekte_mit_eigenschaften_checkbox.addClass("adb-hidden");
        $exportieren_nur_objekte_mit_eigenschaften.prop('checked', false);
    } else {
        if ($exportieren_nur_objekte_mit_eigenschaften_checkbox.hasClass("adb-hidden")) {
            $exportieren_nur_objekte_mit_eigenschaften_checkbox.removeClass("adb-hidden")
            $exportieren_nur_objekte_mit_eigenschaften.prop('checked', true);
        }
    }*/
    if (export_gruppen.length > 0) {
        // gruppen einzeln abfragen
        gruppen = export_gruppen;
        _.each(gruppen, function (gruppe) {
            // Felder abfragen
            var $db = $.couch.db("artendb");
            $db.view('artendb/felder?group_level=5&startkey=["' + gruppe + '"]&endkey=["' + gruppe + '",{},{},{},{}]', {
                success: function (data) {
                    export_felder_arrays = _.union(export_felder_arrays, data.rows);
                    // eine Gruppe aus export_gruppen entfernen
                    export_gruppen.splice(0, 1);
                    if (export_gruppen.length === 0) {
                        // alle Gruppen sind verarbeitet
                        erstelleListeFuerFeldwahl2(export_felder_arrays, formular);
                    }
                },
                error: function () {
                    console.log('erstelleListeFuerFeldwahl: keine Daten erhalten');
                }
            });
        });
    } else {
        // letzte Rückmeldung anpassen
        $exportieren_objekte_waehlen_gruppen_hinweis_text.html("bitte eine Gruppe wählen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
        // Felder entfernen
        $("#export").find(".exportieren_felder_waehlen_felderliste")
            .html("");
        $("#exportieren_objekte_waehlen_ds_felderliste")
            .html("");
    }
    // Tabelle ausblenden, falls sie eingeblendet war
    $(".exportieren_exportieren_tabelle")
        .hide();
};

module.exports = returnFunction;