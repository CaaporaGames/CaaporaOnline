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
var cursors;
BasicGame.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;
        /*game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = false;*/

        game.plugins.add(new Phaser.Plugin.Isometric(game));
        
        // game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
        game.load.image('tile', 'assets/ground_tile.png');
        game.load.image('tree', 'assets/tree.png');
        game.load.image('cube', 'assets/cube.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        // Set the world size
        game.world.setBounds(0, 0, 2048, 1024);
        // Start the physical system
       
         game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
         
        //  Enable p2 physics
	//game.physics.startSystem(Phaser.Physics.P2JS);

         // Make things a bit more bouncey
       // game.physics.p2.restitution = 0.8;
    
        // set the middle of the world in the middle of the screen
        game.iso.anchor.setTo(0.5, 0);
    },
    create: function () {
        isoGroup = game.add.group();
        floorGroup = game.add.group();
        treeGroup = game.add.group();
        
        // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
        /*isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;*/
        
        // set the gravity in our game
        game.physics.isoArcade.gravity.setTo(0, 0, -500);
        
        // set the Background color of our game
        game.stage.backgroundColor = "0xde6712";
        
        
        var floorTile;
        
        for (var xt = 1024; xt > 0; xt -= 35) {
            for (var yt = 1024; yt > 0; yt -= 35) {
                floorTile = game.add.isoSprite(xt, yt, 0, 'tile', 0, isoGroup);
                floorTile.anchor.set(0.5,0.2);
                
             //   game.physics.p2.enable(floorTile);
              //  floorTile.body.setCircle(44);     
             //  floorTile.body.static = true;
            }
        }
        
        var treeTile;
	        for (var xt = 1024; xt > 0; xt -= 35) {
	            for (var yt = 1024; yt > 0; yt -= 35) {
	            	
	            	var rnd = rndNum(90);
	            	
	            	if (rnd == 0) {
	            		treeTile = game.add.isoSprite(xt, yt, 0, 'tree', 0, isoGroup);
	            		treeTile.anchor.set(0.5,0.2);
                                game.physics.isoArcade.enable(treeTile);
                                treeTile.body.collideWorldBounds = true;
                                treeTile.body.immovable = true;
                                treeTile.tint = 0x86bfda;
                                treeTile.body.bounce.set(1, 1, 0.2);
                                
	            	}
	            	else if (rnd == 1)
	            	{
	            		treeTile = game.add.isoSprite(xt, yt, 0, 'tree', 0, isoGroup);
	            		treeTile.anchor.set(0.5,0.2);
                                game.physics.isoArcade.enable(treeTile);
                                treeTile.body.collideWorldBounds = true;
                                treeTile.body.immovable = true;
                                treeTile.body.bounce.set(1, 1, 0.2);
	            	}
	            	else if (rnd == 2)
	            	{
	            		treeTile = game.add.isoSprite(xt, yt, 0, 'tree', 0, isoGroup);
	            		treeTile.anchor.set(0.5,0.2);
                                game.physics.isoArcade.enable(treeTile);
                                treeTile.body.collideWorldBounds = true;
                                treeTile.body.immovable = true;
                                treeTile.body.bounce.set(1, 1, 0.2);
                               
	            	}else if (rnd == 3)
	            	{
	            		treeTile = game.add.isoSprite(xt, yt, -10, 'cube', 0, isoGroup);
	            		treeTile.anchor.set(0.5,0.2);
                                game.physics.isoArcade.enable(treeTile);
                                treeTile.body.collideWorldBounds = true;
                                //treeTile.body.immovable = true;
                                treeTile.body.bounce.set(1, 1, 0.2);
                                treeTile.body.drag.set(100, 100, 0);
                               
	            	}
                        
	            	
                       
	            	

	            }
	        }
        
      // Create player.
        player = game.add.isoSprite(50, 80, 0, 'dude', 0, isoGroup);
        // player = game.add.sprite(350, game.world.height - 350, 'dude');
        

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.anchor.set(0.5);
        //  Player physics properties. Give the little guy a slight bounce.
        game.physics.isoArcade.enable(player);
/*        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300; */
        player.body.collideWorldBounds = true;
        
        player.body.bounce.set(1, 1, 0.2);
        
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
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
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
        isoGroup.forEach(function (tile) {
           // game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        });
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