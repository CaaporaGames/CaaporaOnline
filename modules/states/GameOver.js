define([
  'Phaser'
], function (Phaser) {

  var gameOver;

  gameOver = function () {};

  gameOver.prototype = {

    preload: function() {

      game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
      game.load.image('bg', 'assets/images/caipora-background.png');
      game.load.image('gameover', 'assets/images/caapora-gameover.png');

    },

    create: function() {

      game.add.sprite(0, 0, 'bg');
      this.add.button(100, 50, 'gameover', this.retryGame, this);
      var text = game.add.bitmapText(game.world.centerX - 200, game.world.centerY - 100, 'desyrel', 'GAME OVER', 64);

    },

    retryGame: function() {

      game.state.start('BasicGame');

    }
  };

  return gameOver;

});
