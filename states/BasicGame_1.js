define([
    'Phaser',
    'PhaserDebug',
    'PhaserTiled',
    //'extensions/MyExtension',
    'units/Caapora',
    'units/Cowboy',
    'units/Enemy',
    'units/Cobra',
    'units/Cat',
    'units/Keyboard',
    'units/Floresta',
    'units/InterfaceItem',
    'factories/InterfaceItemFactory',
], function (Phaser) {

    //console.log('phaser', Phaser);
    //console.log('PIXI', PIXI);
    //console.log('p2', p2);

    var PhaserGame = function (w, h) {
        return new Phaser.Game(w, h, Phaser.AUTO);
    };

    return PhaserGame;
});