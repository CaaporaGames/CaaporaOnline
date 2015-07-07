requirejs.config({
  paths: {
    Phaser: 'bower_components/phaser/build/phaser',  
    PhaserIsometricPlugin: 'bower_components/phaser-plugin-isometric/dist/phaser-plugin-isometric' 
    },
  shim: {
      'PhaserIsometricPlugin' :{
          
          deps: ['Phaser']
      }
  }  
});

var game = {};

require([
  'modules/PhaserGame',
  'modules/states/GameTitle',
 // 'modules/states/Preload',
  'modules/states/BasicGame'
], function (PhaserGame, BasicGame,GameTitle) { //PhaserGame, BootState, PreloadState,

  game = new PhaserGame(800, 600, Phaser.AUTO , 'test', null, true, false);
 
 // game.state.add('Boot', BootState);
  game.state.add('BasicGame', BasicGame.Boot);
  game.state.add('GameTitle', GameTitle);
  game.state.start('GameTitle');
});