// Create a cat.
function Tree(x, y) {

  var image = 'tree';
  this.basicGame = opts.basicGame;
  this.game = opts.game;
  this.x = x;
  this.y = y;

  if (opts.image) {
    key = opts.image;
  }

  tree = game.add.isoSprite(xt * this.basicGame.tileSize, yt * this.basicGame.tileSize, 0, image, 0, this.basicGame.isoGroup);

    // enable physics on the tree
  game.physics.isoArcade.enable(tree);
  tree.body.collideWorldBounds = true;
  tree.body.immovable = true;
  tree.body.bounce.set(0.2, 0.2, 0);   
  tree.anchor.set(0.5);

}