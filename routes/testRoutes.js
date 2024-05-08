const express = require('express');
const routes = express.Router();

routes.get('/ping', (req, res) => {
    console.log("testing on ping");
    res.send('<h1>testing</h1>')
})

module.exports = routes;