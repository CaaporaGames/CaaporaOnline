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
  'PhaserGame',
  'states/Boot',
  'states/BasicGame',
  'states/level2',
  'states/GameTitle',
  'states/GameOver',
  'states/LevelN',
  'states/Vitoria',
  'states/MapMaker',
  'states/Prologo'

], function (PhaserGame, BootState, BasicGame, level2, GameTitle, GameOver, LevelN, Vitoria, MapMaker, Prologo) { //PhaserGame, BootState, PreloadState,

  game = new PhaserGame(800, 600, Phaser.AUTO , 'test', null, true, false);

  game.state.add('Boot', BootState);
  game.state.add('GameTitle', GameTitle);
  game.state.add('Prologo', Prologo);
  game.state.add('MapMaker', MapMaker);
  game.state.add('BasicGame', BasicGame);
  game.state.add('level2', level2);
  game.state.add('LevelN', LevelN);
  game.state.add('GameOver', GameOver);
  game.state.add('Vitoria', Vitoria);
  game.state.start('Boot');
});
