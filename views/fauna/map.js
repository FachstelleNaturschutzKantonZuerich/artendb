function (doc) {
  'use strict'

  if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Fauna') {
    emit([doc._id, doc._rev])
  }
}