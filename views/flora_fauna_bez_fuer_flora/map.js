﻿function(doc) {
	if (doc.Typ && doc.Typ === "Beziehung" && doc.Flora && doc.Fauna) {
		emit (doc.Flora.GUID, doc._id);
	}
}