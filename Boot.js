var gameObj = {
  // Global variables are decleared here!
  gScore: 0,
  gTime: 0
};

gameObj.Boot = function (game) {};

gameObj.Boot.prototype = {
  preload: function () {
    console.log("State - Boot");
  },
  create: function () {
    this.state.start('Preloader');
  }
};
