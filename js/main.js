var config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var scene;
var backgrounds = ["cave", "desert", "fall", "forest", "snow", "treetops", "upper_gym"];
var balls = ["basket_ball", "beach_ball", "blue_bowling_ball", "red_bowling_ball", "purple_bowling_ball", "brown_baseball_ball", "yellow_baseball_ball", "minigolf_ball", "soccer_ball", "tennis_ball", "voleyball_ball"];
var songs = ["a_winter_hymnal", "holy_father", "one_day_youll_be_cool", "soft_glow"]

function preload() {
    //Backgrounds
    this.load.image("cave", "assets/backgrounds/cave.png");
    this.load.image("desert", "assets/backgrounds/desert.png");
    this.load.image("fall", "assets/backgrounds/fall.png");
    this.load.image("forest", "assets/backgrounds/forest.png");
    this.load.image("snow", "assets/backgrounds/snow.png");
    this.load.image("treetops", "assets/backgrounds/treetops.png");
    this.load.image("upper_gym", "assets/backgrounds/upper_gym.png");

    //Balls
    this.load.image("basket_ball", "assets/balls/basket_ball.png");
    this.load.image("beach_ball", "assets/balls/beach_ball.png");
    this.load.image("blue_bowling_ball", "assets/balls/blue_bowling_ball.png");
    this.load.image("red_bowling_ball", "assets/balls/red_bowling_ball.png");
    this.load.image("purple_bowling_ball", "assets/balls/purple_bowling_ball.png");
    this.load.image("brown_baseball_ball", "assets/balls/brown_baseball_ball.png");
    this.load.image("yellow_baseball_ball", "assets/balls/yellow_baseball_ball.png");
    this.load.image("minigolf_ball", "assets/balls/minigolf_ball.png");
    this.load.image("soccer_ball", "assets/balls/soccer_ball.png");
    this.load.image("tennis_ball", "assets/balls/tennis_ball.png");
    this.load.image("voleyball_ball", "assets/balls/voleyball_ball.png");

    //Faces
    this.load.image("mrchung", "assets/faces/mrchung.png");
    this.load.image("mrsz", "assets/faces/mrsz.png");
    this.load.image("mrvoskamp", "assets/faces/mrvoskamp.png");

    //Sound/Music
    this.load.audio("hit", "assets/sound/hit.wav");
    this.load.audio("game_over", "assets/sound/game_over.wav");
    this.load.audio("a_winter_hymnal", "assets/sound/music/a_winter_hymnal.wav");
    this.load.audio("holy_father", "assets/sound/music/holy_father.wav");
    this.load.audio("one_day_youll_be_cool", "assets/sound/music/one_day_youll_be_cool.wav");
    this.load.audio("soft_glow", "assets/sound/music/soft_glow.wav");

    //Loading screen logic
    var loadingText = this.add.text(400, 250, "Loading...", {
        fontSize: "20px", fill: "#FFFFF"
    }).setOrigin(0.5);

    var progressText = this.add.text(400, 300, "0%", {
        fontSize: "18px", fill: "#FFFFF"
    }
    ).setOrigin(0.5);

    this.load.on("progress", function (value) {
        progressText.setText(`${Math.round(value * 100)}%`);
    });

    this.load.on("complete", function () {
        //Remove loading visuals when done
        loadingText.destroy();
        progressText.destroy();
    });
}

function create() {
    scene = this;

    //Create the character screen
    characterSelect();
}

function update() {
    if (gameStarted) {
        if (cursors.left.isDown) {
            player.setVelocityX(-350);
        } else if (cursors.right.isDown) {
            player.setVelocityX(350);
        } else {
            player.setVelocityX(0);
        }
    }
}

document.querySelector("#fullscreen").addEventListener("click", function () {
    document.querySelector("canvas").requestFullscreen();
});