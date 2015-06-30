/// <reference path="phaser.js" />

// using canvas here just because it runs faster for the body debug stuff
var game = new Phaser.Game(800, 400, Phaser.CANVAS, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) {
    // nothing here
};

var isoGroup, water = [];

BasicGame.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.5, 0.1);
    },
    create: function () {
        isoGroup = game.add.group();

        // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
        isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        var tileArray = [];
        tileArray[0] = 'water';
        tileArray[1] = 'sand';
        tileArray[2] = 'grass';
        tileArray[3] = 'stone';
        tileArray[4] = 'wood';
        tileArray[5] = 'watersand';
        tileArray[6] = 'grasssand';
        tileArray[7] = 'sandstone';
        tileArray[8] = 'bush1';
        tileArray[9] = 'bush2';
        tileArray[10] = 'mushroom';
        tileArray[11] = 'wall';
        tileArray[12] = 'window';

        var tiles = [
            9, 2, 1, 1, 4, 4, 1, 6, 2, 10, 2,
            2, 6, 1, 0, 4, 4, 0, 0, 2, 2, 2,
            6, 1, 0, 0, 4, 4, 0, 0, 8, 8, 2,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 9, 2,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0,
            11, 11, 12, 11, 3, 3, 11, 12, 11, 11, 11,
            3, 7, 3, 3, 3, 3, 3, 3, 7, 3, 3,
            7, 1, 7, 7, 3, 3, 7, 7, 1, 1, 7
        ];

        var size = 32;

        var i = 0, tile;
        for (var y = size; y <= game.physics.isoArcade.bounds.frontY - size; y += size) {
            for (var x = size; x <= game.physics.isoArcade.bounds.frontX - size; x += size) {
                // this bit would've been so much cleaner if I'd ordered the tileArray better, but I can't be bothered fixing it :P
                tile = game.add.isoSprite(x, y, tileArray[tiles[i]].match("water") ? 0 : game.rnd.pick([2, 3, 4]), 'tileset', tileArray[tiles[i]], isoGroup);
                tile.anchor.set(0.5, 1);
                tile.smoothed = false;
                tile.body.moves = false;
                if (tiles[i] === 4) {
                    tile.isoZ += 6;
                }
                if (tiles[i] <= 10 && (tiles[i] < 5 || tiles[i] > 6)) {
                    tile.scale.x = game.rnd.pick([-1, 1]);
                }
                if (tiles[i] === 0) {
                    water.push(tile);
                }
                i++;
            }
        }
    },
    update: function () {
        water.forEach(function (w) {
            w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
        });
    },
    render: function () {
        isoGroup.forEach(function (tile) {
            game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        });
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');