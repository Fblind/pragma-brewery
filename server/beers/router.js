const router = require('express').Router()
function initializeRouter (app, dependencies) {
  const GetBeersRefrigerationStatus = require('./handlers/get-beers-refrigeration-status')
  const getBeersRefrigerationStatus = new GetBeersRefrigerationStatus({ beerService: dependencies.beerService })
  router.get('/:type/refrigeration-status', getBeersRefrigerationStatus.handler())

  const GetBeers = require('./handlers/get-beers')
  const getBeers = new GetBeers()
  router.get('/', getBeers.handler())

  return router
}

module.exports = (app, dependencies) => {
  return initializeRouter(app, dependencies)
}
