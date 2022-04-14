class Player {


    constructor(scene) {
        this.scene = scene
        this.cameras = scene
        let me = this;
        this.fireBall = this.scene.add.particles('fireBall');
        this.player = this.scene.physics.add.sprite(1250, 1100, 'player');
        this.player.setScale(1);
        this.player.setCollideWorldBounds(false);
        this.player.body.setMaxSpeed(1200);
        this.player.body.setSize(this.player.sourceWidth, this.player.sourceHeight, true);

        this.dejaAppuye = false;
        this.doubleJump = 1;

        this.player.speedFactor=900
        this.dashIsUp = false;

        this.fireBall.createEmitter({
            speed: 100,
            lifespan : 200,
            gravity: { x: 0, y: 0 },
            scale: { start: 0.3, end: 0.1 },
            follow: this.player
        });
        this.fireBall.visible = false;



        this.scene.anims.create(
            {
                key: 'idle',
                frames: this.scene.anims.generateFrameNumbers('idle', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });

        this.scene.anims.create(
            {
                key: 'turnIn',
                frames: this.scene.anims.generateFrameNumbers('turn', { start: 0, end: 4 }),
                frameRate: 12,
                repeat: 0,
            });

        this.scene.anims.create(
            {
                key: 'turnOut',
                frames: this.scene.anims.generateFrameNumbers('turn', { start: 4, end: 0 }),
                frameRate: 18,
                repeat: 0,
            });

        this.scene.anims.create(
            {
                key: 'right',
                frames: this.scene.anims.generateFrameNumbers('player_right', { start: 0, end: 0 }),
                frameRate: 10,
                repeat: -1
            });


        this.scene.anims.create(
            {
                key: 'jump',
                frames: this.scene.anims.generateFrameNumbers('jump', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });

        this.scene.anims.create(
            {
                key: 'fall',
                frames: this.scene.anims.generateFrameNumbers('jump', { start: 5, end: 7 }),
                frameRate: 10,
                repeat: -1
            });

        this.scene.anims.create(
            {
                key: 'tuchGroundIdle',
                frames: this.scene.anims.generateFrameNumbers('jump', { start: 8, end: 19}),
                frameRate: 14,
                repeat: 0
            });

        this.scene.anims.create(
            {
                key: 'tuchGroundWalk',
                frames: this.scene.anims.generateFrameNumbers('jump', { start: 20, end: 27}),
                frameRate: 14,
                repeat: 0
            });
    }



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



    initKeyboard() {
        let me = this;
        this.scene.input.on('pointerdown', function (pointer) {
            if (pointer.rightButtonDown()){
                me.rightMouseDown = true;
            }
        });
        this.scene.input.on('pointerup', function (pointer) {
            if (pointer.rightButtonReleased()){
                me.rightMouseDown = false;

            }
        });

        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.upDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=true;
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
                    this.animsJump = false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    me.upDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.DOWN:
                    me.downDown=false;
                    break;
            }
        });
    }

    dashDirection(){
        let me = this;

        if (this.dashIsUp) {
            if (this.flagDash) {

            } else {
                me.player.body.setAllowGravity(false);
                me.player.body.setMaxVelocityY(1000);
                me.player.setVelocityY(0);
                me.player.setVelocityX(0);
                this.dashIsUp = false;
                this.flagDash = true;
                this.isDashing =true;
                this.fireBall.visible = true;
                this.player.setTexture('fireBall');
                this.player.anims.stop();

                console.log("start dash");
                    me.scene.physics.moveTo(
                        me.player,
                        me.scene.game.input.mousePointer.x + me.scene.cameras.main.worldView.x,
                        me.scene.game.input.mousePointer.y + me.scene.cameras.main.worldView.y,
                        960);

                setTimeout(function () {
                    me.player.body.setAllowGravity(true);
                    me.player.setVelocityY(me.player.body.velocity.y * 0.3)
                    me.player.setVelocityX(me.player.body.velocity.x * 0.3)
                    me.isDashing = false;
                    me.fireBall.visible = false;
                    me.player.anims.play('right',true);


                    console.log("dash terminé");
                }, 200)
            }
        }
    }

    dashFollow() {
        let me = this;

        if (this.dashIsUp){
            if (this.flagDash){

            } else {
                me.player.setVelocityX(0);
                me.player.setVelocityY(0);
                this.dashIsUp = false;
                this.flagDash = true;

                console.log("start dash")
                this.dashTween = this.scene.tweens.add({
                    targets: this.player,
                    speedFactor:'-=200',
                    // alpha: { start: 0, to: 1 },
                    // alpha: 1,
                    // alpha: '+=1',
                    ease: "Circ.easeOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 270,
                    onUpdate: function () {
                        console.log(me.player.speedFactor);
                        me.player.body.setAllowGravity(false);
                        console.log("dash en cours");
                        me.scene.physics.moveTo(
                            me.player,
                            me.scene.game.input.mousePointer.x + me.scene.cameras.main.worldView.x,
                            me.scene.game.input.mousePointer.y + me.scene.cameras.main.worldView.y,
                            me.player.speedFactor);
                    },
                    onComplete: function () {
                        console.log("dash terminé");
                        me.player.dashplay = false;
                        me.player.speedFactor=900
                        me.player.body.setAllowGravity(true);
                        me.player.setVelocityX(me.player.body.velocity.x * 0.6);
                        me.player.setVelocityY(me.player.body.velocity.y * 0.6);
                    }
                    //repeat: -1, // -1: infinity
                    //yoyo: true
                });

            }
        }
    }

    dash (){
        if (this.rightMouseDown){
            this.dashDirection()
        } else {
            this.flagDash = false;
        }

        if (this.player.body.velocity.y === 0){
            this.dashIsUp = true;
        }
    }

    jump(){
        if (this.dejaAppuye) {

        }
        else {
            this.dejaAppuye = true;
            this.player.body.setMaxVelocityY(1000);
            if (this.player.body.onFloor()){
                this.player.setVelocityY(-520);
                console.log('jump');
                this.player.anims.play('jump');
            }
            else if (this.doubleJump === 1
                    && !this.player.body.onFloor()) {
                this.player.setVelocityY(-520);
                this.doubleJump = 0;
                console.log('double jump');
                this.player.anims.play('jump');
            }
        }
    }

    jumpRelease(){
        // ralenti saut
        switch(true){
            case this.flag:
                // fais rien
                break;
            case !this.spaceDown:
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
            //this.player.play('right', true)
            }
    }

    moveRightRelease(){
        // ralenti droite
        switch(true){
            case this.flagright:
                // fais rien
                break;
            case !this.dDown && !this.player.body.onFloor():
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
            //this.player.play('right', true)
            }
        this.player.setFlipX(true);
    }

    moveLeftRelease(){
        // ralenti gauche
        switch(true){
            case this.flagleft:
                // fais rien
                break;
            case !this.qDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagleft=true;
                break;
            default:
                break;
        }
    }

    planer(){

        if (this.spaceDown){
            if (this.player.body.velocity.y > 20){
                this.player.body.setMaxVelocityY(100);
            }
        } else if (this.player.body.velocity.y !== 1000){
            this.player.body.setMaxVelocityY(1000);
        }
    }

    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
        } else {
            this.player.setVelocityX(this.player.body.velocity.x * 0.6);
            this.player.setVelocityY(this.player.body.velocity.y * 0.6);
        }
    }

    animation(){
        if (this.player.body.onFloor()){
            this.animsJump = false;
            if (this.player.body.velocity.x===0 && !this.isDashing && !this.spoing){
                this.turnOut=false;
                if(this.turnIn){
                }else{
                    this.player.anims.play('turnIn');
                    this.turnIn=true;
                }
                if (this.player.anims.currentFrame.index === 4){
                    this.player.anims.play('idle',true);
                }

            } else if (!this.isDashing && !this.spoing){
                this.turnIn=false;
                if (this.turnOut){
                } else{
                    this.player.anims.play('turnOut',true)
                    this.turnOut=true;
                }
                if (this.player.anims.currentFrame.index === 0){
                    this.player.anims.play('right',true);
                }
            }
        }

        if (this.player.body.velocity.y > 20 && !this.player.body.onFloor()) {
            this.player.anims.play('fall', true);
            this.fall=true;
        }
        if (this.player.body.onFloor() && this.fall){
            if (this.dDown || this.qDown){
                this.player.anims.play('tuchGroundWalk');
                this.spoingWalk = true;
            } else {
                this.player.anims.play('tuchGroundIdle');
                this.spoingIdle = true;
            }
            this.fall = false;

        }

        if (this.spoingIdle && this.player.anims.currentFrame.index === 12){
            this.spoingIdle = false;
            this.player.anims.play('idle',true);
        }
        if (this.spoingWalk && this.player.anims.currentFrame.index === 7){
            this.spoingWalk = false;
            this.player.anims.play('right',true);
        }

    }

    move(){
        if (!this.isDashing){
            this.planer();
            if (this.spaceDown){
                this.jump();
                this.flag=false;
            }

            switch (true) {
                case this.qDown:
                    this.moveLeft()
                    this.flagleft=false;
                    break;
                case this.dDown:
                    this.moveRight();
                    this.flagright=false;
                    break;
                case this.player.body.onFloor():
                    this.stop();
                    break;
            }
        }

        this.animation();
        this.dash();
        this.jumpRelease();
        this.moveRightRelease();
        this.moveLeftRelease();
    }
}



