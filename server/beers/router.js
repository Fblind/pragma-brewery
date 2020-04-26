const router = require('express').Router()
function initializeRouter (app, dependencies) {
  const GetBeersRefrigerationStatus = require('./handlers/get-beers-refrigeration-status')
  const getBeersRefrigerationStatus = new GetBeersRefrigerationStatus({ beerService: dependencies.beerService })
  router.get('/refrigeration-status', getBeersRefrigerationStatus.handler())

  const GetBeersTypeRefrigerationStatus = require('./handlers/get-beers-type-refrigeration-status')
  const getBeersTypeRefrigerationStatus = new GetBeersTypeRefrigerationStatus({ beerService: dependencies.beerService })
  router.get('/:type/refrigeration-status', getBeersTypeRefrigerationStatus.handler())

  const GetBeers = require('./handlers/get-beers')
  const getBeers = new GetBeers()
  router.get('/', getBeers.handler())

  return router
}

module.exports = (app, dependencies) => {
  return initializeRouter(app, dependencies)
}
