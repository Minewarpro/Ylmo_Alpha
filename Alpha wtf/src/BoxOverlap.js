class BoxOverlap {


    constructor(scene, player, camera, dragon) {
        this.scene = scene
        this.player = player
        this.cameras = camera
        this.dragon = dragon
        const map = this.scene.make.tilemap({key: 'map'});

        this.flag9 = true;
        this.flagStar1 = true;
        this.flagStar2 = true;
        this.flagStar3 = true;

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
                    me.dragon.dragon.setVelocityX(450);
                    setTimeout(function () {
                        me.dragon.dragon.setVelocityX(0);
                        me.scene.dragon.dragon.anims.play('crie');
                        me.cameras.main.shake(1000, 0.02);
                        setTimeout(function () {
                            me.scene.dragon.dragon.anims.play('run');
                            me.scene.pointCamera.setVelocityX(300);
                            me.dragon.dragon.setVelocityX(300);
                            setTimeout(function(){
                                window.dragonEnable = true;
                                window.KeyboardEnable = true;
                                window.change = true;
                            },1000)
                        }, 1000)
                    }, 1300)
                }, 2000)

            }, 1500)
        }

        else if (bonus.nb === "2"){
            me.scene.pointCamera.setVelocity(140,-120);
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
                150);
        }
        else if (bonus.nb === "8"){
            me.cameras.main.startFollow(me.player.player,true,1,1,0,150);
            window.dragonEnable = false;
            }
        else if (bonus.nb === "9"){
            if (this.flag9){
                me.player.isDashing = true;
                window.KeyboardEnable = false;
                this.scene.tweens.add({
                    targets: player,
                    x: player.x + 480,
                    duration: 1500,
                    ease: 'Linear',
                    onComplete: function(){
                        me.player.player.anims.play('danse');
                    },
                    onUpdate: function (){
                        me.player.player.anims.play('right',true);
                    }
                });
                this.flag9 = false;

                setTimeout(function (){
                    me.scene.add.rectangle( 31355, -2405 ,160,35,0x000000, 0.7).setOrigin(0,0).setDepth(99999)
                    me.scene.add.sprite( 31334, -2458 ,'Darkstar').setScale(0.6).setAlpha(0.7).setDepth(99999)
                    me.scene.add.sprite( 31434, -2508 ,'Darkstar').setScale(0.6).setAlpha(0.7).setDepth(99999)
                    me.scene.add.sprite( 31534, -2458 ,'Darkstar').setScale(0.6).setAlpha(0.7).setDepth(99999)
                    me.barre = me.scene.add.rectangle( 31360, -2388 ,0,25,0xffff00, 1).setDepth(99999)

                    var pointBarre = window.pointsTotals
                    me.barreAugment = me.scene.tweens.add({
                        targets: me.barre,
                        width: pointBarre,
                        duration: 2000,
                        ease: 'Linear',
                        OnUpdate : function(){
                            if (window.pointsTotals===0){
                                me.barreAugment.stop();
                            }
                        },
                    });
                    me.pointTween = me.scene.tweens.add({
                        targets: window,
                        pointsTotals: 0,
                        duration: 2000,
                        ease: 'Linear',
                        onUpdate: function(){
                            if (me.barre.width >= 49 && me.flagStar1){
                                me.flagStar1=false;
                                var star = me.scene.add.sprite(31234, -2158, 'star').setDepth(999999).setScale(0.6)
                                me.scene.tweens.add({
                                    targets: star,
                                    x: 31334,
                                    y: -2458,
                                    duration: 500,
                                    ease: 'Sine.easeIn',
                                    onComplete:function (){
                                        me.scene.tweens.add({
                                            targets: star,
                                            scale: 1.2,
                                            duration: 100,
                                            ease: 'Linear',
                                            yoyo: -1
                                        });
                                    }
                                });
                            }

                            if (me.barre.width >= 99 && me.flagStar2){
                                me.flagStar2=false;
                                var star = me.scene.add.sprite(31334, -2158, 'star').setDepth(999999).setScale(0.7)
                                me.scene.tweens.add({
                                    targets: star,
                                    x: 31434,
                                    y: -2508,
                                    duration: 500,
                                    ease: 'Sine.easeIn',
                                    onComplete:function (){
                                        me.scene.tweens.add({
                                            targets: star,
                                            scale: 1.2,
                                            duration: 100,
                                            ease: 'Linear',
                                            yoyo: -1
                                        });
                                    }
                                });
                            }
                            if (me.barre.width >= 149 && me.flagStar3){
                                me.flagStar3=false;
                                var star = me.scene.add.sprite(31434, -2158, 'star').setDepth(999999).setScale(0.7)
                                me.scene.tweens.add({
                                    targets: star,
                                    x: 31534,
                                    y: -2458,
                                    duration: 500,
                                    ease: 'Sine.easeIn',
                                    onComplete:function (){
                                        me.scene.tweens.add({
                                            targets: star,
                                            scale: 1.2,
                                            duration: 100,
                                            ease: 'Linear',
                                            yoyo: -1
                                        });
                                    }
                                });
                            }
                            var lulu = me.scene.add.sprite(30830, -2720, 'luciole').setDepth(999999)
                            me.scene.tweens.add({
                                targets: lulu,
                                x: 31360,
                                y: -2388,
                                duration: 500,
                                ease: 'Linear',
                                onComplete: function (){
                                    lulu.destroy();
                                }
                            });
                        }
                    });


                },1500)

            }
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
