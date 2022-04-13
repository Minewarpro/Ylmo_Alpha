class Save {

    constructor(scene, player) {
        this.scene = scene
        this.player = player
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

    sauvegarde(player, saves) {

        this.currentSaveX = player.x
        this.currentSaveY = player.y
        saves.body.enable = false;
        saves.visible = false;
        this.currentKey = player.key
        console.log("current", this.currentSaveX, this.currentSaveY)
    }
}