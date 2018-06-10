// Splash screen level 1, JS object literal notation

var splash1 = {

	create: function () {
        
		game.add.image(0, 0, 'bg');

		var instructions = game.add.text(game.world.centerX, 200, 'Level 1:\n HELLO TEAM...Fly to PLANET Poni-Polu\n\nCOLLECT  all the oxygen & water, then back to your ship \n Be Quick &  Beware of the STEALING Cactuses!', {
			font: "20px Rammetto One",
			align: "center",
			fill: "#fff",
		});
		
		instructions.anchor.set(0.5);
		

		setTimeout(function () {
			game.state.start("level1");
		}, 10000);
		
		
	},

}
