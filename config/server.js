const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const consign = require('consign')
const expressValidator = require('express-validator')

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))
app.use(expressValidator())
app.use(bodyParser.urlencoded({extended : true}))

consign().include('app/routes')
	.then('app/controllers')
	.then('app/models')
	.into(app)

module.exports = app