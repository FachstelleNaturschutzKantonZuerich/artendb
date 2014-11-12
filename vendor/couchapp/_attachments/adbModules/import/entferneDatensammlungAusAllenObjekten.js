// übernimmt den Namen einer Datensammlung
// öffnet alle Dokumente, die diese Datensammlung enthalten und löscht die Datensammlung

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (dsName) {
    var dsEntfernt = $.Deferred(),
        anzVorkommenVonDs,
        anzVorkommenVonDsEntfernt = 0,
        $importieren_ds_ds_beschreiben_hinweis = $("#importieren_ds_ds_beschreiben_hinweis"),
        $db = $.couch.db('artendb'),
        rueckmeldung,
        entferneDatensammlungAusDokument = require('./entferneDatensammlungAusDokument');

    $db.view('artendb/ds_guid?startkey=["' + dsName + '"]&endkey=["' + dsName + '",{}]', {
        success: function (data) {
            anzVorkommenVonDs = data.rows.length;

            // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
            $(document).bind('adb.dsEntfernt', function () {
                anzVorkommenVonDsEntfernt++;
                rueckmeldung = "Eigenschaftensammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
                $importieren_ds_ds_beschreiben_hinweis
                    .removeClass("alert-success").removeClass("alert-danger").addClass("alert-info")
                    .html(rueckmeldung);
                $('html, body').animate({
                    scrollTop: $importieren_ds_ds_beschreiben_hinweis.offset().top
                }, 2000);
                if (anzVorkommenVonDsEntfernt === anzVorkommenVonDs) {
                    // die Indexe aktualisieren
                    $db.view('artendb/lr', {
                        success: function () {
                            // melden, dass Indexe aktualisiert wurden
                            rueckmeldung = "Die Eigenschaftensammlungen wurden entfernt.<br>";
                            rueckmeldung += "Die Indexe wurden aktualisiert.";
                            $importieren_ds_ds_beschreiben_hinweis
                                .removeClass("alert-info").removeClass("alert-danger").addClass("alert-success")
                                .html(rueckmeldung);
                            $('html, body').animate({
                                scrollTop: $importieren_ds_ds_beschreiben_hinweis.offset().top
                            }, 2000);
                        }
                    });
                }
            });

            // Eigenschaftensammlungen entfernen
            _.each(data.rows, function (dataRow) {
                // guid und DsName übergeben
                entferneDatensammlungAusDokument(dataRow.key[1], dsName);
            });
            dsEntfernt.resolve();
        }
    });
    return dsEntfernt.promise();
};