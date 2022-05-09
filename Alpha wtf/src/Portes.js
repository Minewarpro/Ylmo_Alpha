class Portes {

    constructor(scene, player) {
        this.scene = scene
        this.player = player
        const map = this.scene.make.tilemap({key: 'map'});

        this.portes = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Portes').objects.forEach((portes) => {
            const portesSprite = this.portes.create(portes.x, portes.y, 'fireBall').setOrigin(0);
            portesSprite.destinationX=portes.properties[0].value;
            portesSprite.destinationY=portes.properties[1].value;
        });
        this.Collect();
    }

    Collect(){
        this.scene.physics.add.overlap(this.player.player, this.portes, this.collectCollectible,null,this)
    }

    collectCollectible(player, portes){
        console.log(portes.destinationX)
        this.player.player.x = portes.destinationX;
        this.player.player.y = portes.destinationY;
    }
}