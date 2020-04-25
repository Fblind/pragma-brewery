const Beer = require('../models/beer')
class GetBeers {
  // constructor ({}) {}
  static getErrorMessage () {}

  static validateRequest (req) {}
  static formatResponse (beers) {
    return beers
  }

  handler (req, res) {
    try {
      // GetBeers.validateRequest(req)
      const beers = Beer.find({})
      // Response.success(GetBeers.formatResponse(beers))(res)
      return res.json({ data: beers })
    } catch (error) {
      // const mapError = GetBeers.getErrorMessage(error)
      // Response.error(mapError)
    }
  }
}

module.exports = GetBeers
