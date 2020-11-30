const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/adminDB');
const app = express();


app.post('/loginadmin', (req, res) => {
    let body = req.body;
    Admin.findOne({ email: body.email, identificacion: body.identificacion }, (error, admindb) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if (!admindb) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'usuario o contraseña no coinciden'
                }
            })
        }
        if (bcrypt.compareSync(body.password, admindb.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'usuario o contraseña no coinciden'
                }
            });
        }


        let tokenAdmin = jwt.sign({
            usuario: admindb
        }, process.env.SEED, { expiresIn: process.env.A_TOKEN });


        return res.json({
            ok: true,
            usuario: admindb,
            tokenAdmin
        })
    })

})
module.exports = app;