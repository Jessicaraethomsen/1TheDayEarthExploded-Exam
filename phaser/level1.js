// The first level, JS object literal notation
// global variable for the playAgain button
var button;
var score;
var scoreText;
var score1;
var scoreTxt;

// variable to control the feedback message display
var update = true;

var level1 = {

	create: function () {
		"use strict";
		game.add.image(0, 0, 'bg-level1');

		//  physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);


		// button needs to be created here, but is hidden as default
		button = game.add.button(game.world.centerX - 150, 450, 'playAgain', this.actionOnClick, this, 2, 1, 0);
		button.visible = false;



		//  The catcus group contains the ground and the multi ledges we can jump on
		this.catcus = game.add.group();
		//  physics on the player
		game.physics.arcade.enable(this.catcus);

		//  We will enable physics for any object that is created in this group
		this.catcus.enableBody = true;

		//Catcus
		this.enemy = this.catcus.create(200, 270, 'catcus');
		this.enemy = this.catcus.create(700, 400, 'catcus');



		//  The platforms group contains the ground and the 2 ledges we can jump on
		this.platforms = game.add.group();

		//  We will enable physics for any object that is created in this group
		this.platforms.enableBody = true;

		// create the ground
		this.ground = this.platforms.create(-100, game.world.height - 64, 'ground');

		//  Scale the ground
		this.ground.scale.setTo(5, 5);

		//  Keeping the ground solid
		this.ground.body.immovable = true;


		//FOURTH  
		this.ledge = this.platforms.create(900, 190, 'ground');
		this.ledge.body.immovable = true;

		//  Ledges to hop on
		//Fifth
		this.ledge = this.platforms.create(450, 250, 'ground');
		this.ledge.body.immovable = true;


		this.ledge = this.platforms.create(200, 450, 'ground');
		this.ledge.body.immovable = true;

		//Three
		this.ledge = this.platforms.create(400, 350, 'ground');
		this.ledge.body.immovable = true;

		//TWO
		this.ledge = this.platforms.create(-30, 310, 'ground');
		this.ledge.body.immovable = true;

		//ONE
		this.ledge = this.platforms.create(170, 150, 'ground');
		this.ledge.body.immovable = true;

		// Spaceman trying to get the oxygen
		this.player = game.add.sprite(0, game.world.height - 150, 'spaceman');

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


		//   Add Ship and physics on the ship

		this.ship = game.add.sprite(game.world.width / 2, game.world.height - 120, 'ship');
		game.physics.arcade.enable(this.ship)


		//ADD A SERIES OF BUBBLES TO THE WORLD 10+ points
		this.bubbles = game.add.group();
		this.bubbles.enableBody = true;

		//  Create 12 bubbles evenly spaced apart
		for (var i = 0; i < 15; i++) {
			var bubble = this.bubbles.create(i * 90, 0, 'bubblept');
			//  Drop em from the sky and bounce a bit
			bubble.body.gravity.y = 1000;
			bubble.body.bounce.y = 0.3 + Math.random() * 0.2;
		}



		//SPECIAL SUPPLIES TO THE WORLD.... 10+ points
		this.supplies = game.add.group();
		this.supplies.enableBody = true;

		//  Create 12 bubbles evenly spaced apart
		for (var j = 0; j < 3; j++) {
			var supply = this.supplies.create(j * 410, 0, 'water');
			//  Drop em from the sky and bounce a bit
			supply.body.gravity.y = 800;
			supply.body.bounce.y = 0.3 + Math.random() * 0.2;
		}



		//  Create the score texts
		scoreText = game.add.text(16, 16, '', {
			fontSize: '20px',
			fill: '#fff'
		});

		//create SCORE
		score1 = '';
		scoreTxt = this.add.text(16, 40, score1.toString(), {
			fontSize: '20px',
			fill: '#fff'
		});

		this.cursors = game.input.keyboard.createCursorKeys();

	},

	update: function () {
		"use strict";
		// player to stop when standing still
		this.player.body.velocity.x = 0;


		//  Setup collisions for the player, bubbles, and our platforms
		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.bubbles, this.platforms);
		game.physics.arcade.collide(this.supplies, this.platforms);


		//  Call callectionDiamond() if player overlaps with a diamond
		game.physics.arcade.overlap(this.player, this.bubbles, collectBubbles, null, this);
		game.physics.arcade.overlap(this.player, this.supplies, collectSupplies, null, this);
		game.physics.arcade.overlap(this.player, this.ship, backToShip, null, this);
		game.physics.arcade.overlap(this.player, this.catcus, hitCatus, null, this);


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

	},

};


function hitCatus(player, catcus) {
	"use strict";
	// Removes the bubble from the screen
	catcus.kill();
	score -= 5;
	scoreText.text = 'Oxygen: ' + score;
	this.ouch = game.add.audio('loss');
	this.ouch.play();
}


function collectBubbles(player, bubble) {
	"use strict";
	
	this.oxygensound = game.add.audio('oxygen');
	this.oxygensound.play();
	// Removes the bubble from the screen
	bubble.kill();
	//  And update the score
	score += 5;
	scoreText.text = 'Oxygen: ' + score;
	
}


function collectSupplies(player, supply) {
	"use strict";
	// Removes the bubble from the screen
	this.watersound = game.add.audio('water');
	this.watersound.play();
	supply.kill();
	score1++;
	scoreTxt.setText('Water: ' + score1.toString());
	
	

}



function backToShip(player, ship) {
	"use strict";

    // equal or greater than 55 but they must have all waters to go on.
	if (score >= 55 && score1 === 3) {
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
			game.state.start("splash2");
			game.sound.stopAll(); 
		}, 3000);
	}
}


function restart() {
	'use strict';
	this.state.start('level1');
}


