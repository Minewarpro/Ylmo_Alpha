class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.image('player', 'assets/images/player_base.png');
        this.load.image('dragon', 'assets/images/dragon_base.png');
        this.load.image('champi-1', 'assets/images/champi-1.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet_test.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0).setPipeline('Light2D');
        backgroundImage.setScale(1, 1.2);
        const map = this.make.tilemap({key: 'map'});


        const tileset = map.addTilesetImage('platformPack_tilesheet_test', 'tiles');

        this.platforms = map.createLayer('Sol', tileset);
        this.platforms.setCollisionByExclusion(-1, true);
        this.platforms.setPipeline('Light2D');

        this.plantesArrieres = map.createLayer('PlantesArrieres', tileset);
        this.plantesArrieres.setPipeline('Light2D');

        this.player = new Player(this);

        this.Fougeres = map.createLayer('Fougères', tileset);
        this.Fougeres.setPipeline('Light2D');

        this.plantes = map.createLayer('Plantes', tileset);
        this.plantes.setPipeline('Light2D');



        this.pointCamera = this.physics.add.sprite(0,600);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.pointCamera.setVelocityX(300);


        this.dragon = new Dragon(this);

        this.input.mouse.disableContextMenu();

        this.player.initKeyboard()

        this.cameras.main.startFollow(this.player.player,false,1,1,0,150);
        this.cameras.main.setRoundPixels(true);
        //this.cameras.main.startFollow(this.pointCamera,false);
        this.lights.enable();
        this.lights.setAmbientColor(0xbbbbbb);
        this.light = this.lights.addLight(this.player.player.body.x, this.player.player.body.y, 380).setIntensity(3);
        this.light.setColor(0x0f3fff);
    }

    update()
    {
        this.player.move();

        this.dragon.dragon.body.x = this.player.player.body.x - 800;

        this.light.x = this.player.player.body.x +15;
        this.light.y = this.player.player.body.y + 15;

        /*if (this.player.player.body.x <= this.pointCamera.body.x - 400){
            alert ('perdu');
        }*/
    }
}