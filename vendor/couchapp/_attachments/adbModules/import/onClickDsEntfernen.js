/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true*/
'use strict';

var entferneDatensammlung = require('./entferneDatensammlung');

module.exports = function (event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    entferneDatensammlung();
};