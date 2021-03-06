'use strict'

var express = require('express');
var MessageControllers = require('../controllers/message');
var md_auth = require('../middlewares/authenticated');
// var multipart = require('connect-multiparty');

// var md_upload = multipart({uploadDir: './uploads/publications'})

var api = express.Router();

api.get('/pruebaMessage', MessageControllers.prueba);
api.post('/message', md_auth.ensureAuth, MessageControllers.saveMessage);
api.get('/my-messages/:page?', md_auth.ensureAuth, MessageControllers.getReceivedMessages);
api.get('/messages/:page?', md_auth.ensureAuth, MessageControllers.getEmmitMessages);
api.get('/unviewed-messages/', md_auth.ensureAuth, MessageControllers.getUnviewedMessages);
api.get('/set-viewed-messages/', md_auth.ensureAuth, MessageControllers.setViewedMessages);

module.exports = api;