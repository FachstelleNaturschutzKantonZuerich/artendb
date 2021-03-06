'use strict'

var $ = require('jquery')

module.exports = function (event) {
  var $elementToShow

  event.preventDefault ? event.preventDefault() : event.returnValue = false

  $elementToShow = $(this).parent().next()

  if ($elementToShow.is(':visible')) {
    $elementToShow.hide(400)
    $(this).text('...mehr')
  } else {
    $elementToShow.show(400)
    $(this).text('...weniger')
  }
}
