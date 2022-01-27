// Business Logic
let currentRoll = 0;
let id = 1;
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
  roll = Math.trunc(Math.random() * 5) + 1;
  return roll;
}

// User Interface

function switchPlayer(id) {
  if (id == 1) {
    id = 2;
  } else {
    id = 1;
  }

  let player = players.findPlayer(id);
  $("#player-name").html(player.name);

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

function switchMessage(id) {
  let player = players.findPlayer(id);

  $("#switch-box").show();
  $("#next-player").html(player.name);
  setTimeout(function () {
    $("#switch-box").hide();
  }, 1000);
}

function computer() {
  let opponent = $("input[name=opponent]:checked").val();
  if (id == 2 && opponent === "computer") {
    let player = players.findPlayer(id);
    player.name = "Computer";
    $("#player2-name").html(player.name);
    if (!rollBigFunction()) {
      if (!rollBigFunction()) {
        holdFunction();
      }
    }
    console.log("computer");
  }
}

function holdFunction() {
  currentRoll = 0;
  id = switchPlayer(id);
  computer();

  $("#this-roll").empty();
  $("#current-roll").empty();
  setTimeout(function () {
    $(".dice1").attr("id", "");
    $(".dice2").attr("id", "");
  }, 1000);
}

function rollBigFunction() {
  console.log("roll");
  console.log(id);
  let diceQuantity = parseInt($("input[name=dice-quantity]:checked").val());
  let rollSum = 0;
  let rolledOne = false;
  let rolledOneTwice = false;
  let player = players.findPlayer(id);
  for (let i = 0; i < diceQuantity; i++) {
    let roll = rollFunction();
    $(".dice" + (i + 1)).attr("id", "dice-" + roll);
    rollSum += roll;
    if (rolledOne && rollSum == 2) {
      rolledOneTwice = true;
    } else if (roll == 1) {
      rolledOne = true;
    }
  }

  if (rolledOne) {
    if (rolledOneTwice) {
      player.total = 0;
      $("#total" + player.id).html(player.total);
    }
    holdFunction();
  } else {
    currentRoll = rollTheDice(rollSum);
    player.sum(currentRoll);
    $("#this-roll").html(rollSum);
    $("#total" + player.id).html(player.total);

    checkWinner(currentRoll, player.id);
  }
  $("#current-roll").html(currentRoll);
  return rolledOne;
}

$(document).ready(function () {
  let playerOne = new Player(0, 1, "");
  let playerTwo = new Player(0, 2, "");

  $("form#start").submit(function (event) {
    event.preventDefault();
    $("#roll-box").show();
    $("#start-box").hide();
    const playerOneName = $("input#player1").val();
    const playerTwoName = $("input#player2").val();

    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;

    players.addPlayers(playerOne);
    players.addPlayers(playerTwo);

    $("#total1").html(playerOne.total);
    $("#total2").html(playerTwo.total);
    $("#player-name").html(playerOne.name);
    $("#player1-name").html(playerOne.name);
    $("#player2-name").html(playerTwo.name);
  });

  $("button#roll").click(function () {
    rollBigFunction();
  });

  $("button#hold").click(function () {
    holdFunction();
  });

  $("button#play").click(function () {
    $("#opponent-box").show();
    $("#play-box").hide();
  });

  $("button#submit").click(function () {
    $("#opponent-box").hide();
    $("#start-box").show();
    opponent = $("input[name=opponent]:checked").val();

    if (opponent === "player2") {
      $("#player2-option").show();
    }
  });
});
