﻿function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna") {
		emit ([doc.Index.Felder.Klasse, doc.Index.Felder.Ordnung, doc.Index.Felder.Familie], null);
	}
}