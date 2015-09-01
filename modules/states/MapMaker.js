define([
  'Phaser',

], function (Phaser) {
  //hahhahah
  var MapMaker;
  MapMaker = function () {
    // nothing here
  };

  var isoGroup;
  var floorGroup;
  var treeGroup;
  var up, down, right, left, up_left, up_right, down_left, down_right,z;
  var tempo = 0;
  var relogio;
  var incendio;
  var arrayWater = [];
  var arrayIncendio = [];
  var treeTileArray = [];
  var textFogosContagem;
  var contagemRegressiva;
  var cursors;
  
  
  // novas variaveis 
  
var oldcamera;
var worldScale = 1;
var currentBounds;
var mapSizeMax;
var worldwidth=600;
var worldheight=600;
var mapSizeX = 8000;
var mapSizeY = 8000; 
var prevScale ={};
var nextScale={};
var prevScale2 ={};
var nextScale2={};
var zoompoint={};
var mapSizeCurrent;
var distance =0;
var olddistance =0;
var distancedelta=0;
var easing=0.1;



  // 0 - empty space
  // 1 - tree
  // 2 - rock
  // 3 - water
  // 4 - grass-beach
  // 5 - beach-water
  // 6 - sand;

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
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]];




  //************* TILES ***************

  var tileSize = 35;
  var mapSize = 50;

  // **********************************

  MapMaker.prototype = {
    preload: function () {

      console.log("preload de BasicGame");
      
      
      //  game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setScreenSize(true);
       
       
        game.load.image("loading","assets/images/loading-bar.png"); 
      
       var style = {font: "bold 14px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: 150, align: "center"};
      textCaapora = this.game.add.text(game.width/2, game.height/2 - 30, "Carregando...", style);
      textCaapora.anchor.set(0.5);
      
      
      loadingBar = game.add.sprite(game.width/2, game.height/2 ,"loading");
      loadingBar.anchor.setTo(0.5,0.5);
      this.load.setPreloadSprite(loadingBar);

      
      var styleDica = {font: "bold 12px Arial", fill: "#C77636", wordWrap: true, wordWrapWidth: 250, align: "center"};
      textCaapora = this.game.add.text(game.width/2, game.height - 50, "Dica: Tente salvar a floresta da queimada.", styleDica);
      textCaapora.anchor.set(0.5);
      
      
      game.load.spritesheet('flame', 'assets/images/flames.png', 32, 48);
      game.load.image('ground', 'assets/images/ground_tile.png');
      game.load.image('water', 'assets/images/water.png');
      game.load.image('grass-beach', 'assets/images/grass-beach.png');
      game.load.image('beach-water', 'assets/images/beach-water.png');
      game.load.image('sand', 'assets/images/sand.png');
      game.load.image('tree', 'assets/images/tree.png');
      //game.load.audio('backgroundMusic', ['assets/audio/amazon-florest.mp3', 'assets/audio/amazon-florest.ogg']);
      game.load.image('rock', 'assets/images/rock.png');
      game.load.spritesheet('dude', 'assets/images/Caapora-Novo-Sprite.png', 61, 91);  
      game.load.spritesheet('cowboy', 'assets/images/enemy1.png', 70, 74);
      game.load.spritesheet('cat', 'assets/images/cat.png', 29, 28);
      game.load.spritesheet('cobra', 'assets/images/enemy1.png', 70, 74);
      game.load.image('grass', 'assets/images/grass.png');
      game.load.image('alert', 'assets/images/alert.png');
      game.load.image('balde', 'assets/images/balde.png'); 

      // Set the world size


      game.world.setBounds(0, 0, 2048, 1024);
      // Start the physical system

      game.time.advancedTiming = true;

      game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

      game.plugins.add(new Phaser.Plugin.Isometric(game));

      game.iso.anchor.setTo(0.5, 0);
    },
    create: function () {
        
        
                      
      loadingBar.destroy();
      textCaapora.destroy();

        
       worldScale=1;
        
      floorGroup = game.add.group();
      isoGroup = game.add.group();
      treeGroup = game.add.group();
      
      mapSizeMax = mapSizeX;
      mapSizeCurrent = mapSizeMax;
      
      
      game.camera.focusOnXY(1100,450);
      
      
      
      currentBounds = new Phaser.Rectangle(-mapSizeX, -mapSizeY, mapSizeX*2, mapSizeY*2); 
      game.camera.bounds=currentBounds;
      
      
      game.input.mouse.mouseWheelCallback = function (event) {
            var wheelDelt = game.input.mouse.wheelDelta;
            if (wheelDelt < 0)  {   mapSizeCurrent -= 400;  mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth , mapSizeMax);}
            else                {   mapSizeCurrent += 400;  mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth , mapSizeMax);}
            worldScale = (mapSizeCurrent/mapSizeMax);
        };
        
     
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


      // set the gravity in our game
      game.physics.isoArcade.gravity.setTo(0, 0, -500);

      // set the Background color of our game
      game.stage.backgroundColor = "0xfff";

      var floorTile, waterTile, grass_beachTile, beach_waterTile, sand;

      for (var yt = 0; yt < level.length; yt++) {

        var tile = level[yt];

        for (var xt = 0; xt < level[yt].length; xt++) {

          if ((tile[xt] != 3) && (tile[xt] != 4) && (tile[xt] != 5) && (tile[xt] != 6)) {
            floorTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0.2, 'ground', 0, floorGroup);
            floorTile.anchor.set(0.5, 0.2);
          } else if (tile[xt] == 3) {
            waterTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0.2, 'water', 0, floorGroup);
            waterTile.anchor.set(0.5, 0.2);

            arrayWater.push(waterTile);
          } else if (tile[xt] == 4) {
            grass_beachTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0.2, 'grass-beach', 0,floorGroup);
            grass_beachTile.anchor.set(0.5, 0.2);
          } else if (tile[xt] == 5) {
            beach_waterTile = game.add.isoSprite(xt * tileSize, yt * tileSize, 0.2, 'beach-water', 0, floorGroup);
            beach_waterTile.anchor.set(0.5, 0.2);
          } else if (tile[xt] == 6) {
            sand = game.add.isoSprite(xt * tileSize, yt * tileSize, 0.2, 'sand', 0, floorGroup);
            sand.anchor.set(0.5, 0.2);
          }

        }
      }


      // KeyCodes do Keyboard.
      up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      up_left = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
      down_left = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
      down_right = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
      up_right = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
      z = game.input.keyboard.addKey(Phaser.Keyboard.Z);

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
      
      
      cursors = game.input.keyboard.createCursorKeys();

    },
    update: function () {
      
      
      if (cursors.up.isDown)
        {
            game.camera.y -= 14;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 14;
        }

        if (cursors.left.isDown)
        {
            game.camera.x -= 14;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 14;
        }

          
     
      if (game.input.mousePointer.isDown) {
        console.log(game.input.mousePointer.x);
        console.log(game.input.mousePointer.y);
      }
      
            zoompoint.x = game.input.mousePointer.worldX;
            zoompoint.y = game.input.mousePointer.worldY;
      
      // move camera / pan
      
        if(game.input.activePointer.isDown && !game.input.pointer2.isDown){
            if (oldcamera) { // if moving the world always continue from the last position
                game.camera.x += oldcamera.x - game.input.activePointer.position.x; 
                game.camera.y += oldcamera.y - game.input.activePointer.position.y; 
            }
            oldcamera = game.input.activePointer.position.clone();
        }
        // adjust camera center and zoom here
        else { 
            oldcamera = null; 
            rescalefactorx = mapSizeX / (mapSizeX * isoGroup.scale.x); // multiply by rescalefactor to get original world value
            rescalefactory = mapSizeY / (mapSizeY * isoGroup.scale.y);
            
            prevScale.x = isoGroup.scale.x;
            prevScale.y = isoGroup.scale.y;
            
            nextScale.x = prevScale.x + (worldScale-isoGroup.scale.x)*easing;
            nextScale.y = prevScale.y + (worldScale-isoGroup.scale.y)*easing;
            
            var xAdjust = (zoompoint.x - game.camera.position.x) * (nextScale.x - prevScale.x);
            var yAdjust = (zoompoint.y - game.camera.position.y) * (nextScale.y - prevScale.y);
            
            
            //Only move screen if we're not the same scale
            if (prevScale.x != nextScale.x || prevScale.y != nextScale.y) {
                var scaleAdjustX = nextScale.x / prevScale.x;
                var scaleAdjustY = nextScale.y / prevScale.y;
                var focusX = (game.camera.position.x * scaleAdjustX) + xAdjust*(rescalefactorx);
                var focusY = (game.camera.position.y * scaleAdjustY) + yAdjust*(rescalefactory);
                game.camera.focusOnXY(focusX, focusY);
            }
            
              //now actually scale the stage
            isoGroup.scale.x += (worldScale-isoGroup.scale.x)*easing;   //easing
            isoGroup.scale.y += (worldScale-isoGroup.scale.y)*easing;
            
            
            
            rescalefactorx2 = mapSizeX / (mapSizeX * floorGroup.scale.x); // multiply by rescalefactor to get original world value
            rescalefactory2 = mapSizeY / (mapSizeY * floorGroup.scale.y);

     
            prevScale2.x = floorGroup.scale.x;
            prevScale2.y = floorGroup.scale.y;
            

            nextScale2.x = prevScale2.x + (worldScale-floorGroup.scale.x)*easing;
            nextScale2.y = prevScale2.y + (worldScale-floorGroup.scale.y)*easing;
            
        
            
            var xAdjust2 = (zoompoint.x - game.camera.position.x) * (nextScale2.x - prevScale2.x);
            var yAdjust2 = (zoompoint.y - game.camera.position.y) * (nextScale2.y - prevScale2.y);


            
            
            
              //Only move screen if we're not the same scale
            if (prevScale2.x != nextScale2.x || prevScale2.y != nextScale2.y) {
                var scaleAdjustX = nextScale2.x / prevScale2.x;
                var scaleAdjustY = nextScale2.y / prevScale2.y;
                var focusX = (game.camera.position.x * scaleAdjustX) + xAdjust2*(rescalefactorx2);
                var focusY = (game.camera.position.y * scaleAdjustY) + yAdjust2*(rescalefactory2);
                game.camera.focusOnXY(focusX, focusY);
            }
            
            
              //now actually scale the stage
            floorGroup.scale.x += (worldScale-floorGroup.scale.x)*easing;   //easing
            floorGroup.scale.y += (worldScale-floorGroup.scale.y)*easing;

          
        }


    game.physics.isoArcade.collide(isoGroup);

    game.iso.topologicalSort(isoGroup);


    


  },
    render: function () {


        
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
      

        game.debug.text("Mouse x = " + Math.round(game.input.mousePointer.x) || '--', 2, 34, "#a7aebe");
        game.debug.text("Mouse y = " + Math.round(game.input.mousePointer.y) || '--', 2, 54, "#a7aebe");

        game.debug.text("World x = " + Math.round(game.width) || '--', 2, 74, "#a7aebe");
        game.debug.text("World y = " + Math.round(game.height) || '--', 2, 94, "#a7aebe");

},


};

  return MapMaker;

});


function rndNum(num) {

  return Math.round(Math.random() * num);

};
