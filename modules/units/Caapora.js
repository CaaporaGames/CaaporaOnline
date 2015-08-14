
  // Atributos base do personagem.
     var baseLife = 100;
     var baseEnergy = 120;
     var baseDefense = 10;
     var baseAttack = 10;
     var player = {};
     var x = 900;
     var y = 800;
     var text;
     
  function Caapora(opts) {
      	
		var image = 'dude';
               
                this.game = opts.game;
                                
		if (opts.image) {
			key = opts.image;
		}
    
                this.game.setPlayer(this.game.game.add.isoSprite(x, y, 11, image, 0, this.game.getIsoGroup()));	
		
                player = this.game.getPlayer();
                //this.fullWidth = this.sprite.width;
                
                // var style = { font: "bold 14px Arial", fill: "#333", wordWrap: true, wordWrapWidth: 150, align: "center" };

                //text = this.game.add.text(20, -50, "Caapora - HP: 100%", style);
                //text.anchor.set(0.5);

                //this.player.addChild(text);

                player.anchor.set(0.5);

                player.lifebar = this.game.game.add.sprite(-20, -30, 'lifeBar');
                player.lifebar.anchor.setTo(0.2,1);
                player.addChild(player.lifebar);
                
                var style = { font: "bold 14px Arial", fill: "#333", wordWrap: true, wordWrapWidth: 150, align: "center" };

                text = this.game.game.add.text(20, -50, "Caapora - HP:  100", style);
                text.anchor.set(0.5);
                
                
                player.addChild(text);

                player.anchor.set(0.5);
                
                
                this.game.game.physics.isoArcade.enable(player);
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
                
                
   }


  Caapora.prototype = {
      
         // Getters and Setters.
        getBaseLife : function(){
          return baseLife;
        },
        
        setText : function(textX){
            
            text.setText(textX);
        },
        
        setPlayer : function(pl){
            player = pl;
        },
        
        getPlayer : function(){
            return player;
        },

        setBaseLife : function(life){
          baseLife = life;
        },

        getBaseEnergy : function(){
          return baseEnergy;
        },

        setBaseEnergy : function(energy){
          baseEnergy = energy;
        },

        getBaseDefense : function(){
          return baseDefense;
        },

        setBaseDefense : function(defense){
          baseDefense = defense;
        },

        getBaseAttack : function(){
          return baseAttack;
        },

        setBaseAttack : function(attack){
          baseAttack = attack;
        },
        
        checkMovement: function(){
            
                        //  Reset the players velocity (movement)
               player.body.velocity.x = 0;
               player.body.velocity.y = 0;

               if (this.game.getLeft().isDown)
               {
                 //  Move to the left
                 player.body.velocity.x = -150;
                 player.body.velocity.y = 150;
                 player.animations.play('left');
               }
               else if (this.game.getRight().isDown)
               {
                 //  Move to the right
                 player.body.velocity.x = 150;
                 player.body.velocity.y = -150;

                 player.animations.play('right');
               }
               else if (this.game.getUp().isDown)
               {
                 player.body.velocity.x = -150;
                 player.body.velocity.y = -150;

                 player.animations.play('up');
               }
               else if (this.game.getDown().isDown)
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