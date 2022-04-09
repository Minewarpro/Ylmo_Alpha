class BonusFlame {


    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.Collect();
    }

    Collect(){
        this.scene.physics.add.overlap(this.player.player, this.scene.bonusFlame, this.collectCollectible.bind(this))
    }

    collectCollectible(player, bonus){
        bonus.disableBody(true, true);
        console.log('collectible',this);
        this.player.dashIsUp=true;
    }
}