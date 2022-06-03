class Ennemies {

    constructor(scene, player, save) {
        let me = this;
        this.scene = scene
        this.player = player
        this.save = save

        const map = this.scene.make.tilemap({key: 'map'});

        this.ennemyPositionX = []
        this.ennemyPositionY = []

        this.scene.anims.create(
            {
                key: 'ennemyIdle',
                frames: this.scene.anims.generateFrameNumbers('ennemyIdle', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

        this.scene.anims.create(
            {
                key: 'ennemyDeath',
                frames: this.scene.anims.generateFrameNumbers('ennemyDeath', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: 0
            });

        this.ennemy = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Ennemy').objects.forEach((ennemy) => {
            const ennemySprite = this.ennemy.create(ennemy.x, ennemy.y, 'ennemy').setOrigin(0).setBodySize(30,30).setDepth(3);
            this.ennemyPositionX.push(ennemy.x);
            this.ennemyPositionY.push(ennemy.y);

            this.Tuch();
        });
        for(var i = 0; i < this.ennemy.getChildren().length; i++) {
            this.ennemy.getChildren()[i].anims.play('ennemyIdle');
            this.ennemy.getChildren()[i].body.setSize(40,40);
            this.ennemy.getChildren()[i].flagExclamation = true;
        }
    }

    IaGesttion(){
        let me = this;


        for(var i = 0; i < this.ennemy.getChildren().length; i++) {
            this.dist = Phaser.Math.Distance.BetweenPoints(this.player.player, this.ennemy.getChildren()[i]);

            if (this.dist <= 300 && !this.ennemy.getChildren()[i].tuchEnnemy) {
                if (this.ennemy.getChildren()[i].flagExclamation){
                    this.exclamation = this.scene.add.sprite(this.ennemy.getChildren()[i].x + 40, this.ennemy.getChildren()[i].y, 'exclamation')
                        .setScale(0.5)
                    this.ennemy.getChildren()[i].flagExclamation = false;
                    setTimeout(function(){
                        me.exclamation.destroy();
                    },1000)
                }
                this.exclamation.x = this.ennemy.getChildren()[i].x +40
                this.exclamation.y = this.ennemy.getChildren()[i].y -10
                this.scene.physics.moveTo(
                    me.ennemy.getChildren()[i],
                    me.player.player.body.x,
                    me.player.player.body.y,
                    210);

            } else {
                this.ennemy.getChildren()[i].setVelocity(0);
            }
        }
        this.tuchEnnemyDeath = false;
    }

    Tuch(){
        this.scene.physics.add.overlap(this.player.player, this.ennemy, this.isTuching.bind(this))
    }

    isTuching(player, ennemy){
        if (this.player.isDashing){
            ennemy.tuchEnnemy = true;
            ennemy.anims.play('ennemyDeath')
            setTimeout(function(){
                ennemy.visible = false;


            },500);

        } else if (!ennemy.tuchEnnemy){
            this.save.death();
            this.exclamation.destroy();
            ennemy.flagExclamation=true;
        }
    }
}