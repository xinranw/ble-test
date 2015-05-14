var Cylon = require('cylon');

var print = Cylon.robot({
  work: function() {
    every((1).second(), function() {
      console.log("Hello, human!");
    });
  }
});

var lcd = Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    lcd: { driver: 'lcd' }
  },

  work: function(my) {
    my.lcd.on('start', function(){
      my.lcd.print("Hello!");
    });
  }
});

lcd.start();
