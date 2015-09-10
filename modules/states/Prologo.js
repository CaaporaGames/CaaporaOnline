define([
  'Phaser'
], function (Phaser) {

  var Prologo;
  var text, text2;
  var index = 0;
  var line = '';
  var content = [
    " ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Praesent venenatis convallis sollicitudin.",
    "Donec et neque ultricies, tristique enim at, venenatis purus.",
    "Cras imperdiet purus quis varius condimentum.",
    "Duis sit amet felis sed tortor hendrerit tincidunt in vel libero.",
    "Mauris efficitur lacus a augue venenatis imperdiet.",
    "Sed a purus ullamcorper orci ultrices efficitur vitae nec mauris.",
    "Suspendisse tempus vel lectus a facilisis.",
    " "
  ];
  var content2 = [];

  Prologo = function () {};

  Prologo.prototype = {

    preload: function() {

      game.load.image('prologo', 'assets/images/prologo.png');
      game.load.image('skip', 'assets/images/skip.png');

    },

    create: function() {

      game.stage.backgroundColor = "0x8e5323";
      game.add.sprite(75, 50, 'prologo');
      text = game.add.text(32, 100, '', { font: "12pt Courier", fill: "#000000", stroke: "#000000", strokeThickness: 2 });
      this.nextLine();

      this.add.button(700, 550, 'skip', this.startGame, this);

    },

    startGame: function() {

      game.state.start('BasicGame');

    },

    updateLine: function () {

      if (line.length < content[index].length)
      {
        line = content[index].substr(0, line.length + 1);
        text.setText(line + "\n");
      }
      else
      {
        //  Wait 2 seconds then start a new line
        game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
      }

    },

    nextLine: function () {

      index++;

      if (index < content.length)
      {
        line = '';
        game.time.events.repeat(80, content[index].length + 1, this.updateLine, this);

      } else {

        this.startGame();

      }

    }

  };

  return Prologo;

});
