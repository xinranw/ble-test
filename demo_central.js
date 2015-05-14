var noble = require('noble');
var _ = require('underscore');

var testServiceUuid = '11112222333344445555666677778888';
var connectedDeviceUuids = [];

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // Once the BLE radio has been powered on, it is possible
    // to begin scanning for services. Pass an empty array to
    // scan for all services (uses more time and power).
    //
    console.log('scanning...');
    noble.startScanning([], false);
  }
  else {
    noble.stopScanning();
  }
});

function shouldConnect(uuid){
  if (uuid === '99451ee45b9c4caf9299fe61716a41b3'){
    return true;
  } 
  return false;
}

function getWaitTime(){
  return Math.floor(Math.random() * 120);
}

noble.on('discover', function(peripheral) {
  // we found a peripheral, stop scanning
  // noble.stopScanning();

  if (shouldConnect(peripheral.uuid)){
    console.log('found peripheral data:', peripheral.uuid);
    console.log(peripheral.advertisement);

    peripheral.connect(function(err) {
      if (err){
        console.dir(err);
        return;
      }
      connectedDeviceUuids.push(peripheral.uuid);

      peripheral.discoverServices([testServiceUuid], function(err, services) {

      // Found services.
      services.forEach(function(service) {
        console.log('found service:', service.uuid);

        // Found characteristics
        service.discoverCharacteristics([], function(err, characteristics) {

          characteristics.forEach(function(characteristic) {
            console.log('found characteristic id:', characteristic.uuid);

            var waitTimeBuffer = new Buffer(1);
            waitTimeBuffer.writeUInt8(getWaitTime(), 0);
            characteristic.write(waitTimeBuffer, false, function(err){
              if (err){
                console.log('write error');
                console.log(err);
              }
              console.log('written');
            });

            // characteristic.discoverDescriptors(function(err, descriptors){
            //   descriptors.forEach(function(descriptor){
            //     console.dir(descriptor.uuid);
            //     descriptor.readValue(function(err, value){
            //       console.dir(value.toString());
            //     });
            //   });
            // });
          });
        });
      });
    });
    });
  }
});