// Business Logic
let currentRoll = 0;
let id = 0;

function Player(total, id, name) {
  this.total = total;
  this.id = id;
  this.name = name;
}

Player.prototype.sum = function (roll) {
  this.total += roll;
};

function rollTheDice(roll) {
  currentRoll += roll;
  return currentRoll;
}

function rollFunction() {
  roll = Math.trunc(Math.random() * 6) + 1;
  return roll;
}

// User Interface

function switchPlayer(id) {
  if (id == 1) {
    $("#player-name").html($("#player2-name").text());
    id = 2;
  } else {
    $("#player-name").html($("#player1-name").text());
    id = 1;
  }
  return id;
}

function checkWinner(currentRoll, id) {
  if (id == 1 && currentRoll + parseInt($("#total1").text()) >= 100) {
    $("#winner").html($("#player1-name").text());
    $("#winner-box").show();
    $("#roll-box").hide();
  } else if (id == 2 && currentRoll + parseInt($("#total2").text()) >= 100) {
    $("#winner").html($("#player2-name").text());
    $("#winner-box").show();
    $("#roll-box").hide();
  }
}

$(document).ready(function () {
  let roll = 0;
  let playerOne = new Player(0, 1, "");
  let playerTwo = new Player(0, 2, "");
  let computerPlayer = false;
  let opponent = "";

  $("form#start").submit(function (event) {
    event.preventDefault();
    $("#roll-box").show();
    $("#start-box").hide();
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
  });

  $("button#roll").click(function () {
    let diceQuantity = parseInt($("input[name=dice-quantity]:checked").val());
    let rollSum = 0;
    let roll1 = false;
    for (let i = 0; i < diceQuantity; i++) {
      roll = rollFunction();
      console.log(roll);
      rollSum += roll;
      if (roll == 1) {
        roll1 = true;
      }
    }

    if (roll1) {
      currentRoll = 0;
      $("#this-roll").empty();
      if ((opponent = "player2")) {
        switchPlayer(id);
      } else {
        let computerroll1 = rollFunction();
        let computerroll2 = rollFunction();
        $("#total2").html(computerroll1 + computerroll2);
      }
    } else {
      currentRoll = rollTheDice(rollSum);
      checkWinner(currentRoll, id);
      $("#this-roll").html(rollSum);
    }
    $("#current-roll").html(currentRoll);
    console.log(currentRoll);
  });

  $("button#hold").click(function () {
    $("#current-roll").empty();
    console.log(id);
    if (id == 1) {
      playerOne.sum(currentRoll);
      currentRoll = 0;
      $("#total1").html(playerOne.total);
    } else {
      playerTwo.sum(currentRoll);
      currentRoll = 0;
      $("#total2").html(playerTwo.total);
    }
    id = switchPlayer(id);
    console.log(id);
    $("#this-roll").empty();
  });

  $("button#play").click(function () {
    $("#opponent-box").show();
    $("#play-box").hide();
  });

  $("button#submit").click(function () {
    $("#opponent-box").hide();
    $("#start-box").show();
    opponent = $("input[name=opponent]:checked").val();

    console.log(opponent);
    if (opponent === "computer") {
    } else {
      $("#player2-option").show();
    }
    id = 1;
  });
});
