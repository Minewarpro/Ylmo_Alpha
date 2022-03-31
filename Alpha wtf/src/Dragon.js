class Dragon {

    constructor(scene) {
        this.scene = scene
        this.cameras = scene
        this.dragon = this.scene.physics.add.sprite(0, 500, 'dragon');
        this.dragon.setScale(1);
        this.dragon.setCollideWorldBounds(false);
        this.dragon.body.setAllowGravity(false);
        this.dragon.Immovable(true);

    }
}