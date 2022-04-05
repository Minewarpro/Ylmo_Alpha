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
        this.dragon = new Dragon(this);

        this.input.mouse.disableContextMenu();

        this.player.initKeyboard()

        this.cameras.main.startFollow(this.player.player,false);
        //this.cameras.main.startFollow(this.pointCamera,false);

    }

    update() {
        switch (true) {
            case this.player.rightMouseDown:
                this.player.dashDirection()
                break;
            case this.player.spaceDown:
                this.player.jump()
                this.player.flag=false;
                break;
            case this.player.qDown:
                this.player.moveLeft()
                this.player.flagleft=false;
                break;
            case this.player.dDown:
                this.player.moveRight();
                this.player.flagright=false;
                break;
            case this.player.player.body.onFloor():
                this.player.stop();
        }

        this.player.jumpRelease();
        this.player.moveRightRelease();
        this.player.moveLeftRelease();

        this.dragon.dragon.body.x = this.player.player.body.x - 800;

        if (!this.player.rightMouseDown){
            this.player.flagDash = false;
        }
        if (this.player.player.body.onFloor()){
            this.player.dashIsUp = true;
        }


        /*if (this.player.player.body.x <= this.pointCamera.body.x - 400){
            alert ('perdu');
        }*/
    }
}