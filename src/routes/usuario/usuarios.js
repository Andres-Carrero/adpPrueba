const express = require('express')
const Usuario = require('../../models/usuarioDB')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const app = express();
const bodyParser = require('body-parser')
const { verificaToken } = require('../../middlewares/token');
const { verificaAdmin } = require('../../middlewares/tokenadmin');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    Usuario.find({ estado: true }, 'nombres apellidos tipoDocumento email identificacion estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                });
            })
        });
})

app.post('/usuario', verificaAdmin, (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombres: body.nombres,
        apellidos: body.apellidos,
        tipoDocumento: body.tipoDocumento,
        identificacion: body.identificacion,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    })

    usuario.save((error, userdb) => {
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

app.put('/usuario/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombres', 'apellidos', 'tipoDocumento', 'email', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userdb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            usuario: userdb
        })
    })
})


module.exports = app;