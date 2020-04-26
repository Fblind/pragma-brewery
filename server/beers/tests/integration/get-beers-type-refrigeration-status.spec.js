const request = require('supertest')
const { expect } = require('chai')
const nock = require('nock')
const app = require('../../../index')
const path = '/beers'

describe('GET /beers/:type/refrigeration-status', () => {
  let nockTemperatureSensor = null
  let type = null
  let temperature = null
  beforeEach(() => {
    type = 'pilsner'
    temperature = 5
  })

  afterEach(() => {
    nock.cleanAll()
  })

  function nockApis () {
    nockTemperatureSensor = nock('https://temperature-sensor-service.herokuapp.com')
      .get(`/sensor/${type}`)
      .reply(200, { id: type, temperature })
  }

  function sut (statusCode = 200) {
    nockApis()
    return request(app)
      .get(`${path}/${type}/refrigeration-status`)
      .expect(statusCode)
  }

  it('should response 400 if type is not valid', async () => {
    type = 'invalid'
    const response = await sut(400)
    expect(response.status).to.equal(400)
  })

  it('should response 400 INVALID_TYPE if type is not valid', async () => {
    type = 'invalid'
    const { body } = await sut(400)
    expect(body).to.deep.equal({
      code: 'INVALID_TYPE',
      message: 'Type is not valid, should be one of [pilsner, ipa, lager, stout, wheat, paleAle]'
    })
  })

  it('should not send a request to get the temperature when there is an error at the request level', async () => {
    type = 'invalid'
    await sut(400)
    expect(nockTemperatureSensor.pendingMocks()).to.have.length(1)
  })

  it('should response 200', async () => {
    const response = await sut()
    expect(response.status).to.equal(200)
  })

  it('should request to get the temperature when the response is successful', async () => {
    await sut()
    expect(nockTemperatureSensor.pendingMocks()).to.have.length(0)
  })

  it('should response 200 with status value in the response', async () => {
    const { body } = await sut()
    expect(body.data).to.include.all.keys([
      'currentTemperature',
      'name',
      'refrigeration',
      'type',
      'valid'
    ])
  })

  it('should response 200 with status fail in the response', async () => {
    temperature = 2
    const { body } = await sut()
    expect(body.data).to.deep.include({currentTemperature: temperature, valid: false})
  })

  it('should response 200 with status ok in the response', async () => {
    const { body } = await sut()
    expect(body.data).to.deep.include({currentTemperature: temperature, valid: true})
  })
})
