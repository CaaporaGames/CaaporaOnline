
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
    
                this.game.setPlayer(this.game.game.add.isoSprite(x, y, 11, image, 0, this.game.game.isoGroup));	
		
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

                text = this.game.game.add.text(20, -50, "Caapora - HP:  100%", style);
                text.anchor.set(0.5);
                
                
                player.addChild(text);

                player.anchor.set(0.5);
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
        }
  
    };