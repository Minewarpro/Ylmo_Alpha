class Collide {

    constructor(scene, player, save) {
        this.scene = scene
        this.player = player
        this.save = save
        this.currentSaveX = this.save.currentSaveX;
        this.currentSaveY = this.save.currentSaveY;

        const map = this.scene.make.tilemap({key: 'map'});

        this.collide = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Collide').objects.forEach((collide) => {
            this.collideSprite = this.scene.physics.add.sprite(collide.x+(collide.width*0.5), collide.y+(collide.height*0.5)).setSize(collide.width, collide.height);
            this.collide.add(this.collideSprite)
        });
        this.scene.physics.add.collider(this.player.player, this.collide);


        // Collide Death
        this.collideDeath = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('CollideDeath').objects.forEach((collideDeath) => {
            this.collideDeathSprite = this.scene.physics.add.sprite(collideDeath.x+(collideDeath.width*0.5), collideDeath.y+(collideDeath.height*0.5)).setSize(collideDeath.width, collideDeath.height);
            this.collideDeath.add(this.collideDeathSprite)
        });
        this.scene.physics.add.collider(this.player.player, this.collideDeath,  this.playerHit.bind(this), null, this);
    }

    playerHit(player, collideDeath) {
        console.log("hit");
        player.setVelocity(0, 0);
        player.body.x = this.save.currentSaveX;
        player.body.y = this.save.currentSaveY;

    }
}