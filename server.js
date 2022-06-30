const express = require('express')
const app = express()
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', path.join('layouts', 'layout'))
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected to mongoose...'))

app.use('/', require('./routes/index'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))
