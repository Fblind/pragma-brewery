const Beer = require('../../models/beer')
const { expect } = require('chai')

describe('Beer Model', () => {
  describe('validTypes', () => {
    function sut () {
      return Beer.validTypes()
    }

    it('should return all valid types for beers', () => {
      expect(sut()).to.deep.equal(['pilsner', 'ipa', 'lager', 'stout', 'wheat', 'paleAle'])
    })
  })

  describe('find', () => {
    let query = null
    beforeEach(() => {
      query = undefined
    })

    function sut () {
      return Beer.find(query)
    }

    it('should return all beers object configuration when no query is pass', () => {
      expect(sut()).to.have.length(6)
    })

    it('should filter by type when a query with type info is pass', () => {
      query = { type: 'ipa' }
      expect(sut()).to.deep.include({ type: 'ipa', name: 'IPA' })
    })

    it('should return all beers objects when no implemented filter is pass', () => {
      query = { invalid: 'ipa' }
      expect(sut()).to.have.length(6)
    })

    it('should return undefined if type not exists in the beer config', () => {
      query = { type: 'invalid' }
      // eslint-disable-next-line no-unused-expressions
      expect(sut()).to.be.undefined
    })
  })

  describe('getTemperatureValidation', () => {
    let type = null
    let temperature = null
    beforeEach(() => {
      type = 'paleAle'
      temperature = 5
    })

    function sut () {
      return Beer.getTemperatureValidation(type, temperature)
    }

    it('should return an object with all current information of the beer and valid: true when temperature of the beer is between valid values', () => {
      expect(sut()).to.deep.equal({
        refrigeration: { min: 4, max: 6 },
        name: 'Pale Ale',
        type: 'paleAle',
        currentTemperature: temperature,
        valid: true
      })
    })

    it('should return an object with all current information of the beer and valid: false when temperature of the beer is between non valid values', () => {
      type = 'stout'
      temperature = 1
      expect(sut()).to.deep.equal({
        refrigeration: { min: 6, max: 8 },
        name: 'Stout',
        type: 'stout',
        currentTemperature: temperature,
        valid: false
      })
    })
  })
})
