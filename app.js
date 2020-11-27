const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');

const app = express();

require('./src/server')

//Rutas
app.use(require('./src/routes/usuarios'))

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Mongoose
mongoose.connect(process.env.URLM, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) return err;
        console.log('Base de Datos en Funcionamiento');
    });

/*
//carpeta publica
app.use(express.static(path.resolve(__dirname, './src/public')));

app.get('/', (req, res) => {
    res.render('home')
}) 
*/
//servidor
app.listen(PORT, () =>
    console.log('Servidor Funcionando en el Puerto:', PORT));

//pruebas