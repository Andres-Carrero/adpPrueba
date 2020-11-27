const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


let rolesValidos = {
    values: ['ADMIN', 'PATIENT'],
    message: '{VALUE} no es un rol valido'
}
let docValidos = {
    values: ['CC', 'TI', 'RC'],
    message: '{VALUE} no es un tipo de documento valido'
}

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son nesesarios']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son nesesarios']
    },
    tipoDocumento: {
        type: String,
        default: 'CC',
        doc: docValidos,
        required: true
    },
    identificacion: {
        type: Number,
        unique: true,
        required: [true, 'Ingrese su numero de identificacion']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        default: 'PATIENT',
        role: rolesValidos,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('usuarios', usuarioSchema);