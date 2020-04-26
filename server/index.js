const express = require('express')
const path = require('path')
const axios = require('axios')
const BeerService = require('./beers/services/beer')
const app = express()
// TODO: use logger
// TODO: create own config file
// TODO: set up files
const config = { port: 3000 }
app.use(express.json())

function intializeServices () {
  const beerService = new BeerService({ apiClient: axios })
  return { beerService }
}
const { beerService } = intializeServices()
app.use('/beers', require('./beers/router')(app, { beerService }))

app.use('/dist', express.static(path.join(__dirname, '../client/dist')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})
module.exports = app

// Listening Server
if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  // Test runner will start the server directly, so don't do it here.
} else {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`)
  })
}
