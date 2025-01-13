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
            debug: true
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
var characterChosen;

function preload() {
    //Backgrounds
    this.load.image("cave", "assets/backgrounds/cave.png");
    this.load.image("desert", "assets/backgrounds/desert.png");
    this.load.image("fall", "assets/backgrounds/fall.png");
    this.load.image("forest", "assets/backgrounds/forest.png");
    this.load.image("snow", "assets/backgrounds/snow.png");
    this.load.image("treetops", "assets/backgrounds/treetops.png");

    //Balls
    this.load.image("basket_ball", "assets/balls/basket_ball.png");
    this.load.image("beach_ball", "assets/balls/beach_ball.png");
    this.load.image("blue_bowling_ball", "assets/balls/blue_bowling_ball.png");
    this.load.image("red_bowling_ball", "assets/balls/red_bowling_ball.png");
    this.load.image("purple_bowling_ball", "assets/balls/purple_bowling_ball.png");
    this.load.image("brown_baseball_ball", "assets/balls/brown_baseball_ball.png");
    this.load.image("yellow_baseball_ball", "assets/balls/yellow_baseball_ball.png");
    this.load.image("football_ball", "assets/balls/football_ball.png");
    this.load.image("minigolf_ball", "assets/balls/minigolf_ball.png");
    this.load.image("soccer_ball", "assets/balls/soccer_ball.png");
    this.load.image("tennis_ball", "assets/balls/tennis_ball.png");
    this.load.image("voleyball_ball", "assets/balls/voleyball_ball.png");

    //Faces
    this.load.image("mrchung", "assets/faces/mrchung.png")
    this.load.image("mrsz", "assets/faces/mrsz.png")
    this.load.image("mrvoskamp", "assets/faces/mrvoskamp.png")
}

function create() {
    scene = this;

    //Create the character screen
    characterSelect();
}

function update() {
}