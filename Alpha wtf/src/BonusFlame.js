class BonusFlame {


    constructor(scene, player) {


        this.scene = scene
        this.player = player
        const map = this.scene.make.tilemap({key: 'map'});
        this.bonusFlame = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('BonusFlame').objects.forEach((bonusFlame) => {
            const FlameSprite = this.bonusFlame.create(bonusFlame.x, bonusFlame.y, 'fireBall');
            this.Collect();
        });

    }

    Collect(){
        this.scene.physics.add.overlap(this.player.player, this.bonusFlame, this.collectCollectible.bind(this))
    }

    collectCollectible(player, bonus){
        bonus.disableBody(true, true);
        console.log('collectible',this);
        this.player.dashIsUp=true;
    }
}