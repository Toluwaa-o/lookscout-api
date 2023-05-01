require('dotenv').config()
require('express-async-errors')

const express = require('express')
const fileUpload = require('express-fileupload')
const connectDb = require('./db/connect')
const morgan = require('morgan')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const adminRouter = require('./routes/adminRoutes')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

const app = express()

app.use(express.static('./public'))
app.use(fileUpload())
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(helmet())
app.use(xss())
mongoose.set('strictQuery', false)

app.use('/api/v1', adminRouter)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => console.log(`App is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()