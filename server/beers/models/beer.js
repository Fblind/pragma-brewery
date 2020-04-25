class Beer {
  static validTypes () {
    return ['pilsner', 'ipa', 'lager', 'stout', 'wheat', 'paleAle']
  }

  static getTemperatureValidation (type, temperature) {
    const beerType = Beer.find({ type })
    const { refrigeration } = beerType
    const beerInfo = { refrigeration, type, currentTemperature: temperature }
    if (temperature < refrigeration.min || temperature > refrigeration.max) {
      return { ...beerInfo, valid: false }
    }
    return { ...beerInfo, valid: true }
  }

  static find (query) {
    const beers = [{
      type: 'pilsner',
      name: 'Pilsner',
      refrigeration: {
        min: 4,
        max: 6
      }
    }, {
      type: 'ipa',
      name: 'IPA',
      refrigeration: {
        min: 5,
        max: 6
      }
    }, {
      type: 'lager',
      name: 'Lager',
      refrigeration: {
        min: 4,
        max: 7
      }
    }, {
      type: 'stout',
      name: 'Stout',
      refrigeration: {
        min: 6,
        max: 8
      }
    }, {
      type: 'wheat',
      name: 'Wheat beer',
      refrigeration: {
        min: 3,
        max: 5
      }
    }, {
      type: 'paleAle',
      name: 'Pale Ale',
      refrigeration: {
        min: 4,
        max: 6
      }
    }]

    if (query && query.type) {
      return beers.find((beer) => beer.type === query.type)
    }
    return beers
  }
}

module.exports = Beer
