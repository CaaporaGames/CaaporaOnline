function Fogo(opts) {

    this.isoGroup = opts.isoGroup;
    this.tileName = opts.tileName;
    this.tileSize = opts.tileSize;
    this.xt = opts.xt;
    this.yt = opts.yt;



    // Create flames.
    this.incendio = game.add.isoSprite(this.xt * this.tileSize + 50, this.yt * this.tileSize + 50, 0, this.tileName, 0, this.isoGroup);
    this.incendio.anchor.set(0.5, 0.5);
    this.incendio.animations.add('incendiar', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    game.physics.isoArcade.enable(this.incendio);
    this.incendio.body.collideWorldBounds = true;
    this.incendio.body.immovable = true;
    this.incendio.body.bounce.set(1, 1, 0.2);

};