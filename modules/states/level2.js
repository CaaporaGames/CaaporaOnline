define([
  'Phaser',
  'PhaserIsometricPlugin',
  'EasyStar'
], function (Phaser) {

  var level2;

  level2 = function () {
    // nothing here
  };

  var isoGroup, floorGroup, treeGroup, grassGroup;
  var player, cowboy;
  var cobra, cat;
  var up, down, right, left, up_left, up_right, down_left, down_right;
  var backgroundMusic;
  var text;
  var miniMapPlayerSprite;
  var miniMapCobraSprite;
  var i = 0;
  var numRandomico = 0;
  var tempo = 0;
  var relogio;

  // ********************* EasyStar setup *********************

  var easystar = new EasyStar.js();
  var timeStep = 400; // pathway computation time interval in milliseconds

  // 0 - empty space
  // 1 - tree
  // 2 - rock

  // 8 - player start point

  var level = [[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
  [0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]];

  easystar.setGrid(level);

  easystar.setIterationsPerCalculation(1000);

  // [0] siginifica os tiles que podem andar.
  easystar.setAcceptableTiles([0]);
  easystar.enableCornerCutting();
  easystar.enableDiagonals();


  // ************ SEEKING **************

  var currentPlayerXtile;
  var currentPlayerYtile;

  var currentEnemyXtile;
  var currentEnemyYtile;

  var currentEnemyXtile2;
  var currentEnemyYtile2;

  var currentNextPointX; // next movement point in X for cowboy.
  var currentNextPointY; // next movement point in Y for cowboy.

  var currentNextPointX2; // next movement point in X for cobra.
  var currentNextPointY2; // next movement point in Y for cobra.

  var cowboyDirection = "STOP";
  var cobraDirection = "STOP";

  //************* TILES ***************

  var tileSize = 35;
  var mapSize = 30;

  // **********************************

  level2.prototype = {

    preload: function () {

      console.log("preload de level2");

      /*game.debug.renderShadow = false;
      game.stage.disableVisibilityChange = false;*/
      // console.log(game);
      // game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
      game.load.spritesheet('relogio', 'assets/images/clock.png', 32, 32);
      game.load.image('ground', 'assets/images/sand.png');
      game.load.image('cactus1', 'assets/images/cactus1.png');
      game.load.image('cactus2', 'assets/images/cactus2.png');
      game.load.image('grass1', 'assets/images/grass1.png');
      game.load.image('grass2', 'assets/images/grass2.png');
      game.load.image('grass3', 'assets/images/grass3.png');
      game.load.audio('backgroundMusic', ['assets/audio/amazon-florest.mp3', 'assets/audio/amazon-florest.ogg']);
      game.load.spritesheet('cobra', 'assets/images/enemy1.png', 70, 74);
      game.load.image('rock', 'assets/images/rock.png');
      game.load.image('lifeBar', 'assets/images/life-bar.png');
      game.load.spritesheet('dude', 'assets/images/enemy2.png', 70, 74);
      game.load.spritesheet('cowboy', 'assets/images/enemy1.png', 70, 74);
      game.load.spritesheet('cat', 'assets/images/cat.png', 29, 28);
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
      game.iso.anchor.setTo(0.5, 0);
    },
    create: function () {
      floorGroup = game.add.group();
      isoGroup = game.add.group();
      treeGroup = game.add.group();
      grassGroup = game.add.group();

      // tentando desenhar o minimap
      var miniMapBmd = game.add.bitmapData(game.width / 5, game.height / 5);
      miniMapBmd.ctx.fillStyle = '#00BF32';
      miniMapBmd.ctx.fillRect(10, 20, 100, 100);

      var miniMapSprite = game.add.sprite(1000, 800, miniMapBmd);
      miniMapSprite.fixedToCamera = true;
      miniMapSprite.cameraOffset.setTo(670, 470);


      // player no mini map
      var miniMapPlayer = game.add.bitmapData(game.width / 5, game.height / 5);
      miniMapPlayer.ctx.fillStyle = '#000';
      miniMapPlayer.ctx.fillRect(10, 20, 5, 5);

      this.miniMapPlayerSprite = game.add.sprite(1000, 800, miniMapPlayer);
      this.miniMapPlayerSprite.fixedToCamera = true;
      this.miniMapPlayerSprite.cameraOffset.setTo(700, 500);


      // King cobra
      var miniMapCobra = game.add.bitmapData(game.width / 5, game.height / 5);
      miniMapCobra.ctx.fillStyle = '#ff0000';
      miniMapCobra.ctx.fillRect(10, 20, 5, 5);

      this.miniMapCobraSprite = game.add.sprite(1000, 800, miniMapCobra);
      this.miniMapCobraSprite.fixedToCamera = true;
      this.miniMapCobraSprite.cameraOffset.setTo(720, 520);

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
      game.stage.backgroundColor = "0x0000AA";


      var floorTile;

      for (var xt = 0; xt < mapSize * tileSize; xt += tileSize) {
        for (var yt = 0; yt < mapSize * tileSize; yt += tileSize) {
          floorTile = game.add.isoSprite(xt, yt, 0.2, 'ground', 0, floorGroup);
          floorTile.anchor.set(0.5,0.2);

        }
      }

      // create the grass tiles randomly
      // var grassTile;
      // for (var xt = 1024; xt > 0; xt -= 35) {
      //     for (var yt = 1024; yt > 0; yt -= 35) {
      //
      //       var rnd = rndNum(20);
      //
      //       if (rnd == 0) {
      //         grassTile = game.add.isoSprite(xt, yt, 0, 'grass1', 0, grassGroup);
      //         grassTile.anchor.set(0.5);
      //       }
      //       else if (rnd == 1)
      //       {
      //         grassTile = game.add.isoSprite(xt, yt, 0, 'grass2', 0, grassGroup);
      //         grassTile.anchor.set(0.5);
      //       }
      //       else if (rnd == 2)
      //       {
      //         grassTile = game.add.isoSprite(xt, yt, 0, 'grass3', 0, grassGroup);
      //         grassTile.anchor.set(0.5);
      //       }
      //
      //     }
      // }

      var treeTile;
      var rocksTile;

      for (var yt = 0; yt < level.length; yt++) {

        var tile = level[yt];

        for (var xt = 0; xt < level[yt].length; xt++) {

          if (tile[xt] == 1) {
            var rnd = rndNum(1);

            if (rnd == 0) {
              treeTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0, 'cactus1', 0, isoGroup);
            }
            else
            {
              treeTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0, 'cactus2', 0, isoGroup);
            }
            treeTile.anchor.set(0.5);
            game.physics.isoArcade.enable(treeTile);
            treeTile.body.collideWorldBounds = true;
            treeTile.body.immovable = true;
            treeTile.tint = 0x86bfda;
            treeTile.body.bounce.set(1, 1, 0.2);

          }
          else if (tile[xt] == 2)
          {
            rocksTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0, 'rock', 0, isoGroup);
            rocksTile.anchor.set(0.5);
            game.physics.isoArcade.enable(rocksTile);
            rocksTile.body.collideWorldBounds = true;
            rocksTile.body.immovable = true;
            rocksTile.body.bounce.set(1, 1, 0.2);
          }
        }
      }

      // Adicionando o relogio no jogo.
      relogio = game.add.sprite(750, 30, 'relogio');
      relogio.fixedToCamera = true;

      // Create a cobra.
      cobra = game.add.isoSprite(5 * tileSize, 5 * tileSize, 0, 'cobra', 0, isoGroup);

      // add the animations from the spritesheet
      cobra.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
      cobra.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
      cobra.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
      cobra.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
      cobra.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
      cobra.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
      cobra.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
      cobra.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);

      cobra.anchor.set(0.5);

      // enable physics on the cobra enemy
      game.physics.isoArcade.enable(cobra);
      cobra.body.collideWorldBounds = true;

      // set the physics bounce amount on each axis  (X, Y, Z)
      cobra.body.bounce.set(0.2, 0.2, 0);

      // set the slow down rate on each axis (X, Y, Z)
      cobra.body.drag.set(100, 100, 0);

      // Create a cat.
      cat = game.add.isoSprite(6 * tileSize, 6 * tileSize, 0, 'cat', 0, isoGroup);

      // add the animations from the spritesheet
      cat.animations.add('S', [1, 5, 9], 10, true);
      cat.animations.add('W', [0, 4, 8], 10, true);
      cat.animations.add('N', [2, 6, 10], 10, true);
      cat.animations.add('E', [3, 7, 11], 10, true);


      cat.anchor.set(0.5);

      // enable physics on the cobra enemy
      game.physics.isoArcade.enable(cat);
      cat.body.collideWorldBounds = true;

      // set the physics bounce amount on each axis  (X, Y, Z)
      cat.body.bounce.set(0.2, 0.2, 0);

      // set the slow down rate on each axis (X, Y, Z)
      cat.body.drag.set(100, 100, 0);

      // Create player.
      player = game.add.isoSprite(1000, 800, 11, 'dude', 0, isoGroup);


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
      player.animations.add('down', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
      player.animations.add('down left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
      player.animations.add('left', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
      player.animations.add('up left', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
      player.animations.add('up', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
      player.animations.add('up right', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
      player.animations.add('right', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
      player.animations.add('down right', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);

      // Instanciando objeto caapora.
      player.caapora = new Caapora();
      console.log(
        'CAAPORA\n' +
        'Life: ' + player.caapora.getBaseLife() + '\n' +
        'Energy: ' + player.caapora.getBaseEnergy() + '\n' +
        'Defense: ' + player.caapora.getBaseDefense() + '\n' +
        'Attack: ' + player.caapora.getBaseAttack()
      );
      //  Player physics properties. Give the little guy a slight bounce.

      /*        player.body.bounce.y = 0.2;
      player.body.gravity.y = 300; */

      // game.physics.p2.enable(player);

      // player.body.setCircle(44);
      // game.camera.follow(player);

      //  ***  create an enemy cowboy  ***
      cowboy = game.add.isoSprite(4 * tileSize, 4 * tileSize, 0, 'cowboy', 0, isoGroup);

      // add the animations from the spritesheet
      cowboy.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
      cowboy.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
      cowboy.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
      cowboy.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
      cowboy.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
      cowboy.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
      cowboy.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
      cowboy.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);

      cowboy.anchor.set(0.5);

      // enable physics on the cowboy enemy
      game.physics.isoArcade.enable(cowboy);
      cowboy.body.collideWorldBounds = true;

      // set the physics bounce amount on each axis  (X, Y, Z)
      cowboy.body.bounce.set(0.2, 0.2, 0);

      // set the slow down rate on each axis (X, Y, Z)
      cowboy.body.drag.set(100, 100, 0);

      // Instanciando objeto enemy.
      cowboy.enemy = new Enemy();
      console.log(
        'INIMIGO\n' +
        'Life: ' + cowboy.enemy.getBaseLife() + '\n' +
        'Energy: ' + cowboy.enemy.getBaseEnergy() + '\n' +
        'Defense: ' + cowboy.enemy.getBaseDefense() + '\n' +
        'Attack: ' + cowboy.enemy.getBaseAttack()
      );

      setInterval(function(){

        easystar.findPath(currentEnemyXtile, currentEnemyYtile, currentPlayerXtile, currentPlayerYtile, function( path ) {
          if (path === null) {
            console.log("The path to the destination point was not found.");
          }

          if (path) {
            currentNextPointX = path[1].x;
            currentNextPointY = path[1].y;
          }

          if (currentNextPointX < currentEnemyXtile && currentNextPointY < currentEnemyYtile)
          {
            // left up
            cowboyDirection = "NW";
          }
          else if (currentNextPointX == currentEnemyXtile && currentNextPointY < currentEnemyYtile)
          {
            // up
            cowboyDirection = "N";

          }
          else if (currentNextPointX > currentEnemyXtile && currentNextPointY < currentEnemyYtile)
          {
            // right up
            cowboyDirection = "NE";

          }
          else if (currentNextPointX < currentEnemyXtile && currentNextPointY == currentEnemyYtile)
          {
            // left
            cowboyDirection = "W";

          }
          else if (currentNextPointX > currentEnemyXtile && currentNextPointY == currentEnemyYtile)
          {
            // right
            cowboyDirection = "E";

          }
          else if (currentNextPointX > currentEnemyXtile && currentNextPointY > currentEnemyYtile)
          {
            // right down
            cowboyDirection = "SE";

          }
          else if (currentNextPointX == currentEnemyXtile && currentNextPointY > currentEnemyYtile)
          {
            // down
            cowboyDirection = "S";

          }
          else if (currentNextPointX < currentEnemyXtile && currentNextPointY > currentEnemyYtile)
          {
            // left down
            cowboyDirection = "SW";

          }
          else
          {

            cowboyDirection = "STOP";

          }

          if (cowboyDirection != "STOP") cowboy.animations.play(cowboyDirection);

        });

        easystar.calculate();

      }, timeStep);

      setInterval(function(){

        /*
        CALCULO PARA A COBRA.
        ______________________________________________________________________
        */
        easystar.findPath(currentEnemyXtile2, currentEnemyYtile2, currentPlayerXtile, currentPlayerYtile, function( path ) {
          if (path === null) {
            console.log("The path to the destination point was not found.");
          }

          if (path) {
            currentNextPointX2 = path[1].x;
            currentNextPointY2 = path[1].y;
          }

          if (currentNextPointX2 < currentEnemyXtile2 && currentNextPointY2 < currentEnemyYtile2)
          {
            // left up
            cobraDirection = "NW";
          }
          else if (currentNextPointX2 == currentEnemyXtile2 && currentNextPointY2 < currentEnemyYtile2)
          {
            // up
            cobraDirection = "N";

          }
          else if (currentNextPointX2 > currentEnemyXtile2 && currentNextPointY2 < currentEnemyYtile2)
          {
            // right up
            cobraDirection = "NE";

          }
          else if (currentNextPointX2 < currentEnemyXtile2 && currentNextPointY2 == currentEnemyYtile2)
          {
            // left
            cobraDirection = "W";

          }
          else if (currentNextPointX2 > currentEnemyXtile2 && currentNextPointY2 == currentEnemyYtile2)
          {
            // right
            cobraDirection = "E";

          }
          else if (currentNextPointX2 > currentEnemyXtile2 && currentNextPointY2 > currentEnemyYtile2)
          {
            // right down
            cobraDirection = "SE";

          }
          else if (currentNextPointX2 == currentEnemyXtile2 && currentNextPointY2 > currentEnemyYtile2)
          {
            // down
            cobraDirection = "S";

          }
          else if (currentNextPointX2 < currentEnemyXtile2 && currentNextPointY2 > currentEnemyYtile2)
          {
            // left down
            cobraDirection = "SW";

          }
          else
          {

            cobraDirection = "STOP";

          }

          if (cobraDirection != "STOP") cobra.animations.play(cobraDirection);

        });
        /*
        ______________________________________________________________________
        CALCULO PARA A COBRA.
        */

        easystar.calculate();

      }, timeStep);

      // KeyCodes do Keyboard.
      up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      up_left = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
      down_left = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
      down_right = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
      up_right = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);

      setInterval(function () {

        numRandomico = rndNum(4);

      }, 3000);

      // Fazendo o tempo funcionar.
      setInterval(function () {

        tempo += 1000;

      }, 1000);

      // Fazendo o relogio funcionar.
      setInterval(function () {

        relogio.frame += 1;

      }, 3000);

    },
    update: function () {

      /*water.forEach(function (w) {
      w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
      w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
    });*/

    this.miniMapPlayerSprite.cameraOffset.setTo((player.x / 3), (player.y / 3) + 250);

    this.miniMapCobraSprite.cameraOffset.setTo((cowboy.x / 3), (cowboy.y / 3) + 250);

    game.physics.isoArcade.collide(isoGroup);

    game.iso.topologicalSort(isoGroup);

    this.moveCamera();
    //correção na junção dos sprites de solo
    // game.iso.topologicalSort(floorGroup);
    // game.physics.isoArcade.collide(treeGroup,player);

    //game.physics.isoArcade.collide(player);
    //game.physics.p2.
    // game.physics.isoArcade.collide(water);

    cat.body.velocity.x = 0;
    cat.body.velocity.y = 0;

    if (numRandomico == 1) {

      cat.body.velocity.x = 90;
      cat.body.velocity.y = 90;
      cat.animations.play('S');

    } else if (numRandomico == 2) {

      cat.body.velocity.x = -90;
      cat.body.velocity.y = -90;
      cat.animations.play('N');

    } else if (numRandomico == 3) {

      cat.body.velocity.x = -90;
      cat.body.velocity.y = 90;
      cat.animations.play('W');

    } else if (numRandomico == 4) {

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


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (left.isDown)
    {
      //  Move to the left
      player.body.velocity.x = -150;
      player.body.velocity.y = 150;
      player.animations.play('left');
    }
    else if (right.isDown)
    {
      //  Move to the right
      player.body.velocity.x = 150;
      player.body.velocity.y = -150;

      player.animations.play('right');
    }
    else if (up.isDown)
    {
      player.body.velocity.x = -150;
      player.body.velocity.y = -150;

      player.animations.play('up');
    }
    else if (down.isDown)
    {
      player.body.velocity.x = 150;
      player.body.velocity.y = 150;
      player.animations.play('down');
    }
    else if (up_left.isDown)
    {
      //  NOROESTE
      player.body.velocity.x = -150;
      player.body.velocity.y = 0;

      player.animations.play('up left');
    }
    else if (down_left.isDown)
    {
      // SUDOESTE
      player.body.velocity.x = 0;
      player.body.velocity.y = 150;

      player.animations.play('down left');
    }
    else if (up_right.isDown)
    {
      // NORDESTE
      player.body.velocity.x = 0;
      player.body.velocity.y = -150;
      player.animations.play('up right');
    }
    else if (down_right.isDown)
    {
      // SUDESTE
      player.body.velocity.x = 150;
      player.body.velocity.y = 0;
      player.animations.play('down right');
    }
    else
    {
      //  Stand still
      player.animations.stop();

      player.frame = 4;
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
    }

    // Move the ENEMY
    var enemySpeed = 90;

    /*
    Movimentos do cowboy.
    _________________________________________________________
    */
    if (cowboyDirection == "N") {
      cowboy.body.velocity.x = -enemySpeed;
      cowboy.body.velocity.y = -enemySpeed;
    }
    else if (cowboyDirection == "S")
    {
      cowboy.body.velocity.x = enemySpeed;
      cowboy.body.velocity.y = enemySpeed;
    }
    else if (cowboyDirection == "E") {
      cowboy.body.velocity.x = enemySpeed;
      cowboy.body.velocity.y = -enemySpeed;
    }
    else if (cowboyDirection == "W")
    {
      cowboy.body.velocity.x = -enemySpeed;
      cowboy.body.velocity.y = enemySpeed;
    }
    else if (cowboyDirection == "SE")
    {
      cowboy.body.velocity.x = enemySpeed;
      cowboy.body.velocity.y = 0;
    }
    else if (cowboyDirection == "NW")
    {
      cowboy.body.velocity.x = -enemySpeed;
      cowboy.body.velocity.y = 0;
    }
    else if (cowboyDirection == "SW")
    {
      cowboy.body.velocity.x = 0;
      cowboy.body.velocity.y = enemySpeed;
    }

    else if (cowboyDirection == "NE")
    {
      cowboy.body.velocity.x = 0;
      cowboy.body.velocity.y = -enemySpeed;
    }
    else if (cowboyDirection == "STOP")
    {
      cowboy.body.velocity.x = 0;
      cowboy.body.velocity.y = 0;
    }
    else // JUST IN CASE IF cowboyDirection wouldnt exist we stop the cowboy movement
    {
      cowboy.body.velocity.x = 0;
      cowboy.body.velocity.y = 0;
    }
    /*
    _________________________________________________________
    Movimentos do cowboy.
    */

    /*
    Movimentos da cobra.
    _________________________________________________________
    */
    if (cobraDirection == "N") {
      cobra.body.velocity.x = -enemySpeed;
      cobra.body.velocity.y = -enemySpeed;
    }
    else if (cobraDirection == "S")
    {
      cobra.body.velocity.x = enemySpeed;
      cobra.body.velocity.y = enemySpeed;
    }
    else if (cobraDirection == "E") {
      cobra.body.velocity.x = enemySpeed;
      cobra.body.velocity.y = -enemySpeed;
    }
    else if (cobraDirection == "W")
    {
      cobra.body.velocity.x = -enemySpeed;
      cobra.body.velocity.y = enemySpeed;
    }
    else if (cobraDirection == "SE")
    {
      cobra.body.velocity.x = enemySpeed;
      cobra.body.velocity.y = 0;
    }
    else if (cobraDirection == "NW")
    {
      cobra.body.velocity.x = -enemySpeed;
      cobra.body.velocity.y = 0;
    }
    else if (cobraDirection == "SW")
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = enemySpeed;
    }

    else if (cobraDirection == "NE")
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = -enemySpeed;
    }
    else if (cobraDirection == "STOP")
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = 0;
    }
    else // JUST IN CASE IF cobraDirection wouldnt exist we stop the cowboy movement
    {
      cobra.body.velocity.x = 0;
      cobra.body.velocity.y = 0;
    }
    /*
    _________________________________________________________
    Movimentos da cobra.
    */

    currentPlayerXtile = Math.floor(cat.body.position.x / tileSize);
    currentPlayerYtile = Math.floor(cat.body.position.y / tileSize);

    // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE

    if (currentPlayerXtile < 0) currentPlayerXtile = 0;
    if (currentPlayerYtile < 0) currentPlayerYtile = 0;

    if (currentPlayerXtile > 28) currentPlayerXtile = 28;
    if (currentPlayerYtile > 28) currentPlayerYtile = 28;

    currentEnemyXtile = Math.floor(cowboy.body.position.x / tileSize);
    currentEnemyYtile = Math.floor(cowboy.body.position.y / tileSize);

    // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE

    if (currentEnemyXtile < 0) currentEnemyXtile = 0;
    if (currentEnemyYtile < 0) currentEnemyYtile = 0;

    if (currentEnemyXtile > 28) currentEnemyXtile = 28;
    if (currentEnemyYtile > 28) currentEnemyYtile = 28;

    /*
    Posição atual da cobra.
    _________________________________________________________________________________________
    */
    currentEnemyXtile2 = Math.floor(cobra.body.position.x / tileSize);
    currentEnemyYtile2 = Math.floor(cobra.body.position.y / tileSize);

    // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE

    if (currentEnemyXtile2 < 0) currentEnemyXtile2 = 0;
    if (currentEnemyYtile2 < 0) currentEnemyYtile2 = 0;

    if (currentEnemyXtile2 > 28) currentEnemyXtile2 = 28;
    if (currentEnemyYtile2 > 28) currentEnemyYtile2 = 28;
    /*
    _________________________________________________________________________________________
    Posição atual da cobra.
    */

    // Each time enemy collide with player, he loses 10 life points.
    var collision = false;

    collision = game.physics.isoArcade.collide(cowboy, player);

    if(collision) {
      var currentLife = player.caapora.getBaseLife() - 10;

      player.caapora.setBaseLife(currentLife);
      console.log('Caapora loses 10 of life points.\n' + 'Current life: ' + player.caapora.getBaseLife());

      // Game is over when the life reaches 0.
      if(currentLife == 0){
        game.state.start('GameOver');
      }

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
game.debug.text("Player x = " + Math.round(player.x) || '--', 2, 44, "#a7aebe");
game.debug.text("Player y = " + Math.round(player.y) || '--', 2, 84, "#a7aebe");
game.debug.text("Player z = " + Math.round(player.z) || '--', 2, 124, "#a7aebe");

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
}

};

return level2;

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

};
/*
function Caapora() {

  // Atributos base do personagem.

  var baseLife = 100;
  var baseEnergy = 120;
  var baseDefense = 10;
  var baseAttack = 10;


  // Getters and Setters.

  this.getBaseLife = function(){
    return baseLife;
  };

  this.setBaseLife = function(life){
    baseLife = life;
  };

  this.getBaseEnergy = function(){
    return baseEnergy;
  };

  this.setBaseEnergy = function(energy){
    baseEnergy = energy;
  };

  this.getBaseDefense = function(){
    return baseDefense;
  };

  this.setBaseDefense = function(defense){
    baseDefense = defense
  };

  this.getBaseAttack = function(){
    return baseAttack;
  };

  this.setBaseAttack = function(attack){
    baseAttack = attack;
  }

};

function Enemy() {

  // Atributos base do inimigo.

  var baseLife = 100;
  var baseEnergy = 120;
  var baseDefense = 10;
  var baseAttack = 10;


  // Getters and Setters.

  this.getBaseLife = function(){
    return baseLife;
  };

  this.setBaseLife = function(life){
    baseLife = life;
  };

  this.getBaseEnergy = function(){
    return baseEnergy;
  };

  this.setBaseEnergy = function(energy){
    baseEnergy = energy;
  };

  this.getBaseDefense = function(){
    return baseDefense;
  };

  this.setBaseDefense = function(defense){
    baseDefense = defense
  };

  this.getBaseAttack = function(){
    return baseAttack;
  };

  this.setBaseAttack = function(attack){
    baseAttack = attack;
  }

}*/
