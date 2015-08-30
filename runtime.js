requirejs.config({
  paths: {
    EasyStar: 'vendor/js/easystar-0.2.1.min',
    Phaser: 'vendor/js/phaser',
    PhaserDebug: 'vendor/js/phaser-debug',
    PhaserTiled: 'vendor/js/phaser-tiled',
    PhaserIsometricPlugin: 'vendor/js/phaser-plugin-isometric'
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
  'modules/states/Boot',
  'modules/states/BasicGame',
  'modules/states/level2',
  'modules/states/GameTitle',
  'modules/states/GameOver',
  'modules/states/LevelN'
 // 'modules/units/Caapora'
 // 'modules/states/Preload',

], function (PhaserGame, BootState, BasicGame, level2, GameTitle, GameOver, LevelN) { //PhaserGame, BootState, PreloadState,

  game = new PhaserGame(800, 600, Phaser.AUTO , 'test', null, true, false);

  game.state.add('Boot', BootState);
  game.state.add('GameTitle', GameTitle);
  game.state.add('BasicGame', BasicGame);
  game.state.add('level2', level2);
  game.state.add('LevelN', LevelN);
  game.state.add('GameOver', GameOver);
  game.state.start('Boot');
});
