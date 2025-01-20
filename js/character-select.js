var characterChosen;

//Scene to select the character to play the game
function characterSelect() {
    //Text
    var characterSelectText = scene.add.text(400, 200, "Choose a character:", {
        fontSize: "40px", fill: "#FFF"
    }).setOrigin(0.5);

    //Faces
    var mrchung = scene.add.image(200, 325, "mrchung").setInteractive();
    var mrsz = scene.add.image(400, 325, "mrsz").setInteractive();
    var mrvoskamp = scene.add.image(600, 325, "mrvoskamp").setInteractive();

    //Click events
    mrchung.on("pointerdown", function() {
        characterChosen = "mrchung";

        characterSelectText.destroy();
        mrchung.destroy();
        mrsz.destroy();
        mrvoskamp.destroy();

        startGame();
    });

    mrsz.on("pointerdown", function() {
        characterChosen = "mrsz";

        characterSelectText.destroy();
        mrchung.destroy();
        mrsz.destroy();
        mrvoskamp.destroy();

        startGame();
    });

    mrvoskamp.on("pointerdown", function() {
        characterChosen = "mrvoskamp";

        characterSelectText.destroy();
        mrchung.destroy();
        mrsz.destroy();
        mrvoskamp.destroy();

        startGame();
    });
}