const express = require('express')
const app = express()
// TODO: use logger
// TODO: create own config file
const config = { port: 3000 }

app.use('/beers', require('./beers/router'))

module.exports = app

// Listening Server
if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  // Test runner will start the server directly, so don't do it here.
} else {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`)
  })
}
