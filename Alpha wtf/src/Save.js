class Save {

    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.currentSaveX = this.player.player.body.x
        this.currentSaveY = this.player.player.body.y
        const map = this.scene.make.tilemap({key: 'map'});

        this.saves = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y, 'save').setOrigin(0);
            this.scene.physics.add.overlap(this.player.player, this.saves, this.sauvegarde.bind(this), null, this)
        });
    }

    death(){
        this.player.player.setVelocity(0, 0);
        this.player.player.body.x = this.currentSaveX;
        this.player.player.body.y = this.currentSaveY;
    }
    sauvegarde(player, saves) {
        this.currentSaveX = player.body.x
        this.currentSaveY = player.body.y
        saves.body.enable = false;
        saves.visible = false;
        console.log("current", this.currentSaveX, this.currentSaveY)
    }
}