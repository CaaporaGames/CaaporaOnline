/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var InterfaceItem = function(opts){
    
    
    this.name = opts.name;
    this.width = opts.width;
    this.height = opts.height;
    this.positionX = opts.x;
    this.positionY = opts.y;
    this.color = opts.color;
    this.actionName = opts.action;
    this.tileName = opts.tileName;
    this.mapMaker = opts.mapMaker;
    
 
      var itemBmd = game.add.bitmapData(this.width, this.height);
      itemBmd.ctx.fillStyle = opts.color;
      itemBmd.ctx.fillRect(10, 20, this.width, this.height);

      this.itemSprite = game.add.sprite(game.width / 5, game.height / 5, this.tileName ? this.tileName : itemBmd);
      this.itemSprite.fixedToCamera = true;
      this.itemSprite.cameraOffset.setTo(this.positionX, this.positionY);  
      this.itemSprite.inputEnabled = true;
      
      
      if(this.tileName != null){
                    // Adiciona listener de clique do mouse 
          this.itemSprite.events.onInputDown.add(function() { 

                        this.mapMaker.selectedTile = this.tileName;


          } , this);
          
      }
      
  
   
};



InterfaceItem.prototype = {
    
       goToTitle : function(){
           
 
                game.state.start("GameTitle");
  
                
             
        },
        
        
        addSprite : function(){
            
                
                   
        },
        
 
        setPositionX : function(x){

            this.positionX = x;
        },

        setPositionY : function(y){

            this.positionY = y;
        },

        mover : function(){

            this.itemSprite.cameraOffset.setTo(this.positionX, this.positionY);
        }
      
}

