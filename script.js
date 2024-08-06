//setting variables for elements selected
let theDice = document.querySelector(".imgEdit");
let btnPlayer1 = document.querySelector(".btn_player--0");
let btnPlayer2 = document.querySelector(".btn_player--1");
let btnRestart = document.querySelector(".btnRestart");

let player1PointScore = document.querySelector(".point_score--0");

let score = 0;
let activePlayer = 0;
let holdPlayer1 = [0];
let holdPlayer2 = [0];
let playing = true;

$(".overlay").hide();

$(".infoBtn").click(function () {
  setTimeout(function () {
    $(".info").slideDown();
  }, 500);

  setTimeout(function () {
    $(".info").fadeOut();
  }, 6000);
});

//disable buttonPlayer2
btnPlayer2.disabled = true;

theDice.addEventListener("click", function () {
  let randomNumber = Math.trunc(Math.random() * 6) + 1;

  //to generate random dices numbers
  theDice.src = `img/dice-${randomNumber}.png`;
  let diceNumberGenerated = randomNumber;

  document.querySelector(`.player0_points`).textContent = "Points";
  document.querySelector(`.player1_points`).textContent = "Points";

  //if the dice is not 1, then proceed accumulating the points
  if (diceNumberGenerated !== 1) {
    score += diceNumberGenerated;
    document.querySelector(`.point_score--${activePlayer}`).textContent = score;
  } else {
    switchPlayer();
    switchButtons();
  }
});

const switchPlayer = () => {
  score = 0;
  document.querySelector(`.point_score--${activePlayer}`).textContent = score;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".player_section--0").classList.toggle("active");
  document.querySelector(".player_section--1").classList.toggle("active");
};

const switchButtons = () => {
  if (btnPlayer1.disabled === false) {
    btnPlayer1.disabled = true;
  } else {
    btnPlayer1.disabled = false;
  }

  if (btnPlayer2.disabled === true) {
    btnPlayer2.disabled = false;
  } else {
    btnPlayer2.disabled = true;
  }
};

btnPlayer1.addEventListener("click", function () {
  if (!score) {
    document.querySelector(`.player0_points`).textContent = "Roll the dice!";
  } else {
    if (playing) {
      holdPlayer1[0] += score;
      document.querySelector(
        `.player_score_points--${activePlayer}`
      ).textContent = holdPlayer1[activePlayer];

      if (holdPlayer1[0] >= 100) {
        document.querySelector(`.player0_points`).textContent =
          "🎉You are winner!🎉";
        document.querySelector(`.player1_points`).textContent = "Game Over";

        document.querySelector(".infoBtn").disabled = true;
        $(".overlay").show();
        $(`.player_section--0`).addClass("winner");
        $(".player_section--1").addClass("loser");
        playing = false;
        $(".btn_player--1").hide();
        $(".btn_player--0").hide();
        $(".imgEdit").hide();
      } else {
        switchPlayer();
        btnPlayer1.disabled = true;
        btnPlayer2.disabled = false;
      }
    }
  }
});

btnPlayer2.addEventListener("click", function () {
  if (!score) {
    document.querySelector(`.player1_points`).textContent = "Roll the dice!";
  } else {
    if (playing) {
      holdPlayer2[0] += score;
      document.querySelector(`.player_score_points--${1}`).textContent =
        holdPlayer2[0];

      if (holdPlayer2[0] >= 100) {
        $(".overlay").show();
        document.querySelector(`.player1_points`).textContent =
          "🎉You are winner!🎉";
        document.querySelector(`.player0_points`).textContent = "Game Over";
        document.querySelector(".infoBtn").disabled = true;
        $(".player_section--1").addClass("winner");
        $(".player_section--0").addClass("loser");
        playing = false;
        $(".btn_player--0").hide();
        $(".btn_player--1").hide();
        $(".imgEdit").hide();
      } else {
        switchPlayer();

        btnPlayer1.disabled = false;
        btnPlayer2.disabled = true;
      }
    }
  }
});

btnRestart.addEventListener("click", function () {
  playing = true;
  $(".overlay").hide();
  $(".imgEdit").show();
  $(".btn_player--0").show();
  $(".btn_player--1").show();
  holdPlayer1 = [0];
  holdPlayer2 = [0];
  score = 0;
  activePlayer = 0;
  document.querySelector(`.player1_points`).textContent = "Points";
  document.querySelector(`.player0_points`).textContent = "Points";
  document.querySelector(`.point_score--1`).textContent = score;
  document.querySelector(`.point_score--0`).textContent = score;
  document.querySelector(`.player_score_points--1`).textContent = score;
  document.querySelector(`.player_score_points--0`).textContent = score;
  $(".player_section--0 ").addClass("active");
  $(".player_section--1 ").removeClass("active");
  $(".player_section--0").removeClass("winner");
  $(".player_section--1").removeClass("winner");
  $(".player_section--0").removeClass("loser");
  $(".player_section--1").removeClass("loser");
  btnPlayer1.disabled = false;
  btnPlayer2.disabled = true;
  document.querySelector(".infoBtn").disabled = false;
});
