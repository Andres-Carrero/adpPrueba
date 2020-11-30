const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/usuarioDB');
const app = express();


app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (error, userdb) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if (!userdb) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'usuario, identificacion o contraseña no coinciden'
                }
            })
        }
        if (bcrypt.compareSync(body.password, userdb.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'usuario, identificacion o contraseña no coinciden'
                }
            });
        }


        let token = jwt.sign({
            usuario: userdb
        }, process.env.SEMILLA, { expiresIn: process.env.C_TOKEN });


        return res.json({
            ok: true,
            usuario: userdb,
            token
        })
    })

})
module.exports = app;