// The first level, JS object literal notation
// global variable for the playAgain button
var button;
var score = 0;
var scoreText;
var score1 = 0;
var scoreTxt;

// variable to control the feedback message display
var update = true;

var level3 = {

	create: function () {
		"use strict";
		game.add.image(0, 0, 'level3');
		game.world.setBounds(0, 0, 1000, 1250);
		//  physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;
		
		
		//TIMER
		
		// Create a custom timer (global variable countDown + format function in game.js)
		this.timer = game.time.create();

		// Create a delayed event 1m and 30s from now
		this.timerEvent = this.timer.add(Phaser.Timer.SECOND * countDown, this.endTimer, this);

		// Start the timer
		this.timer.start();

		// Display the timer
		this.txtTimer = game.add.text(900, 10, formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), {
			font: "30px Rammetto One",
			fill: "#e7ff00"
		});
		
		this.txtTimer.font = 'Rammetto One';
		this.txtTimer.fixedToCamera = true;
		

		//  The platforms


		//  The platforms group contains the ground and the 2 ledges we can jump on
		this.platforms = game.add.group();

		//  We will enable physics for any object that is created in this group
		this.platforms.enableBody = true;

		// create the ground
		this.ground = this.platforms.create(-100, game.world.height - 64, 'ground2');

		//  Scale the ground
		this.ground.scale.setTo(5, 5);

		//  Keeping the ground solid
		this.ground.body.immovable = true;


		//  The ledges
		//  Ledges to hop on

		//  Ledges to hop on
		//ninth- bottom
		this.ledge = this.platforms.create(500, 1089, 'ground2');
		this.ledge.body.immovable = true;

		//  Ledges to hop on
		//eith
		this.ledge = this.platforms.create(800, 1005, 'ground2');
		this.ledge.body.immovable = true;

		//seven
		this.ledge = this.platforms.create(380, 930, 'ground2');
		this.ledge.body.immovable = true;

		//six
		this.ledge = this.platforms.create(500, 830, 'ground2');
		this.ledge.body.immovable = true;

		//middle-five
		this.ledge = this.platforms.create(100, 760, 'ground2');
		this.ledge.body.immovable = true;

		//four
		this.ledge = this.platforms.create(400, 660, 'ground2');
		this.ledge.body.immovable = true;

		//three
		this.ledge = this.platforms.create(60, 560, 'ground2');
		this.ledge.body.immovable = true;

		//two
		this.ledge = this.platforms.create(520, 530, 'ground2');
		this.ledge.body.immovable = true;

		//top-one
		this.ledge = this.platforms.create(220, 0, 'ground2');
		this.ledge.body.immovable = true;



		//  The jellyfish group contains the ground and the multi ledges we can jump on
		this.jellyfish = game.add.group();
		//  physics on the jellyfish
		game.physics.arcade.enable(this.jellyfish);

		//  We will enable physics for any object that is created in this group
		this.jellyfish.enableBody = true;

		//SPACEjellyfishS
		this.enemy = this.jellyfish.create(200, 230, 'jellyfish');
		this.enemy = this.jellyfish.create(100, 450, 'jellyfish');
		this.enemy = this.jellyfish.create(400, 550, 'jellyfish');
		this.enemy = this.jellyfish.create(100, 650, 'jellyfish');
		this.enemy = this.jellyfish.create(0, 850, 'jellyfish');
		this.enemy = this.jellyfish.create(500, 750, 'jellyfish');
		//tween to move the jellyfishs
		game.add.tween(this.jellyfish).to({
			x: 400
		}, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true)

		//SPACEMAN

		// Spaceman trying to get the oxygen
		this.player = game.add.sprite(game.world.width / 2 - 20, game.world.height - 120, 'spaceman');

		//  physics on the player
		game.physics.arcade.enable(this.player);

		//  Physics for the spaceman So we bounce a bit, gameplay
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 800;
		this.player.body.collideWorldBounds = true;


		//  animation to walking
		//left, image1/image2 and 10px
		this.player.animations.add('left', [0, 1], 10, true);
		this.player.animations.add('right', [2, 3], 10, true);

		game.camera.follow(this.player);
		//   Add Ship and physics on the ship

		this.ship = game.add.sprite(game.world.width / 2, game.world.height - 120, 'ship');
		game.physics.arcade.enable(this.ship)


		//ADD A SERIES OF gasoline TO THE WORLD 10+ points
		this.foods = game.add.group();
		this.foods.enableBody = true;

		//  Create 12 gasoline evenly spaced apart
		for (var i = 0; i < 25; i++) {
			var food = this.foods.create(i * 60, 0, 'food');
			//  Drop em from the sky and bounce a bit
			food.body.gravity.y = 1000;
			food.body.bounce.y = 0.3 + Math.random() * 0.2;
		}



		//SPECIAL SUPPLIES TO THE WORLD.... 10+ points
		this.jars = game.add.group();
		this.jars.enableBody = true;

		//  Create 12 gasoline evenly spaced apart
		for (var j = 0; j < 6; j++) {
			var jar = this.jars.create(j * 190, 0, 'jar');
			//  Drop em from the sky and bounce a bit
			jar.body.gravity.y = 800;
			jar.body.bounce.y = 0.3 + Math.random() * 0.2;
		}

		// button needs to be created here, but is hidden as default
		button = game.add.button(350, 220, 'playAgain', this.actionOnClick, this, 2, 1, 0);
		button.fixedToCamera = true;
		button.visible = false;

		//  Create the score texts
		scoreText = game.add.text(16, 16, '', {
			fontSize: '20px',
			fill: '#fff'
		});
		scoreText.fixedToCamera = true;

		//create SCORE
		score1 = '';
		scoreTxt = this.add.text(16, 40, score1.toString(), {
			fontSize: '20px',
			fill: '#fff'
		});
		scoreTxt.fixedToCamera = true;

		this.cursors = game.input.keyboard.createCursorKeys();

	},

	update: function () {
		"use strict";
		// player to stop when standing still
		this.player.body.velocity.x = 0;


		//  Setup collisions for the player, gasolines, and our platforms
		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.jars, this.platforms);
		game.physics.arcade.collide(this.foods, this.platforms);


		//  Call callectionDiamond() if player overlaps with a diamond
		game.physics.arcade.overlap(this.player, this.foods, CollectFood, null, this);
		game.physics.arcade.overlap(this.player, this.jars, CollectJar, null, this);
		game.physics.arcade.overlap(this.player, this.ship, BackToShip, null, this);
		game.physics.arcade.overlap(this.player, this.jellyfish, HitJellyfish, null, this);


		// Controls... 
		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -150;

			this.player.animations.play('left');
		} else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = 150;

			this.player.animations.play('right');
		} else {
			// If no movement keys are pressed, stop the player
			this.player.animations.stop();
		}

		// Here to get our spaceman to jump
		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -400;
			this.jumper = game.add.audio('jump');
			this.jumper.play();
		}

		
		this.tmp = formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));

		if (this.timer.running && this.tmp >= 0) {
			this.txtTimer.text = formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
		} else if (score < 30 && update === true) {
			level3.loose();			
			update = false;
		}
		
		
	},


	endTimer: function () {
		// Stop the timer when the delayed event triggers
		this.timer.stop();
	},
	
	
	loose: function () {

		this.player.kill();
		button.visible = true;


	},


	actionOnClick: function () {
		score = 0;
		score1 = 0;
		update = true;
		// launching level 2 again
		game.state.start('level3');
	}

};


function HitJellyfish(player, jellyfish) {
	"use strict";
	// Removes the bubble from the screen
	jellyfish.kill();
	this.ouch = game.add.audio('loss');
	this.ouch.play();
	level3.loose();


}


function CollectJar(player, jar) {
	"use strict";

	this.gassound = game.add.audio('gas');
	this.gassound.play();
	// Removes the bubble from the screen
	jar.kill();
	//  And update the score
	score += 5;
	scoreText.text = 'Food Supplies: ' + score;

}


function CollectFood(player, food) {
	"use strict";
	// Removes the bubble from the screen
	this.enginesound = game.add.audio('engine');
	this.enginesound.play();
	food.kill();
	score1++;
	scoreTxt.setText('Food Can: ' + score1.toString());
}





function BackToShip(player, ship) {
	"use strict";

	// equal or greater than 55 but they must have all waters to go on.
	if (score >= 30 && score1 === 17) {
		//  Here is create a tween on the ship created above
		var tween = game.add.tween(ship);
		player.kill();
		//  The object defines the properties to tween.
		this.rocketsound = game.add.audio('rocket');
		this.rocketsound.play();
		tween.to({
			y: -100
		}, 1900, 'Linear', true, 0);


		setTimeout(function () {
			game.state.start("boot");
			game.sound.stopAll();
		}, 3000);
	}
}
