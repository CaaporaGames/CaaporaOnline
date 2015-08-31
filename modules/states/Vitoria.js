define([
  'Phaser'
], function (Phaser) {

  var vitoria;

  vitoria = function () {};

  vitoria.prototype = {

    preload: function() {

    //  game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
      game.load.image('vitoria', 'assets/images/parabens.png');

    },

    create: function() {

      this.add.button(0, 0, 'vitoria', this.retryGame, this);
     // var text = game.add.bitmapText(game.world.centerX - 200, game.world.centerY - 100, 'desyrel', 'GAME OVER', 64);

    },

    retryGame: function() {

      game.state.start('Boot');

    }
  };

  return vitoria;

});
