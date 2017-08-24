gameObj.Win = function (game) {};

gameObj.Win.prototype = {
  create: function () {
    console.log('State - Win');
    var spBackground = this.add.sprite(0, 0, 'winBackground');
    var spMessage = this.add.sprite(195, 75, 'winMessage');

    var btButton = this.add.button(this.world.centerX - 148, 820, 'winButton', this.replayFun, this, 2, 1, 0);
    var timeLeft = gameObj.gTime;
    var topCombo = 22;
    var distance = 300;
    var totalScore = gameObj.gScore;

    var timeLeftStr = 'TIME LEFT: ' + timeLeft;
    var topComboStr = 'TOP COMBO: ' + distance + 'x';
    var distanceStr = 'DISTANCE: ' + distance + 'm';
    var totalScoreMessageStr = 'TOTAL SCORE:';
    var totalScoreStr = totalScore;

    var txTimeLeft = this.add.text(100, 465, timeLeftStr);
    var txTopCombo = this.add.text(83, 540, topComboStr);
    var txDistance = this.add.text(100, 615, distanceStr);
    var txTotalScoreMessage = this.add.text(360, 458, totalScoreMessageStr);
    var txTotalScore = this.add.text(360, 525, totalScoreStr);

    txTimeLeft.fill = 'white';
    txTimeLeft.font = 'Dosis';
    txTimeLeft.fontWeight = 100;
    txTimeLeft.fontSize = 30;

    txTopCombo.fill = 'white';
    txTopCombo.font = 'Dosis';
    txTopCombo.fontWeight = 100;
    txTopCombo.fontSize = 30;

    txDistance.fill = 'white';
    txDistance.font = 'Dosis';
    txDistance.fontWeight = 100;
    txDistance.fontSize = 30;

    txTotalScoreMessage.fill = 'white';
    txTotalScoreMessage.font = 'Dosis';
    txTotalScoreMessage.fontWeight = 100;
    txTotalScoreMessage.fontSize = 50;

    txTotalScore.fill = 'white';
    txTotalScore.font = 'Dosis';
    txTotalScore.fontWeight = 200;
    txTotalScore.fontSize = 122;

  },
  replayFun: function () {
    console.log('Try Again!');
    this.state.start('Play');
  }
};
