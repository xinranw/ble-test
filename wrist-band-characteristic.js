var util = require('util');
var bleno = require('bleno');
var Cylon = require('cylon');

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
  var waitString = offset + "min left";

  Cylon
  .robot({ name: 'LCD'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
  .on('ready', function(my) {
    writeToScreen(my.screen, waitString);
  });

  Cylon.start();

  callback(this.RESULT_SUCCESS);
};

function write(screen, message) {
  screen.setCursor(0,0);
  screen.write(message);
}

function writeToScreen(screen, string){
  Cylon
  .robot({ name: 'LCD'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
  .on('ready', function(my) {
    write(my.screen, waitString);
  });

  Cylon.start();
}

module.exports = WristBandCharacteristic;