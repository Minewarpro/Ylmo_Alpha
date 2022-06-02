class Dragon {

    constructor(scene, player, save, cameras) {
        this.scene = scene
        this.cameras = scene
        this.player = player
        this.save = save;
        this.cameras = cameras
        this.dragon = this.scene.physics.add.sprite(-2000, 750, 'dragon');
        this.dragon.setScale(0.6);
        this.dragon.setDepth(3);
        this.dragon.body.setSize(200,200);
        this.dragon.body.setOffset(100,120);
        this.dragon.setCollideWorldBounds(false);
        this.dragon.body.setAllowGravity(false);
        this.dragon.setImmovable(true);

        this.scene.physics.add.collider(this.player.player, this.dragon, this.playerHit.bind(this), null, this);



        this.scene.anims.create(
            {
                key: 'run',
                frames: this.scene.anims.generateFrameNumbers('drake', { start: 0, end: 9}),
                frameRate: 8,
                repeat: -1
            });
        this.dragon.anims.play('run',true);

        this.scene.anims.create(
            {
                key: 'crie',
                frames: this.scene.anims.generateFrameNumbers('drakeCrie', { start: 2, end: 11}),
                frameRate: 8,
                repeat: 0
            });
    }

    playerHit(player, dragon){
        let me = this;

        this.save.death();

    }
}