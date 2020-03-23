class Game extends Phaser.Scene{
    constructor(){
        super("game-scene");
    }
    preload(){
        // bg
        this.load.image('bg', 'assets/images/BG/game-bg.png');
        
        // map
        this.load.tilemapTiledJSON('map', 'assets/maps/map.json');
        this.load.spritesheet('world_tiles', 'assets/maps/cave_tileset.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('addtl_tiles', 'assets/maps/addtl_tiles.png', {frameWidth: 32, frameHeight: 32});
        
        // sprites
        this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/json/player.json');
        this.load.atlas('enemy', 'assets/sprites/enemy.png', 'assets/sprites/json/enemy.json');

        // bg music
        this.load.audio('bgm-game', 'assets/sounds/bgm-speedrun.ogg');
    }
    create(){
        // scoring method
        score = 0;
        worldPhys = this.physics;
        player_life = 100;
        cursors = this.input.keyboard.createCursorKeys();
        var eX = [480, 576, 960, 1312];
        var eY = [416, 1280, 1280, 1280];
        // add bgm
        music = this.sound.add('bgm-game');
        music.play({loop:-1});
        // add bg
        this.add.image(config.width/2, config.height/2, 'bg').setScrollFactor(0);

        // add map
        map = this.make.tilemap({key: 'map'});
        // add tile files
        var tiles_ground_decor = map.addTilesetImage('world_tiles');
        var tiles_gems_chest = map.addTilesetImage('addtl_tiles');
        // set ground layer
        groundLayer = map.createDynamicLayer('ground', tiles_ground_decor, 0, 0);
        groundLayer.setCollisionByExclusion([-1]);
        // set decor layer
        decorLayer = map.createDynamicLayer('surface-decor', tiles_ground_decor, 0, 0);
        // set gems layer
        gemLayer = map.createDynamicLayer('gems', tiles_gems_chest, 0, 0);
        gemLayer.setTileIndexCallback(879, getGem, this);
        // set chest layer
        chestLayer = map.createDynamicLayer('chest', tiles_gems_chest, 0, 0);
        chestLayer.setTileLocationCallback(55, 55, 4, 3, arriveAtChest, this);
        // setting world bounds
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;
        // player
        player = this.physics.add.sprite(100, 100, 'player');
        player.setCollideWorldBounds(true);
        player.body.setSize(player.width-10, player.height-8);
        this.physics.add.collider(groundLayer, player);
        // player sprite animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'p1_stand'}],
            frameRate: 10,
        });
        enemyGnomes(4, eX, eY);
        // enemy sprite animation
        this.anims.create({
        key: 'ewalk',
        frames: this.anims.generateFrameNames('enemy', {prefix: 'walk', start: 1, end: 2}),
        frameRate: 10,
        repeat: 1
        });

        gemLayer.setTileIndexCallback(879, getGem, this);
        // set camera bounds fixed within map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // set camera to follow player
        this.cameras.main.startFollow(player);

        // score display
        txt_score = this.add.text(20, 20, "Score: ", {
            textAlign: 'left',
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0);
        value_score = this.add.text(120, 20, score, {
            textAlign: 'left',
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0);
        // life display
        txt_life = this.add.text(800, 20, "Life:", {
            textAlign: 'left',
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0);
        value_life = this.add.text(900, 20, player_life, {
            textAlign: 'left',
            fontSize: '20px',
            fill: '#ffffff'
        }).setScrollFactor(0);
    }
    update(time, delta){
        gnomes.forEach(function arr(enemy, index){
            enemyMvmt(enemy, index);
        });
        playerControls(player, cursors);
        this.physics.overlap(player, gemLayer, getGem);
        outOfBounds(player);
    }
}