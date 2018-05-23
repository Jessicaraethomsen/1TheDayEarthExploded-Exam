// Splash screen level 1, JS object literal notation

var splash1 = {

	create: function () {
        
		game.add.image(0, 0, 'bg');

		var instructions = game.add.text(game.world.centerX, 200, 'Level 1:\n Fly to PLANET Poni-Polu\n\nCOLLECT  all oxygen & water, then back to your ship \n Be Quick &  Beware of the STEALING Cactuses!', {
			font: "20px Rammetto One",
			align: "center",
			fill: "#fff",
		});
		
		instructions.anchor.set(0.5);
		
		//what does twen do???
		tween = game.add.tween(instructions).to({
			y: game.world.centerY
		}, 1000, Phaser.Easing.Bounce.Out, true);
		tween.onComplete.add(onComplete, this);
		
		// Add the background sound
		bgSound = game.add.audio('level1Music');
		bgSound.play();
		bgSound.loopFull();

		setTimeout(function () {
			game.state.start("level1");
		}, 10000);
		
		function onComplete() {
    		this.tween = game.add.tween(instructions).to( { y: 700 }, 1000, Phaser.Easing.Exponential.Out, true, 10000);

			}
	},

}
