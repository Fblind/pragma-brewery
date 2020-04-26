const Beer = require('../models/beer')
const HttpError = require('fblind-http-error')
const ResponseUtils = require('../../reponse-utils')
class GetBeersRefrigerationStatus {
  constructor ({ beerService }) {
    this.beerService = beerService
  }

  static getErrorMessage (error) {
    return error
  }

  static validateRequest (req) {}

  static formatResponse (refrigerationStatus) {
    return refrigerationStatus
  }

  handler () {
    return async (req, res) => {
      try {
        const types = Beer.validTypes()
        const fetchBeers = types.map(type => this.beerService.getRefrigerationStatus(type))
        const beersWithRefrigerationStatus = await Promise.all(fetchBeers)
        return ResponseUtils.success(res)(GetBeersRefrigerationStatus.formatResponse(beersWithRefrigerationStatus))
      } catch (error) {
        return ResponseUtils.error(res, GetBeersRefrigerationStatus.getErrorMessage(error))
      }
    }
  }
}

module.exports = GetBeersRefrigerationStatus
