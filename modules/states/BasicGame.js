"use strict";

define([
    'Phaser',
    'EasyStar',
    'modules/units/Minimap',
    'modules/factories/TreeFactory',
    'modules/factories/FogoFactory',
    'modules/units/Tree',
    'modules/units/Fogo'

], function (Phaser) {
    var BasicGame;
    BasicGame = function () {

        this.isoGroup;
        this.floorGroup;
        this.treeGroup;
        this.player;
        this.cowboy;
        this.caapora;
        this.cobra;
        this.cat;
        this.z;
        this.backgroundMusic;
        this.numRandomico = 0;
        this.tempo = 0;
        this.relogio;
        this.collision = false;
        this.incendio;
        this.balde;
        this.arrayWater = [];
        this.arrayIncendio = [];
        this.floresta = {};
        this.treeTileArray = [];
        this.textFogosContagem;
        this.contagemRegressiva;
        this.loadingBar;
        this.textCaapora;
        this.miniMap;
        this.space;
        // ********************* EasyStar setup *********************
        this.easystar = new EasyStar.js();
        this.timeStep = 400; // pathway computation time interval in milliseconds

        // 0 - empty space
        // 1 - tree
        // 2 - rock
        // 3 - water
        // 4 - grass-beach
        // 5 - beach-water
        // 6 - sand;

        // 8 - this.player start point

        this.level = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
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
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]


        ];

        this.easystar.setGrid(this.level);

        this.easystar.setIterationsPerCalculation(1000);

        // [0] siginifica os tiles que podem andar.
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableCornerCutting();
        this.easystar.enableDiagonals();


        // ************ SEEKING **************

        this.currentPlayerXtile;
        this.currentPlayerYtile;

        this.currentEnemyXtile;
        this.currentEnemyYtile;

        this.currentEnemyXtile2;
        this.currentEnemyYtile2;

        this.currentNextPointX; // next movement point in X for this.cowboy.
        this.currentNextPointY; // next movement point in Y for this.cowboy.

        this.currentNextPointX2; // next movement point in X for this.cobra.
        this.currentNextPointY2; // next movement point in Y for this.cobra.

        //************* TILES ***************

        this.tileSize = 35;
        this.mapSize = 50;

        // **********************************

    };


    BasicGame.prototype = {
        preload: function () {

            console.log("preload de BasicGame");

            var style = {font: "bold 14px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: 150, align: "center"};
            this.textCaapora = this.game.add.text(game.width / 2, game.height / 2 - 30, "Carregando...", style);
            this.textCaapora.anchor.set(0.5);


            this.loadingBar = game.add.sprite(game.width / 2, game.height / 2, "loading");
            this.loadingBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.loadingBar);



            var styleDica = {font: "bold 12px Arial", fill: "#C77636", wordWrap: true, wordWrapWidth: 250, align: "center"};
            this.textCaapora = this.game.add.text(game.width / 2, game.height - 50, "Dica: Tente salvar a floresta da queimada.", styleDica);
            this.textCaapora.anchor.set(0.5);

            game.load.spritesheet('relogio', 'assets/images/clock.png', 32, 32);
            game.load.spritesheet('flame', 'assets/images/flames.png', 32, 48);
            game.load.image('ground', 'assets/images/ground_tile.png');
            game.load.image('water', 'assets/images/water.png');
            game.load.image('grass-beach', 'assets/images/grass-beach.png');
            game.load.image('beach-water', 'assets/images/beach-water.png');
            game.load.image('sand', 'assets/images/sand.png');
            game.load.image('tree', 'assets/images/tree.png');
            //game.load.audio('this.backgroundMusic', ['assets/audio/amazon-florest.mp3', 'assets/audio/amazon-florest.ogg']);
            game.load.image('rock', 'assets/images/rock.png');
            game.load.spritesheet('dude', 'assets/images/Caapora-Novo-Sprite.png', 61, 91);
            game.load.spritesheet('dudeBalde', 'assets/images/Caapora-Novo-Sprite-Balde.png', 61, 91);
            game.load.spritesheet('cowboy', 'assets/images/enemy1.png', 70, 74);
            game.load.spritesheet('cat', 'assets/images/cat.png', 29, 28);
            game.load.spritesheet('cobra', 'assets/images/enemy1.png', 70, 74);
            game.load.image('grass', 'assets/images/grass.png');
            game.load.image('alert', 'assets/images/alert.png');
            game.load.image('balde', 'assets/images/balde.png');
            // game.load.image('menu', 'assets/images/menu-exemplo.png', 270, 180);
            // Set the world size


            game.world.setBounds(0, 0, 2048, 1024);
            // Start the physical system

            game.time.advancedTiming = true;

            game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

            game.plugins.add(new Phaser.Plugin.Isometric(game));

            game.iso.anchor.setTo(0.5, 0);
        },
        create: function () {


            // após o carregamento deletar sprites
            this.loadingBar.destroy();
            this.textCaapora.destroy();

            this.floorGroup = game.add.group();
            this.isoGroup = game.add.group();
            this.treeGroup = game.add.group();



            this.balde = game.add.isoSprite(830, 800, 30, 'balde', 0, this.isoGroup);
            this.balde.anchor.set(0.5);
            game.physics.isoArcade.enable(this.balde);
            this.balde.body.collideWorldBounds = true;
            this.balde.body.immovable = true;
            this.balde.body.bounce.set(1, 1, 0.2);



            // Instanciando objeto this.caapora.
            this.caapora = new Caapora({isoGroup: this.isoGroup});

            this.catObj = new Cat({
                basicGame: this,
                game: this.game
            });


            this.floresta = new Floresta({
                incendio: this.arrayIncendio

            });

            this.cowboyObj = new Cowboy({
                basicGame: this,
                game: this.game,
                easystar: this.getEasystar(),
                timeStep: this.getTimeStep()
            });

            // Instanciando objeto this.cobra.
            this.cobraObj = new Cobra({
                basicGame: this,
                game: this.game,
                easystar: this.getEasystar(),
                timeStep: this.getTimeStep()
            });

            this.cobra = this.cobraObj.getCobraSprite();
            this.cowboy.enemy = new Enemy();
            this.player = this.caapora.getCaaporaSprite();


            this.miniMap = new MiniMap();

            // this.isoGroup.create(100, 0, 'lifeBar');

            this.camera = {x: 0, y: 0, direction: '', isMoving: false};

            // Adicionando som de fundo.
            // this.backgroundMusic = game.add.audio('this.backgroundMusic');
            // this.backgroundMusic.play();

            // set the gravity in our game
            game.physics.isoArcade.gravity.setTo(0, 0, -500);

            // set the Background color of our game
            game.stage.backgroundColor = "0xfff";

            var floorTile, waterTile, grass_beachTile, beach_waterTile, sand;

            for (var yt = 0; yt < this.level.length; yt++) {

                var tile = this.level[yt];

                for (var xt = 0; xt < this.level[yt].length; xt++) {

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


            var rocksTile;
            var treeFactory = new TreeFactory();
            var fogoFactory = new FogoFactory();


            for (var yt = 0; yt < this.level.length; yt++) {

                var tile = this.level[yt];

                for (var xt = 0; xt < this.level[yt].length; xt++) {

                    if (tile[xt] == 1) {


                        this.treeTileArray.push(treeFactory.createTree({

                            tileSize : this.tileSize,
                            isoGroup : this.isoGroup,
                            tileName : "tree",
                            xt : xt,
                            yt : yt,



                         }));


                        this.arrayIncendio.push(fogoFactory.createFogo({

                            tileSize : this.tileSize,
                            isoGroup : this.isoGroup,
                            tileName : "flame",
                            xt : xt,
                            yt : yt,

                        }));



                    }
                    else if (tile[xt] == 2)
                    {
                        rocksTile = game.add.isoSprite(xt * this.tileSize, yt * this.tileSize, 0, 'rock', 0, this.isoGroup);
                        rocksTile.anchor.set(0.5);
                        game.physics.isoArcade.enable(rocksTile);
                        rocksTile.body.collideWorldBounds = true;
                        rocksTile.body.immovable = true;
                        rocksTile.body.bounce.set(1, 1, 0.2);
                    }
                }
            }


            var estilo = {font: "bold 16px Arial", fill: "#00f", wordWrap: true, wordWrapWidth: 250, align: "center"};
            this.textFogosContagem = game.add.text(game.width - 120, 10, "Arvores Queimadas: " + this.arrayIncendio.length, estilo);
            this.textFogosContagem.anchor.set(0.5);
            this.textFogosContagem.fixedToCamera = true;
            this.textFogosContagem.cameraOffset.setTo(game.width - 200, 70);


            this.contagemRegressiva = game.add.text(game.width - 120, 10, "Tempo : 60", estilo);
            this.contagemRegressiva.anchor.set(0.5);
            this.contagemRegressiva.fixedToCamera = true;
            this.contagemRegressiva.cameraOffset.setTo(game.width - 80, 120);


            // Adicionando o this.relogio no jogo.
            this.relogio = game.add.sprite(750, 30, 'relogio');
            this.relogio.fixedToCamera = true;

            console.log(
                    'CAAPORA\n' +
                    'Life: ' + this.caapora.getBaseLife() + '\n' +
                    'Energy: ' + this.caapora.getBaseEnergy() + '\n' +
                    'Defense: ' + this.caapora.getBaseDefense() + '\n' +
                    'Attack: ' + this.caapora.getBaseAttack()
                    );

            game.camera.follow(this.player);

            console.log(
                    'INIMIGO\n' +
                    'Life: ' + this.cowboyObj.getBaseLife() + '\n' +
                    'Energy: ' + this.cowboyObj.getBaseEnergy() + '\n' +
                    'Defense: ' + this.cowboyObj.getBaseDefense() + '\n' +
                    'Attack: ' + this.cowboyObj.getBaseAttack()
                    );

            var that = this;

            // setInterval(function () {
            //
            //     that.cowboyObj.IA();
            //
            // }, this.timeStep);
            //
            // setInterval(function () {
            //
            //     that.cobraObj.IA();
            //
            // }, this.timeStep);

            this.z = game.input.keyboard.addKey(Phaser.Keyboard.Z);

            // O this.cat se movimentará randomicamente a cada 3 segundos.
            setInterval(function () {

                that.numRandomico = rndNum(4);

            }, 3000);

            // Fazendo o this.tempo funcionar.
            setInterval(function () {

                that.tempo += 1000;

            }, 1000);




            // Fazendo o this.relogio funcionar.
            setInterval(function () {

                that.relogio.frame += 1;

            }, 3000);

            this.space = game.input.keyboard.addKey(Phaser.Keyboard.P);



        },
        update: function () {

          if (this.space.isDown) {

            game.physics.isoArcade.isPaused = true;

          } else {
            game.physics.isoArcade.isPaused = false;

          }

            if (this.tempo > 0)
                this.contagemRegressiva.setText("Tempo: " + (parseFloat(60) - ((this.tempo / 1000))));

            // maior que 1 minuto
            if (this.tempo > 60 * 1000 || this.arrayIncendio.length == 0) {

                game.state.start('Vitoria');
            }


            for (var index = 0; index < this.arrayIncendio.length; index++) {

                this.collision = game.physics.isoArcade.collide(this.arrayIncendio[index], this.player)
                if (this.collision) {

                    if (this.caapora.isEquiped) {

                        this.arrayIncendio[index].destroy();
                        this.arrayIncendio.splice(index, 1);
                        this.textFogosContagem.setText("Arvores Queimadas: " + this.arrayIncendio.length);



                    }


                }

            }

            this.floresta.update();

            this.arrayIncendio.forEach(function (i) {
                i.animations.play('incendiar');
            });

            this.arrayWater.forEach(function (w) {
                w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
                w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
            });

            if (game.input.mousePointer.isDown) {
                console.log(game.input.mousePointer.x);
                console.log(game.input.mousePointer.y);
            }

            this.collision = game.physics.isoArcade.collide(this.cowboy, this.player);
            this.collision2 = game.physics.isoArcade.collide(this.cobra, this.player);
            this.collision3 = game.physics.isoArcade.collide(this.treeTileArray[0], this.player);
            var getBalde = game.physics.isoArcade.collide(this.balde, this.player);

            if (getBalde) {

                this.caapora.isEquiped = true;
                this.balde.destroy();
                this.player.loadTexture('dudeBalde');
            }


            // if (this.collision) {
            //   console.log('Ao lado do inimigo.');
            // } else {
            //   console.log('Longe do inimigo.');
            // }

            this.caapora.checkMovement();




            this.miniMap.playerPonto.setPositionX(((this.player.x) / 9) + 600);
            this.miniMap.playerPonto.setPositionY(((this.player.y) / 9) + 450);
            this.miniMap.playerPonto.mover();



            // Divide para reduzir as proporções e soma um valor para deslocar para o canto inferior direito da tela
            //this.miniMapCobraSprite.cameraOffset.setTo(((this.player.x) / 9) + 600, ((this.player.y) / 9) + 450);

            game.physics.isoArcade.collide(this.isoGroup);

            game.iso.topologicalSort(this.isoGroup);


            // Move the ENEMY
            this.cowboyObj.movement();

            // Move the this.cobra
            this.cobraObj.movement();

            // move the this.cat
            // this.catObj.movement();


            this.currentPlayerXtile = Math.floor(this.cat.body.position.x / this.tileSize);
            this.currentPlayerYtile = Math.floor(this.cat.body.position.y / this.tileSize);

            // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE

            if (this.currentPlayerXtile < 0)
                this.currentPlayerXtile = 0;
            if (this.currentPlayerYtile < 0)
                this.currentPlayerYtile = 0;

            if (this.currentPlayerXtile > 28)
                this.currentPlayerXtile = 28;
            if (this.currentPlayerYtile > 28)
                this.currentPlayerYtile = 28;

            if (this.currentEnemyXtile < 0)
                this.currentEnemyXtile = 0;
            if (this.currentEnemyYtile < 0)
                this.currentEnemyYtile = 0;

            if (this.currentEnemyXtile > 28)
                this.currentEnemyXtile = 28;
            if (this.currentEnemyYtile > 28)
                this.currentEnemyYtile = 28;

            if (this.currentEnemyXtile2 < 0)
                this.currentEnemyXtile2 = 0;
            if (this.currentEnemyYtile2 < 0)
                this.currentEnemyYtile2 = 0;

            if (this.currentEnemyXtile2 > 28)
                this.currentEnemyXtile2 = 28;
            if (this.currentEnemyYtile2 > 28)
                this.currentEnemyYtile2 = 28;



            /*
             Posição atual da this.cobra.
             _________________________________________________________________________________________
             */
            this.currentEnemyXtile2 = Math.floor(this.cobra.body.position.x / this.tileSize);
            this.currentEnemyYtile2 = Math.floor(this.cobra.body.position.y / this.tileSize);
            /*
             _________________________________________________________________________________________
             Posição atual da this.cobra.
             */
            this.currentEnemyXtile = Math.floor(this.cowboy.body.position.x / this.tileSize);
            this.currentEnemyYtile = Math.floor(this.cowboy.body.position.y / this.tileSize);


        },
        render: function () {


            // if(z.isDown){

            game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
            game.debug.text("Player x = " + Math.round(this.player.x) || '--', 2, 44, "#a7aebe");
            game.debug.text("Player y = " + Math.round(this.player.y) || '--', 2, 84, "#a7aebe");
            game.debug.text("Player z = " + Math.round(this.player.z) || '--', 2, 124, "#a7aebe");

            game.debug.text("Mouse x = " + Math.round(game.input.mousePointer.x) || '--', 2, 164, "#a7aebe");
            game.debug.text("Mouse y = " + Math.round(game.input.mousePointer.y) || '--', 2, 214, "#a7aebe");

            game.debug.text("World x = " + Math.round(game.width) || '--', 2, 224, "#a7aebe");
            game.debug.text("World y = " + Math.round(game.height) || '--', 2, 244, "#a7aebe");
            // }


// game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
        },
//Getters and Setters

        setPlayer: function (p) {
            this.player = p;
        },
        getPlayer: function () {
            return this.player;
        },
        setCowboy: function (cb) {
            this.cowboy = cb;
        },
        getCowboy: function () {
            return this.cowboy;
        },
        setCobra: function (param) {
            this.cobra = param;
        },
        getCobra: function () {
            return this.cobra;
        },
        setCat: function (param) {
            this.cat = param;
        },
        getCat: function () {
            return this.cat;
        },
        getNumRandomico: function () {
            return this.numRandomico;
        },
        getIsoGroup: function () {
            return this.isoGroup;
        },
        getLeft: function () {
            return left;
        },
        setLeft: function (l) {
            left = l;
        },
        getRight: function () {
            return right;
        },
        setRight: function (r) {
            right = r;
        },
        getUp: function () {
            return up;
        },
        setUp: function (u) {
            up = u;
        },
        getDown: function () {
            return down;
        },
        getEasystar: function () {
            return this.easystar;
        },
        setDown: function (d) {
            down = d;
        },
        getTimeStep: function () {
            return this.timeStep;
        },
        getTileSize: function () {
            return this.tileSize;
        },
        getCurrentEnemyXtile: function () {
            return this.currentEnemyXtile;
        },
        getCurrentEnemyYtile: function () {
            return this.currentEnemyYtile;
        },
        getCurrentEnemyXtile2: function () {
            return this.currentEnemyXtile2;
        },
        getCurrentEnemyYtile2: function () {
            return this.currentEnemyYtile2;
        },
        getCurrentPlayerXtile: function () {
            return this.currentPlayerXtile;
        },
        getCurrentPlayerYtile: function () {
            return this.currentPlayerYtile;
        },
        getCurrentNextPointX: function () {
            return this.currentNextPointX;
        },
        getCurrentNextPointY: function () {
            return this.currentNextPointY;
        },
        getCurrentNextPointX2: function () {
            return this.currentNextPointX2;
        },
        getCurrentNextPointY2: function () {
            return this.currentNextPointY2;
        },
        setCurrentNextPointX2: function (param) {
            this.currentNextPointX2 = param;
        },
        setCurrentNextPointY2: function (param) {
            this.currentNextPointY2 = param;
        },
        getCollision: function () {
            return this.collision;
        }

    };

    return BasicGame;

});


function rndNum(num) {

    return Math.round(Math.random() * num);

};
