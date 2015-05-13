var noble = require('noble');

var testServiceUuid = '11112222333344445555666677778888';

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // Once the BLE radio has been powered on, it is possible
    // to begin scanning for services. Pass an empty array to
    // scan for all services (uses more time and power).
    //
    console.log('scanning...');
    noble.startScanning([testServiceUuid], false);
  }
  else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  // we found a peripheral, stop scanning
  noble.stopScanning();

  console.log('found peripheral:', peripheral.advertisement);

  peripheral.connect(function(err) {
    if (err){
      console.dir(err);
      return;
    }

    peripheral.discoverServices([testServiceUuid], function(err, services) {
      console.dir(services);
    });
  });
});