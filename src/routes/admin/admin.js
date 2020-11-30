const express = require('express')
const Admin = require('../../models/adminDB')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const app = express();
const bodyParser = require('body-parser')
const { verificaToken } = require('../../middlewares/token');
const { verificaAdmin } = require('../../middlewares/tokenadmin');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/admin', verificaAdmin, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    Admin.find({ estado: true }, 'nombres apellidos tipoDocumento email identificacion estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Admin.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    users,
                    cantidad: conteo
                });
            })
        });
})

app.post('/admin', verificaAdmin, (req, res) => {
    let body = req.body;

    let adminT = new Admin({
        nombres: body.nombres,
        apellidos: body.apellidos,
        tipoDocumento: body.tipoDocumento,
        identificacion: body.identificacion,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    })

    adminT.save((error, admindb) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            Usuario: admindb
        })
    });
})

app.put('/admin/:id', verificaAdmin, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombres', 'apellidos', 'tipoDocumento', 'email', 'estado']);

    Admin.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, admindb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            usuario: admindb
        })
    })
})


module.exports = app;