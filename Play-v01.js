gameObj.Play = function(game) {
  // Make local vars available for ALL function in this js file
  var txScore;
  var timerObj; // Time Obj
  var txTime; // Display Time
  var timerSeconds; // Current timer seconds
  var spFloor; // Game floors
  var spCharacter; // Main Character
  var level;
};

gameObj.Play.prototype = {
  create: function () {
    console.log('State - Play');

    var spBackground = this.add.sprite(0, 0, 'playBackground');
    var spSpeed = this.add.sprite(610, 14, 'speed');
    spFloor = this.add.sprite(0, 800, 'floor');
    spCharacter = this.add.sprite(500, 680, 'character');
    console.log('Sprites added!');

    // Define movement constants
    this.MAX_SPEED = 500; // pixels/second
    this.ACCELERATION = 1500; // pixels/second/second
    this.DRAG = 600; // pixels/second
    this.GRAVITY = 2600; // pixels/second/second
    this.JUMP_SPEED = -1500; // pixels/second (negative y is up)
    console.log('Constants set!');

    var btWin = this.add.button(10, 850, 'playWinButton', this.winnerFun, this, 1, 0, 2);
    var btLose = this.add.button(110, 850, 'playLoseButton', this.loserFun, this, 1, 0, 2);
    var btPoints = this.add.button(210, 850, 'playPointsButton', this.pointsFun, this, 1, 0, 2);

    gameObj.gScore = 0;

    var score = '0';
    var time = '3:00';

    var scoreStr = 'SCORE: ' + score;
    var timeStr = 'TIME: ' + time;

    txScore = this.add.text(25, 25, scoreStr);
    txTime = this.add.text(25, 80, timeStr);

    txScore.fill = 'white';
    txScore.fontSize = 48;
    txScore.font = 'Iceberg';
    txScore.setShadow(-1, 3, 'rgba(0,0,0,1)', 4);

    txTime.fill = 'white';
    txTime.fontSize = 32;
    txTime.font = 'Iceberg';
    txTime.setShadow(-1, 3, 'rgba(0,0,0,1)', 4);

    timerSeconds = 180;

    console.log('Timer start!');
    timerObj = this.game.time.create(false);
    timerObj.loop(1000, this.updateTimerFun, this);
    timerObj.start();

    // Enable physics on the spCharacter and spFloor
    this.game.physics.enable(spCharacter, Phaser.Physics.ARCADE);
    this.game.physics.enable(spFloor, Phaser.Physics.ARCADE);
    console.log('Physics enabled!');

    // Make spCharacter collide with world boundaries so he doesn't leave the stage
    spCharacter.body.collideWorldBounds = true;
    console.log('Boundaries enabled!');

    // Set spCharacter minimum and maximum movement speed
    spCharacter.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y
    console.log('Velocity enabled!');

    // Add drag to the spCharacter that slows them down when they are not accelerating
    spCharacter.body.drag.setTo(this.DRAG, 0); // x, y
    console.log('Drag enabled!');

    // Since we're jumping we need gravity
    this.physics.arcade.gravity.y = this.GRAVITY;
    console.log('Gravity enabled!');

    // Make floor respond
    spFloor.body.immovable = true;
    spFloor.body.allowGravity = false;
    console.log('Floor enabled!');

    // Generate levels
    // var height = 600;
    // levelGroup = this.game.add.group();
    // for (var l = 0; l < 30; l++) {
      level = this.game.add.group();
      for (var x = 27; x <= ((Math.random() * (40 - 3) + 3) * 27); x += 27) {
          // Add the ground blocks, enable physics on each, make them immovable
          var levelBlock = this.game.add.sprite(x, 600, 'block');
          this.game.physics.enable(levelBlock, Phaser.Physics.ARCADE);
          levelBlock.body.immovable = true;
          levelBlock.body.allowGravity = false;
  	      levelBlock.body.checkCollision.down = false;
          levelBlock.body.checkCollision.left = false;
          levelBlock.body.checkCollision.right = false;
          level.add(levelBlock);
      }
      // this.game.physics.enable(level, Phaser.Physics.ARCADE);
      // setAllChildren(key, value, checkAlive, checkVisible, operation, force)
      // level.body.immovable = true;
      // level.body.allowGravity = false;
      // level.body.checkCollision.down = false;
      // level.body.checkCollision.left = false;
      // level.body.checkCollision.right = false;
      // levelGroup.add(level);
      // height-=200;
    // }
    // console.log(levelGroup);



    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.SPACEBAR
    ]);
    console.log('Controls enabled!');
  },
  winnerFun: function() {
    console.log('Win!');
    this.state.start('Win');
  },
  loserFun: function() {
    console.log('Lose!');
    this.state.start('Lose');
  },
  pointsFun: function() {
    console.log('Points!');
    gameObj.gScore += 10;
    txScore.text = 'SCORE: ' + gameObj.gScore;
  },
  updateTimerFun: function() {
    console.log('Time!');
    timerSeconds--;
    if (timerSeconds > 0) {
      // txTime.text = timerSeconds;
      var displayMin = Math.floor(timerSeconds / 60) % 60;
      var displaySec = Math.floor(timerSeconds) % 60;
      if (displaySec < 10) {
        displaySec = '0' + displaySec;
      }
    } else {
      //Time is up
      displayMin = '0';
      displaySec = '00';
      if (gameObj.gScore > 100) {
        this.state.start('Win');
      } else {
        this.state.start('Lose');
      }
    }
    gameObj.gTime = displayMin + ':' + displaySec;
    txTime.text = 'TIME: ' + gameObj.gTime;
  },
  leftInputIsActive: function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x < this.game.width/4);

    return isActive;
  },
  rightInputIsActive: function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

    return isActive;
  },
  spacebarInputIsActive: function(duration) {
    var isActive = false;

    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);
    isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
        this.game.input.activePointer.x > this.game.width/4 &&
        this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

    return isActive;
  },
  update: function () {
    this.game.physics.arcade.collide(spCharacter, spFloor);
    this.game.physics.arcade.collide(spCharacter, level);

    if (this.leftInputIsActive()) {
        // If the LEFT key is down, set the spCharacter velocity to move left
        spCharacter.body.acceleration.x = -this.ACCELERATION;
    } else if (this.rightInputIsActive()) {
        // If the RIGHT key is down, set the spCharacter velocity to move right
        spCharacter.body.acceleration.x = this.ACCELERATION;
    } else {
        spCharacter.body.acceleration.x = 0;
    }

    // Set a variable that is true when the player is touching the ground
    var onTheGround = spCharacter.body.touching.down;

    if (onTheGround && this.spacebarInputIsActive()) {
        // Jump when the player is touching the ground and the up arrow is pressed
        spCharacter.body.velocity.y = this.JUMP_SPEED;
    }
  }
};
