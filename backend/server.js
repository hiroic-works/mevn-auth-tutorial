const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/hello', require('./routes/helloRoutes.js'))

app.listen(port, () => console.log(`started server: http://localhost:${port}`))
