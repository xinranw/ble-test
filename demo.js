var Cylon = require('cylon');

var timerRobot = Cylon.robot({
  work: function(){
    every((1).seconds(), function(){
      console.log('1 minute');
    });
  }
});

timerRobot.start()
