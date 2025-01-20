var cursors;
var player;
var lava;
var gameStarted = false;
var spawnInterval = 1800;
var fallingSpeed = 250;
var objectsSpawned = 0;
var fallingObjectsGroup;
var score = 0;
var health = 100;
var music;
var currentSong;

function startGame() {
    //Create the background
    var background = scene.add.image(400, 300, Phaser.Utils.Array.GetRandom(backgrounds));

    //Create the score/health text
    var scoreText = scene.add.text(10, 10, "Score: " + score, {
        fontSize: "40px", fill: "#FFF"
    }).setDepth(1);

    var healthText = scene.add.text(790, 10, "Health: " + health, {
        fontSize: "40px", fill: "#FFF"
    }).setOrigin(1, 0).setDepth(1);

    //Create the player
    player = scene.physics.add.sprite(400, 600, characterChosen).setCollideWorldBounds(true);

    //Create the bbox for the player
    if (characterChosen == "mrchung") {
        player.body.setSize(75, 120);
    } else if (characterChosen == "mrsz") {
        player.body.setCircle(63, 0.5, 0.5);
    } else if (characterChosen == "mrvoskamp") {
        player.body.setCircle(65, 0, 5);
    }

    //Make the cursor keys to check for arrow key presses
    cursors = scene.input.keyboard.createCursorKeys();
    gameStarted = true;

    //Make the group for the falling objects
    fallingObjectsGroup = scene.physics.add.group();

    //Make the lava to destroy the objects that go out-of-bounds
    lava = scene.add.rectangle(400, 900, 800, 10, 0x0000);
    scene.physics.world.enable(lava);

    scene.physics.add.overlap(fallingObjectsGroup, lava, function (lava, fallingObject) {
        score = score + 5;
        scoreText.setText("Score: " + score)
        fallingObject.destroy();
    });

    //Make the falling objects overlap with the player
    scene.physics.add.overlap(fallingObjectsGroup, player, function (lava, fallingObject) {
        health = health - 10;
        healthText.setText("Health:" + health);
        fallingObject.destroy();

        if (health <= 0) {
            scene.sound.play("game_over");
            endGame();
        } else{
            scene.sound.play("hit");
            showFact(fallingObject.texture.key);
        }
    });

    //Make the falling objects
    scene.time.addEvent({
        delay: spawnInterval,
        loop: false,
        callback: makeFallingObject
    });

    //Start the music
    playMusic();
}

//Function to make a falling object fall from the sky
function makeFallingObject() {
    var fallingObject = scene.physics.add.sprite(Phaser.Math.Between(0, 800), -50, Phaser.Utils.Array.GetRandom(balls));
    fallingObjectsGroup.add(fallingObject);
    fallingObject.body.setCircle(fallingObject.displayWidth / 2);
    fallingObject.setVelocityY(fallingSpeed)

    objectsSpawned++;

    spawnInterval = spawnInterval - 10;
    fallingSpeed = fallingSpeed + 15;

    scene.time.addEvent({
        delay: spawnInterval,
        loop: false,
        callback: makeFallingObject
    });
}

//Function that shows a fact on the screen
function showFact(fallingObjectName) {
    //Pause the game
    scene.physics.world.pause();
    scene.time.timeScale = 0;

    //Make the bg
    var factBg = scene.add.rectangle(0, 0, 800, 600, 0x222222, 0.7).setOrigin(0).setDepth(1);

    //Add the text elements
    var factText = scene.add.text(400, 70, Phaser.Utils.Array.GetRandom(facts), {
        fontSize: "18px", fill: "#FFF", align: "center"
    }).setOrigin(0.5, 0).setDepth(2);

    var resumeText = scene.add.text(400, 490, "Click To Resume", {
        fontSize: "30px", fill: "#FFF", align: "center"
    }).setOrigin(0.5, 1).setDepth(2);

    var sportsFactText = scene.add.text(400, 550, "Fun Fact: " + Phaser.Utils.Array.GetRandom(sportsFacts[fallingObjectName]), {
        fontSize: "16px", fill: "#FFF", align: "center"
    }).setOrigin(0.5, 1).setDepth(2);

    //Click listener
    scene.input.on("pointerdown", function () {
        //Remove all the elements
        factBg.destroy();
        factText.destroy();
        resumeText.destroy();
        sportsFactText.destroy();

        //Resume the game
        scene.physics.world.resume();
        scene.time.timeScale = 1;
    });
}

//Function that runs when the game ends
function endGame() {
    //Make the bg
    var endGameBg = scene.add.rectangle(0, 0, 800, 600, 0x222222, 0.7).setOrigin(0).setDepth(1);

    //Make the text
    var gameOverText = scene.add.text(400, 275, "Game Over", {
        fontSize: "40px", fill: "#FFF", align: "center"
    }).setOrigin(0.5, 1).setDepth(2);

    var scoreText = scene.add.text(400, 325, "Score: " + score, {
        fontSize: "30px", fill: "#FFF", align: "center"
    }).setOrigin(0.5, 0).setDepth(2);

    //Pause the game
    scene.scene.pause();
    music.stop();
}

//Logic for bg music
function playMusic() {
    music = scene.sound.add(chooseSong(), {
        volume: 0.8
    });
    
    music.play();

    music.once("complete", playMusic);
}

function chooseSong() {
    var song;

    do {
        song = Phaser.Utils.Array.GetRandom(songs);
    } while (song === currentSong);

    return song;
}