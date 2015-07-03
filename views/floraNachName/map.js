function (doc) {
    'use strict'

    if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Flora' && doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften['Artname vollständig']) {
        emit(doc.Taxonomie.Eigenschaften['Artname vollständig'])
    }
}