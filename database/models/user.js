const mongoose = require('../connect');
const Schema = mongoose.Schema;
const usuarioSchema = Schema({
    usuario: {
        type: String,
        required: [true, 'debe poner un nombre']
    },

    email: {
        type: String,
        required: 'Falta el email',
        match: /^(([^<>()\[\]\.,;:\s @\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
    password: {
        type: String,
        required: ['Contraseña necesaria']
    },
    //telefono: Number,
    log: Number,
    lat: Number,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    avatar: String,
    tipo: String // comprador, vendedor
});

const usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = usuario;
