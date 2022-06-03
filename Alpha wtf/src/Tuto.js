class Tuto{
    constructor(scene) {
        this.scene = scene


        this.tuto1 = this.scene.add.sprite(54, 1001, '').setScale(0.2);

        this.scene.anims.create(
            {
                key: 'tuto1-QD',
                frames: this.scene.anims.generateFrameNumbers('tuto1-QD', { start: 0, end: 5 }),
                frameRate: 2,
                repeat: -1
            });

        this.scene.anims.create(
            {
                key: 'tuto1-AD',
                frames: this.scene.anims.generateFrameNumbers('tuto1-AD', { start: 0, end: 5 }),
                frameRate: 2,
                repeat: -1
            });

        this.scene.anims.create(
            {
                key: 'tuto1-fleche',
                frames: this.scene.anims.generateFrameNumbers('tuto1-fleche', { start: 0, end: 5 }),
                frameRate: 2,
                repeat: -1
            });

        this.tuto2 = this.scene.add.sprite(1296, 772, '').setScale(0.2);

        this.scene.anims.create(
            {
                key: 'tuto2',
                frames: this.scene.anims.generateFrameNumbers('tuto2', { start: 0, end: 1 }),
                frameRate: 1,
                repeat: -1
            });

        this.scene.anims.create(
            {
                key: 'tuto2-anglais',
                frames: this.scene.anims.generateFrameNumbers('tuto2-anglais', { start: 0, end: 1 }),
                frameRate: 1,
                repeat: -1
            });

        this.tuto3 = this.scene.add.sprite(4458, 832, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto3',
                frames: this.scene.anims.generateFrameNumbers('tuto3', { start: 0, end: 8 }),
                frameRate: 8,
                repeat: -1
            });

        this.tuto4 = this.scene.add.sprite(6982, 524, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto4',
                frames: this.scene.anims.generateFrameNumbers('tuto4', { start: 0, end: 11 }),
                frameRate: 8,
                repeat: -1
            });

        this.tuto5 = this.scene.add.sprite(5482, 324, '').setScale(0.2);
        this.scene.anims.create(
            {
                key: 'tuto5',
                frames: this.scene.anims.generateFrameNumbers('tuto5', { start: 0, end: 12 }),
                frameRate: 8,
                repeat: -1
            });

        //TUTO 3
        this.tuto3.anims.play('tuto3');

        //TUTO 4
        this.tuto4.anims.play('tuto4');

        //TUTO 5
        this.tuto5.anims.play('tuto5');

        this.TutoAnims();

    }

    TutoAnims(){

        //TUTO 1
        if (window.keyboard_AZERTY){
            this.tuto1.anims.play('tuto1-QD');
        } else if (window.keyboard_QWERTY){
            this.tuto1.anims.play('tuto1-AD');
        } else if (window.keyboard_fleche){
            this.tuto1.anims.play('tuto1-fleche');
        }

        //TUTO 2
        if (window.frenchUi){
            this.tuto2.anims.play('tuto2');
        } else if (window.englishUi){
            this.tuto2.anims.play('tuto2-anglais');
        }
        
    }
}