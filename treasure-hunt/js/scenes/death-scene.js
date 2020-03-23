class Death extends Phaser.Scene{
    constructor(){
        super("death-scene");
    }
    preload(){
        this.load.image('decor', 'assets/images/UI/death-deco01.png');
        this.load.image('dead', 'assets/images/UI/dead.png');
        this.load.image('menuBtn', 'assets/images/UI/menu-btn.png');
        this.load.image('restartBtn', 'assets/images/UI/restart-btn.png');
    }
    create(){
        // decoration
        let decor = this.add.image(config.width/2, 2*config.height/5, 'decor');
        decor.setScale(0.2);
        // dead message
        this.add.image(config.width/2, 3*config.height/5, 'dead');
        // nav buttons
        const menuBtn = this.add.image(config.width/4, 4*config.height/5, 'menuBtn');
        menuBtn.setInteractive();
        menuBtn.on('pointerdown', () => {
            score = 0;
            player_life = 100;
            this.scene.start("bootGame");
            return false;
        });
        const restartBtn = this.add.image(3*config.width/4, 4*config.height/5, 'restartBtn');
        restartBtn.setInteractive();
        restartBtn.on('pointerdown', () => {
            score = 0;
            player_life = 100;
            this.scene.start("game-scene");
            return false;
        });
    }
}