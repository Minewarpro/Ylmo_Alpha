class Dragon {

    constructor(scene) {
        this.scene = scene
        this.cameras = scene
        this.dragon = this.scene.physics.add.sprite(0, 750, 'dragon');
        this.dragon.setScale(1);
        this.dragon.setCollideWorldBounds(false);
        this.dragon.body.setAllowGravity(false);
        this.dragon.setImmovable(true);

    }
}