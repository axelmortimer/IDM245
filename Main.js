gameObj.Main = function (game) {};

gameObj.Main.prototype = {
  create: function () {
    console.log('State - Main');

    var spBackground = this.add.sprite(0, 0, 'mainBackground');
    var spLogo = this.add.sprite(165, 60, 'logo');
    var spInfo = this.add.sprite(110, 324, 'info');
    var btButton = this.add.button(205, 815, 'mainButton', this.actionOnClick, this, 1, 0, 2);

},
  actionOnClick: function () {
    console.log('Clicked!');
    this.state.start('Play');
  }
};
