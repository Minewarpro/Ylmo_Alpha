class Tuto{
    constructor(scene) {
        this.scene = scene

        this.tuto1QD = this.scene.add.sprite(54, 1001, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto1-QD',
                frames: this.scene.anims.generateFrameNumbers('tuto1-QD', { start: 0, end: 5 }),
                frameRate: 2,
                repeat: -1
            });
        this.tuto1QD.anims.play('tuto1-QD');


        this.tuto2 = this.scene.add.sprite(1296, 772, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto2',
                frames: this.scene.anims.generateFrameNumbers('tuto2', { start: 0, end: 1 }),
                frameRate: 1,
                repeat: -1
            });
        this.tuto2.anims.play('tuto2');

        this.tuto3 = this.scene.add.sprite(4458, 832, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto3',
                frames: this.scene.anims.generateFrameNumbers('tuto3', { start: 0, end: 8 }),
                frameRate: 8,
                repeat: -1
            });
        this.tuto3.anims.play('tuto3');

        this.tuto4 = this.scene.add.sprite(6982, 524, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto4',
                frames: this.scene.anims.generateFrameNumbers('tuto4', { start: 0, end: 11 }),
                frameRate: 8,
                repeat: -1
            });
        this.tuto4.anims.play('tuto4');

        this.tuto5 = this.scene.add.sprite(5482, 324, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto5',
                frames: this.scene.anims.generateFrameNumbers('tuto5', { start: 0, end: 12 }),
                frameRate: 8,
                repeat: -1
            });
        this.tuto5.anims.play('tuto5');

    }
}