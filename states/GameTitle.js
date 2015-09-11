define([
  'Phaser'
], function (Phaser) {

        var GameTitle;
        var clickArea;
        var _isDown = false;
        var pause;

        GameTitle = function(){};

        GameTitle.prototype = {
                 preload: function () {


                     var loadingBar = game.add.sprite(game.width/2, game.height/2 ,"loading");
                    loadingBar.anchor.setTo(0.5,0.5);
                    this.load.setPreloadSprite(loadingBar);

                     var style = {font: "bold 14px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: 150, align: "center"};
                     textCaapora = this.game.add.text(game.width/2, game.height/2 - 30, "Bem-vindo ao Caapora Online", style);
                     textCaapora.anchor.set(0.5);


                     console.log("iniciando game title");
                     game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
                     game.load.image('bg', 'assets/images/caipora-background.png');
                     game.load.image('menu', 'assets/images/menu.png');
                     game.load.image('creditos', 'assets/images/creditos.png');
                     game.load.image('caipora', 'assets/images/caipora.png');
                     game.load.image('saci', 'assets/images/saci.png');
                     game.load.image('menubg', 'assets/images/menubg.png');

                 },
                create: function(){
                        //game.stage.backgroundColor = "0x0000ff";



                        game.add.sprite(0, 0, 'bg');

                         game.add.sprite(game.world.centerX - 100, game.world.centerY + 115, 'menubg');

                         game.add.bitmapText(game.world.centerX - 200, game.world.centerY - 100, 'desyrel', 'Caapora Online', 64);

                         novoJogo = game.add.bitmapText(game.world.centerX - 45, game.world.centerY + 120, 'desyrel', 'Novo Jogo', 30);

                         player = game.add.bitmapText(game.world.centerX - 45, game.world.centerY + 160, 'desyrel', 'Jogador', 30);

                         opcoes = game.add.bitmapText(game.world.centerX - 45, game.world.centerY + 200, 'desyrel', 'Opcoes', 30);

                         mmk = game.add.bitmapText(game.world.centerX - 45, game.world.centerY + 240, 'desyrel', 'Map Maker', 30);

                         opcoes.inputEnabled = true;

                         mmk.inputEnabled = true;

                         novoJogo.inputEnabled = true;

                         player.inputEnabled = true;

                         opcoes.events.onInputUp.add(this.pause, self);

                         mmk.events.onInputUp.add(this.mapMaker, self);

                         novoJogo.events.onInputUp.add(this.playTheGame, self);

                         player.events.onInputUp.add(this.player, self);

                         game.input.onDown.add(this.unpause, self);






                },

                playTheGame: function(){
                        game.state.start("Prologo");
                },


                pause: function(){

                        // When the paus button is pressed, we pause the game
                        game.paused = true;

                        // Then add the menu
                        menu = game.add.sprite(game.width/2, game.height/2, 'menu');
                        menu.anchor.setTo(0.5, 0.5);



                        // And a label to illustrate which menu item was chosen. (This is not necessary)
                        choiseLabel = game.add.text(game.width/2, game.height-150, 'Clique fora da janela para sair', { font: '16px Arial', fill: '#fff' });
                        choiseLabel.anchor.setTo(0.5, 0.5);

                },

                mapMaker: function(){

                    game.state.start("MapMaker");

                },


                player: function(){

                        // When the paus button is pressed, we pause the game


                        // Then add the menu
                        menu = game.add.sprite(game.width/2, game.height/2, 'caipora');
                        menu.anchor.setTo(0.5, 0.5);



                          right = game.add.bitmapText(game.world.centerX + 200, game.world.centerY  , 'desyrel', '>', 64);

                          left  = game.add.bitmapText(game.world.centerX - 200, game.world.centerY  , 'desyrel', '<', 64);


                          exit  = game.add.bitmapText(game.world.centerX + 230, game.world.centerY -230 , 'desyrel', 'x', 64);

                          right.inputEnabled = true;

                          left.inputEnabled = true;

                          exit.inputEnabled = true;

                          right.events.onInputUp.add(function(){

                               menu.loadTexture('saci');

                          }, self);

                          left.events.onInputUp.add(function(){

                               menu.loadTexture('caipora');

                          }, self);


                           exit.events.onInputUp.add(function(){

                               right.destroy();
                               left.destroy();
                               exit.destroy();
                               menu.destroy();

                          }, self);



                },




                // And finally the method that handels the pause menu

                unpause: function(event){
                    // Only act if paused
                    if(game.paused){
                        // Calculate the corners of the menu
                        var x1 = game.width/2 - 300, x2 = game.width/2 + 300,
                            y1 = game.height/2 - 200, y2 = game.height/2 + 200;

                        // Check if the click was inside the menu
                        if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                            // The choicemap is an array that will help us see which item was clicked
                            var choisemap = ['Controle', 'Som', 'Dificuldade', 'Sair'];

                            // Get menu local coordinates for the click
                            var x = event.x - x1,
                                y = event.y - y1;

                            // Calculate the choice
                            var choise = Math.floor(x / 400) + Math.floor(y / 80);

                            // Display the choice
                            choiseLabel.text = 'You chose menu item: ' + choisemap[choise];

                            if(choisemap[choise] == 'Sair'){

                                   // Remove the menu and the label
                                    menu.destroy();
                                    choiseLabel.destroy();

                                    // Unpause the game
                                    game.paused = false;
                            }
                        }
                        else{
                            // Remove the menu and the label
                            menu.destroy();
                            choiseLabel.destroy();

                            // Unpause the game
                            game.paused = false;
                        }
                    }
                }



        };

        return GameTitle;
});
