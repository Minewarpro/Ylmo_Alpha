class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.image('player', 'assets/images/player_base.png');
        this.load.image('fireBall', 'assets/images/boule_de_feu_base.png');
        this.load.image('dragon', 'assets/images/dragon_base.png');
        this.load.image('degrade', 'assets/images/degradé.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet_test.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {
        let me =this;

        // Tiled / Plan
        const backgroundImage = this.add.image(1000, 400, 'background').setOrigin(0, 0).setPipeline('Light2D');
        backgroundImage.setScale(1, 1.2);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('platformPack_tilesheet_test', 'tiles');


            // Objects

                // Collide
        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Collide').objects.forEach((collide) => {
            this.collideSprite = this.physics.add.sprite(collide.x+(collide.width*0.5), collide.y+(collide.height*0.5)).setSize(collide.width, collide.height);
            this.collide.add(this.collideSprite)
        });

            // LAYER
        this.Plan3Platforms = map.createLayer('Plan3Platforms', tileset);
        this.Plan3Platforms.setPipeline('Light2D');

        this.Plan3Fixe = map.createLayer('Plan3Fixe', tileset);
        this.Plan3Fixe.setPipeline('Light2D');

        this.player = new Player(this);
        this.dragon = new Dragon(this);

        // BONUS FLAME
        new BonusFlame(this, this.player);


        this.Plan2Fixe = map.createLayer('Plan2Fixe', tileset);
        this.Plan2Fixe.setPipeline('Light2D');

        this.degrade = this.add.image(0,0,'degrade');


        // CAMERA
        this.pointCamera = this.physics.add.sprite(600,1000);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.pointCamera.setVelocityX(300);
        this.cameras.main.startFollow(this.player.player,false,1,1,0,150);
        this.cameras.main.setRoundPixels(true);
        //this.cameras.main.startFollow(this.pointCamera,false);


        // COLLIDER
        this.physics.add.collider(this.player.player, this.collide);


        // FONCTIONS
        this.input.mouse.disableContextMenu();
        this.player.initKeyboard()


       // LIGHT
        this.lights.enable();
        this.lights.setAmbientColor(0xbbbbbb);
        this.light = this.lights.addLight(this.player.player.body.x, this.player.player.body.y, 380).setIntensity(3);
        this.light.setColor(0x0f3fff);
    }

    update()
    {
        this.player.move();

        this.dragon.dragon.body.x = this.player.player.body.x - 800;
        this.degrade.x = this.pointCamera.body.x +10;
        this.degrade.y = this.pointCamera.body.y + 300;

        this.light.x = this.player.player.body.x +15;
        this.light.y = this.player.player.body.y + 15;

        /*if (this.player.player.body.x <= this.pointCamera.body.x - 400){
            alert ('perdu');
        }*/
    }
}