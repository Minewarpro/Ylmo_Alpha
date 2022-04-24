class Ennemies {

    constructor(scene, player, save) {
        let me = this;
        this.scene = scene
        this.player = player
        this.save = save

        const map = this.scene.make.tilemap({key: 'map'});

        this.ennemyPositionX = []
        this.ennemyPositionY = []

        this.ennemy = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Ennemy').objects.forEach((ennemy) => {
            const ennemySprite = this.ennemy.create(ennemy.x, ennemy.y, 'ennemy').setOrigin(0).setBodySize(30,30);
            this.ennemyPositionX.push(ennemy.x);
            this.ennemyPositionY.push(ennemy.y);
            this.Tuch();
        });
    }

    IaGesttion(){
        let me = this;

        for(var i = 0; i < this.ennemy.getChildren().length; i++) {
            this.dist = Phaser.Math.Distance.BetweenPoints(this.player.player, this.ennemy.getChildren()[i]);

            if (this.dist <= 300) {
                this.scene.physics.moveTo(
                    me.ennemy.getChildren()[i],
                    me.player.player.body.x,
                    me.player.player.body.y,
                    160);

                if (this.tuchEnnemyDeath){
                    this.save.death();
                    this.ennemy.getChildren()[i].enableBody(true);
                    this.ennemy.getChildren()[i].visible=true;
                    this.ennemy.getChildren()[i].body.x = this.ennemyPositionX[i];
                    this.ennemy.getChildren()[i].body.y = this.ennemyPositionY[i];

                }
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
            this.tuchEnnemy = true;
            ennemy.disableBody(true, true);

        } else {
            this.tuchEnnemyDeath = true;
        }
    }
}