﻿function(doc) {
	if (doc.Typ && doc.Typ === "Beziehung" && doc.Partner) {
		//Array mit allen Gruppen füllen
		var Gruppen = [];
		for (i in doc.Partner) {
			Gruppen.push(doc.Partner[i].Gruppe);
		}
		if (Gruppen.indexOf("Lebensräume") !== -1) {
			if (Gruppen.indexOf("Flora") !== -1) {
				//das ist eine Lr-Flora-Beziehung
				emit ([doc._id, doc._rev]);
			}
		}
	}
}