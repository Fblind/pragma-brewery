const Beer = require('../models/beer')
const HttpError = require('fblind-http-error')
const ResponseUtils = require('../../reponse-utils')
class GetBeersRefrigerationStatus {
  constructor ({ beerService }) {
    this.beerService = beerService
  }

  static getErrorMessage (error) {
    const errorCodes = {
      INVALID_TYPE: { code: 'INVALID_TYPE', message: `Type is not valid, should be one of [${Beer.validTypes().join(', ')}]`, status: 400 }
    }

    // TODO: move to response utils
    if (errorCodes[error.message]) {
      const { code, message, status } = errorCodes[error.message]
      return new HttpError(code, message, status)
    }
    return error
  }

  static validateRequest (req) {
    const { type } = req.params
    if (!Beer.validTypes().includes(type)) {
      throw new Error('INVALID_TYPE')
    }
  }

  static formatResponse (refrigerationStatus) {
    return {
      refrigerationStatus: refrigerationStatus.valid
    }
  }

  handler () {
    return async (req, res) => {
      try {
        GetBeersRefrigerationStatus.validateRequest(req)
        const refrigerationStatus = await this.beerService.getRefrigerationStatus(req.params.type)
        return ResponseUtils.success(res)(GetBeersRefrigerationStatus.formatResponse(refrigerationStatus))
      } catch (error) {
        return ResponseUtils.error(res, GetBeersRefrigerationStatus.getErrorMessage(error))
      }
    }
  }
}

module.exports = GetBeersRefrigerationStatus
