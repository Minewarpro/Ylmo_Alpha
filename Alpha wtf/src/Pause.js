class Pause extends Phaser.Scene {

    constructor() {
        super('pause');
    }


    preload(){
        this.load.image('flou', 'Alpha wtf/assets/images/flou.png');
        this.load.audio('clic', 'Alpha wtf/assets/sounds/clic.wav');
        this.load.image('fireBall', 'Alpha wtf/assets/images/boule_de_feu_base.png');

    }

    create(){
        let me = this;
        const {width, height}= this.scale

        //BACKGROUND
        this.Flou = this.add.image(0, 0, 'flou').setOrigin(0, 0);

        //AUDIO
        this.clic = this.sound.add('clic');

        //TEXT
        this.Resume = this.add.text(width*0.5,height*0.55,'Resume',{
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize : 40
        })
            .setOrigin(0.5)
            .setAlpha(0.7);

        this.Pause = this.add.text(width*0.5,height*0.30,'Pause',{
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize : 98
        })
            .setOrigin(0.5);

        //Rectangle Box
        this.buttonStart = this.add.rectangle( this.Resume.x, this.Resume.y,300,75,0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=> {
                this.scene.resume('game')
                this.scene.stop();
            })
            .on('pointerover', function () {
                me.Resume.setAlpha(1)
                me.clic.play();
            })
            .on('pointerout', function () {
                me.Resume.setAlpha(0.7)
            })

        //CURSOR
        var feu = this.add.particles('fireBall');
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
    }
}