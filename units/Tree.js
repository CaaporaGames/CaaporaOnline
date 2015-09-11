function Tree(opts) {

    this.isoGroup = opts.isoGroup;
    this.tileName = opts.tileName;
    this.tileSize = opts.tileSize;
    this.xt = opts.xt;
    this.yt = opts.yt;

    this.treeTile = game.add.isoSprite(this.xt * this.tileSize, this.yt * this.tileSize, 0, opts.tileName , 0, this.isoGroup);

    this.treeTile.anchor.set(0.5);
    game.physics.isoArcade.enable(this.treeTile);
    this.treeTile.body.collideWorldBounds = true;
    this.treeTile.body.immovable = true;
    this.treeTile.body.bounce.set(1, 1, 0.2);

};