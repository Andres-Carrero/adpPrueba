const express = require('express')
const app = express();

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./usuario/sesion'))
app.use(require('./usuario/usuarios'))
app.use(require('./admin/admin'))
app.use(require('./admin/loginadmin'))
app.use(require('./citas/citas'))

module.exports = app;