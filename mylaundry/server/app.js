require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const port = process.env.PORT || 5000
const morgan = require('morgan')
const routers = require('./router/router')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(routers)

if (port === port) {
    app.listen(port, () => {
        console.log(`Running API: ${port}`)
    })
} else {
    app.listen(4000, () => {
        console.log('Not Running API')
    })
}

