class Player {

    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(250, 750, 'player');
        this.player.setScale(1);
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.platforms);

        this.dejaAppuye =false;
        this.doubleJump =1;

        this.speed={
            speedDash:1,
        }

        this.dashTween = this.scene.tweens.add({
            targets: this.speed,
            speedDash: 0,
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: "Circ.easeInOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            //repeat: -1, // -1: infinity
            //yoyo: true
        });

        /*
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
            repeat:-1,

        });*/
    }

    initKeyboard() {
        let me = this;
        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.upDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.DOWN:
                    me.downDown=true;
                    break;
            }
        });
        this.scene.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.upDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.DOWN:
                    me.downDown=false;
                    break;
            }
        });
    }
    jump(){
        if (this.dejaAppuye) {

        }
        else {
            this.dejaAppuye = true;
            if (this.player.body.onFloor()){
                this.player.setVelocityY(-520);
                console.log('jump');
            }
            else if (this.doubleJump === 1
                    && !this.player.body.onFloor()) {
                this.player.setVelocityY(-520);
                this.doubleJump = 0;
                console.log('double jump');
            }
        }

        //this.player.setVelocityY(-520);
        //this.player.play('jump', true);
    }

    dash(){
        if (this.flagDash) {

        } else {
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.dashTween.play();
            this.flagDash = true;
            console.log("space");
        }
        switch(true){
            case this.upDown:
                    this.player.setVelocityY(-800 * this.speed.speedDash);
                if (this.rightDown){
                    this.player.setVelocityX(800 * this.speed.speedDash);
                }
                if (this.leftDown){
                    this.player.setVelocityX(-800 * this.speed.speedDash);
                }
                break;
            case this.rightDown:
                this.player.setVelocityX(800 * this.speed.speedDash);
                break;
            case this.leftDown:
                this.player.setVelocityX(-800 * this.speed.speedDash);
                break;
        }
    }

    dashRelease(){
        if (!this.spaceDown){
            if (this.flagDash){
                this.flagDash=false;
            }

            if (this.rightDown){
                this.player.setVelocityX(300);
            }

            if (this.leftDown){
                this.player.setVelocityX(-300);
            }
        }
    }

    jumpRelease(){
        // ralenti saut
        switch(true){
            case this.flag:
                // fais rien
                break;
            case !this.upDown:
                if (!this.player.body.onFloor()){
                    this.player.setVelocityY(
                        this.player.body.velocity.y * 0.6);
                }
                this.dejaAppuye=false;
                this.flag=true;
                break;
            default:
                break;

        }
        if (this.player.body.onFloor()){
            this.doubleJump=1;
        }
    }
    moveRight(){
        this.player.setVelocityX(300);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            //this.player.play('walk', true)
            }
    }
    moveRightRelease(){
        // ralenti droite
        switch(true){
            case this.flagright:
                // fais rien
                break;
            case !this.rightDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagright=true;
                break;
            default:
                break;
        }
    }
    moveLeft(){
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
            //this.player.play('walk', true)
            }
        this.player.setFlipX(true);
    }
    moveLeftRelease(){
        // ralenti gauche
        switch(true){
            case this.flagleft:
                // fais rien
                break;
            case !this.leftDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagleft=true;
                break;
            default:
                break;
        }
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            //this.player.play('idle',true)
        }
    }

    }



