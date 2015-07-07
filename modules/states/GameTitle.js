define([
  'Phaser',
  'PhaserIsometricPlugin'
], function (Phaser) {

var GameTitle = function(){};

GameTitle.Boot = function(){};
 
GameTitle.Boot.prototype = {
  	create: function(){
		var gameTitle = game.add.sprite(160,160,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		game.state.start("BasicGame");
	}
};

  return GameTitle;
});