var Cylon = require('cylon');

function writeToScreen(screen, message) {
  screen.setCursor(0,0);
  screen.write(message);
}

Cylon
.robot({ name: 'LCD'})
.connection('edison', { adaptor: 'intel-iot' })
.device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
.on('ready', function(my) {
  writeToScreen(my.screen, "Ready!");

  my.screen.subscribe('NewWaitTime', function(err, data){
    if (err){
      console.dir('error');
      console.log(err);
    }
    console.log('received:', data);
  });
});

Cylon.start();