const express = require('express');
const router = express.Router();

router.get('/emailCount', (req, res, next) => {
    res.send('test')
})