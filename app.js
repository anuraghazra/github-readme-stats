const dotenv = require('dotenv/config')
const express = require('express')

const api = require('./api/index.js')

const app = express()


app.get('/api',async function (req, res) {
    await api(req, res);
});


server = app.listen("3000");