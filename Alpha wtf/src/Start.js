class Start extends Phaser.Scene {

    constructor() {
        super('start');
    }

    preload(){
        this.load.image('ecranTitre', 'Alpha wtf/assets/images/ecran_titre.png');
        this.load.image('fireBall', 'Alpha wtf/assets/images/boule_de_feu_base.png');
        this.load.image('feuille', 'Alpha wtf/assets/images/feuille.png');
        this.load.audio('Theme', 'Alpha wtf/assets/sounds/MainTheme.mp3');
        this.load.audio('clic', 'Alpha wtf/assets/sounds/clic.wav');
        this.load.spritesheet('titre','Alpha wtf/assets/images/spritesheet_titre.png', {frameWidth: 428, frameHeight: 272});
    }

    create(){
        let me = this;
        const {width, height}= this.scale

        this.optionUi = true;
        window.startUi = true;

        //ECRAN TITRE
        this.ecranTitre = this.add.image(0, 0, 'ecranTitre').setOrigin(0, 0);



        /*this.titre = this.add.sprite(640,160,'');
        this.anims.create(
            {
                key: 'titre',
                frames: this.anims.generateFrameNumbers('titre', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: -1
            });
        this.titre.anims.play('titre');*/


        //SOUNDS
        this.theme = this.sound.add('Theme',{volume: 0.3}).play();
        this.clic = this.sound.add('clic');

        //PARTICLES
        var particles = this.add.particles('feuille');
        var feu = this.add.particles('fireBall');

        particles.createEmitter({
            x: 0,
            y: { min: 300, max: 620 },
            lifespan: 5000,
            speedX: { min: 150, max: 200},
            scale: { start: 0.4, end: 0.1 },
            quantity: 1,
            rotate: { start: -180, end: 180 },
            frequency: 1500,
        });

        particles.createEmitter({
            x: 300,
            y: { min: 400, max: 550 },
            lifespan: 5000,
            speedX: { min: 150, max: 200},
            scale: { start: 0.2, end: 0.1 },
            quantity: 1,
            rotate: { start: -180, end: 180 },
            frequency: 700,
        });

        feu.createEmitter({
            x: { min: 450, max: 800 },
            y: 100,
            lifespan: 2000,
            speedY: { min: -50, max: -100},
            speedX: { min: 120, max: 160},
            scale: { start: 0.2, end: 0.1 },
            quantity: 1,
            frequency: 400,
        });


        //TEXT
        window.Play = this.add.text(width*0.5,height*0.55,'Commencer à Jouer',{
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize : 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.Option = this.add.text(width*0.5,height*0.65,'Option',{
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize : 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);


        //Rectangle Box
        this.buttonStart = this.add.rectangle( window.Play.x, window.Play.y,300,75,0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=> {
                this.scene.start('game')
                window.startUi = false;
            })
            .on('pointerover', function () {
               window.Play.setAlpha(1)
                me.clic.play();
            })
            .on('pointerout', function () {
                window.Play.setAlpha(0.7)
            })

        this.buttonOption = this.add.rectangle( this.Option.x, this.Option.y,300,75,0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=> {
                this.scene.pause();
                this.scene.launch('option');
                this.ecranTitre.setAlpha(0.4);
                this.buttonStart.disableInteractive();
                window.Play.setAlpha(0);
                this.buttonOption.disableInteractive();
                this.Option.setAlpha(0);
                this.optionUi = false;
            })
            .on('pointerover', function () {
                me.Option.setAlpha(1)
                me.clic.play();
            })
            .on('pointerout', function () {
                if (me.Option.alpha !==0) {
                    me.Option.setAlpha(0.7)
                }
            })


        //CURSOR
        this.cursorBox = this.physics.add.sprite(0,0).setOrigin(0.1,0.3);

        this.test = this.add.particles('fireBall');
        this.test.createEmitter({
            speed: 50,
            lifespan : 100,
            gravity: { x: 0, y: 0 },
            scale: { start: 0.3, end: 0.1 },
            follow: this.cursorBox
        });
        this.input.setDefaultCursor('url(arrow.cur), pointer');

    }

    update(){
        this.cursorBox.body.x = this.game.input.mousePointer.x + this.cameras.main.worldView.x
        this.cursorBox.body.y = this.game.input.mousePointer.y + this.cameras.main.worldView.y

        if (this.optionUi){

        } else {
            this.ecranTitre.setAlpha(1);
            this.buttonStart.setInteractive();
            window.Play.setAlpha(0.7);
            this.buttonOption.setInteractive();
            this.Option.setAlpha(0.7);
            this.optionUi = true;
        }
    }

}