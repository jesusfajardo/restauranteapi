const mongoose = require('../connect');
const Schema = mongoose.Schema;
const usuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'debe poner un nombre'],
        match: /^[a-z]{3,16}$/,
    },

    email: {
        type: String,
        required: 'Falta el email',
        match: /^(([^<>()\[\]\.,;:\s @\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
    password: {
        type: String,
        required: ['Contraseña necesaria'],
    },
    //telefono: Number,
    log: Number,
    lat: Number,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    avatar: String,
    tipo: {
      type:String,
      enum:['comprador', 'vendedor']// comprador, vendedor
    },
    like: {
      type:Number,
      default:0,
    },
    dislike:{
      type:Number,
      default:0,
    },

});

const usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = usuario;
