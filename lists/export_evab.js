'use strict';
function(head, req) {

	var row,
		Objekt,
		exportObjekte = [],
		exportObjekt,
		dsTaxonomie = {},
		floraStatusCodiert,
		_ = require("lists/lib/underscore"),
		_a = require("lists/lib/artendb_listfunctions");

	// specify that we're providing a JSON response
	provides('json', function() {

		while (row = getRow()) {
			Objekt = row.doc;

			// exportobjekt gründen bzw. zurücksetzen
			exportObjekt = {};

			// zunächst leere Felder anfügen, damit jeder Datensatz jedes Feld hat
			/*exportObjekt.idArt            = null;
			exportObjekt.nummer           = null;
			exportObjekt.wissenschArtname = '';
			exportObjekt.deutscherArtname = '';
			exportObjekt.status           = null;
			exportObjekt.klasse           = null;*/

			
			if (Objekt.Taxonomie && Objekt.Taxonomie.Eigenschaften) {
				dsTaxonomie = Objekt.Taxonomie.Eigenschaften;
			}

			// bei allen Gruppen gleiche Eigenschaften setzen
			exportObjekt.idArt = "{" + Objekt._id + "}";
			if (dsTaxonomie["Taxonomie ID"]) {
				exportObjekt.nummer = dsTaxonomie["Taxonomie ID"];
			}
			if (dsTaxonomie.Artname) {
				exportObjekt.wissenschArtname = dsTaxonomie.Artname.substring(0, 255);
			}
			// Name Deutsch existiert bei Moosen nicht
			// hier lassen, falls er künftig existiert
			if (dsTaxonomie["Name Deutsch"]) {
				exportObjekt.deutscherArtname = dsTaxonomie["Name Deutsch"].substring(0, 255);
			}

			// gruppen-abhängige Eigenschaften setzen
			switch(Objekt.Gruppe) {

			case "Fauna":
				// Status ist bei Fauna immer A
				exportObjekt.status = "A";

				// Datensammlung "ZH GIS" holen
				var ds_zh_gis = _.find(Objekt.Eigenschaftensammlungen, function(ds) {
					return ds.Name === "ZH GIS";
				}) || {};
				
				if (ds_zh_gis && ds_zh_gis.Eigenschaften && ds_zh_gis.Eigenschaften["GIS-Layer"]) {
					exportObjekt.klasse = ds_zh_gis.Eigenschaften["GIS-Layer"].substring(0, 50);
				}
				break;

			case "Flora":
				// Felder aktualisieren, wo Daten vorhanden
				if (dsTaxonomie.Status) {
					// Status codieren
					floraStatusCodiert = _a.codiereFloraStatus(dsTaxonomie.Status);
					exportObjekt.status = floraStatusCodiert;
				}
				// GIS-Layer ist bei Flora immer Flora
				exportObjekt.klasse = "Flora";
				break;

			case "Moose":
				// Status ist bei Moose immer A
				exportObjekt.status = "A";
				// GIS-Layer ist bei Moose immer Moose
				exportObjekt.klasse = "Moose";
				break;

			default:
				// zum nächsten row
				continue;
			}
			
			// Objekt zu Exportobjekten hinzufügen
			exportObjekte.push(exportObjekt);
		}

		send(JSON.stringify(exportObjekte));
	});
}