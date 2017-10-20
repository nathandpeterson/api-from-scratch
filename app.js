const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())

const robotRoutes = require('./src/routes/robot.js')

app.get('/', (req, res, next) => {
  res.json({message: 'Home page: go to robots'}).status(200)
})

app.use('/robots', robotRoutes)

app.use((err, req, res, next) => {
  const status = 500 || err.status
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => console.log(`-------listening on ${port}-------`)
app.listen(port, listener)
