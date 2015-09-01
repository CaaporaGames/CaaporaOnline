define([
], function () {
    
    
    var Boot = function(game){
            console.log("%cWelcome to the Caapora RPG World", "color:white; background:green");
    };

    Boot.prototype = {
            preload: function(){
              this.game.load.image("loading","assets/images/loading-bar.png"); 
            },
            create: function(){
                  
                   // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                   // this.scale.pageAlignHorizontally = true;
                   // this.scale.setScreenSize();
                    this.game.state.start("MapMaker");
            }
    };


    return Boot;


    
    
});
