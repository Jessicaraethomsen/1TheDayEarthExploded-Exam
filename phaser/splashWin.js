// Splash screen level 1, JS object literal notation

var splashWin = {

	create: function () {
        
		//had to remove the tween because it made a problem with my tween falling too far after I added camera follow
		game.add.image(0, 0, 'bgWin');

		var instructions = game.add.text(game.world.centerX, 250, 'Level 3:\n  You SAVED Lumen Luna From the Jellyfish!!!\n\n AND SAVE MANKIND, YOU ARE A HERO!!', {
			font: "20px Rammetto One",
			align: "center",
			fill: "#fff",
		});
		
		instructions.anchor.set(0.5);
		
		
		
		setTimeout(function () {
			game.state.start("boot");
		}, 10000);
		
	
	},

}
