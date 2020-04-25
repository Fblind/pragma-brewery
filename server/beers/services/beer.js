const Beer = require('../models/beer')
class BeerService {
  constructor ({ apiClient }) {
    this.apiClient = apiClient
  }

  async getRefrigerationStatus (type) {
    const { data: temperatureSensor } = await this.apiClient.get(`https://temperature-sensor-service.herokuapp.com/sensor/${type}`)
    return Beer.getTemperatureValidation(type, temperatureSensor.temperature)
  }
}

module.exports = BeerService
