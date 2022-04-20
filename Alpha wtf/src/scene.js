class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'Alpha wtf/assets/images/background.png');
        this.load.image('spike', 'Alpha wtf/assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.image('player', 'Alpha wtf/assets/images/player_base.png');

        this.load.image('fireBall', 'Alpha wtf/assets/images/boule_de_feu_base.png');
        this.load.image('test_dash', 'Alpha wtf/assets/images/test_Dash.png');
        this.load.image('dragon', 'Alpha wtf/assets/images/dragon_base.png');
        this.load.image('degrade', 'Alpha wtf/assets/images/degradé.png');
        this.load.image('save', 'Alpha wtf/assets/images/Save.png');
        this.load.image('arrow', 'Alpha wtf/assets/images/arrow.cur');
        this.load.image('tiles', 'Alpha wtf/assets/tilesets/platformPack_tilesheet_test.png');
        this.load.spritesheet('player_right', 'Alpha wtf/assets/images/player_base.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('idle','Alpha wtf/assets/images/spritesheet_idle.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('turn','Alpha wtf/assets/images/spritesheet_turn.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('jump','Alpha wtf/assets/images/spritesheet_jump.png', {frameWidth: 40, frameHeight: 48});

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'Alpha wtf/assets/tilemaps/Alpha1.json');
    }


    create() {
        let me =this;

        // Tiled / Plan
        const backgroundImage = this.add.image(1000, 400, 'background').setOrigin(0, 0).setPipeline('Light2D');
        backgroundImage.setScale(1, 1.2);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('platformPack_tilesheet_test', 'tiles');


            // LAYER
        this.Plan3Fixe = map.createLayer('Plan3Fixe', tileset);
        this.Plan3Fixe.setPipeline('Light2D');

        this.Plan3Platforms = map.createLayer('Plan3Platforms', tileset);
        this.Plan3Platforms.setPipeline('Light2D');



        this.water = map.createLayer('Water', tileset);
        this.water.setPipeline('Light2D');


        this.player = new Player(this);
        this.dragon = new Dragon(this);

        // BONUS FLAME
        new BonusFlame(this, this.player);

        // SAVE
        this.save = new Save(this,this.player)

        this.Plan2Fixe = map.createLayer('Plan2Fixe', tileset);
        this.Plan2Fixe.setPipeline('Light2D');

        this.degrade = this.add.image(0,0,'degrade');

        //CURSOR
        /*this.cursorBox = this.physics.add.sprite(0,0).setOrigin(0.1,0.3);

        this.test = this.add.particles('fireBall');
        this.test.createEmitter({
            speed: 50,
            lifespan : 100,
            gravity: { x: 0, y: 0 },
            scale: { start: 0.3, end: 0.1 },
            follow: this.cursorBox
        });
        this.input.setDefaultCursor('url(assets/images/arrow.cur), pointer');*/

        // CAMERA
        this.pointCamera = this.physics.add.sprite(600,1000);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.pointCamera.setVelocityX(300);
        this.cameras.main.startFollow(this.player.player,false,1,1,0,150);
        this.cameras.main.setRoundPixels(true);
        //this.cameras.main.startFollow(this.pointCamera,false);


        // COLLIDER
        this.collider = new Collide(this, this.player, this.save);


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
        //this.cursorBox.body.x = this.game.input.mousePointer.x + this.cameras.main.worldView.x
        //this.cursorBox.body.y = this.game.input.mousePointer.y + this.cameras.main.worldView.y

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