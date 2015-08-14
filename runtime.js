requirejs.config({
  paths: {
    EasyStar: 'bower_components/easystarjs/bin/easystar-0.2.1.min',
    Phaser: 'bower_components/phaser/build/phaser',
    PhaserDebug: 'bower_components/phaser-debug/dist/phaser-debug',
    PhaserTiled: 'bower_components/phaser-tiled/dist/phaser-tiled',
    PhaserIsometricPlugin: 'bower_components/phaser-plugin-isometric/dist/phaser-plugin-isometric'
    },
  shim: {
      'PhaserIsometricPlugin' :{

          deps: ['Phaser']
      },
      'PhaserDebug' :{

          deps: ['Phaser']
      },
      'PhaserTiled' :{

          deps: ['Phaser']
      }
      
  }
});

var game = {};
//a ordem importa neste caso
require([

  'modules/PhaserGame',
  'modules/states/BasicGame',
  'modules/states/level2',
  'modules/states/GameTitle',
  'modules/states/GameOver',
 // 'modules/units/Caapora'
 // 'modules/states/Preload',

], function (PhaserGame, BasicGame, level2, GameTitle, GameOver, Caapora) { //PhaserGame, BootState, PreloadState,

  game = new PhaserGame(800, 600, Phaser.AUTO , 'test', null, true, false);

 // game.state.add('Boot', BootState);
  game.state.add('GameTitle', GameTitle);
  game.state.add('BasicGame', BasicGame);
  game.state.add('level2', level2);
  game.state.add('GameOver', GameOver);
  game.state.start('GameTitle');
});
