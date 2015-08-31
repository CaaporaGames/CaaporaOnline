// Atributos base do personagem.
var baseLife = 800;
var baseEnergy = 120;
var baseDefense = 10;
var baseAttack = 10;
var bar;
var textFloresta;


function Floresta(opts) {
    
      // Barra de energia dinâmica
        this.bar = game.add.bitmapData(game.width - 50, 16);
     
        this.bar.context.fillStyle = '#0f0';
        
         this.bar.context.fillRect(0, 0, baseLife, 8);
        
        this.bar.dirty = true;
     
        this.lifebar = game.add.sprite(30, 70, this.bar); 
        
         this.lifebar.fixedToCamera = true;
         this.lifebar.cameraOffset.setTo(10, 30);
         
         incendioTotal = opts.incendio;
         
         
         // Inclui o texto acima da barra de vida
        // Este texto será atualizado no Update do game loop
        var style = {font: "bold 14px Arial", fill: "#8DB335", wordWrap: true, wordWrapWidth: 150, align: "center"};
        textFloresta = game.add.text(game.width - 120, -10, "Floresta - HP:  100", style);
        textFloresta.anchor.set(0.5);
        
         this.lifebar.addChild(textFloresta);
         
        
        // Perdendo life com a queima
        setInterval(function () {

          baseLife -= 5 * incendioTotal.length;
          textFloresta.setText("Floresta - HP: " + baseLife);

        }, 3000);
      

    
    
}


Floresta.prototype = {
    
    setBaseLife: function (life) {
        baseLife = life;
    },
    getBaseLife: function () {
        return baseLife;
    },
    setText: function (textX) {

        textFloresta.setText(textX);
    },
    
    
    update : function(){
        
        // Barra de Energia
         // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.bar.context.clearRect(0, 0, this.bar.width, this.bar.height);
        
        // some simple colour changing to make it look like a health bar
        if (parseFloat(baseLife) < (800 * 0.35)) {
           this.bar.context.fillStyle = '#f00';   
        }
        else if (parseFloat(baseLife) < (800 * 0.75)) {
            this.bar.context.fillStyle = '#ff0';
        }
        else {
            this.bar.context.fillStyle = '#0f0';
        }
        
        // draw the bar
        this.bar.context.fillRect(0, 0, baseLife, 8);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.bar.dirty = true;
        
    
      
      if(baseLife < 0){
          game.state.start('GameOver');
      }
        
    }
    
    
    
}