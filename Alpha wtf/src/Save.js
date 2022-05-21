class Save {

    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.currentSaveX = this.player.player.body.x
        this.currentSaveY = this.player.player.body.y
        this.currentPoints = 0;
        const map = this.scene.make.tilemap({key: 'map'});

        this.saves = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y, 'save').setOrigin(0);
            this.scene.physics.add.overlap(this.player.player, this.saves, this.sauvegarde.bind(this), null, this)
        });

    }

    death(){
        let me = this;
        this.player.fireBall.emitParticleAt(this.player.player.body.x, this.player.player.body.y);
        window.KeyboardEnable=false;
        this.player.player.setVelocity(0, 0);
        this.player.player.visible = true;
        me.player.player.body.x = me.currentSaveX;
        me.player.player.body.y = me.currentSaveY;

        for(var i = 0; i < this.scene.points.points.getChildren().length; i++) {
            if (this.scene.points.points.getChildren()[i].body.x > this.player.player.body.x){
                this.scene.points.points.getChildren()[i].setAlpha(1);
                this.scene.points.points.getChildren()[i].body.enable = true;
                this.scene.points.points.getChildren()[i].part.visible = true;
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
                this.scene.ennemy.ennemy.getChildren()[i].tuchEnnemy = false;;
            }
        }

        window.pointsTotals = this.currentPoints;
        
        window.change=true;
        window.dragonEnable=false;
        me.scene.pointCamera.body.x = me.player.player.body.x;
        me.scene.pointCamera.body.y = 885;
        me.scene.pointCamera.setVelocityX(0);
        me.scene.pointCamera.setVelocityY(0);
        me.scene.dragon.dragon.body.x =  me.scene.pointCamera.body.x - 1200;

            setTimeout(function(){
                me.scene.dragon.dragon.setVelocityX(300);
                setTimeout(function(){
                    me.scene.dragon.dragon.setVelocityX(0);
                    me.scene.cameras.main.shake(1500, 0.02);
                    setTimeout(function(){
                        me.scene.pointCamera.setVelocityX(300);
                        window.dragonEnable = true;
                        window.KeyboardEnable=true;
                        window.change=true;
                        me.player.initKeyboard();
                    },1500)
                }, 1300)
            },2000)
    }
    sauvegarde(player, saves) {
        this.currentSaveX = player.body.x
        this.currentSaveY = player.body.y
        this.currentPoints = this.scene.points.pointsTotals;
        saves.body.enable = false;
        saves.visible = false;
        console.log("current", this.currentSaveX, this.currentSaveY)
    }
}