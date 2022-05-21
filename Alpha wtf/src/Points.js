class Points {

    constructor(scene, player) {

        this.player = player;
        this.scene = scene;

        window.pointsTotals = 0;
        const map = this.scene.make.tilemap({key: 'map'});

        this.particles = this.scene.add.particles('luciole');
        this.lulu = this.scene.add.particles('luciole');
        this.lulu.createEmitter({
            lifespan: 300,
            speed: 150,
            quantity: 200,
            scale: { start: 0.3, end: 0 },
            on: false
        });

        this.points = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Points').objects.forEach((point) => {
            const pointSprite = this.points.create(point.x, point.y, 'luciole');
            this.scene.physics.add.overlap(this.player.player, this.points, this.recolte.bind(this), null, this)
        });



        for(var i = 0; i < this.points.getChildren().length; i++) {
            this.points.getChildren()[i].setDisplaySize(30,30);
            this.points.getChildren()[i].setDepth(0);

            this.points.getChildren()[i].part = this.particles.createEmitter({
                speed: 50,
                lifespan : 100,
                quantity: 1,
                gravity: { x: 0, y: 0 },
                scale: { start: 0.2, end: 0 },
                emitZone: { type: 'random', source: new Phaser.Geom.Circle(0, 0, 20) },
                follow: this.points.getChildren()[i],
            });

            this.points.getChildren()[i].yoyo = this.scene.tweens.add({
                targets: this.points.getChildren()[i],
                y: this.points.getChildren()[i].y + 20,
                duration: 1000,
                ease: 'Sine.easeInOut',
                repeat: -1,
                yoyo: true
            });
        }
    }

    recolte(player, point){
        window.pointsTotals++;

        point.yoyo.pause();
        point.body.enable = false;

       this.lulu.emitParticleAt(point.x, point.y);

        this.scene.tweens.add({
            targets: point,
            y: point.y - 50,
            x: point.x - 20,
            duration: 1000,
            alpha: 0,
            scale: 0,
            ease: 'Sine.easeInOut',
        });

        point.part.visible = false;
        console.log(window.pointsTotals);
    }
}