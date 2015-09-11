/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/

// Create a cat.
function Cat (opts) {

  var image = 'cat';
  this.basicGame = opts.basicGame;
  this.game = opts.game;

  if (opts.image) {
    key = opts.image;
  }

  this.basicGame.setCat(this.basicGame.add.isoSprite(11 * this.basicGame.getTileSize(), 11 * this.basicGame.getTileSize(), 0, 'cat', 0, this.basicGame.getIsoGroup()));
  cat = this.basicGame.getCat();

  // add the animations from the spritesheet
  cat.animations.add('S', [1, 5, 9], 10, true);
  cat.animations.add('W', [0, 4, 8], 10, true);
  cat.animations.add('N', [2, 6, 10], 10, true);
  cat.animations.add('E', [3, 7, 11], 10, true);


  cat.anchor.set(0.5);

  // enable physics on the cobra enemy
  this.game.physics.isoArcade.enable(cat);
  cat.body.collideWorldBounds = true;

  // set the physics bounce amount on each axis  (X, Y, Z)
  cat.body.bounce.set(0.2, 0.2, 0);

  // set the slow down rate on each axis (X, Y, Z)
  cat.body.drag.set(100, 100, 0);
}
Cat.prototype = {
  movement: function () {
    cat.body.velocity.x = 0;
    cat.body.velocity.y = 0;

    if (this.basicGame.getNumRandomico() == 1) {

      cat.body.velocity.x = 90;
      cat.body.velocity.y = 90;
      cat.animations.play('S');

    } else if (this.basicGame.getNumRandomico() == 2) {

      cat.body.velocity.x = -90;
      cat.body.velocity.y = -90;
      cat.animations.play('N');

    } else if (this.basicGame.getNumRandomico() == 3) {

      cat.body.velocity.x = -90;
      cat.body.velocity.y = 90;
      cat.animations.play('W');

    } else if (this.basicGame.getNumRandomico() == 4) {

      cat.body.velocity.x = 90;
      cat.body.velocity.y = -90;
      cat.animations.play('E');

    } else {

      //  Stand still
      cat.animations.stop();

      cat.frame = 1;

      cat.body.velocity.x = 0;
      cat.body.velocity.y = 0;
    }
  }
}
