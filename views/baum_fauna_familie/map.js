﻿function(doc) {
	if (doc.Gruppe && doc.Gruppe === "Fauna" && doc.Index.Felder.Klasse && doc.Index.Felder.Ordnung && doc.Index.Felder.Familie) {
		emit ([doc.Index.Felder.Klasse, doc.Index.Felder.Ordnung, doc.Index.Felder.Familie], null);
	}
}