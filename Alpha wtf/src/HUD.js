class HUD extends Phaser.Scene {

    constructor() {
        super('HUD');
    }

    preload(){
        this.load.image('lucioleUi', 'Alpha wtf/assets/images/lucioleUi.png');
    }

    create(){
        let me = this;
        const {width, height}= this.scale

        this.add.sprite(50,50,'lucioleUi')
            .setDisplaySize(40,40);

        this.npPoint = this.add.text(100 ,50 , window.pointsTotals,{
            color: '#ffffff',
            fontFamily: 'cursive',
            fontSize : 20
        })
            .setOrigin(0.5)
            .setAlpha(1);
    }

    update(){
        this.npPoint.setText(Math.round(window.pointsTotals));
    }
}