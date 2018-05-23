// Splash screen level 1, JS object literal notation

var splash3 = {

	create: function () {
        
		//had to remove the tween because it made a problem with my tween falling too far after I added camera follow
		game.add.image(0, 0, 'bg');

		var instructions = game.add.text(game.world.centerX, 250, 'Level 1:\n Fly to PLANET Poni-Polu\n\nCOLLECT  all oxygen & water, then back to your ship \n Be Quick &  Beware of the STEALING Cactuses!', {
			font: "20px Rammetto One",
			align: "center",
			fill: "#fff",
		});
		
		instructions.anchor.set(0.5);
		
		
		// Add the background sound
		bgSound = game.add.audio('level1Music');
		bgSound.play();
		bgSound.loopFull();

		setTimeout(function () {
			game.state.start("level3");
		}, 10000);
		
	
	},

}
