define([
  'Phaser',
  'PhaserIsometricPlugin'
], function (Phaser) {

        var BasicGame = function () {
           
        };

        BasicGame = function () {
            // nothing here
        };

        var isoGroup, water = [];
        var floorGroup;
        var treeGroup;
        var player;
        var cobra;
        var cursors;
        var backgroundMusic;
        var text;

        BasicGame.prototype = {

            preload: function () {
                
                console.log("preload de BasicGame");

                /*game.debug.renderShadow = false;
                game.stage.disableVisibilityChange = false;*/
               // console.log(game);    
                // game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
                game.load.image('ground', 'assets/ground_tile.png');
                game.load.image('tree', 'assets/tree.png');
                game.load.audio('backgroundMusic', ['assets/audio/amazon-florest.mp3', '../assets/audio/amazon-florest.ogg']);
                game.load.spritesheet('cobra', 'assets/king_cobra.png', 95, 96);
                game.load.image('rock', 'assets/rock.png');
                game.load.image('lifeBar', 'assets/life-bar.png');
                game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
                // Set the world size
                game.world.setBounds(0, 0, 4048, 2024);
                // Start the physical system

                game.time.advancedTiming = true;

                game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

                game.plugins.add(new Phaser.Plugin.Isometric(game));
                //  Enable p2 physics
                //game.physics.startSystem(Phaser.Physics.P2JS);

                // Make things a bit more bouncey
                // game.physics.p2.restitution = 0.8;

                // set the middle of the world in the middle of the screen
                game.iso.anchor.setTo(0.5, 0);
            }, 
            create: function () {
                floorGroup = game.add.group();
                isoGroup = game.add.group();
                treeGroup = game.add.group();
                


               // isoGroup.create(100, 0, 'lifeBar');


                this.camera = {x:0, y:0, direction:'', isMoving:false};
                // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
                /*isoGroup.enableBody = true;
                isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;*/

                // Adicionando som de fundo.
                backgroundMusic = game.add.audio('backgroundMusic');
                // backgroundMusic.play();

                // set the gravity in our game
                game.physics.isoArcade.gravity.setTo(0, 0, -500);

                // set the Background color of our game
                game.stage.backgroundColor = "0x000000";


                var floorTile;

                for (var xt = 0; xt < 2024; xt += 35) {
                    for (var yt = 0; yt < 2024; yt += 35) {
                        floorTile = game.add.isoSprite(xt, yt, 0.2, 'ground', 0, floorGroup);
                        floorTile.anchor.set(0.5,0.2);

                    }
                }

                var treeTile;
                var rocksTile;

                for (var xt = 2024; xt > 0; xt -= 35) {
                            for (var yt = 2024; yt > 0; yt -= 35) {

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
                                        rocksTile = game.add.isoSprite(xt, yt, 0, 'rock', 0, isoGroup);
                                        rocksTile.anchor.set(0.5);
                                game.physics.isoArcade.enable(rocksTile);
                                rocksTile.body.collideWorldBounds = true;
                                rocksTile.body.bounce.set(1, 1, 0.2);
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
                player = game.add.isoSprite(30, 80, 0, 'dude', 0, isoGroup);


                // player = game.add.sprite(350, game.world.height - 350, 'dude');

                var style = { font: "bold 14px Arial", fill: "#333", wordWrap: true, wordWrapWidth: 150, align: "center" };

                text = game.add.text(20, -50, "Caapora - HP: 100%", style);
                text.anchor.set(0.5);

                 player.addChild(text);

                player.anchor.set(0.5);

                player.lifebar = game.add.sprite(-20, -30, 'lifeBar');
                player.lifebar.anchor.setTo(0.2,1);
                player.addChild(player.lifebar);

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
               // game.camera.follow(player);

                cursors = game.input.keyboard.createCursorKeys();

            },
            update: function () {
                /*water.forEach(function (w) {
                    w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
                    w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
                });*/


                game.physics.isoArcade.collide(isoGroup);

                game.iso.topologicalSort(isoGroup);

                this.moveCamera();
                //correção na junção dos sprites de solo
                // game.iso.topologicalSort(floorGroup);
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

                /*
                isoGroup.forEach(function (tree) {
                    game.debug.body(tree, 'rgba(189, 221, 235, 0.6)', false);
                }); */

                /*
                floorGroup.forEach(function (ground) {
                    game.debug.body(ground, 'rgba(189, 221, 235, 0.6)', false);
                }); */

                game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
                // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
            },
            moveCamera: function(){
                if (this.camera.isMoving)
                    return;

                this.camera.isMoving = true;
                var mustMove = false;
                
                if (player.y > game.camera.y + game.height) {
                    this.camera.y += 1;
                    mustMove = true;
                }
                else if (player.y < game.camera.y) {
                    this.camera.y -= 1;
                    mustMove = true;
                }
                else if (player.x > game.camera.x + game.width) {
                    this.camera.x += 1;
                    mustMove = true;
                }
                else if (player.x < game.camera.x) {
                    this.camera.x -= 1;
                    mustMove = true;
                }

                if (mustMove) {
                    var t = game.add.tween(game.camera).to({x:this.camera.x*game.width, y:this.camera.y*game.height}, 600);
                    t.start();
                    t.onComplete.add(function(){this.camera.isMoving = false;}, this);
                }
                else {
                    this.camera.isMoving = false;
                }
            },

        };

          return BasicGame;
});
//
///// <reference path="phaser.js" />
// var width = window.innerWidth;
//var height = window.innerHeight;

// using canvas here just because it runs faster for the body debug stuff
//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'test', null, true, false);

//game.state.add('Boot', BasicGame.Boot);
//game.state.start('Boot');

// generate random number

function rndNum(num) {

    return Math.round(Math.random() * num);

}