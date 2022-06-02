class BonusFlame {


    constructor(scene, player) {
        this.scene = scene
        this.player = player
        const map = this.scene.make.tilemap({key: 'map'});

        this.bonusFlame = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.scene.anims.create(
            {
                key: 'bonus',
                frames: this.scene.anims.generateFrameNumbers('bonus', { start: 0, end: 8}),
                frameRate: 16,
                repeat: -1
            });

        map.getObjectLayer('BonusFlame').objects.forEach((bonusFlame) => {
            const FlameSprite = this.bonusFlame.create(bonusFlame.x, bonusFlame.y, 'fireBall').setOrigin(0);
            this.Collect();
        });
        for(var i = 0; i < this.bonusFlame.getChildren().length; i++) {
            this.bonusFlame.getChildren()[i].anims.play('bonus');
            this.bonusFlame.getChildren()[i].body.setSize(20,40);
            this.bonusFlame.getChildren()[i].Enable = true;
            this.bonusFlame.getChildren()[i].setDepth(4);
        }
    }

    Collect(){
        this.scene.physics.add.overlap(this.player.player, this.bonusFlame, this.collectCollectible.bind(this))
    }

    collectCollectible(player, bonus){
        if (bonus.Enable) {
            bonus.visible = false;
            console.log('collectible', this);
            this.player.dashIsUp = true;
            bonus.Enable = false;
            setTimeout(function () {
                bonus.visible = true;
                bonus.Enable = true;
            }, 3000);
        }
    }
}