const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let especValidos = {
    values: ['Gereral', 'Infectología', 'Neumología', 'Psiquiatría', 'Pediatría', 'Neurología', 'Cardiología', 'Hematología'],
    message: '{VALUE} no es una especializacion valida'
}

let citasSchema = new Schema({
    fecha: {
        type: Date,
        required: [true, 'la fecha y la hora para la cita es necesaria']
    },
    especialista: {
        type: String,
        required: true,
        espec: especValidos
    },
    novedades: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    novedadesEspecialista: {
        type: String
    }
});

module.exports = mongoose.model('citas', citasSchema);