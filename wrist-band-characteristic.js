var util = require('util');
var bleno = require('bleno');

function WristBandCharacteristic(){
  bleno.Characteristic.call(this, {
    uuid: '11112222333344445555666677770000',
    properties: ['read', 'notify', 'write'],
    descriptors: [
    new bleno.Descriptor({
      uuid: '1234',
      value: 'test service characteristic'
    }),
    ]
  });
}
util.inherits(WristBandCharacteristic, bleno.Characteristic);
WristBandCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    console.dir('offset:', offset);
    callback(this.RESULT_ATTR_NOT_LONG, null);
  } else {
    console.dir('read');
    // var data = new Buffer(2);
    // data.writeUInt16BE('HI', 0);
    // callback(this.RESULT_SUCCESS, data);
    callback(this.RESULT_SUCCESS, '');
  }
};

module.exports = WristBandCharacteristic;