// Business Logic
let currentRoll = 0;
let id = 0;
let players = new List();

function Player(total, id, name) {
  this.total = total;
  this.id = id;
  this.name = name;
}

Player.prototype.sum = function (roll) {
  this.total += roll;
};

function List() {
  this.players = {};
}

List.prototype.addPlayers = function (player) {
  this.players[player.id] = player;
};

List.prototype.findPlayer = function (id) {
  if (this.players[id] != undefined) {
    return this.players[id];
  }
  return false;
};

function rollTheDice(roll) {
  currentRoll += roll;
  return currentRoll;
}

function rollFunction() {
  roll = Math.trunc(Math.random() * 2) + 1;
  return roll;
}

// User Interface

function switchPlayer(id) {
  let player = players.findPlayer(id);

  if (id == 1) {
    $("#player-name").html(player.name);
    id = 2;
  } else {
    $("#player-name").html(player.name);
    id = 1;
  }
  return id;
}

function checkWinner(currentRoll, id) {
  let player = players.findPlayer(id);

  if (currentRoll + parseInt(player.total) >= 100) {
    $("#winner").html(player.name);
    $("#winner-box").show();
    $("#roll-box").hide();
  }
}

$(document).ready(function () {
  let roll = 0;
  let opponent = "";
  let playerOne = new Player(0, 1, "");
  let playerTwo = new Player(0, 2, "");

  $("form#start").submit(function (event) {
    event.preventDefault();
    $("#roll-box").show();
    $("#start-box").hide();
    players.addPlayers(playerOne);
    players.addPlayers(playerTwo);
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
    let roll1Twice = false;
    let player = players.findPlayer(id);

    for (let i = 0; i < diceQuantity; i++) {
      roll = rollFunction();
      $(".dice" + (i + 1)).attr("id", "dice-" + roll);
      console.log(roll);
      rollSum += roll;
      if (roll == 1) {
        roll1 = true;
        roll = 0;
      } else if (roll1 && roll == 1) {
        roll1Twice;
      }
    }

    if (roll1) {
      currentRoll = 0;
      $("#this-roll").empty();
      switchPlayer(id);
    } else if (roll1Twice) {
      currentRoll = 0;
      player.total = 0;
      switchPlayer(id);
    } else {
      currentRoll = rollTheDice(rollSum);
      checkWinner(currentRoll, id);
      $("#this-roll").html(rollSum);
    }
    $("#current-roll").html(currentRoll);
    console.log(currentRoll);
  });

  $("button#hold").click(function () {
    let player = players.findPlayer(id);

    player.sum(currentRoll);
    $("#total" + player.id).html(player.total);

    currentRoll = 0;
    id = switchPlayer(id);

    $("#this-roll").empty();
    $("#current-roll").empty();
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
