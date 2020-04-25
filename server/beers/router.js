const router = require('express').Router()

const GetBeers = require('./handlers/get-beers')
const getBeers = new GetBeers()
router.get('/', getBeers.handler)

module.exports = router
