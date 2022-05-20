class Points {

    constructor(scene, player) {

        this.player = player;
        this.scene = scene;

        this.pointsTotals = 0;
        const map = this.scene.make.tilemap({key: 'map'});

        this.points = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Points').objects.forEach((point) => {
            const pointSprite = this.points.create(point.x, point.y, 'save').setOrigin(0);
            this.scene.physics.add.overlap(this.player.player, this.points, this.recolte.bind(this), null, this)
        });
    }

    recolte(player, point){
        this.pointsTotals++;
        point.body.enable = false;
        point.visible = false;
        console.log(this.pointsTotals)
    }
}