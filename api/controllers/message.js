'use strict'

// var path = require('path');
// var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var moment = require('moment');

var Message = require('../models/message');
var User = require('../models/user');

function prueba(req, res){
    return res.status(200).send({message: 'Prueba desde el controlador de mensajería.'})
}

function saveMessage(req, res){
    var params = req.body;
    if(!params.text || !params.receiver){
        return res.status(200).send({message: 'Envía los datos necesarios.'})
    }

    var message = new Message();
    message.emitter = req.user.sub;
    message.text = params.text;
    message.receiver = params.receiver;
    message.created_at = moment().unix();

    message.save((err, messageStored) =>{
        if(err) return res.status(500).send({message: 'Error en la petición.'})
        if(!messageStored) return res.status(500).send({message: 'Error al enviar el mensaje.'})
        return res.status(200).send({message: messageStored})
    })
}

function getReceivedMessages(req, res){
    var userId = req.user.sub;
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 4;

    Message.find({receiver: userId}).populate('emitter', 'name surname _id image').paginate(page, itemsPerPage, (err, messages, total) => {
        if(err) return res.status(500).send({message: 'Error en la petición.'})
        if(!messages) return res.status(404).send({message: 'No hay mensajes.'})
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            page: page,
            messages
        })
    })
}

module.exports = {
    prueba,
    saveMessage,
    getReceivedMessages
}