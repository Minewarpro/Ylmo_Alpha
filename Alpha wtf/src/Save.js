class Save {

    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.currentSaveX = this.player.player.body.x
        this.currentSaveY = this.player.player.body.y
        this.currentPoints = 0;
        const map = this.scene.make.tilemap({key: 'map'});
        this.dead=false;



        this.scene.anims.create(
            {
                key: 'checkpointFirst',
                frames: this.scene.anims.generateFrameNumbers('checkpoint', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: 0
            });

        this.scene.anims.create(
            {
                key: 'checkpoint',
                frames: this.scene.anims.generateFrameNumbers('checkpoint', { start: 3, end: 10 }),
                frameRate: 10,
                repeat: -1
            });

        this.saves = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y, 'save').setScale(0.5);
            this.scene.physics.add.overlap(this.player.player, this.saves, this.sauvegarde.bind(this), null, this)
        });


        for(var i = 0; i < this.saves.getChildren().length; i++) {
            this.saves.getChildren()[i].active = false;
            this.saves.getChildren()[i].setDepth(2);
            this.saves.getChildren()[i].body.setSize(300,500);
        }

        this.feu= this.scene.add.particles('fireBall');

    }

    death(){

        console.log('death')
        let me = this;
        this.dead=true;
        this.player.fireBall.emitParticleAt(this.player.player.body.x, this.player.player.body.y);

        this.player.player.setVelocity(0, 0);
        this.player.player.visible = true;
        me.player.player.body.x = me.currentSaveX;
        me.player.player.body.y = me.currentSaveY;

        for(var i = 0; i < this.scene.points.points.getChildren().length; i++) {
            if (this.scene.points.points.getChildren()[i].body.x > this.player.player.body.x){
                this.scene.points.points.getChildren()[i].setAlpha(1);
                this.scene.points.points.getChildren()[i].setDisplaySize(30,30);
                this.scene.points.points.getChildren()[i].y = this.scene.points.points.getChildren()[i].initPositionY;
                this.scene.points.points.getChildren()[i].x = this.scene.points.points.getChildren()[i].initPositionX;
                this.scene.points.points.getChildren()[i].body.enable = true;
                this.scene.points.points.getChildren()[i].part.visible = true;
                console.log('test')
                this.scene.tweens.add({
                    targets: this.scene.points.points.getChildren()[i],
                    y: this.scene.points.points.getChildren()[i].y + 20,
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    repeat: -1,
                    yoyo: true
                });
            }
        }
        for(var i = 0; i < this.scene.ennemy.ennemy.getChildren().length; i++) {
            if (this.scene.ennemy.ennemy.getChildren()[i].body.x > this.player.player.body.x) {
                //this.scene.ennemy.ennemy.getChildren()[i].enableBody(true);
                this.scene.ennemy.ennemy.getChildren()[i].visible = true;
                this.scene.ennemy.ennemy.getChildren()[i].body.x = this.scene.ennemy.ennemyPositionX[i];
                this.scene.ennemy.ennemy.getChildren()[i].body.y = this.scene.ennemy.ennemyPositionY[i];
                this.scene.ennemy.ennemy.getChildren()[i].anims.play('ennemyIdle',true);
                this.scene.ennemy.ennemy.getChildren()[i].tuchEnnemy = false;
                this.scene.ennemy.ennemy.getChildren()[i].flagExclamation = true;
            }
        }

        window.pointsTotals = this.currentPoints;

        if(this.scene.box.Cinematique1Finish) {

            window.KeyboardEnable=false;

            window.change = true;
            window.dragonEnable = false;
            me.scene.pointCamera.body.x = me.player.player.body.x;
            me.scene.pointCamera.body.y = 885;
            me.scene.pointCamera.setVelocityX(0);
            me.scene.pointCamera.setVelocityY(0);
            me.scene.dragon.dragon.body.x = me.player.player.body.x - 1200;

            setTimeout(function () {
                console.log('Dstart')
                me.scene.dragon.dragon.setVelocityX(450);
                setTimeout(function () {
                    console.log('DCrie')
                    me.scene.dragon.dragon.setVelocityX(0);
                    me.scene.dragon.dragon.anims.play('crie');
                    me.scene.cameras.main.shake(1000, 0.02);
                    setTimeout(function () {
                        console.log('DRun')
                        me.scene.pointCamera.setVelocityX(300);
                        me.scene.dragon.dragon.anims.play('run');
                        window.dragonEnable = true;
                        window.KeyboardEnable = true;
                        this.dead = false;
                        window.change = true;
                        me.player.initKeyboard();
                    }, 1000)
                }, 1300)
            }, 2000)
        }
    }
    sauvegarde(player, saves) {
        if (!saves.active) {
            saves.active = true;
            this.currentSaveX = player.body.x
            this.currentSaveY = player.body.y
            this.currentPoints = window.pointsTotals;
            saves.anims.play('checkpointFirst');
            this.feu.createEmitter({
                x: {min : saves.x - 60, max : saves.x + 60},
                y: saves.y,
                lifespan: 5000,
                speedY: { min: -150, max: -200},
                scale: { start: 0.2, end: 0.1 },
                quantity: 3,
                frequency: 400,
            });
            setTimeout(function () {
                saves.anims.play('checkpoint');
            }, 300)
            console.log("current", this.currentSaveX, this.currentSaveY)
        }
    }
}