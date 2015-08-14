
// Atributos base do personagem.
var baseLife = 100;
var baseEnergy = 120;
var baseDefense = 10;
var baseAttack = 10;
var player = {};
var x = 900;
var y = 800;
var text;
var currentEnemyXtile;
var currentEnemyYtile;
var currentPlayerXtile;
var currentPlayerYtile;
var currentNextPointX;
var currentNextPointY;
var cowboyDirection = "STOP";
var selfObj = this;

function Cowboy(opts) {

    // Nome do Sprite
    var image = 'cowboy';

    // Passa a referencia da Classe BasicGame e BasicGame.game para ser 
    // modificado nesta classe
    this.basicGame = opts.basicGame;
    this.game = opts.game;
    this.easystar = opts.easystar;
    this.timeStep = opts.timeStep;


    // Permite modificar o nome do sprite
    if (opts.image) {
        key = opts.image;
    }

    // Inclui o Cowboy do BasicGame como o Sprite
    this.basicGame.setCowboy(this.basicGame.add.isoSprite(4 * this.basicGame.getTileSize(), 4 * this.basicGame.getTileSize(), 0, image, 0, this.basicGame.getIsoGroup()));
    // Pega a referencia do Player da Classe BasicGame
    cowboy = this.basicGame.getCowboy();
    //this.fullWidth = this.sprite.width;


    cowboy.anchor.set(0.5);

    // Inclui a Barra de vida do Player   
    cowboy.lifebar = this.game.add.sprite(-20, -30, 'lifeBarRed');
    cowboy.lifebar.anchor.setTo(0.2, 1);
    cowboy.addChild(cowboy.lifebar);

    // Inclui o texto acima da barra de vida
    // Este texto será atualizado no Update do game loop
    var style = {font: "bold 14px Arial", fill: "#333", wordWrap: true, wordWrapWidth: 150, align: "center"};
    text = this.game.add.text(20, -50, "Caapora - HP:  100", style);
    text.anchor.set(0.5);
    cowboy.addChild(text);
    cowboy.anchor.set(0.5);

    // Habilita a Fisica no Player e Colisão
    this.game.physics.isoArcade.enable(cowboy);
    cowboy.body.collideWorldBounds = true;


    // add the animations from the spritesheet
    cowboy.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    cowboy.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    cowboy.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    cowboy.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    cowboy.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
    cowboy.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
    cowboy.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
    cowboy.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);

    // set the physics bounce amount on each axis  (X, Y, Z)
    cowboy.body.bounce.set(1.2, 1.2, 0);

    // set the slow down rate on each axis (X, Y, Z)
    cowboy.body.drag.set(100, 100, 0);

}

// Getters and Setters das Propriedades desta Classe
// Por algum motivo os atributos não podem ser acessados diretamente (?)
Cowboy.prototype = {
    // Getters and Setters.
    getBaseLife: function () {
        return baseLife;
    },
    setText: function (textX) {

        text.setText(textX);
    },
    setPlayer: function (pl) {
        player = pl;
    },
    getPlayer: function () {
        return player;
    },
    setBaseLife: function (life) {
        baseLife = life;
    },
    getBaseEnergy: function () {
        return baseEnergy;
    },
    setBaseEnergy: function (energy) {
        baseEnergy = energy;
    },
    getBaseDefense: function () {
        return baseDefense;
    },
    setBaseDefense: function (defense) {
        baseDefense = defense;
    },
    getBaseAttack: function () {
        return baseAttack;
    },
    setBaseAttack: function (attack) {
        baseAttack = attack;
    },
    IA: function () {

        var easystar = this.basicGame.getEasystar();

        currentPlayerXtile = this.basicGame.getCurrentPlayerXtile();
        currentPlayerYtile = this.basicGame.getCurrentPlayerYtile();
        
        currentEnemyXtile = this.basicGame.getCurrentEnemyXtile();
        currentEnemyYtile = this.basicGame.getCurrentEnemyYtile();

        easystar.findPath(currentEnemyXtile, currentEnemyYtile, currentPlayerXtile, currentPlayerYtile, function (path) {

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

            if (this.cowboyDirection != "STOP")
                cowboy.animations.play(this.cowboyDirection);

        });

       

        // PREVENT FROM GOING OUT FROM THE LOGICAL ARRAY BECAUSE OF THE PHASER PHYSICS ENGINE

        if (currentEnemyXtile < 0)
            currentEnemyXtile = 0;
        if (currentEnemyYtile < 0)
            currentEnemyYtile = 0;

        if (currentEnemyXtile > 28)
            currentEnemyXtile = 28;
        if (currentEnemyYtile > 28)
            currentEnemyYtile = 28;

        this.easystar.calculate();



    },
    // Método que será usado no GameLoop que movimenta o Caapora
    movement: function () {

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


    }

};
