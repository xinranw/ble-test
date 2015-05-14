var Cylon = require('cylon');
var util = require('util');
var bleno = require('bleno');
var WristBandService = require('./wrist-band-service');

var timerRobot = Cylon.robot({
  work: function(){
    every((1).seconds(), function(){
      console.log('1 minute');
    });
  }
});

var wristBandService = new WristBandService();


bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising('WristBandService', [wristBandService.uuid], function(err) {
      if (err) {
        console.dir(err);
      }
    });
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.dir('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      wristBandService
      ]);
  }
});

