class Pause extends Phaser.Scene {

    constructor() {
        super('pause');
    }


    preload() {
        this.load.image('flou', 'Alpha wtf/assets/images/flou.png');
        this.load.audio('clic', 'Alpha wtf/assets/sounds/clic.wav');
        this.load.image('fireBall', 'Alpha wtf/assets/images/boule_de_feu_base.png');

    }

    create() {
        let me = this;
        const {width, height} = this.scale

        window.pauseUi = true;
        window.satrtUi = false;

        //BACKGROUND
        this.Flou = this.add.image(0, 0, 'flou').setOrigin(0, 0);

        //AUDIO
        this.clic = this.sound.add('clic');

        //TEXT
        window.Resume = this.add.text(width * 0.5, height * 0.55, 'Reprendre', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.Pause = this.add.text(width * 0.5, height * 0.30, 'Pause', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 98
        })
            .setOrigin(0.5);

        this.Option = this.add.text(width * 0.5, height * 0.65, 'Option', {
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);


        //Rectangle Box
        this.buttonStart = this.add.rectangle(window.Resume.x, window.Resume.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.resume('game')
                this.scene.stop();
            })
            .on('pointerover', function () {
                window.Resume.setAlpha(1)
                me.clic.play();
            })
            .on('pointerout', function () {
                window.Resume.setAlpha(0.7)
            })

        this.buttonOption = this.add.rectangle(this.Option.x, this.Option.y, 300, 75, 0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.pause();
                this.scene.launch('option');
                this.buttonStart.disableInteractive();
                window.Resume.setAlpha(0);
                this.Pause.setAlpha(0);
                this.buttonOption.disableInteractive();
                this.Option.setAlpha(0);
                this.optionUi = false;
            })
            .on('pointerover', function () {
                me.Option.setAlpha(1)
                me.clic.play();
            })
            .on('pointerout', function () {
                if (me.Option.alpha !== 0) {
                    me.Option.setAlpha(0.7)
                }
            })


        //CURSOR
        var feu = this.add.particles('fireBall');
        this.cursorBox = this.physics.add.sprite(0, 0).setOrigin(0.1, 0.3).setAlpha(0);

        this.test = this.add.particles('fireBall');
        this.test.createEmitter({
            speed: 50,
            lifespan: 100,
            gravity: {x: 0, y: 0},
            scale: {start: 0.3, end: 0.1},
            follow: this.cursorBox
        });
        this.input.setDefaultCursor('url(arrow.cur), pointer');

        this.Init();
    }


    update() {
        this.cursorBox.body.x = this.game.input.mousePointer.x + this.cameras.main.worldView.x
        this.cursorBox.body.y = this.game.input.mousePointer.y + this.cameras.main.worldView.y

        if (this.optionUi) {

        } else {
            this.buttonStart.setInteractive();
            window.Resume.setAlpha(0.7);
            this.Pause.setAlpha(0.7);
            this.buttonOption.setInteractive();
            this.Option.setAlpha(0.7);
            this.optionUi = true;
        }
    }

    Init() {
        if (window.englishUi) {
            window.Resume.setText('Resume');
        }
        if (window.frenchUi) {
            window.Resume.setText('Reprendre');
        }

    }
}