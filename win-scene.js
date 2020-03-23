class Victory extends Phaser.Scene{
    constructor(){
        super("win-scene");
    }
    preload(){
        this.load.image('decor', 'assets/images/UI/coins-win.gif');
        this.load.image('victory', 'assets/images/UI/victory.png');
        this.load.image('menuBtn', 'assets/images/UI/menu-btn.png');
        this.load.image('restartBtn', 'assets/images/UI/restart-btn.png');
    }
    create(){
        curScene = this.scene;
        // decoration
        let decor = this.add.image(config.width/2, 1*config.height/5, 'decor');
        decor.setScale(0.4);
        // win message
        this.add.image(config.width/2, 2*config.height/5, 'victory');
        // total score
        txt_totalScore = this.add.text(config.width/3, 3*config.height/5, "TOTAL SCORE:", {
            textAlign: 'center',
            fontSize: '30px',
            fill: '#ffffff'
        });
        value_totalScore = this.add.text(config.width/3, 3*config.height/5, (score+player_life), {
            textAlign: 'left',
            fontSize: '30px',
            fill: '#ffffff'
        });

        // nav buttons
        const menuBtn = this.add.image(config.width/4, 4*config.height/5, 'menuBtn');
        menuBtn.setInteractive();
        menuBtn.on('pointerdown', () => {
            score = 0;
            player_life = 100;
            curScene.start("bootGame");
            return false;
        });
        const restartBtn = this.add.image(3*config.width/4, 4*config.height/5, 'restartBtn');
        restartBtn.setInteractive();
        restartBtn.on('pointerdown', () => {
            score = 0;
            player_life = 100;
            curScene.start("game-scene");
            return false;
        });
    }
}