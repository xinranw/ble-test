var util = require('util');
var bleno = require('bleno');
var mraa = require ('mraa');
var LCD  = require ('jsupm_i2clcd');

var myLCD = new LCD.Jhd1313m1(6, 0x3E, 0x62);


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

WristBandCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('write received');
  console.log('Write request: ', data.readUInt8(offset));
  var waitTime = data.readUInt8(offset);
  var waitString = waitTime + "min left";

  writeToScreen(waitString);

  callback(this.RESULT_SUCCESS);
};

function writeToScreen(string){
  myLCD.write(string);
}

module.exports = WristBandCharacteristic;