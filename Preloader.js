gameObj.Preloader = function (game) {};

gameObj.Preloader.prototype = {
  preload: function () {
    console.log("State - Preloader");
    this.stage.backgroundColor = '#333';

    // // Progress bar animation code
    // this.preloaderBg = this.add.sprite((820 - 297) / 2, (700 - 145) / 2, 'preloaderBg');
    // this.preloadBar = this.add.sprite((820 - 158) / 2, (700 - 50) / 2, 'preloaderBar');
    // this.load.setPreloadSprite(this.preloadBar);

    // Load ALL GAME images into memory

    // Main
    this.load.image('mainBackground', 'img/start_background.png');
    this.load.image('logo', 'img/start_logo.png');
    this.load.image('info', 'img/start_info.png');
    this.load.spritesheet('mainButton', 'img/start_button.png', 296, 103);

    // Play
    this.load.image('playBackground', 'img/game_background.png');
    this.load.image('floor', 'img/game_floor.png');
    this.load.image('character', 'img/game_character.png');
    this.load.image('speed', 'img/game_speed.png');
    this.load.image('block', 'img/game_block.png');

    // Win
    this.load.image('winBackground', 'img/win_background.png');
    this.load.image('winMessage', 'img/win_message.png');
    this.load.spritesheet('winButton', 'img/win_button.png', 296, 103);

    // Lose
    this.load.image('loseBackground', 'img/lose_background.png');
    this.load.image('loseMessage', 'img/lose_message.png');
    this.load.spritesheet('loseButton', 'img/lose_button.png', 296, 103);

    this.load.spritesheet('playWinButton', 'img/btn_win.png', 90, 90);
    this.load.spritesheet('playLoseButton', 'img/btn_lose.png', 90, 90);
    this.load.spritesheet('playPointsButton', 'img/btn_points.png', 90, 90);
},
  create: function () {
    this.state.start('Main');
  }
};
