define([
  'Phaser',
  'PhaserDebug',
  'PhaserTiled',
  //'modules/extensions/MyExtension',
  'modules/units/Caapora',
  'modules/units/Enemy'
  //'modules/factories/MyFactory'
], function (Phaser, Caapora, Enemy) {
    
    //console.log('phaser', Phaser);
    //console.log('PIXI', PIXI);
    //console.log('p2', p2);

  var PhaserGame = function (w, h) {
    return new Phaser.Game(w, h, Phaser.AUTO);
  };

  return PhaserGame;
});