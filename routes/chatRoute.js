const express = require('express');
const router = express.Router();

router.get('/' , (req , res) => res.render('index'));

router.post('/' , (req , res) => {
    console.log(req.body);
    res.render('chat');
});

module.exports = router;