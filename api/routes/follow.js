'use strict'

var express = require('express');
var FollowController = require('../controllers/follow');
var md_auth = require('../middlewares/authenticated');
// var multipart = require('connect-multiparty');

// var md_upload = multipart({uploadDir: './uploads/users'})

var api = express.Router();

api.get('/pruebaFollow', FollowController.prueba);
api.post('/follow', md_auth.ensureAuth, FollowController.saveFollow);
api.delete('/unfollow/:id', md_auth.ensureAuth, FollowController.deleteFollow);
api.get('/following/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowingUsers);
api.get('/followers/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowersUsers);
api.get('/get-my-follows/:followed?', md_auth.ensureAuth, FollowController.getFollowed);

module.exports = api;