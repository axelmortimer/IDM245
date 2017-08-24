gameObj.Lose = function (game) {};

gameObj.Lose.prototype = {
  create: function () {
    console.log('State - Lose');

    var spBackground = this.add.sprite(0, 0, 'loseBackground');
    var spMessage = this.add.sprite(205, 75, 'loseMessage');

    var btButton = this.add.button(this.world.centerX - 148, 820, 'loseButton', this.replayFun, this, 2, 1, 0);
    var timeLeft = gameObj.gTime;
    var distance = 176;
    var totalScore = gameObj.gScore;

    var timeLeftStr = 'TIME LEFT:    ' + timeLeft;
    var distanceStr = 'DISTANCE:    ' + distance + 'm';
    var totalScoreStr = 'TOTAL SCORE:    ' + totalScore;

    var txTimeLeft = this.add.text(175, 425, timeLeftStr);
    var txDistance = this.add.text(180, 500, distanceStr);
    var txTotalScore = this.add.text(110, 640, totalScoreStr);

    txTimeLeft.fill = 'white';
    txTimeLeft.font = 'Dosis';
    txTimeLeft.fontWeight = 100;
    txTimeLeft.fontSize = 50;

    txDistance.fill = 'white';
    txDistance.font = 'Dosis';
    txDistance.fontWeight = 100;
    txDistance.fontSize = 50;

    txTotalScore.fill = 'white';
    txTotalScore.font = 'Dosis';
    txTotalScore.fontWeight = 100;
    txTotalScore.fontSize = 50;

  },
  replayFun: function () {
    console.log('Try Again!');
    this.state.start('Play');
  }
};
