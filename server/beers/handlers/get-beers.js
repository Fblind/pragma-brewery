const Beer = require('../models/beer')
const ResponseUtils = require('../../reponse-utils')
class GetBeers {
  // constructor ({}) {}
  static getErrorMessage (error) {
    return error
  }

  static validateRequest (req) {}
  static formatResponse (beers) {
    return beers
  }

  handler (req, res) {
    return async (req, res) => {
      try {
        // GetBeers.validateRequest(req)
        const beers = Beer.find({})
        return ResponseUtils.success(res)(GetBeers.formatResponse(beers))
      } catch (error) {
        return ResponseUtils.error(res, GetBeers.getErrorMessage(error))
      }
    }
  }
}

module.exports = GetBeers
