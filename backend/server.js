const express = require('express')
const colors = require('colors')
const cors = require('cors');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()

const origins = process.env.Node_ENV === 'development' ? ['http://localhost:3000'] : ['http://exsample.com']
app.use(cors({
    origin: origins, //アクセス許可するオリジン
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/hello', require('./routes/helloRoutes.js'))
app.use('/api/users', require('./routes/userRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`started server: http://localhost:${port}`))
