// Initialize the Phaser Game object and set default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update })

// Declare shared variables at the top so all methods can access them
let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player
let ship

function preload () {
  // Load & Define our game assets
  game.load.image('sky', 'assets/sky.png')
  game.load.image('ground', 'assets/platform.png')
  game.load.image('diamond', 'assets/diamond.png')
  game.load.image('ship', 'assets/ship.png')
  game.load.spritesheet('woof', 'assets/woof.png', 32, 32)
}

function create () {
    //  physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE)

    //  background for the level
  game.add.sprite(0, 0, 'sky')

    //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

    // create the ground
  let ground = platforms.create(-100, game.world.height - 64, 'ground');

    //  Scale the ground
  ground.scale.setTo(5, 5);

    //  Keeping the ground solid
  ground.body.immovable = true;

    //  Ledges to hop on
		//FOURTH
  let ledge = platforms.create(400, 230, 'ground');
  ledge.body.immovable = true;
	ledge.scale.setTo(2, 1);
  
  //ONE
   ledge = platforms.create(170, 130, 'ground');
  ledge.body.immovable = true;

	//THRID
  ledge = platforms.create(-30, 310, 'ground');
  ledge.body.immovable = true;
	ledge.scale.setTo(1.5, 1);
  
  //SECOND
  ledge = platforms.create(420, 360, 'ground');
  ledge.body.immovable = true;
  
   ledge = platforms.create(200, 450, 'ground');
  ledge.body.immovable = true


    // Spaceman trying to get the oxygen
  player = game.add.sprite(0, game.world.height - 150, 'woof')

    //  physics on the player
  game.physics.arcade.enable(player)

    //  Physics for the spaceman So we bounce a bit, gameplay
  player.body.bounce.y = 0.2
  player.body.gravity.y = 800
  player.body.collideWorldBounds = true

    //  animation to walking
  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)

    //  Finally some diamonds to collect
    //  physics for any object that is created in this group
  
  
  
     // Spaceman trying to get the oxygen
  ship = game.add.sprite(32, game.world.height - 150, 'ship');

    //  physics on the ship
  game.physics.arcade.enable(ship);

    //  Physics for the spaceman So we bounce a bit, gameplay
  ship.body.bounce.y = 0.2
  ship.body.gravity.y = 800
  ship.body.collideWorldBounds = true
  
  
  

  diamonds = game.add.group()
  diamonds.enableBody = true

    //  Create 12 diamonds evenly spaced apart
  	for (var i = 0; i < 20; i++) {
    let diamond = diamonds.create(i * 40, 0, 'diamond')
    //  Drop em from the sky and bounce a bit
    diamond.body.gravity.y = 1000
    diamond.body.bounce.y = 0.3 + Math.random() * 0.2
  }

	

	
	
    //  Create the score text
  scoreText = game.add.text(16, 16, '', { fontSize: '42px', fill: '#fff' })

    //  And bootstrap our controls
  cursors = game.input.keyboard.createCursorKeys()
}

function update () {
  // player to stop when standing still
  player.body.velocity.x = 0

  //  Setup collisions for the player, diamonds, and our platforms
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(ship, platforms)
  game.physics.arcade.collide(diamonds, platforms)

    //  Call callectionDiamond() if player overlaps with a diamond
  game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

    // Controls... 
  if (cursors.left.isDown) {
    player.body.velocity.x = -150

    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150

    player.animations.play('right')
  } else {
    // If no movement keys are pressed, stop the player
    player.animations.stop()
  }

    // Here to get our spaceman to jump
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
    // Show an alert modal when score reaches 120
  if (score === 140) {
    alert('You win!')
    score = 0
  }
}

function collectDiamond (player, diamond) {
    // Removes the diamond from the screen
  diamond.kill()

    //  And update the score
  score += 5
  scoreText.text = 'Score: ' + score
}



