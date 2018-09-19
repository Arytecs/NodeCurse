'use strict'

var express = require('express');
var PublicationControllers = require('../controllers/publication');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

var md_upload = multipart({uploadDir: './uploads/publications'})

var api = express.Router();

api.get('/pruebaPublication', PublicationControllers.probando);
api.post('/publication', md_auth.ensureAuth, PublicationControllers.savePublication);
api.get('/publications/:page?', md_auth.ensureAuth, PublicationControllers.getPublications);
api.get('/publications-user/:user/:page?', md_auth.ensureAuth, PublicationControllers.getPublicationsUser);
api.get('/get-publication/:id', md_auth.ensureAuth, PublicationControllers.getPublication);
api.delete('/remove-publication/:id', md_auth.ensureAuth, PublicationControllers.deletePublication);
api.post('/upload-image-pub/:id', [md_auth.ensureAuth, md_upload], PublicationControllers.uploadImage);
api.get('/get-image-pub/:imageFile',[md_auth.ensureAuth, md_upload], PublicationControllers.getImageFile);

module.exports = api;