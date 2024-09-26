const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')
const port = process.env.PORT

app.listen(port, () => {
    console.log(`backend server started and listening on port ${port}!`)
})

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
})

app.use(express.json())
app.use(cors())
app.use(cookieparser())

app.use('/api', require('./routes/carsRoutes'))