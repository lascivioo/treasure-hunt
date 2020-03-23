class Menu extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
       this.load.image('title', 'assets/images/UI/game-name.png');
       this.load.image('startBtn', 'assets/images/UI/game-start.png');
       this.load.image('bg', 'assets/images/BG/menu-bg.png');
    }
    create(){
        // bg
        this.add.image(config.width/2, config.height/2, 'bg');
        // game title
        let gameTitle = this.add.image(config.width/2, config.height/2, 'title');
        gameTitle.setScale(1.5);
        // start button
        const startBtn = this.add.image(config.width/2, 2*config.height/3, 'startBtn');
        startBtn.setInteractive();
        startBtn.on('pointerdown', () => {
            this.scene.start("game-scene");
            return false;
        })
    }
}