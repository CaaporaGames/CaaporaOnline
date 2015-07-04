var game = new Phaser.Game(384, 384, Phaser.AUTO, 'game_div');

var main_state = {

    preload: function() {
        // Function called first to load all the assets
        game.load.tilemap('map', 'experimentos/levels/test.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'experimentos/img/tiles.png');
        game.load.spritesheet('player', 'experimentos/img/player.png', 40, 40);
    },
    create: function() {
        /* globals */
        this.tileSize = 16; // tile is 16x16
        this.tilePerScreen = 12; // height/tileSize
        this.battleEncounter = 0;
        /* physics*/
        game.physics.startSystem(Phaser.Physics.ARCADE);
        /* input and listener */
        this.cursor = this.game.input.keyboard.createCursorKeys();
        /* map */
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tiles');
        this.layer1 = this.map.createLayer('background');
        this.layer2 = this.map.createLayer('battlezone');
        this.layer3 = this.map.createLayer('obstacles');
        //this.layer1.scale = {x:2,y:2};
        this.layer1.resizeWorld();
        //this.layer2.scale = {x:2,y:2};
        this.layer2.resizeWorld();
        //this.layer3.scale = {x:2,y:2};
        this.layer3.resizeWorld();
        game.physics.arcade.enable(this.layer2);
        game.physics.arcade.enable(this.layer3);

        /*set collision*/

        this.map.setTileIndexCallback([7410], this.inBattlezone, this, this.layer2); //if hit, battlezone is entered
        this.map.setCollisionByExclusion([],true,this.layer3);
        //this.map.setCollisionCallback(function() {return true;}, this.layer2);
        /*camera*/
        this.camera = {x:0, y:0, direction:'', isMoving:false};
        /*player*/
        this.player = this.game.add.sprite(160, 160, 'player');
        this.player.scale.x = 0.5;
        this.player.scale.y = 0.5;
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
    },
    update: function() {
        game.physics.arcade.collide(this.player, this.layer3);
        game.physics.arcade.collide(this.player, this.layer2);
        this.moveCamera();
        this.movePlayer();
        //this.checkBattlezone();
    },
    moveCamera: function(){
        if (this.camera.isMoving)
            return;

        this.camera.isMoving = true;
        var mustMove = false;

        if (this.player.y > game.camera.y + game.height) {
            this.camera.y += 1;
            mustMove = true;
        }
        else if (this.player.y < game.camera.y) {
            this.camera.y -= 1;
            mustMove = true;
        }
        else if (this.player.x > game.camera.x + game.width) {
            this.camera.x += 1;
            mustMove = true;
        }
        else if (this.player.x < game.camera.x) {
            this.camera.x -= 1;
            mustMove = true;
        }

        if (mustMove) {
            var t = game.add.tween(game.camera).to({x:this.camera.x*game.width, y:this.camera.y*game.height}, 600);
            t.start();
            t.onComplete.add(function(){this.camera.isMoving = false;}, this);
        }
        else {
            this.camera.isMoving = false;
        }
    },
    movePlayer: function() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        var speed = 230;
        if (this.cursor.left.isDown) {
            if (this.tween) this.player.body.velocity.x = -50;
            else this.player.body.velocity.x = -speed;
        }
        else if (this.cursor.right.isDown) {
            if (this.tween) this.player.body.velocity.x = 50;
            else this.player.body.velocity.x = speed;
        }
        else if (this.cursor.up.isDown) {
            if (this.tween) this.player.body.velocity.y = -50;
            else this.player.body.velocity.y = -speed;
        }
        else if (this.cursor.down.isDown) {
            if (this.tween) this.player.body.velocity.y = 50;
            else this.player.body.velocity.y = speed;
        }
    },
    showCords: function() {
        var screen = this.tileSize*this.tilePerScreen;
        var result = 'player stats:';
        result += '\nx: '+this.player.x;
        result += '\ny: '+this.player.y;
        result += '\ncamera stats:';
        result += '\nx: '+this.camera.x;
        result += '\ny: '+this.camera.y;
        result += '\nbounds: ';
        result += '\nx: '+(0+game.camera.x+screen);
        result +='\ny: '+(0+game.camera.y+screen);

        return result;
    },
    inBattlezone: function() {
        if (this.cursor.up.isDown || this.cursor.down.isDown || this.cursor.left.isDown || this.cursor.right.isDown) {
            this.battleEncounter++;
            console.log('random battle tick');
            if (Math.floor((this.battleEncounter/1000)*Math.random()) >= 1) {
                console.log('random battle occured');
                this.battleEncounter = 0;
            }
        }
    }
};
game.state.add('main', main_state);
game.state.start('main');