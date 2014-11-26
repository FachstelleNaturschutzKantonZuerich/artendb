// wenn BsFile geändert wird

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var $    = require('jquery'),
    XLSX = require('XLSX');

module.exports = function (event) {
    var erstelleTabelle = require('../erstelleTabelle'),
        file,
        filename,
        filetype,
        reader;

    if (event.target.files[0] === undefined) {
        // vorhandene Datei wurde entfernt
        $("#BsTabelleEigenschaften").hide();
        $("#importierenBsIdsIdentifizierenHinweisText").hide();
        $("#BsImportieren").hide();
        $("#BsEntfernen").hide();
    } else {
        file = event.target.files[0];
        filename = file.name;
        filetype = filename.split('.').pop();
        reader = new FileReader();

        if (filetype === 'csv') {
            reader.onload = function (event) {
                var data = event.target.result;

                window.adb.bsDatensaetze = $.csv.toObjects(data);
                erstelleTabelle(window.adb.bsDatensaetze, "BsFelder_div", "BsTabelleEigenschaften");
            };
            reader.readAsText(file);
        }
        if (filetype === 'xlsx') {
            reader.onload = function(event) {
                var data = event.target.result,
                    workbook = XLSX.read(data, {type: 'binary'}),
                    sheetName = workbook.SheetNames[0],
                    worksheet = workbook.Sheets[sheetName];

                window.adb.bsDatensaetze = XLSX.utils.sheet_to_json(worksheet);
                erstelleTabelle(window.adb.bsDatensaetze, "BsFelder_div", "BsTabelleEigenschaften");
            };
            reader.readAsBinaryString(file);
        }
            
    }
};