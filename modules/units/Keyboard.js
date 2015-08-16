/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// KeyCodes do Keyboard.
function Keyboard() {

    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    up_left = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
    down_left = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
    down_right = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
    up_right = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);

}

Keyboard.prototype = {
    
    getLeft: function () {  return left; },

    setLeft: function (l) {   left = l;  },

    getRight: function () {   return right;   },

    setRight: function (r) {  right = r;  },

    getUp: function () { return up; },

    setUp: function (u) {  up = u;  },

    getDown: function () {  return down; }
}