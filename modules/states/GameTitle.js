define([
  'Phaser',
  'PhaserIsometricPlugin'
], function (Phaser) {

        var GameTitle = function(){};

        GameTitle = function(){};

        GameTitle.prototype = {
                 preload: function () {

                     console.log("iniciando game title");
                     game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
                     game.load.image('bg', 'assets/caipora-background.png');
                     game.load.image('btnStart','assets/PlayButton.png');

                 },
                create: function(){
                        //game.stage.backgroundColor = "0x0000ff";
                    
                        game.add.sprite(0, 0, 'bg');
                                          
                        var playButton = game.add.button(game.world.centerX , game.world.centerY + 200 ,"btnStart",this.playTheGame,this);
                        playButton.anchor.setTo(0.5,0.5);
                        
                         var text = game.add.bitmapText(game.world.centerX - 200, game.world.centerY - 100, 'desyrel', 'Caapora Online', 64);
                  
                },
                playTheGame: function(){
                        game.state.start("BasicGame");
                }
        };

        return GameTitle;
});