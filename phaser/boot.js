// The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

	// 'active' means all requested fonts have finished loading
	// We set a 1 second delay before calling the dummy function 'createText'.
	// For some reason if we don't the browser cannot render the text the first time it's created.
	active: function () {
	
		game.time.events.add(Phaser.Timer.SECOND, this.createText);
	},

	// The Google Fonts we want to load (specify as many as you like in the array)
	google: {
		families: ['Rammetto One']
	},

	createText: function () {
		// dummy function to render Google web fonts
	}

};

// Boot screen, JS object literal notation


var boot = {

	preload: function () {
		//loading bar
		var preloader = game.add.sprite(game.world.centerX - (387 / 2), 400, 'preloading');
		this.load.setPreloadSprite(preloader);
		// preloading Background Images
		
		this.intromusic = game.add.audio('intro');
		this.intromusic.play();
		
		//Splash Screen
		game.load.image('bg', 'assets/bg.png');
		//LEVEL1
		game.load.image('bg-level1', 'assets/sky.png');
		//LEVEL2

		// preloading Sprites

		game.load.image('sky', 'assets/sky.png');
		game.load.image('level2', 'assets/level2.png');
		game.load.image('ground', 'assets/platform.png');
		game.load.image('ground2', 'assets/platform2.png');
		game.load.image('bubblept', 'assets/oxygen.png');
		game.load.image('water', 'assets/glass.png');
		game.load.image('gas', 'assets/gas.png');
		game.load.image('bee', 'assets/bee.png');
		game.load.image('engine', 'assets/engine.png');
		game.load.image('ship', 'assets/ship.png');
		game.load.spritesheet('spaceman', 'assets/spaceman.png', 32, 32);

		// preloading animation sprites
		game.load.spritesheet('jellyfish', 'assets/jelly.png', 500, 52, 52);
		game.load.spritesheet('button', 'assets/button_sprite.png', 300, 75, 3);
		game.load.spritesheet('playAgain', 'assets/button_again_sprite.png', 300, 75, 3);
		game.load.spritesheet('catcus', 'assets/cactus.png');


		//  300x75 is the size of each frame
		//  There are 3 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG...

		// preloading all audio files
	    game.load.audio('level1Music', 'audio/level1.mp3');
		game.load.audio('intro', 'audio/intro.mp3');
		game.load.audio('oxygen', 'audio/oxygen.wav');
		game.load.audio('water', 'audio/water.wav');
		game.load.audio('jump', 'audio/jump.wav');
		game.load.audio('loss', 'audio/loss.mp3');
		game.load.audio('rocket', 'audio/rocket.wav');
		

	},



	//Start screen	
	create: function () {

		game.add.image(0, 0, 'bg');
	
		var titleShadow = game.add.text(game.world.centerX + 3, 200, 'The Day the earth Exploded!', {
			font: "40px Rammetto One",
			fill: "#000"
		});

		titleShadow.anchor.set(0.5);

		var title = game.add.text(game.world.centerX, 200, 'The Day the earth Exploded!', {
			font: "40px Rammetto One",
			fill: "#fff"
		});

		title.anchor.set(0.5);

		var subTitle = game.add.text(game.world.centerX, 380, 'JS/GAME Exam, 3 levels', {
			font: "25px Rammetto One",
			fill: "#fff"
		});

		subTitle.anchor.set(0.5);

		var button = game.add.button(game.world.centerX - 150, 250, 'button', this.actionOnClick, this, 2, 1, 0);


		this.jellyfish = game.add.sprite(game.height / 2, 100, 'jellyfish');
		this.jellyfish.anchor.setTo(0.5, 0);
		game.physics.enable(this.jellyfish);
		game.physics.arcade.enableBody(this.jellyfish); // important for velocity (movement) + collision detection
		this.jellyfish.body.collideWorldBounds = true; // jellyfish cannot leave the world ;-)
		this.jellyfish.body.velocity.setTo(-50, 0);
		this.jellyfish.body.bounce.set(1, 1);
		
		



	},

	update: function () {
		// changing jellyfish's sprite orientation on impact with the world's bounds
		if (this.jellyfish.body.blocked.left) {
			this.jellyfish.scale.x = -1;
		} else if (this.jellyfish.body.blocked.right) {
			this.jellyfish.scale.x = 1;
		}

	},

	actionOnClick: function () {
		// launching level 1 splash screen
		game.state.start('splash2');
	}

}
