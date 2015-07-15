define([
  'Phaser',
  'PhaserIsometricPlugin',
  'EasyStar'
], function (Phaser) {

  var BasicGame;

  BasicGame = function () {
    // nothing here
  };

  var isoGroup;
  var floorGroup;
  var treeGroup;
  var player, cowboy;
  var cobra;
  var up, down, right, left, up_left, up_right, down_left, down_right;
  var backgroundMusic;
  var text;
  var miniMapPlayerSprite;
  var miniMapCobraSprite;
  var i = 0;

  // Controles para o inimigo
  var Ndown = false, Sdown = false, Edown = false, Wdown = false, SEdown = false, NEdown = false, SWdown = false, NWdown = false;
  // ********************* EasyStar setup *********************

  var easystar = new EasyStar.js();
  var timeStep = 400; // pathway computation time interval in milliseconds

  // 0 - empty space
  // 1 - tree
  // 2 - rock

  // 8 - player start point

  var level = [[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
              [0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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

  var currentNextPointX; // next movement point in X
  var currentNextPointY; // next movement point in Y

  var enemyDirection = "STOP";

  //************* TILES ***************

  var tileSize = 35;
  var mapSize = 30;

  // **********************************

  BasicGame.prototype = {

    preload: function () {

      console.log("preload de BasicGame");

      /*game.debug.renderShadow = false;
      game.stage.disableVisibilityChange = false;*/
      // console.log(game);
      // game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
      game.load.image('ground', 'assets/images/ground_tile.png');
      game.load.image('tree', 'assets/images/tree.png');
      game.load.audio('backgroundMusic', ['assets/audio/amazon-florest.mp3', 'assets/audio/amazon-florest.ogg']);
      game.load.spritesheet('cobra', 'assets/images/king_cobra.png', 95, 96);
      game.load.image('rock', 'assets/images/rock.png');
      game.load.image('lifeBar', 'assets/images/life-bar.png');
      game.load.spritesheet('dude', 'assets/images/enemy2.png', 70, 74);
      game.load.spritesheet('cowboy','assets/images/enemy1.png', 70, 74);
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
      game.stage.backgroundColor = "0x009900";


      var floorTile;

      for (var xt = 0; xt < mapSize * tileSize; xt += tileSize) {
        for (var yt = 0; yt < mapSize * tileSize; yt += tileSize) {
          floorTile = game.add.isoSprite(xt, yt, 0.2, 'ground', 0, floorGroup);
          floorTile.anchor.set(0.5,0.2);

        }
      }

      var treeTile;
      var rocksTile;


      for (var yt = 0; yt < level.length; yt++) {

        var tile = level[yt];

        for (var xt = 0; xt < level[yt].length; xt++) {

          if (tile[xt] == 1) {
            treeTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0, 'tree', 0, isoGroup);
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

      // Create a cobra.
      cobra = game.add.isoSprite(700, 500, 0, 'cobra', 0, isoGroup);
      // Animations.
      cobra.animations.add('left', [9, 10, 11], 10, true);
      cobra.animations.add('right', [3, 4, 5], 10, true);
      cobra.anchor.set(0.5);
      game.physics.isoArcade.enable(cobra);
      cobra.body.collideWorldBounds = true;

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

            console.log("GO LEFT UP");

            enemyDirection = "NW";
          }
          else if (currentNextPointX == currentEnemyXtile && currentNextPointY < currentEnemyYtile)
          {
            // up

            console.log("GO UP");

            enemyDirection = "N";

          }
          else if (currentNextPointX > currentEnemyXtile && currentNextPointY < currentEnemyYtile)
          {
            // right up

            console.log("GO RIGHT UP");

            enemyDirection = "NE";

          }
          else if (currentNextPointX < currentEnemyXtile && currentNextPointY == currentEnemyYtile)
          {
            // left

            console.log("GO LEFT");

            enemyDirection = "W";

          }
          else if (currentNextPointX > currentEnemyXtile && currentNextPointY == currentEnemyYtile)
          {
            // right

            console.log("GO RIGHT");

            enemyDirection = "E";

          }
          else if (currentNextPointX > currentEnemyXtile && currentNextPointY > currentEnemyYtile)
          {
            // right down

            console.log("GO RIGHT DOWN");

            enemyDirection = "SE";

          }
          else if (currentNextPointX == currentEnemyXtile && currentNextPointY > currentEnemyYtile)
          {
            // down

            console.log("GO DOWN");

            enemyDirection = "S";

          }
          else if (currentNextPointX < currentEnemyXtile && currentNextPointY > currentEnemyYtile)
          {
            // left down

            console.log("GO LEFT DOWN");

            enemyDirection = "SW";

          }
          else
          {

            enemyDirection = "STOP";

          }

          if (enemyDirection != "STOP") cowboy.animations.play(enemyDirection);

        });

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

      if (enemyDirection == "N") {
        cowboy.body.velocity.x = -enemySpeed;
        cowboy.body.velocity.y = -enemySpeed;
      }
      else if (enemyDirection == "S")
      {
        cowboy.body.velocity.x = enemySpeed;
        cowboy.body.velocity.y = enemySpeed;
      }
      else if (enemyDirection == "E") {
        cowboy.body.velocity.x = enemySpeed;
        cowboy.body.velocity.y = -enemySpeed;
      }
      else if (enemyDirection == "W")
      {
        cowboy.body.velocity.x = -enemySpeed;
        cowboy.body.velocity.y = enemySpeed;
      }
      else if (enemyDirection == "SE")
      {
        cowboy.body.velocity.x = enemySpeed;
        cowboy.body.velocity.y = 0;
      }
      else if (enemyDirection == "NW")
      {
        cowboy.body.velocity.x = -enemySpeed;
        cowboy.body.velocity.y = 0;
      }
      else if (enemyDirection == "SW")
      {
        cowboy.body.velocity.x = 0;
        cowboy.body.velocity.y = enemySpeed;
      }

      else if (enemyDirection == "NE")
      {
        cowboy.body.velocity.x = 0;
        cowboy.body.velocity.y = -enemySpeed;
      }
      else if (enemyDirection == "STOP")
      {
        cowboy.body.velocity.x = 0;
        cowboy.body.velocity.y = 0;
      }
      else // JUST IN CASE IF enemyDirection wouldnt exist we stop the cowboy movement
      {
        cowboy.body.velocity.x = 0;
        cowboy.body.velocity.y = 0;
      }

      currentPlayerXtile = Math.floor(player.body.position.x / tileSize);
      currentPlayerYtile = Math.floor(player.body.position.y / tileSize);

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

};

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

}
