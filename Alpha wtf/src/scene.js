class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.image('player', 'assets/images/player_base.png');
        this.load.image('dragon', 'assets/images/dragon_base.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {
        const backgroundImage = this.add.image(0, -300, 'background').setOrigin(0, 0);
        backgroundImage.setScale(1, 1.2);
        const map = this.make.tilemap({key: 'map'});


        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createLayer('Sol', tileset);


        this.platforms.setCollisionByExclusion(-1, true);

        this.pointCamera = this.physics.add.sprite(0,600);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.pointCamera.setVelocityX(300);

        this.player = new Player(this);
        //this.dragon = new Dragon(this);

        this.dragon = this.physics.add.sprite(this.player.player.body.x - 600, 650, 'dragon');
        this.dragon.setScale(1);
        this.dragon.setCollideWorldBounds(false);
        this.dragon.body.setAllowGravity(false);
        this.dragon.setImmovable(true);


        this.player.initKeyboard()

        this.cameras.main.startFollow(this.player.player,false);
        //this.cameras.main.startFollow(this.pointCamera,false);

    }

    update() {

        switch (true) {
            case this.player.spaceDown:
                this.player.dash()
                break;
            case this.player.upDown:
                this.player.jump()
                this.player.flag=false;
                break;
            case this.player.leftDown:
                this.player.moveLeft()
                this.player.flagleft=false;
                break;
            case this.player.rightDown:
                this.player.moveRight();
                this.player.flagright=false;
                break;
            case this.player.player.body.onFloor():
                this.player.stop();
        }

        this.player.dashRelease();
        this.player.jumpRelease();
        this.player.moveRightRelease();
        this.player.moveLeftRelease();

        this.dragon.body.x = this.player.player.body.x - 800;

        /*if (this.player.player.body.x <= this.pointCamera.body.x - 600){
            alert ('perdu');
        }*/
    }
}