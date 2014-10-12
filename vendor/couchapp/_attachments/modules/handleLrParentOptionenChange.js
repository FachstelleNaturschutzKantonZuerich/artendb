// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird

'use strict';

// $ wird benütigt für $.modal und $.couch
var returnFunction = function ($, that) {
    // prüfen, ob oberster Node gewählt wurde
    var parent_name = $(that).val(),
        parent_id = that.id,
        parent = {},
        object = {};
    // zuerst eine id holen
    object._id = $.couch.newUUID(1);
    object.Gruppe = "Lebensräume";
    object.Typ = "Objekt";
    object.Taxonomie = {};
    object.Taxonomie.Name = "neue Taxonomie";    // wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
    object.Taxonomie.Eigenschaften = {};
    object.Taxonomie.Eigenschaften.Taxonomie = "neue Taxonomie";    // wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
    // wenn keine Wurzel: Label anzeigen
    if (parent_id !== "0") {
        object.Taxonomie.Eigenschaften.Label = "";
    }
    object.Taxonomie.Eigenschaften.Einheit = "unbeschriebener Lebensraum";
    if (parent_id === "0") {
        object.Taxonomie.Eigenschaften.Einheit = "neue Taxonomie";
    }
    /*Einheit-Nr FNS wird nicht mehr benötigt, bzw. unabhängig führen
    object.Taxonomie.Eigenschaften["Einheit-Nr FNS"] = "";
    if (parent_id === "0") {
        object.Taxonomie.Eigenschaften["Einheit-Nrn FNS von"] = "";
        object.Taxonomie.Eigenschaften["Einheit-Nrn FNS bis"] = "";
    }*/
    object.Taxonomie.Eigenschaften.Beschreibung = "";
    object.Eigenschaftensammlungen = [];
    object.Beziehungssammlungen = [];
    // jetzt den parent erstellen
    // geht nicht vorher, weil die id bekannt sein muss
    if (parent_id === "0") {
        // das ist die Wurzel der Taxonomie
        parent.Name = "neue Taxonomie";
        parent.GUID = object._id;
        // bei der Wurzel ist Hierarchie gleich parent
        object.Taxonomie.Eigenschaften.Hierarchie = [];
        object.Taxonomie.Eigenschaften.Hierarchie.push(parent);
    } else {
        parent.Name = parent_name;
        parent.GUID = parent_id;
    }
    object.Taxonomie.Eigenschaften.Parent = parent;
    // in die DB schreiben
    $.ajax('http://localhost:5984/artendb/' + object._id, {
        type: 'PUT',
        dataType: "json",
        data: JSON.stringify(object)
    }).done(function (resp) {
        var erstelleBaum = require('./erstelleBaum');
        object._rev = resp.rev;
        if (parent_id !== "0") {
            // die Hierarchie aufbauen und setzen
            // bei der Wurzel ist sie schon gesetzt
            window.adb.aktualisiereHierarchieEinesNeuenLr(null, object, true);
        } else {
            $.when(erstelleBaum($)).then(function() {
                var oeffneBaumZuId = require('./oeffneBaumZuId');
                oeffneBaumZuId ($, object._id);
                $('#lr_parent_waehlen').modal('hide');
            });
        }
    }).fail(function () {
        console.log('Datensatz nicht gespeichert');
    });
};

module.exports = returnFunction;