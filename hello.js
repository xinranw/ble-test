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
});

Cylon
.robot({name:'Hello'})
.on('ready', function(){
  every((1).second(), function(){
    console.dir("hello!!");
  });
});

Cylon.start();

