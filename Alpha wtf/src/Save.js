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
        let me = this;
        this.player.fireBall.emitParticleAt(this.player.player.body.x, this.player.player.body.y);
        this.player.player.setVelocity(0, 0);
        this.player.player.visible = false;
        this.player.player.body.x = this.currentSaveX;
        this.player.player.body.y = this.currentSaveY;
        this.scene.cameras.main.stopFollow();
        this.scene.light.setColor(0x000000);
        setTimeout(function (){
            me.player.player.visible = true;
            me.scene.cameras.main.startFollow(me.player.player,false,1,1,0,150);
            me.scene.light.setColor(0x0f6fbf);
        },500);
    }
    sauvegarde(player, saves) {
        this.currentSaveX = player.body.x
        this.currentSaveY = player.body.y
        saves.body.enable = false;
        saves.visible = false;
        console.log("current", this.currentSaveX, this.currentSaveY)
    }
}