define([
    'Phaser',
    'PhaserDebug',
    'PhaserTiled',
    //'modules/extensions/MyExtension',
    'modules/units/Caapora',
    'modules/units/Cowboy',
    'modules/units/Enemy',
    'modules/units/Cobra',
    'modules/units/Cat',
    'modules/units/Keyboard'
            //'modules/factories/MyFactory'
], function (Phaser, Caapora, Cowboy, Enemy, Cobra, Cat,Keyboard) {

    //console.log('phaser', Phaser);
    //console.log('PIXI', PIXI);
    //console.log('p2', p2);

    var PhaserGame = function (w, h) {
        return new Phaser.Game(w, h, Phaser.AUTO);
    };

    return PhaserGame;
});
