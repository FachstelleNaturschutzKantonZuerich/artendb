/*jslint node: true, browser: true, nomen: true, todo: true */


'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    pass_file = require('../couchpass.json'),
    user_name,
    password,
    request;

user_name = pass_file.user;
password = pass_file.pass;

request = 'couchapp push http://' + user_name + ':' + password + '@127.0.0.1:5984/artendb';

console.log('request: ', request);

return gulp.task('build_couchapp', shell.task([request]));