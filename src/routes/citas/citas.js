const express = require('express')
const Cita = require('../../models/citasDB')
const app = express();
const bodyParser = require('body-parser')
const { verificaToken } = require('../../middlewares/token');
const { verificaAdmin } = require('../../middlewares/tokenadmin');
const User = require('../../models/usuarioDB')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/citas', verificaAdmin, (req, res) => {
    Cita.find({})
        .sort('novedades')
        .populate('usuarios', 'nombres apellidos identificacion')
        .exec((err, citas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                citas
            })
        });

    app.get('/citas/:id', verificaToken, (req, res) => {
        let id = req.params.id;
        Cita.findById(id, (err, citasdb) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'ID no valido'
                    }
                });
            }
            if (!citasdb) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'no fue posible encontrar el ID'
                    }
                });
            }
            res.json({
                ok: true,
                Cita: citasdb
            });
        })
    })
});


app.post('/citas', [verificaAdmin, verificaToken], (req, res) => {
    let body = req.body;

    let citasC = new Cita({
        fecha: body.fecha,
        especialista: body.especialista,
        novedades: body.novedades,
        usuario: req.usuario._id,

    })

    citasC.save((error, citasdb) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (!citasdb) {
            return res.status(400).json({
                ok: false,
                error: { mensaje: 'chao' }
            });
        }
        res.json({
            ok: true,
            Cita: citasdb
        })
    });
})
app.put('/citas/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let citaa = {
        novedades: body.novedades
    }
    Cita.findByIdAndUpdate(id, citaa, { new: true, runValidators: true }, (err, citasDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!citasDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            cita: citasDB
        });
    });
})
app.put('/citas/admin/:id', verificaAdmin, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let citaa = {
        especialista: body.especialista,
        novedadesEspecialista: body.novedadesEspecialista

    }
    Cita.findByIdAndUpdate(id, citaa, { new: true, runValidators: true }, (err, citasDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!citasDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            cita: citasDB
        });
    });
})
module.exports = app;