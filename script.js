var round = 1;
var link = new Map();
var click = 0;
var order = [];
var color = "";
link.set(0, "red");
link.set(1, "yellow");
link.set(2, "green");
link.set(3, "blue");

$(function() {
  $("#start").on('click', function() {
      order.push(Math.floor(Math.random() * 4));
      console.log(order[round-1]);
    
    $("#start").fadeOut(500);
    setTimeout(function() {
      color = document.getElementById(link.get(order[0])).style.backgroundColor;
      document.getElementById("note").innerHTML = "1";
      document.getElementById(link.get(order[0])).style.backgroundColor = "white";

      console.log("Round " + round);
      pause(order);

      //document.getElementById("note").innerHTML = "";
    }, 1000);
  });
});

var i = 0;

function pause(order) {
  window.setTimeout(function() {
    document.getElementById(link.get(order[i])).style.backgroundColor = color;
    i++;
    if (i >= order.length) {
      i = 0;
      $("#wrapper1").delay(500).fadeOut(500);
      $("#wrapper2").delay(1500).fadeIn(500);
      return;
    }
    color = document.getElementById(link.get(order[i])).style.backgroundColor;

    document.getElementById("note").innerHTML = i + 1;
    document.getElementById(link.get(order[i])).style.backgroundColor = "white";

    pause(order);
  }, 700);
}

function check(c) {
  if (order[click] != c) {
    $("#board2").fadeOut(500);
    setTimeout(function() {
      var curr = round - 1;
      let decodedCookie = decodeURIComponent(document.cookie);
      console.log(decodedCookie);
      if (decodedCookie == "" || parseInt(decodedCookie.replace("highscore=", "")) < curr) {
        document.cookie = "highscore=" + curr;
        decodedCookie = decodeURIComponent(document.cookie);

      }
      document.body.style.backgroundColor = "#f04c41";
      document.getElementById("note2").innerHTML = "Oops, that was incorrect!<br><br>You ended the game on round " + round + ".<br><br>High score: " + decodedCookie.replace("highscore=", "");
      document.getElementById("restart").style.display = "inline";
    }, 700);
  }
  else {
    click++;
    if (round != 1) { document.getElementById("note2").innerHTML = click; }
    if (click >= order.length) {
      click = 0;
      round++;
      nextRound();
    }
  }
}

function nextRound() {
  $("#start").fadeIn(100);
  document.getElementById("start").innerHTML = "Round " + round;
  document.getElementById("note").innerHTML = "When you're ready...";
  $("#wrapper2").delay(500).fadeOut(500);
  $("#wrapper1").delay(1300).fadeIn(500);
  setTimeout(function() {
    document.getElementById("note2").innerHTML = "Click on the tiles in order!";
  }, 1900);
}

function restart() {
  location.reload();
}