define([
  'Phaser'
  //'modules/extensions/MyExtension',
  //'modules/units/MyUnit',
  //'modules/factories/MyFactory'
], function (Phaser) {
    
    //console.log('phaser', Phaser);
    //console.log('PIXI', PIXI);
    //console.log('p2', p2);

  var PhaserGame = function (w, h) {
    return new Phaser.Game(w, h, Phaser.AUTO);
  };

  return PhaserGame;
});