requirejs.config({
  paths: {
    Phaser: 'bower_components/phaser/build/phaser.min',  
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
 // 'modules/states/Boot',
 // 'modules/states/Preload',
  'modules/states/stateOne'
], function (PhaserGame, StateOne) { //PhaserGame, BootState, PreloadState,

  game = new PhaserGame(800, 600, Phaser.AUTO , 'test', null, true, false);
 
 // game.state.add('Boot', BootState);
 // game.state.add('Preload', PreloadState);
  game.state.add('StateOne', StateOne.Boot);
  game.state.start('StateOne');
});