const request = require('supertest')
const { expect } = require('chai')
const app = require('../../../index')
const path = '/beers'

describe('GET /beers', () => {
  beforeEach(() => {})
  afterEach(() => {})

  function sut () {
    return request(app)
      .get(path)
      .expect(200)
  }
  it('should response 200', async () => {
    const response = await sut()
    expect(response.status).to.equal(200)
  })

  it('should response with a list of beers', async () => {
    const { body } = await sut()
    expect(body.data).length(6)
  })

  it('should every beer have type and refrigeration', async () => {
    const { body } = await sut()
    const beers = body.data
    for (const beer of beers) {
      expect(beer).to.include.all.keys('type', 'refrigeration')
    }
  })
})
