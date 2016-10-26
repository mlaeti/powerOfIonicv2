'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
var sessionSecret = exports.sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
var google = exports.google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

exports.default = {
  sessionSecret: sessionSecret,
  google: google
};