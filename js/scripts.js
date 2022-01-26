// Business Logic
function Player(total, id, name) {
  this.total = total;
  this.id = id;
  this.name = name;
}

Player.prototype.sum = function (roll) {
  this.total += roll;
};

function rollFunction() {
  roll = Math.trunc(Math.random() * 6) + 1;
  return roll;
}

function chnageId() {}
// User Interface
$(document).ready(function () {
  let id = 0;
  let roll = 0;

  let playerOne = new Player(0, 1, "");
  let playerTwo = new Player(0, 2, "");

  $("form#start").submit(function (event) {
    event.preventDefault();
    const playerOneName = $("input#player1").val();
    const playerTwoName = $("input#player2").val();
    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;
    console.log(playerOne);
    console.log(playerTwo);
    $("#total1").html(playerOne.total);
    $("#total2").html(playerTwo.total);
    $("#player-name").html(playerOne.name);
    $("#player1-name").html(playerOne.name);
    $("#player2-name").html(playerTwo.name);
    id = 1;
  });

  $("button#roll").click(function () {
    const diceQuantity = $("input#dice-quantity").val();
    let rollSum = 0;
    for (let i = 0; i < diceQuantity; i++) {
      roll = rollFunction();
      rollSum += roll;
      console.log(roll);
      console.log(rollSum);
      if (id == 1) {
        playerOne.sum(roll);
        $("#this-roll").html(rollSum);
        $("#total1").html(playerOne.total);
      } else {
        playerTwo.sum(roll);
        $("#this-roll").html(rollSum);
        $("#total2").html(playerTwo.total);
      }
    }
  });

  $("button#hold").click(function () {
    if (id == 1) {
      id = 2;
    } else {
      id = 1;
    }
    $("#this-roll").empty();
  });
});
