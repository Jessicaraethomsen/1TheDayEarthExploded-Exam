// Splash screen level 2, JS object literal notation
var splash2 = {

	create: function () {
      
		game.add.image(0, 0, 'bg');

		var instructions = game.add.text(game.world.centerX, 200, 'Level 2:\n HELLO TEAM...Fly to PLANET Akala\n\nCOLLECT all Space Fuel & Laser Guns, then back to your ship \n Be Quick & Beware of the KILLER Space Bees!', {
			font: "20px Rammetto One",
			align: "center",
			fill: "#fff",
		});
		
		instructions.anchor.set(0.5);
		
		
		

		setTimeout(function () {
			game.state.start("level2");
		}, 10000);
		
	
	},
}// JavaScript Document