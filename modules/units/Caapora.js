// Atributos base do personagem.
var baseLife = 100;
var baseEnergy = 120;
var baseDefense = 10;
var baseAttack = 10;
var player = {};
var x = 900;
var y = 800;
var textCaapora;
var caaporaSprite;
var keyboard;


function Caapora(opts) {

    // Nome do Sprite
    var image = 'dude';
    keyboard = new Keyboard();

    // Passa a referencia da Classe BasicGame e BasicGame.game para ser
    // modificado nesta classe
    this.game = opts.game;
    this.group = opts.group;

    // Permite modificar o nome do sprite
    if (opts.image) {
        key = opts.image;
    }

    // Inclui o Player do BasicGame como o Sprite
    caaporaSprite = game.add.isoSprite(x, y, 11, image, 0, this.group);
    //this.fullWidth = this.sprite.width;


    caaporaSprite.anchor.set(0.5);


        // Barra de energia dinâmica
        this.bar = this.game.add.bitmapData(128, 8);
     
        this.bar.context.fillStyle = '#0f0';
        
         this.bar.context.fillRect(0, 0, baseLife, 8);
        
        this.bar.dirty = true;
        
        caaporaSprite.lifebar = this.game.add.sprite(0, -70, this.bar); 
        caaporaSprite.lifebar.anchor.setTo(0.2, 1);
        caaporaSprite.addChild(caaporaSprite.lifebar);
        // End Barra de Energia
        
        

    // Inclui o texto acima da barra de vida
    // Este texto será atualizado no Update do game loop
    var style = {font: "bold 14px Arial", fill: "#333", wordWrap: true, wordWrapWidth: 150, align: "center"};
    textCaapora = this.game.add.text(30, -90, "Caapora - HP:  100", style);
    textCaapora.anchor.set(0.5);
    caaporaSprite.addChild(textCaapora);
    caaporaSprite.anchor.set(0.5);

    // Habilita a Fisica no Player e Colisão
    this.game.physics.isoArcade.enable(caaporaSprite);
    caaporaSprite.body.collideWorldBounds = true;

    // Adiciona a animação referente a movimentação
    //  Our two animations, walking left and right.
    caaporaSprite.animations.add('down', [0,1,2], 10, true);
    caaporaSprite.animations.add('down left', [4,5,6,7], 10, true);
    caaporaSprite.animations.add('left', [24], 10, true);
    caaporaSprite.animations.add('up left', [3,4,5], 10, true);
    caaporaSprite.animations.add('up', [8,9,10], 10, true);
    caaporaSprite.animations.add('up right', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
    caaporaSprite.animations.add('right', [16], 10, true);
    caaporaSprite.animations.add('down right', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
    
   


}

// Getters and Setters das Propriedades desta Classe
// Por algum motivo os atributos não podem ser acessados diretamente (?)
Caapora.prototype = {
    // Getters and Setters.
    setBaseLife: function (life) {
        baseLife = life;
    },
    getBaseLife: function () {
        return baseLife;
    },
    setCaaporaSprite: function (cs) {
        caaporaSprite = cs;
    },
    getCaaporaSprite: function () {
        return caaporaSprite;
    },
    setText: function (textX) {

        textCaapora.setText(textX);
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
        
        
        
         // Barra de Energia
         // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.bar.context.clearRect(0, 0, this.bar.width, this.bar.height);
        
        // some simple colour changing to make it look like a health bar
        if (baseLife < 32) {
           this.bar.context.fillStyle = '#f00';   
        }
        else if (baseLife < 64) {
            this.bar.context.fillStyle = '#ff0';
        }
        else {
            this.bar.context.fillStyle = '#0f0';
        }
        
        // draw the bar
        this.bar.context.fillRect(0, 0, baseLife, 8);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.bar.dirty = true;

        //  Reset the players velocity (movement)
        caaporaSprite.body.velocity.x = 0;
        caaporaSprite.body.velocity.y = 0;

        if (keyboard.getLeft().isDown)
        {
            //  Move to the left
            caaporaSprite.body.velocity.x = -150;
            caaporaSprite.body.velocity.y = 150;
            caaporaSprite.animations.play('left');

        }
        else if (keyboard.getRight().isDown)
        {
            //  Move to the right
            caaporaSprite.body.velocity.x = 150;
            caaporaSprite.body.velocity.y = -150;

            caaporaSprite.animations.play('right');

        }
        else if (keyboard.getUp().isDown)
        {
            caaporaSprite.body.velocity.x = -150;
            caaporaSprite.body.velocity.y = -150;

            caaporaSprite.animations.play('up');

        }
        else if (keyboard.getDown().isDown)
        {
            caaporaSprite.body.velocity.x = 150;
            caaporaSprite.body.velocity.y = 150;
            caaporaSprite.animations.play('down');
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
            caaporaSprite.animations.stop();
            
            // Sprite inicial
            caaporaSprite.frame = 1;

            caaporaSprite.body.velocity.x = 0;
            caaporaSprite.body.velocity.y = 0;
        }

    }

};
