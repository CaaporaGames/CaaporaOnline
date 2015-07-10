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
//a ordem importa neste caso
require([
    
  'modules/PhaserGame',
  'modules/states/BasicGame',
  'modules/states/GameTitle'
 // 'modules/states/Preload',
  
], function (PhaserGame, BasicGame,GameTitle) { //PhaserGame, BootState, PreloadState,

  game = new PhaserGame(800, 600, Phaser.AUTO , 'test', null, true, false);
 
 // game.state.add('Boot', BootState);
  game.state.add('GameTitle', GameTitle);
  game.state.add('BasicGame', BasicGame);  
  game.state.start('GameTitle');
});