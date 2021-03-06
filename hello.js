var Cylon = require('cylon');

var print = Cylon.robot({
  work: function() {
    every((1).second(), function() {
      console.log("Hello, human!");
    });
  }
});

function writeToScreen(screen, message) {
  screen.setCursor(0,0);
  screen.write(message);
}

var lcd = Cylon
  .robot({ name: 'LCD'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
  .on('ready', function(my) {
    writeToScreen(my.screen, "Ready!");
    my.screen.clear();
  });
lcd.start();
