const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    heigth: 720,
    scale: {
        //mode: Phaser.Scale.RESIZE,
        //autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: true,
        },
    },
    scene: new scene(),
};


const game = new Phaser.Game(config);