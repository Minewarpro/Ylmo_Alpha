class Dragon {

    constructor(scene, player, save, cameras) {
        this.scene = scene
        this.cameras = scene
        this.player = player
        this.save = save;
        this.cameras = cameras
        this.dragon = this.scene.physics.add.sprite(-2000, 750, 'dragon');
        this.dragon.setScale(1);
        this.dragon.setDepth(3);
        this.dragon.setCollideWorldBounds(false);
        this.dragon.body.setAllowGravity(false);
        this.dragon.setImmovable(true);

        this.scene.physics.add.collider(this.player.player, this.dragon, this.playerHit.bind(this), null, this);
    }

    playerHit(player, dragon){
        let me = this;

        this.save.death();

    }
}