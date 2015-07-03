/// <reference path="phaser.js" />
var width = window.innerWidth;
var height = window.innerHeight;

// using canvas here just because it runs faster for the body debug stuff
var game = new Phaser.Game(width, height, Phaser.AUTO, 'test', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) {
    // nothing here
};
var isoGroup, water = [];
var floorGroup;
var treeGroup;
var player;
var cobra;
var cursors;
var backgroundMusic;
BasicGame.Boot.prototype =
{
    preload: function () {
        
        /*game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = false;*/
        
        // game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
        game.load.image('ground', 'assets/ground_tile.png');
        game.load.image('tree', 'assets/tree.png');
        game.load.audio('backgroundMusic', ['assets/audio/amazon-florest.mp3', 'assets/audio/amazon-florest.ogg']);
        game.load.spritesheet('cobra', 'assets/king_cobra.png', 95, 96);
        game.load.image('cube', 'assets/cube.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        // Set the world size
        game.world.setBounds(0, 0, 2048, 1024);
        // Start the physical system
        
        game.time.advancedTiming = true;
       
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
         
        game.plugins.add(new Phaser.Plugin.Isometric(game));
        //  Enable p2 physics
        //game.physics.startSystem(Phaser.Physics.P2JS);

        // Make things a bit more bouncey
        // game.physics.p2.restitution = 0.8;
    
        // set the middle of the world in the middle of the screen
        game.iso.anchor.setTo(0.5, 0.2);
    },
    create: function () {
        floorGroup = game.add.group();
        isoGroup = game.add.group();
        treeGroup = game.add.group();
        
        // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
        /*isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;*/
        
        // Adicionando som de fundo.
        backgroundMusic = game.add.audio('backgroundMusic');
        backgroundMusic.play();
        
        // set the gravity in our game
        game.physics.isoArcade.gravity.setTo(0, 0, -500);
        
        // set the Background color of our game
        game.stage.backgroundColor = "0xde6712";
        
        
        var floorTile;
        
        for (var xt = 1024; xt > 0; xt -= 35) {
            for (var yt = 1024; yt > 0; yt -= 35) {
                floorTile = game.add.isoSprite(xt, yt, 0.2, 'ground', 0, floorGroup);
                floorTile.anchor.set(0.5,0);
                
                game.physics.isoArcade.enable(floorTile);
                floorTile.body.collideWorldBounds = true;
                floorTile.body.bounce.set(1, 1, 0.2);
                
            }
        }
        
        /*var tiles = [
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
                tile.anchor.set(0.5);
                tile.smoothed = false;
                tile.body.moves = false;
                if (tiles[i] === 4) {
                    tile.isoZ += 6;
                }
                if (tiles[i] <= 10 && (tiles[i] < 5 || tiles[i] > 6)) {
                    tile.scale.x = game.rnd.pick([-1, 1]);
                }
                if (tiles[i] === 0) {
                    //water.push(tile);
                }
                i++;
            }
        }*/
	        
        var treeTile;
        
        for (var xt = 1024; xt > 0; xt -= 35) {
	            for (var yt = 1024; yt > 0; yt -= 35) {
	            	
	            	var rnd = rndNum(190);
	            	
	            	if (rnd == 0) {
	            		treeTile = game.add.isoSprite(xt, yt, 0, 'tree', 0, isoGroup);
	            		treeTile.anchor.set(0.5);
                        game.physics.isoArcade.enable(treeTile);
                        treeTile.body.collideWorldBounds = true;
                        treeTile.body.immovable = true;
                        treeTile.tint = 0x86bfda;
                        treeTile.body.bounce.set(1, 1, 0.2);
                                
	            	}
	            	else if (rnd == 1)
	            	{
	            		treeTile = game.add.isoSprite(xt, yt, 0, 'tree', 0, isoGroup);
	            		treeTile.anchor.set(0.5);
                        game.physics.isoArcade.enable(treeTile);
                        treeTile.body.collideWorldBounds = true;
                        treeTile.body.immovable = true;
                        treeTile.body.bounce.set(1, 1, 0.2);
	            	}
	            	else if (rnd == 2)
	            	{
	            		treeTile = game.add.isoSprite(xt, yt, 0, 'tree', 0, isoGroup);
	            		treeTile.anchor.set(0.5);
                        game.physics.isoArcade.enable(treeTile);
                        treeTile.body.collideWorldBounds = true;
                        treeTile.body.immovable = true;
                        treeTile.body.bounce.set(1, 1, 0.2);
                               
	            	}
                    else if (rnd == 3)
	            	{
	            		treeTile = game.add.isoSprite(xt, yt, 0, 'cube', 0, isoGroup);
	            		treeTile.anchor.set(0.5);
                        game.physics.isoArcade.enable(treeTile);
                        treeTile.body.collideWorldBounds = true;
                        treeTile.body.bounce.set(1, 1, 0.2);
	            	}
	            }
        }
        
        // Create a cobra.
        cobra = game.add.isoSprite(150, 180, 0, 'cobra', 0, isoGroup);
        // Animations.
        cobra.animations.add('left', [9, 10, 11], 10, true);
        cobra.animations.add('right', [3, 4, 5], 10, true);
        cobra.anchor.set(0.5);
        game.physics.isoArcade.enable(cobra);
        cobra.body.collideWorldBounds = true;
      
        // Create player.
        player = game.add.isoSprite(50, 80, 0, 'dude', 0, isoGroup);

        // player = game.add.sprite(350, game.world.height - 350, 'dude');
    
        
        player.anchor.set(0.5);

        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
      
        //  Player physics properties. Give the little guy a slight bounce.
        
/*        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300; */
      
      // game.physics.p2.enable(player);
    
       // player.body.setCircle(44);      
        game.camera.follow(player);
        
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    update: function () {
        /*water.forEach(function (w) {
            w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
        });*/
        
        game.physics.isoArcade.collide(isoGroup);
        
        game.iso.topologicalSort(isoGroup);
        
        //correção na junção dos sprites de solo
        game.iso.topologicalSort(floorGroup);
       // game.physics.isoArcade.collide(treeGroup,player);
        
        //game.physics.isoArcade.collide(player);
        //game.physics.p2.
        // game.physics.isoArcade.collide(water);
        
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;            
            player.animations.play('left');
            
            // Cobra moves.
            cobra.body.velocity.x = -150;
            cobra.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
            
            cobra.body.velocity.x = 150;
            cobra.animations.play('right');
        }
        else if (cursors.up.isDown)
        {
            player.body.velocity.y = -150;
            player.animations.play('right');
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 150;
            player.animations.play('left');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }
        
    },
    render: function () {
        isoGroup.forEach(function (tree) {
            game.debug.body(tree, 'rgba(189, 221, 235, 0.6)', false);
        });
        
        /*
        floorGroup.forEach(function (ground) {
            game.debug.body(ground, 'rgba(189, 221, 235, 0.6)', false);
        }); */
         
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
    }
    
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

// generate random number
function rndNum(num) {

    return Math.round(Math.random() * num);

}