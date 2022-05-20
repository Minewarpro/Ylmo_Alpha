class BoxOverlap {


    constructor(scene, player, camera, dragon) {
        this.scene = scene
        this.player = player
        this.cameras = camera
        this.dragon = dragon
        const map = this.scene.make.tilemap({key: 'map'});


        this.box = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('BoxOverlap').objects.forEach((box) => {
            this.boxSprite = this.scene.physics.add.sprite(box.x+(box.width*0.5), box.y+(box.height*0.5)).setSize(box.width, box.height);
            this.box.add(this.boxSprite)
            this.boxSprite.nb = box.name;
        });

        this.scene.physics.add.overlap(this.player.player, this.box, this.collectCollectible.bind(this))
        this.scene.physics.add.overlap(this.scene.pointCamera, this.box, this.overlapBox.bind(this))

        this.cinematique2Finish=false;
    }

    collectCollectible(player, bonus) {
        let me = this


        if (bonus.nb === "1") {

            console.log('tuch')
            bonus.destroy();
            me.scene.pointCamera.body.x = me.player.player.body.x;
            me.scene.pointCamera.body.y = 885;
            me.dragon.dragon.body.x = me.player.player.body.x - 1500;
            me.dragon.dragon.body.y = me.player.player.body.y - 200;
            me.scene.pointCamera.setVelocityX(0);
            window.KeyboardEnable = false;
            window.change = true;
            me.player.player.setVelocityX(0);
            me.player.dDown = false;
            me.player.initKeyboard();
            this.cameras.main.shake(1500, 0.02);
            setTimeout(function () {
                me.scene.pointCamera.setVelocityX(-150);
                me.cameras.main.startFollow(me.scene.pointCamera, true);

                setTimeout(function () {
                    me.scene.pointCamera.setVelocityX(0);
                    me.dragon.dragon.setVelocityX(300);
                    setTimeout(function () {
                        me.dragon.dragon.setVelocityX(0);
                        me.cameras.main.shake(1500, 0.02);
                        setTimeout(function () {
                            me.scene.pointCamera.setVelocityX(300);
                            setTimeout(function(){
                                window.dragonEnable = true;
                                window.KeyboardEnable = true;
                                window.change = true;
                            },1000)
                        }, 1500)
                    }, 1300)
                }, 2000)

            }, 1500)
        }

        else if (bonus.nb === "2"){
            me.scene.pointCamera.setVelocity(150,-170);
            me.scene.pointCamera.body.x = 25444;
            me.cinematique2Finish=true;
            me.cameras.main.startFollow(me.scene.pointCamera, true);
            window.dragonEnable = true;
        }
        else if (bonus.nb === "3"){
            me.scene.physics.moveTo(
                me.scene.pointCamera,
                28606,
                -1690,
                300);
        }
        else if (bonus.nb === "4"){
            me.scene.physics.moveTo(
                me.scene.pointCamera,
                28674,
                -1300,
                250);
        }
        else if (bonus.nb === "8"){
            me.cameras.main.startFollow(me.player.player, true);
            window.dragonEnable = false;
            }
    }

    overlapBox(camera, bonus){
        let me = this;

        if (bonus.nb === "6"){
            me.scene.pointCamera.setVelocity(0,-150);
        }

        else if (bonus.nb === "7"){
            me.scene.pointCamera.setVelocity(300,0);
        }

    }

}
