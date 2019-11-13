const router = require('express').Router();
const verify = require('./verifyToken');

touter.get('/',verify,(req,res) => {
    res.json({
        title: 'the first post',
        description: 'test data'
    });
});





module.exports = router;