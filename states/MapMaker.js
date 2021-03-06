"use strict";

define([
    'Phaser'

], function (Phaser) {
    //hahhahah
    var MapMaker = function () {

        this.map;
        this.oldcamera;
        this.worldScale = 1;
        this.currentBounds;
        this.mapSizeMax;
        this.worldwidth = 600;
        this.worldheight = 600;
        this.mapSizeX = 8000;
        this.mapSizeY = 8000;
        this.prevScale = {};
        this.nextScale = {};
        this.prevScale2 = {};
        this.nextScale2 = {};
        this.zoompoint = {};
        this.mapSizeCurrent;
        this.distance = 0;
        this.olddistance = 0;
        this.distancedelta = 0;
        this.easing = 0.1;
        this.selectedTile = 'ground';
        this.tempo = 0;
        this.relogio;
        this.incendio;
        this.arrayWater = [];
        this.arrayIncendio = [];
        this.treeTileArray = [];
        this.textFogosContagem;
        this.contagemRegressiva;
        this.cursors = {};
        this.isoGroup = {};
        this.floorGroup = {};
        this.treeGroup = {};
        //************* TILES ***************

        this.tileSize = 35;
        this.mapSize = 50;
        this.cursorPos = {};
        this.a;
        this.z;
        this.s;
        this.d;
        this.q;
        this.loadingBar;
        this.tileBtns = [];

        
    };





    MapMaker.prototype = {
        preload: function () {

            console.log("preload de BasicGame");


            //  game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            // game.scale.setScreenSize(true);


            this.loadingBar = game.load.image("loading", "assets/images/loading-bar.png", 10 ,40);
            
            this.arrowKeys =  game.load.image("arrowKeys", "assets/images/arrowKeys.png");

            var style = {font: "bold 14px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: 150, align: "center"};
            textCaapora = this.game.add.text(game.width / 2, game.height / 2 - 30, "Carregando...", style);
            textCaapora.anchor.set(0.5);


            this.loadingBar = game.add.sprite(game.width / 2, game.height / 2, "loading");
            this.loadingBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.loadingBar);


            var styleDica = {font: "bold 12px Arial", fill: "#C77636", wordWrap: true, wordWrapWidth: 250, align: "center"};
            textCaapora = this.game.add.text(game.width / 2, game.height - 50, "Dica: Tente salvar a floresta da queimada.", styleDica);
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


            //game.world.setBounds(0, 0, 1024, 1024);
            // Start the physical system

            game.time.advancedTiming = true;

            game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

            game.plugins.add(new Phaser.Plugin.Isometric(game));

            game.iso.anchor.setTo(0.5, 0.2);
        },
        create: function () {

            this.map = new Map();
            
            var itemFactory = new InterfaceItemFactory();

            this.loadingBar.destroy();
            textCaapora.destroy();


            this.worldScale = 1;

            this.floorGroup = game.add.group();
            this.isoGroup = game.add.group();
            this.treeGroup = game.add.group();

            this.mapSizeMax = this.mapSizeX;
            this.mapSizeCurrent = this.mapSizeMax;


            game.camera.focusOnXY(500, 450);



            this.currentBounds = new Phaser.Rectangle(-this.mapSizeX, -this.mapSizeY, this.mapSizeX * 2, this.mapSizeY * 2);
            game.camera.bounds = this.currentBounds;


            game.input.mouse.mouseWheelCallback = function (event) {
                var wheelDelt = game.input.mouse.wheelDelta;
                if (wheelDelt < 0) {
                    this.mapSizeCurrent -= 400;
                    this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.worldwidth, this.mapSizeMax);
                }
                else {
                    this.mapSizeCurrent += 400;
                    this.mapSizeCurrent = Phaser.Math.clamp(this.mapSizeCurrent, this.worldwidth, this.mapSizeMax);
                }
                this.worldScale = (this.mapSizeCurrent / this.mapSizeMax);
            };


            // this.isoGroup.create(100, 0, 'lifeBar');

            // this.camera = {x: 0, y: 0, direction: '', isMoving: false};


            // set the gravity in our game
            game.physics.isoArcade.gravity.setTo(0, 0, -500);

            // set the Background color of our game
            game.stage.backgroundColor = "0xfff";

            var floorTile, waterTile, grass_beachTile, beach_waterTile, sand;

            for (var yt = 0; yt < this.map.getLevel.length; yt++) {

                var tile = this.map.getLevel[yt];

                for (var xt = 0; xt < this.map.getLevel[yt].length; xt++) {

                    if ((tile[xt] != 3) && (tile[xt] != 4) && (tile[xt] != 5) && (tile[xt] != 6)) {
                        floorTile = game.add.isoSprite(xt * this.tileSize, yt * this.tileSize, 0.2, 'ground', 0, this.floorGroup);
                        floorTile.anchor.set(0.5, 0.2);
                    } else if (tile[xt] == 3) {
                        waterTile = game.add.isoSprite(xt * this.tileSize, yt * this.tileSize, 0.2, 'water', 0, this.floorGroup);
                        waterTile.anchor.set(0.5, 0.2);

                        this.arrayWater.push(waterTile);
                    } else if (tile[xt] == 4) {
                        grass_beachTile = game.add.isoSprite(xt * this.tileSize, yt * this.tileSize, 0.2, 'grass-beach', 0, this.floorGroup);
                        grass_beachTile.anchor.set(0.5, 0.2);
                    } else if (tile[xt] == 5) {
                        beach_waterTile = game.add.isoSprite(xt * this.tileSize, yt * this.tileSize, 0.2, 'beach-water', 0, this.floorGroup);
                        beach_waterTile.anchor.set(0.5, 0.2);
                    } else if (tile[xt] == 6) {
                        sand = game.add.isoSprite(xt * this.tileSize, yt * this.tileSize, 0.2, 'sand', 0, this.floorGroup);
                        sand.anchor.set(0.5, 0.2);
                    }

                }
            }

            this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.q = game.input.keyboard.addKey(Phaser.Keyboard.Q);

            // Fazendo o this.tempo funcionar.
            setInterval(function () {

                this.tempo += 1000;

            }, 1000);



            this.menuBar = itemFactory.createItem({
                width: 150,
                height: 400,
                color: '#333',
                x: 630,
                y: 170

            });




            this.exportBtn = itemFactory.createItem({
                name: 'exportar',
                width: 50,
                height: 50,
                color: '#ff0000',
                x: 630,
                y: 10

            });
            
            
            this.sairBtn = itemFactory.createItem({
                name: 'sair',
                width: 50,
                height: 50,
                color: '#00ff00',
                x: 680,
                y: 10

            });


            this.exportBtn.itemSprite.events.onInputDown.add(this.export, this);
            
            this.sairBtn.itemSprite.events.onInputDown.add(function(){ 
                
                game.state.clearCurrentState();
                
                game.state.start('GameTitle') }, this);

            var btnBase = itemFactory.createItem({
                name: 'water',
                width: 50,
                height: 50,
                x: 700,
                y: 370,
                tileName: 'water',
                mapMaker: this
            });


            itemFactory.createItem({
                name: 'ground',
                width: 50,
                height: 50,
                color: '#0000ff',
                x: btnBase.positionX,
                y: btnBase.positionY + 40,
                tileName: 'ground',
                mapMaker: this
            });


            itemFactory.createItem({
                name: 'beach-water',
                width: 50,
                height: 50,
                color: '#0000ff',
                x: btnBase.positionX,
                y: btnBase.positionY - 40,
                tileName: 'beach-water',
                mapMaker: this
            });


            itemFactory.createItem({
                name: 'sand',
                width: 50,
                height: 50,
                x: btnBase.positionX,
                y: btnBase.positionY - 80,
                tileName: 'sand',
                mapMaker: this
            });
            
            
             itemFactory.createItem({
                name: 'Mova a camera com o teclado',
                width: 10,
                height: 10,
                x: 50,
                y: btnBase.positionY + 150,
                tileName: 'arrowKeys',
                mapMaker: this
            });



            itemFactory.createItem({
                name: 'tree',
                width: 50,
                height: 50,
                x: btnBase.positionX,
                y: btnBase.positionY + 80,
                tileName: 'tree',
                mapMaker: this
            });



            this.cursors = game.input.keyboard.createCursorKeys();


            // Provide a 3D position for the cursor
            this.cursorPos = new Phaser.Plugin.Isometric.Point3();

     
            // Classe temporária para auxiliar no controle do mouse 
            this.newPointer = { 
            
                x : this.newX,
                y : this.newY,
                
            }; 
            
            this.subY = 0;
            this.subX = 0;



        },
        update: function () {

          
            if (this.q.isDown) {

                var that = this;

                // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
                this.floorGroup.forEach(function (tile) {
                    var inBounds = tile.isoBounds.containsXY(that.cursorPos.x, that.cursorPos.y);
                    // If it does, do a little animation and tint change.
                    if (!tile.selected && inBounds) {
                        tile.selected = true;
                        tile.tint = 0x86bfda;
                        //   game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);

                        if (that.selectedTile == 'tree') {

                            tile.anchor.setTo(1);
                            tile.loadTexture(that.selectedTile);

                        } else
                            tile.loadTexture(that.selectedTile);
                    }
                    // If not, revert back to how it was.
                    else if (tile.selected && !inBounds) {
                        tile.selected = false;
                        tile.tint = 0xffffff;
                        game.add.tween(tile).to({isoZ: 0}, 200, Phaser.Easing.Quadratic.InOut, true);
                    }
                });

            }



          // Necessário transferir a posição atual do ponteiro para a classe auxiliar para ajustar a posição para 
          // o mundo isometrico
          this.newPointer.x = game.input.activePointer.position.x + this.subX;
          this.newPointer.y = game.input.activePointer.position.y + this.subY;

            // game.input.activePointer.position.add(this.sumx, this.sumy);



            // Update the cursor position.
            // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
            // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
            // disable camera
            game.iso.unproject(this.newPointer , this.cursorPos);


            // UP(W)
            if (this.w.isDown)
            {
                game.camera.y -= 14;
                
                // além da camera é necessário ajustar a projeção do ponteiro do mouse no mundo isometric
                this.subY -=  14



            }

            // DOWN (S)
            else if (this.s.isDown)
            {
                game.camera.y += 14;
                this.subY += 14;

            }

            // LEFT (A)
            if (this.a.isDown)
            {
                game.camera.x -= 14;
               this.subX -= 14;

            }


            // RIGHT (D)
            else if (this.d.isDown)
            {
                game.camera.x += 14;
               this.subX += 14;


            }

            game.input.mouse.capture = true;


            this.zoompoint.x = game.input.mousePointer.worldX;
            this.zoompoint.y = game.input.mousePointer.worldY;


            // ---- Controle de camera pelo mouse ----
            // move camera / pan
            // se clicar na tela e segurar move o mapa
            /*
            if (game.input.activePointer.isDown && !game.input.pointer2.isDown) {
                
           
                if (this.oldcamera) { // if moving the world always continue from the last position
                    
                     if(game.input.activePointer.position.x > this.worldwidth / 2){
                    
                                 this.subX + 140;
                    
                        }
                
                
                    game.camera.x += this.oldcamera.x - game.input.activePointer.position.x ; // + this.subX
                    game.camera.y += this.oldcamera.y - game.input.activePointer.position.y ; //+ this.subY
                }
                this.oldcamera = game.input.activePointer.position.clone();
            }
            // adjust camera center and zoom here
            else {
                this.oldcamera = null;
                var rescalefactorx = this.mapSizeX / (this.mapSizeX * this.isoGroup.scale.x); // multiply by rescalefactor to get original world value
                var rescalefactory = this.mapSizeY / (this.mapSizeY * this.isoGroup.scale.y);

                this.prevScale.x = this.isoGroup.scale.x;
                this.prevScale.y = this.isoGroup.scale.y;

                this.nextScale.x = this.prevScale.x + (this.worldScale - this.isoGroup.scale.x) * this.easing;
                this.nextScale.y = this.prevScale.y + (this.worldScale - this.isoGroup.scale.y) * this.easing;

                var xAdjust = (this.zoompoint.x - game.camera.position.x) * (this.nextScale.x - this.prevScale.x);
                var yAdjust = (this.zoompoint.y - game.camera.position.y) * (this.nextScale.y - this.prevScale.y);


                //Only move screen if we're not the same scale
                if (this.prevScale.x != this.nextScale.x || this.prevScale.y != this.nextScale.y) {
                    var scaleAdjustX = this.nextScale.x / this.prevScale.x;
                    var scaleAdjustY = this.nextScale.y / this.prevScale.y;
                    var focusX = (game.camera.position.x * scaleAdjustX) + xAdjust * (rescalefactorx);
                    var focusY = (game.camera.position.y * scaleAdjustY) + yAdjust * (rescalefactory);
                    game.camera.focusOnXY(focusX, focusY);
                }

                //now actually scale the stage
                this.isoGroup.scale.x += (this.worldScale - this.isoGroup.scale.x) * this.easing;   //this.easing
                this.isoGroup.scale.y += (this.worldScale - this.isoGroup.scale.y) * this.easing;



                var rescalefactorx2 = this.mapSizeX / (this.mapSizeX * this.floorGroup.scale.x); // multiply by rescalefactor to get original world value
                var rescalefactory2 = this.mapSizeY / (this.mapSizeY * this.floorGroup.scale.y);


                this.prevScale2.x = this.floorGroup.scale.x;
                this.prevScale2.y = this.floorGroup.scale.y;


                this.nextScale2.x = this.prevScale2.x + (this.worldScale - this.floorGroup.scale.x) * this.easing;
                this.nextScale2.y = this.prevScale2.y + (this.worldScale - this.floorGroup.scale.y) * this.easing;



                var xAdjust2 = (this.zoompoint.x - game.camera.position.x) * (this.nextScale2.x - this.prevScale2.x);
                var yAdjust2 = (this.zoompoint.y - game.camera.position.y) * (this.nextScale2.y - this.prevScale2.y);





                //Only move screen if we're not the same scale
                if (this.prevScale2.x != this.nextScale2.x || this.prevScale2.y != this.nextScale2.y) {
                    var scaleAdjustX = this.nextScale2.x / this.prevScale2.x;
                    var scaleAdjustY = this.nextScale2.y / this.prevScale2.y;
                    var focusX = (game.camera.position.x * scaleAdjustX) + xAdjust2 * (rescalefactorx2);
                    var focusY = (game.camera.position.y * scaleAdjustY) + yAdjust2 * (rescalefactory2);
                    game.camera.focusOnXY(focusX, focusY);
                }


                //now actually scale the stage
                this.floorGroup.scale.x += (this.worldScale - this.floorGroup.scale.x) * this.easing;   //this.easing
                this.floorGroup.scale.y += (this.worldScale - this.floorGroup.scale.y) * this.easing;


            }

            */

            game.physics.isoArcade.collide(this.isoGroup);

            game.iso.topologicalSort(this.isoGroup);





        },
        render: function () {



            game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");


            game.debug.text("Mouse x = " + Math.round(game.input.x) || '--', 2, 34, "#a7aebe");
            game.debug.text("Mouse y = " + Math.round(game.input.y) || '--', 2, 54, "#a7aebe");

            game.debug.text("World x = " + Math.round(game.width) || '--', 2, 74, "#a7aebe");
            game.debug.text("World y = " + Math.round(game.height) || '--', 2, 94, "#a7aebe");

            game.debug.text("Camera x = " + game.camera.x || '--', 2, 114, "#a7aebe");
            game.debug.text("Camera  y = " + game.camera.y || '--', 2, 134, "#a7aebe");


            game.debug.text("cursor Iso  x = " + Math.round(this.cursorPos.x) || '--', 2, 154, "#a7aebe");
            game.debug.text("cursor Iso  y = " + Math.round(this.cursorPos.y) || '--', 2, 174, "#a7aebe");

        },
        addSprite: function () {


            sprite = game.add.isoSprite(Math.floor(this.cursorPos.x), Math.floor(this.cursorPos.y), 0.2, 'water', this.floorGroup);
            sprite.anchor.set(0.5, 0.2);
            game.physics.isoArcade.enable(sprite);
            sprite.body.collideWorldBounds = true;
        },
        showMessage: function () {
            console.log("hello world!");
        },
        rndNum: function (num) {

            return Math.round(Math.random() * num);

        },
        // 0 - empty space
        // 1 - tree
        // 2 - rock
        // 3 - water
        // 4 - grass-beach
        // 5 - beach-water
        // 6 - sand;

        // 8 - player start point

        export: function () {


            var output = [];

            this.floorGroup.forEach(function (tile) {


                if (tile.key == 'water') {
                    output.push(3)
                } else if (tile.key == 'ground')
                    output.push(0)
                else if (tile.key == 'sand') // representing tree
                    output.push(1)
                 else if (tile.key == 'beach-water')
                    output.push(4)
                else
                    output.push(5)



            });

            var win = window.open();



            win.document.write(' [ <br />');

            var count = 0;


            for (var j = 0; j < this.map.getLevel.length; j++) {

                win.document.write(' [ ');

                for (var i = 0; i < this.map.getLevel[0].length; i++) {
                    // não inserir virgula no ultimo elemento da linha    
                    if (i == this.map.getLevel[0].length - 1)
                        win.document.write(output[count]);
                    else
                        win.document.write(output[count] + ', ');


                    count++;
                }
                
                // não inserir conchetes no último elemento da coluna
                if (j != this.map.getLevel.length[0] - 1)
                    win.document.write(' ], <br />');
                else
                    win.document.write(' ] <br />');
            }



            win.document.write(' ] ');


            win.document.write('<h3>Total of tiles: ' + output.length + '</h3>');


        }


    };

    return MapMaker;

});