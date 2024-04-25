const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const {router} = require('./src/router/route')
const port = process.env.PORT || 5000

app.get('/',router)
app.get('/**', (req, res)=>{
    res.send("Invalid Api Path")
})

app.listen(port, () => {
  console.log(`speech To text converter listening on port ${port}`)
})