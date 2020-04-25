class Beer {
  static find (query) {
    return [{
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
  }
}

module.exports = Beer
