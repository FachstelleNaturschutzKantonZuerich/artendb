﻿function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Moose" && doc.Taxonomie && doc.Taxonomie.Felder) {
		emit ([doc.Taxonomie.Felder.Klasse, doc.Taxonomie.Felder.Familie, doc.Taxonomie.Felder.Gattung, doc.Taxonomie.Felder["Artname vollständig"]], doc._id);
	}
}