const express = require('express');
const router = express.Router()


router.get('/', (req, res)=>{
   res.send("API Connected");
})



module.exports = {router}