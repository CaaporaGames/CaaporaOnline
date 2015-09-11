/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/

// Create a cat.
function Bat (opts) {

  var image = 'bat';
  this.basicGame = opts.basicGame;
  this.game = opts.game;

  if (opts.image) {
    key = opts.image;
  }

  this.basicGame.setBat(this.basicGame.add.isoSprite(11 * this.basicGame.getTileSize(), 11 * this.basicGame.getTileSize(), 0, image, 0, this.basicGame.getIsoGroup()));
  cat = this.basicGame.getBat();

  // add the animations from the spritesheet
  cat.animations.add('S', [0, 1, 2, 3, 4, 5], 10, true);
  cat.animations.add('E', [30, 31, 32, 33, 34, 35], 10, true);
  cat.animations.add('N', [20, 21, 22, 23, 24, 25],10, true);
  cat.animations.add('W', [10, 11, 12, 13, 14, 15], 10, true);


  cat.anchor.set(0.5);

  // enable physics on the cobra enemy
  this.game.physics.isoArcade.enable(cat);
  cat.body.collideWorldBounds = true;

  // set the physics bounce amount on each axis  (X, Y, Z)
  cat.body.bounce.set(0.2, 0.2, 0);

  // set the slow down rate on each axis (X, Y, Z)
  cat.body.drag.set(100, 100, 30);
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
