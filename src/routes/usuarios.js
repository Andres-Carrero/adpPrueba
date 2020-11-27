const express = require('express')
const User = require('../models/usuarioDB')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    User.find({ estado: true }, 'nombres apellidos tipoDocumento email identificacion role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            User.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    users,
                    cantidad: conteo
                });
            })
        });
})

app.post('/usuario', (req, res) => {
    let body = req.body;

    let userT = new User({
        nombres: body.nombres,
        apellidos: body.apellidos,
        tipoDocumento: body.tipoDocumento,
        identificacion: body.identificacion,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    })

    userT.save((error, userdb) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            Usuario: userdb
        })
    });
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    // let body = _.pick(req.body, ['nombres', 'apellidos', 'tipoDocumento', 'email', 'role', 'estado']);
    let body = req.body
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userdb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
                mensaje: 'bueno'
            });
        }
        res.json({
            ok: true,
            usuario: userdb
        })
    })
})


module.exports = app;