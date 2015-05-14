var util = require('util');
var bleno = require('bleno');
var WristBandCharacteristic = require('./wristband-characteristic');

var wristBandCharacteristic = new WristBandCharacteristic();

function WristBandService() {
  bleno.PrimaryService.call(this, {
    uuid: '11112222333344445555666677778888',
    characteristics: [
    wristBandCharacteristic
    ]
  });
}
util.inherits(WristBandService, bleno.PrimaryService);

module.exports = WristBandService;
