﻿function(doc) {

	var klasse,
		ordnung,
		familie,
		artname_vollstaendig;

	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Taxonomie && doc.Taxonomie.Daten) {

		klasse = doc.Taxonomie.Daten.Klasse || "(unbekannte Klasse)";
		ordnung = doc.Taxonomie.Daten.Ordnung || "(unbekannte Ordnung)";
		familie = doc.Taxonomie.Daten.Familie || "(unbekannte Familie)";
		artname_vollstaendig = doc.Taxonomie.Daten["Artname vollständig"] || "(unbekannter Artname vollständig)";

		emit ([klasse, ordnung, familie, artname_vollstaendig, doc._id], null);
	}

}