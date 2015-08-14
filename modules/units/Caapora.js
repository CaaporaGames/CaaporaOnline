
// Atributos base do personagem.
var baseLife = 100;
var baseEnergy = 120;
var baseDefense = 10;
var baseAttack = 10;
var player = {};
var x = 900;
var y = 800;
var textCaapora;

function Caapora(opts) {

    // Nome do Sprite
    var image = 'dude';
    // Passa a referencia da Classe BasicGame e BasicGame.game para ser 
    // modificado nesta classe
    this.basicGame = opts.basicGame;
    this.game = opts.game;

    // Permite modificar o nome do sprite
    if (opts.image) {
        key = opts.image;
    }

    // Inclui o Player do BasicGame como o Sprite
    this.basicGame.setPlayer(this.basicGame.add.isoSprite(x, y, 11, image, 0, this.basicGame.getIsoGroup()));
    // Pega a referencia do Player da Classe BasicGame
    player = this.basicGame.getPlayer();
    //this.fullWidth = this.sprite.width;


    player.anchor.set(0.5);

    // Inclui a Barra de vida do Player   
    player.lifebar = this.game.add.sprite(-20, -30, 'lifeBar');
    player.lifebar.anchor.setTo(0.2, 1);
    player.addChild(player.lifebar);

    // Inclui o texto acima da barra de vida
    // Este texto será atualizado no Update do game loop
    var style = {font: "bold 14px Arial", fill: "#333", wordWrap: true, wordWrapWidth: 150, align: "center"};
    textCaapora = this.game.add.text(20, -50, "Caapora - HP:  100", style);
    textCaapora.anchor.set(0.5);
    player.addChild(textCaapora);
    player.anchor.set(0.5);

    // Habilita a Fisica no Player e Colisão
    this.game.physics.isoArcade.enable(player);
    player.body.collideWorldBounds = true;

    // Adiciona a animação referente a movimentação
    //  Our two animations, walking left and right.
    player.animations.add('down', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    player.animations.add('down left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    player.animations.add('left', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    player.animations.add('up left', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    player.animations.add('up', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
    player.animations.add('up right', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
    player.animations.add('right', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
    player.animations.add('down right', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);


}

// Getters and Setters das Propriedades desta Classe
// Por algum motivo os atributos não podem ser acessados diretamente (?)
Caapora.prototype = {
    // Getters and Setters.
    getBaseLife: function () {
        return baseLife;
    },
    setText: function (textX) {

        textCaapora.setText(textX);
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
    // Método que será usado no GameLoop que movimenta o Caapora
    checkMovement: function () {

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (this.basicGame.getLeft().isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;
            player.body.velocity.y = 150;
            player.animations.play('left');
        }
        else if (this.basicGame.getRight().isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;
            player.body.velocity.y = -150;

            player.animations.play('right');
        }
        else if (this.basicGame.getUp().isDown)
        {
            player.body.velocity.x = -150;
            player.body.velocity.y = -150;

            player.animations.play('up');
        }
        else if (this.basicGame.getDown().isDown)
        {
            player.body.velocity.x = 150;
            player.body.velocity.y = 150;
            player.animations.play('down');
        }
        /*
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
         }*/
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }

    }

};
