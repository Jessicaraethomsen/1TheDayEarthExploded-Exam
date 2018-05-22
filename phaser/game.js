var game = new Phaser.Game(1000, 500, Phaser.CANVAS, 'game');
// global game variables
var score, bgSound;

// global timer function
var countDown = 30;
function formatTime(s) {
	// Convert seconds (s) to a nicely formatted and padded time string
	var minutes = "0" + Math.floor(s / 60);
	var seconds = " " + (s - minutes * 60);
	return seconds.substr(-2);
};

Main = function () {};

Main.prototype = {

	preload: function () {
		this.game.stage.backgroundColor = '#17122d';
		this.load.image('preloader', 'assets/preloading.png');
	
	},

	create: function () {
		"use strict";
		score = 0;
		// adding all game states
		game.state.add('boot', boot);
		//game.state.add('splash1', splash1);
		//game.state.add('level1', level1);
		game.state.add('splash2', splash2);
		game.state.add('level2', level2);
		// launching the boot screen
		game.state.start('boot');
	}

};

game.state.add('Main', Main);
game.state.start('Main');
