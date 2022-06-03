class Compagnons {

    constructor(scene) {

        this.scene = scene;

        window.pointsTotals = 0;
        const map = this.scene.make.tilemap({key: 'map'});

        this.scene.anims.create(
            {
                key: 'danse',
                frames: this.scene.anims.generateFrameNumbers('danse', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });

        this.compagnons = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Compagnons').objects.forEach((compagnons) => {
            const compagnonsSprite = this.compagnons.create(compagnons.x, compagnons.y, 'player')
                .anims.play('danse')
                .setDepth(3);
        });

    }
}
