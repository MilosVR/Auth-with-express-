const express = require('express');

//***************Create express Router**************//
const router = express.Router();

router.get('/test', (req, res)=>{
    res.json({msg : "profile works"})
})

module.exports = router