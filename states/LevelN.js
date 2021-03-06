define([
  'Phaser',
  'EasyStar'

], function (Phaser) {
 //hahhahah
  var LevelN;
  LevelN = function () {
    // nothing here
  };

  var isoGroup;
  var floorGroup;
  var treeGroup;
  var player, cowboy, caapora;
  var cobra, cat;
  var up, down, right, left, up_left, up_right, down_left, down_right;
  var backgroundMusic;
  var numRandomico = 0;
  var tempo = 0;
  var relogio;
  var collision = false;

  // ********************* EasyStar setup *********************
  var easystar = new EasyStar.js();
  var timeStep = 400; // pathway computation time interval in milliseconds

  // 0 - empty space
  // 1 - tree
  // 2 - rock

  // 8 - player start point

  var level = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

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

  //************* TILES ***************

  var tileSize = 35;
  var mapSize = 50;

  // **********************************

  LevelN.prototype = {
    preload: function () {

      console.log("preload de LevelN");

      /*game.debug.renderShadow = false;
      game.stage.disableVisibilityChange = false;*/
      // console.log(game);
      // game.load.atlasJSONHash('tileset', 'assets/tileset.png', 'assets/tileset.json');
      game.load.spritesheet('relogio', 'assets/images/clock.png', 32, 32);
      game.load.image('ground', 'assets/images/sand.png');
      game.load.image('cactus1', 'assets/images/cactus1.png');
      game.load.image('cactus2', 'assets/images/cactus2.png');
      game.load.image('tree', 'assets/images/tree2.png');
     // game.load.audio('backgroundMusic', ['assets/audio/amazon-florest.mp3', 'assets/audio/amazon-florest.ogg']);
      game.load.image('rock', 'assets/images/rock.png');
      game.load.image('lifeBar', 'assets/images/life-bar-green.png');
      game.load.image('lifeBarRed', 'assets/images/life-bar-red.png');
      game.load.spritesheet('dude', 'assets/images/enemy2.png', 70, 74);
      game.load.spritesheet('cowboy', 'assets/images/enemy1.png', 70, 74);
      game.load.spritesheet('cat', 'assets/images/cat.png', 29, 28);
      game.load.spritesheet('cobra', 'assets/images/enemy1.png', 70, 74);
      game.load.image('grass', 'assets/images/grass.png');
      // Set the world size


      game.world.setBounds(0, 0, 2048, 1024);
      // Start the physical system

      game.time.advancedTiming = true;

      game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

      game.plugins.add(new Phaser.Plugin.Isometric(game));

      //game.load.tilemap('map', 'assets/isometric-tileset-test.json', null, Phaser.Tilemap.TILED_JSON);

      //  Enable p2 physics
      //game.physics.startSystem(Phaser.Physics.P2JS);

      // Make things a bit more bouncey
      // game.physics.p2.restitution = 0.8;

      // set the middle of the world in the middle of the screen
      game.iso.anchor.setTo(0.5, 0);
    },
    create: function () {

      // Grama no fundo
      tilesprite = game.add.tileSprite(0, 0, 4000, 4000, 'grass');

      floorGroup = game.add.group();
      isoGroup = game.add.group();
      treeGroup = game.add.group();


      // Instanciando objeto caapora.

      caapora = new Caapora({
        group: isoGroup,
        game: this.game


      });

      catObj = new Cat({
          basicGame: this,
          game: this.game
        });




      // Instanciando objeto caapora.

      cowboyObj = new Cowboy({
        basicGame: this,
        game: this.game,
        easystar : this.getEasystar(),
        timeStep : this.getTimeStep()

      });


      // Instanciando objeto cobra.
        cobraObj = new Cobra({
          basicGame: this,
          game: this.game,
          easystar: this.getEasystar(),
          timeStep: this.getTimeStep()
        });

        cobra = cobraObj.getCobraSprite();
        // Instanciando objeto enemy.
        cowboy.enemy = new Enemy();
        player = caapora.getCaaporaSprite();



      // game.plugins.add(PhaserDebug);
      // tentando desenhar o minimap
      var miniMapBmd = game.add.bitmapData(game.width / 5, game.height / 5);
      miniMapBmd.ctx.fillStyle = '#00BF32';
      miniMapBmd.ctx.fillRect(10, 20, 100, 100);

      var miniMapSprite = game.add.sprite(game.width / 5, game.height / 5, miniMapBmd);
      miniMapSprite.fixedToCamera = true;
      miniMapSprite.cameraOffset.setTo(670, 470);


      // player no mini map
      var miniMapPlayer = game.add.bitmapData(game.width / 5, game.height / 5);
      miniMapPlayer.ctx.fillStyle = '#000';
      miniMapPlayer.ctx.fillRect(10, 20, 5, 5);

      this.miniMapPlayerSprite = game.add.sprite(game.width / 5, game.height / 50, miniMapPlayer);
      this.miniMapPlayerSprite.fixedToCamera = true;
      this.miniMapPlayerSprite.cameraOffset.setTo(670, 470);


      // King cobra
      var miniMapCobra = game.add.bitmapData(game.width / 5, game.height / 5);
      miniMapCobra.ctx.fillStyle = '#f00';
      miniMapCobra.ctx.fillRect(10, 20, 5, 5);

      this.miniMapCobraSprite = game.add.sprite(game.width / 5, game.height / 5, miniMapCobra);
      this.miniMapCobraSprite.fixedToCamera = true;
      this.miniMapCobraSprite.cameraOffset.setTo(670, 470);

      // isoGroup.create(100, 0, 'lifeBar');


      this.camera = {x: 0, y: 0, direction: '', isMoving: false};
      // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
      /*isoGroup.enableBody = true;
      isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;*/

      // Adicionando som de fundo.
     // backgroundMusic = game.add.audio('backgroundMusic');
      // backgroundMusic.play();

      // set the gravity in our game
      game.physics.isoArcade.gravity.setTo(0, 0, -500);

      // set the Background color of our game
      game.stage.backgroundColor = "0xffff";


      var floorTile;


      for (var xt = 0; xt < mapSize * tileSize; xt += tileSize) {
        for (var yt = 0; yt < mapSize * tileSize; yt += tileSize) {
          floorTile = game.add.isoSprite(xt, yt, 0.2, 'ground', 0, floorGroup);
          floorTile.anchor.set(0.5, 0.2);

        }
      }

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






      console.log(
        'CAAPORA\n' +
        'Life: ' + caapora.getBaseLife() + '\n' +
        'Energy: ' + caapora.getBaseEnergy() + '\n' +
        'Defense: ' + caapora.getBaseDefense() + '\n' +
        'Attack: ' + caapora.getBaseAttack()
      );
      //  Player physics properties. Give the little guy a slight bounce.

      /*        player.body.bounce.y = 0.2;
      player.body.gravity.y = 300; */

      // game.physics.p2.enable(player);

      // player.body.setCircle(44);
      game.camera.follow(player);



      console.log(
        'INIMIGO\n' +
        'Life: ' + cowboyObj.getBaseLife() + '\n' +
        'Energy: ' + cowboyObj.getBaseEnergy() + '\n' +
        'Defense: ' + cowboyObj.getBaseDefense() + '\n' +
        'Attack: ' + cowboyObj.getBaseAttack()
      );


      setInterval(function() {

          cowboyObj.IA();

        }, timeStep);



        setInterval(function () {

          cobraObj.IA();

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

        // O cat se movimentará randomicamente a cada 3 segundos.
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

        collision = game.physics.isoArcade.collide(cowboy, player);
        collision2 = game.physics.isoArcade.collide(cobra, player);

        if (collision) {
          console.log('Ao lado do inimigo.');
        } else {
          console.log('Longe do inimigo.');
        }

        // Each time enemy collide with player, he loses 10 life points.

        // if (collision) {
        //
        //   var currentLife = caapora.getBaseLife() - 2;
        //
        //
        //   caapora.setBaseLife(currentLife);
        //   caapora.setText("Caapora - HP: " + caapora.getBaseLife());
        //
        //
        //   cowboyObj.setBaseLife(cowboyObj.getBaseLife() - 2);
        //   cowboyObj.setText("Cowboy - HP: " + cowboyObj.getBaseLife());
        //
        //   console.log('Cowboy loses 2 of life points.\n' + 'Current life: ' + cowboyObj.getBaseLife());
        //
        //   console.log('Caapora loses 2 of life points.\n' + 'Current life: ' + caapora.getBaseLife());
        //
        //   // Game is over when the life reaches 0.
        //   if (caapora.getBaseLife() == 0) {
        //     game.state.start('GameOver');
        //   }
        //
        // }

        caapora.checkMovement();

        /*water.forEach(function (w) {
        w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
        w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
      });*/

      this.miniMapPlayerSprite.cameraOffset.setTo(cat.x / 5, cat.y / 5);

      this.miniMapCobraSprite.cameraOffset.setTo(cowboy.x / 5, cowboy.y / 5);

      game.physics.isoArcade.collide(isoGroup);

      game.iso.topologicalSort(isoGroup);


      // Move the ENEMY
      cowboyObj.movement();

      // Move the cobra
      cobraObj.movement();

      // move the cat
      catObj.movement();


      currentPlayerXtile = Math.floor(cat.body.position.x / tileSize);
      currentPlayerYtile = Math.floor(cat.body.position.y / tileSize);

      // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE

      if (currentPlayerXtile < 0)
      currentPlayerXtile = 0;
      if (currentPlayerYtile < 0)
      currentPlayerYtile = 0;

      if (currentPlayerXtile > 28)
      currentPlayerXtile = 28;
      if (currentPlayerYtile > 28)
      currentPlayerYtile = 28;

      if (currentEnemyXtile < 0)
      currentEnemyXtile = 0;
      if (currentEnemyYtile < 0)
      currentEnemyYtile = 0;

      if (currentEnemyXtile > 28)
      currentEnemyXtile = 28;
      if (currentEnemyYtile > 28)
      currentEnemyYtile = 28;

      if (currentEnemyXtile2 < 0)
          currentEnemyXtile2 = 0;
      if (currentEnemyYtile2 < 0)
          currentEnemyYtile2 = 0;

      if (currentEnemyXtile2 > 28)
          currentEnemyXtile2 = 28;
      if (currentEnemyYtile2 > 28)
          currentEnemyYtile2 = 28;



      /*
      Posição atual da cobra.
      _________________________________________________________________________________________
      */
      currentEnemyXtile2 = Math.floor(cobra.body.position.x / tileSize);
      currentEnemyYtile2 = Math.floor(cobra.body.position.y / tileSize);
      /*
      _________________________________________________________________________________________
      Posição atual da cobra.
      */
      currentEnemyXtile = Math.floor(cowboy.body.position.x / tileSize);
      currentEnemyYtile = Math.floor(cowboy.body.position.y / tileSize);

      // Quando o tempo atingir 5 minutos, e o gato não for capturado, muda para o level 2.
       if (tempo > 60000) {
         game.state.start('GameOver');
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
//Getters and Setters

setPlayer: function (p) {   player = p;    },

getPlayer: function () {   return player;  },

setCowboy: function (cb) {  cowboy = cb; },

getCowboy: function () {  return cowboy; },

setCobra: function (param) {  cobra = param; },

getCobra: function () {  return cobra; },

setCat: function (param) {  cat = param; },

getCat: function () {  return cat; },

getNumRandomico: function () {  return numRandomico; },

getIsoGroup: function () {  return isoGroup; },

getLeft: function () {  return left; },

setLeft: function (l) {   left = l;  },

getRight: function () {   return right;   },

setRight: function (r) {  right = r;  },

getUp: function () { return up; },

setUp: function (u) {  up = u;  },

getDown: function () {  return down; },

getEasystar: function(){ return easystar;  },

setDown: function (d) {  down = d; },

getTimeStep: function(){ return timeStep; },

getTileSize: function(){ return tileSize; },

getCurrentEnemyXtile : function(){  return currentEnemyXtile; },

getCurrentEnemyYtile : function() { return currentEnemyYtile; },

getCurrentEnemyXtile2 : function(){  return currentEnemyXtile2; },

getCurrentEnemyYtile2 : function() { return currentEnemyYtile2; },

getCurrentPlayerXtile : function() { return currentPlayerXtile; } ,

getCurrentPlayerYtile : function() { return currentPlayerYtile; },

getCurrentNextPointX : function() { return currentNextPointX;  },

getCurrentNextPointY : function() { return currentNextPointY; },

getCurrentNextPointX2 : function() { return currentNextPointX2; },

getCurrentNextPointY2 : function() { return currentNextPointY2; },

setCurrentNextPointX2 : function(param) { currentNextPointX2 = param; },

setCurrentNextPointY2 : function(param) { currentNextPointY2 = param; },

getCollision : function () { return collision; },

};

return LevelN;

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
;
