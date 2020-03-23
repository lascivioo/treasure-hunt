var config = {
    type: Phaser.AUTO,
        width: 1000,
        height: 500,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 575},
                debug: true
            }
        },
    scene: [Menu, Game, Victory, Death]
}

var player;
var gnomes = [];
var groundLayer, decorLayer, gemLayer, chestLayer;
var cursors;

var score = 0;
var player_life = 100;

var map;
var sceneNames = ['game-lvl'];
var txt_score, txt_life;
var value_score, value_life;
var music;
var sfxGem, sfxJump, sfxDie;

var worldPhys;

var game = new Phaser.Game(config);

function playerControls(plyr, cursors){
    // walk left
    if (cursors.left.isDown)
    {
        plyr.body.setVelocityX(-250);
        plyr.anims.play('walk', true); // walk left
        plyr.flipX = true; // flip the sprite to the left
    }
    // walk right
    else if (cursors.right.isDown)
    {
        plyr.body.setVelocityX(250);
        plyr.anims.play('walk', true);
        plyr.flipX = false;
    }
    // idle
    else {
        plyr.body.setVelocityX(0);
        plyr.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && plyr.body.onFloor()){
        plyr.body.setVelocityY(-500);
        sfxJump.play();
    }
}

function enemyGnomes(number, xCoord, yCoord){
    for(var i=0; i<number; i++){
        this.enemy = worldPhys.add.sprite(xCoord[i], yCoord[i], 'enemy');
        this.enemy.velocity = 125;
        this.enemy.alive = true;
        worldPhys.add.collider(groundLayer, this.enemy);
        gnomes.push(this.enemy);
    }
}

function enemyMvmt(enemy, index){
    if(enemy.alive){
        enemy.anims.play('ewalk', true);
        if(enemy.body.blocked.right){
            enemy.body.setVelocityX(-125);
            enemy.velocity = -125;
        }
        else if(enemy.body.blocked.left){
            enemy.body.setVelocityX(125);
            enemy.velocity = 125;
        }
        else{
            enemy.body.setVelocityX(enemy.velocity);
        }
        worldPhys.world.collide(player, enemy, getDamage, null, this);
    }
  }

function getDamage(plyr, enemy){
    if(enemy.body.touching.up && plyr.body.touching.down){
        plyr.body.setVelocityY(-200);
        sfxStomp.play();
        enemy.alive = false;
        enemy.destroy();
        score += 5;
        txt_score.setText(score);
    }
    else{
        player_life--;
        if (player_life < 0){
            gameOver();
        }
        else{
            value_life.setText(player_life);
        }
    }
}

function getGem(plyr, gem){
    gemLayer.removeTileAt(gem.x, gem.y); // remove the tile/coin
    score++; // add 10 points to the score
    value_score.setText(score); // set the text to show the current score
}

function arriveAtChest(){
    if (player.body.onFloor()){
        music.stop();
        this.scene.start("win-scene");
    }
}

function outOfBounds(plyr){
    if(plyr.body.checkWorldBounds() && plyr.body.y >= 970){
        music.stop();
        this.scene.start('death-scene');
    }
}

function gameOver(){
    music.stop();
    this.scene.start("death-scene");
}