const request = require('supertest')
const { expect } = require('chai')
const nock = require('nock')
const Beer = require('../../models/beer')
const app = require('../../../index')
const path = '/beers/refrigeration-status'

describe('GET /beers/refrigeration-status', () => {
  let nockTemperatureSensor = null
  let temperature = null
  const validBeers = Beer.validTypes()
  beforeEach(() => {
    temperature = 5
  })

  afterEach(() => {
    nock.cleanAll()
  })

  function nockApis () {
    nockTemperatureSensor = nock('https://temperature-sensor-service.herokuapp.com')
    for (const beer of validBeers) {
      nockTemperatureSensor
        .get(`/sensor/${beer}`)
        .reply(200, { id: beer, temperature })
    }
  }

  function sut (statusCode = 200) {
    nockApis()
    return request(app)
      .get(path)
      .expect(statusCode)
  }

  it('should response 200', async () => {
    const response = await sut()
    expect(response.status).to.equal(200)
  })

  it('should request to get the temperature when the response is successful', async () => {
    await sut()
    expect(nockTemperatureSensor.pendingMocks()).to.have.length(0)
  })

  it('should response 200 with valid beers status value in the response', async () => {
    const { body } = await sut()
    expect(body.data).to.have.length(validBeers.length)
  })

  it('should response 200 with all beers containing the response object', async () => {
    const { body } = await sut()
    const beers = body.data
    for (const beer of beers) {
      expect(Object.keys(beer)).to.deep.equal(['type', 'name', 'refrigeration', 'currentTemperature', 'valid'])
      expect(Object.keys(beer.refrigeration)).to.deep.equal(['min', 'max'])
    }
  })
})
